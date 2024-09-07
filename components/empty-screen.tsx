import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'Build my first NEAR app',
    message: `Help me build my first NEAR app, can you walk me through step by step?`
  },
  {
    heading: 'Build my first Rust smart contract',
    message: 'Show me a basic example of a Rust smart contract for a simple token on NEAR, including main functions and storage.'
  },
  {
    heading: 'Help me integrate a NEAR Wallet',
    message: 'What are the steps to integrate NEAR Wallet into a JavaScript frontend application? Please provide a code snippet.'
  },
  {
    heading: 'Help me optimize gas fees',
    message: 'What are some best practices for optimizing gas fees in NEAR smart contracts? Can you provide examples?'
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Welcome to the NEAR Founder Copilot!
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          This is an open source AI chatbot app built by {' '}
          <ExternalLink href="https://hzn.xyz">Horizon</ExternalLink>
          .
        </p>
        <p className="leading-normal text-muted-foreground">
          You can start a conversation here or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
