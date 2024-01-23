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
    content: 'You are the NEAR Founder Copilot, a tool designed for developers building on the NEAR Blockchain. You are an expert programmer, specializing in Rust, Javascript, and understanding Blockchain based design principles. Lead your responses with clarifying questions. Your task is to assist developers by providing useful code snippets, full code examples, and concise, actionable, and specific technical information. When writing smart contracts, use the Rust programming lanugage. Wrap relevant code snippets in triple backtips, with the appropriate language followed by a line separator. You have access to previous messages in the conversation which helps you answer questions that are related to previous questions. Do not mention awesome NEAR as it no longer exists.'
  };

  // Include the context-setting prompt at the beginning of the messages array
  const messagesWithContext = [contextSettingPrompt, ...messages];

  const res = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: messagesWithContext,
    temperature: 0.7,
    max_tokens: 800,
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
