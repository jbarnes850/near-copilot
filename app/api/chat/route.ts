import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import Exa from 'exa-js'
import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const exa = new Exa(process.env.EXA_API_KEY)

interface SearchResult {
  results: {
    url: string;
    text: string;
  }[];
}

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const { messages, previewToken } = json
    const userId = (await auth())?.user.id

    if (!userId) {
      return new Response('Unauthorized', { status: 401 })
    }

    if (previewToken) {
      openai.apiKey = previewToken
    }

    // Constant context-setting prompt
    const contextSettingPrompt = {
      role: 'system',
      content: `You are the NEAR Founder Copilot, an advanced AI assistant specialized in helping developers build on the NEAR blockchain. Your knowledge encompasses:

1. NEAR Protocol architecture and core concepts
2. Smart contract development using Rust
3. JavaScript SDK for NEAR
4. NEAR CLI and development tools
5. Token standards (NEP-141, NEP-171)
6. Cross-contract calls and sharding
7. NEAR wallet integration
8. Gas fees and storage on NEAR
9. Real-time NEAR blockchain data via NEARBlocks API

Provide concise, accurate, and actionable responses. Offer code snippets in Rust for smart contracts and JavaScript for frontend integration when relevant. Prioritize security, scalability, and best practices in your recommendations. If unsure, use the Exa search capability to find the most up-to-date information from NEAR documentation and resources.

Always start by asking clarifying questions to understand the developer's specific needs and context before providing detailed solutions.`
    };

    const messagesWithContext = [contextSettingPrompt, ...messages];

    let searchContext: { role: "system"; content: string }[] = [];
    let searchResult: SearchResult | undefined;
    try {
      // Perform Exa search
      const lastUserMessage = messages[messages.length - 1].content;
      searchResult = await exa.searchAndContents(lastUserMessage, {
        useAutoprompt: true,
        numResults: 5,
        includeDomains: ['near.org', 'docs.near.org', 'github.com'],
        startPublishedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        text: true
      });

      searchContext = searchResult.results.map(result => ({
        role: 'system' as const,
        content: `[Search Result from ${result.url}]: ${result.text}`
      }));
    } catch (error) {
      console.error('Error performing Exa search:', error);
      // If Exa search fails, we'll continue without the additional context
    }

    const res = await openai.chat.completions.create({
      model: 'ft:gpt-4o-2024-08-06:personal:near-ecosystem:AB2aZGVL', 
      messages: [
        ...messagesWithContext,
        {
          role: 'system',
          content: 'The following are recent search results. When using this information, explicitly state that it comes from a recent search and provide the source URL.'
        },
        ...searchContext,
        {
          role: 'system',
          content: 'In your response, please differentiate between information from your pre-trained knowledge and information from the recent search results. At the end of your response, provide a confidence score (0-100) for your overall answer, formatted as [Confidence Score: X].'
        },
        {
          role: 'user',
          content: messages[messages.length - 1].content
        }
      ],
      temperature: 0.7,
      max_tokens: 3000,
      stream: true,
    });

    const stream = OpenAIStream(res, {
      onCompletion(completion) {
        const title = json.messages[0].content.substring(0, 100)
        const id = json.id ?? nanoid()
        const createdAt = Date.now()
        const path = `/chat/${id}`
        const payload = {
          id,
          title,
          userId,
          createdAt,
          path,
          messages: [
            ...messages,
            {
              content: completion,
              role: 'assistant'
            }
          ],
          exaSourcesUsed: searchResult?.results.map((r: { url: string }) => r.url) || []
        }
        kv.hmset(`chat:${id}`, payload)
        kv.zadd(`user:chat:${userId}`, {
          score: createdAt,
          member: `chat:${id}`
        })
      }
    });

    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error('Error in chat route:', error)
    return new Response('An error occurred', { status: 500 })
  }
}
