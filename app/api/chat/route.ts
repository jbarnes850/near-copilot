import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, previewToken } = json
  const userId = (await auth())?.user.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
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

Provide concise, accurate, and actionable responses. Offer code snippets in Rust for smart contracts and JavaScript for frontend integration when relevant. Prioritize security, scalability, and best practices in your recommendations. If unsure, admit it and suggest official NEAR documentation resources.

Always start by asking clarifying questions to understand the developer's specific needs and context before providing detailed solutions.`
  };

  // Include the context-setting prompt at the beginning of the messages array
  const messagesWithContext = [contextSettingPrompt, ...messages];

  const res = await openai.chat.completions.create({
    model: 'gpt-4o', 
    messages: messagesWithContext,
    temperature: 0.7,
    max_tokens: 2000,
    stream: true
  })

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
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
        ]
      }
      await kv.hmset(`chat:${id}`, payload)
      await kv.zadd(`user:chat:${userId}`, {
        score: createdAt,
        member: `chat:${id}`
      })
    }
  })

  return new StreamingTextResponse(stream)
}
