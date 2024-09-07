<a href="https://chat.vercel.ai/">
  <h1 align="center">NEAR Founder Copilot</h1>
</a>

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.3.0-blue?style=flat-square" alt="NEAR Founder Copilot Version">
  <a href="https://twitter.com/nearprotocol">
    <img src="https://img.shields.io/twitter/follow/nearprotocol?style=social" alt="Follow NEAR Protocol on Twitter">
  </a>
</p>

<p align="center">
  An AI-powered chatbot designed to assist developers building on the NEAR blockchain, built with Next.js, Vercel AI SDK, OpenAI, Exa Search, and NEARBlocks API.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#getting-started"><strong>Getting Started</strong></a> ·
  <a href="#deployment"><strong>Deployment</strong></a> ·
  <a href="#roadmap"><strong>Roadmap</strong></a>
</p>
<br/>

## Features

- Dynamic access to up-to-date NEAR documentation and resources via Exa Search
- Integration with NEARBlocks API for real-time blockchain data
- Persistent chat history using Vercel KV
- Authentication with NextAuth.js
- Responsive design with Tailwind CSS

## Tech Stack

- [Next.js](https://nextjs.org) with App Router
- [Vercel AI SDK](https://sdk.vercel.ai/docs) for streaming chat UI
- [OpenAI API](https://openai.com/blog/openai-api) (GPT-4o model)
- [Exa Search](https://exa.ai) for real-time access to NEAR documentation
- [NEARBlocks API](https://api.nearblocks.io/api-docs/#/) for blockchain data
- [Vercel KV](https://vercel.com/storage/kv) for data storage
- [NextAuth.js](https://next-auth.js.org) for authentication
- [Tailwind CSS](https://tailwindcss.com) for styling
- [shadcn/ui](https://ui.shadcn.com) for UI components

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- OpenAI API key
- Exa Search API key
- NEARBlocks API key
- Vercel account (for deployment and Vercel KV)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/near-founder-copilot.git
   cd near-founder-copilot
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env.local` and fill in the required values:
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel

Deploy your own instance of NEAR Founder Copilot to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-repo%2Fnear-founder-copilot)

### Manual Deployment

1. Build the application:
   ```bash
   pnpm build
   ```

2. Start the production server:
   ```bash
   pnpm start
   ```

## Roadmap

- [x] Integrate NEAR-specific documentation and resources via Exa Search
- [x] Implement latest GPT-4o model for improved performance
- [x] Integrate NEARBlocks API for real-time blockchain data
- [ ] Enhance context management for more coherent multi-turn conversations
- [ ] Implement fine-tuned AI model specifically for NEAR development
- [ ] Add support for code completion and debugging assistance
- [ ] Implement multi-language support
- [ ] Create a plugin system for extending functionality
- [ ] Develop a feedback mechanism for continuous improvement of responses
- [ ] Implement advanced caching strategies for faster response times

## Contributing

We welcome contributions to the NEAR Founder Copilot! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Vercel](https://vercel.com) for the Next.js framework and Vercel AI SDK
- [OpenAI](https://openai.com) for the GPT-4o model
- [Exa](https://exa.ai) for providing real-time access to NEAR documentation
- [NEARBlocks](https://nearblocks.io/) for blockchain data API
- [NEAR Protocol](https://near.org) for the blockchain platform

---

<p align="center">
  Built with ❤️ by the NEAR community
</p>
