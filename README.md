<a href="https://chat.vercel.ai/">
  <h1 align="center">NEAR Founder Copilot</h1>
</a>

<p align="center">
  <a href="https://github.com/your-repo/near-founder-copilot/releases">
    <img src="https://img.shields.io/github/v/release/your-repo/near-founder-copilot?include_prereleases&style=flat-square" alt="GitHub release">
  </a>
  <a href="https://github.com/your-repo/near-founder-copilot/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/your-repo/near-founder-copilot?style=flat-square" alt="License">
  </a>
  <a href="https://github.com/your-repo/near-founder-copilot/stargazers">
    <img src="https://img.shields.io/github/stars/your-repo/near-founder-copilot?style=flat-square" alt="GitHub stars">
  </a>
</p>

<p align="center">
  An AI-powered chatbot designed to assist developers building on the NEAR blockchain, built with Next.js, Vercel AI SDK, and OpenAI.
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

- Designed to be a copilot for building on NEAR, with access to NEAR-specific documentation and resources
- Real-time streaming chat UI
- Integration with OpenAI's GPT-4o model
- Persistent chat history using Vercel KV
- Authentication with NextAuth.js
- Responsive design with Tailwind CSS

## Tech Stack

- [Next.js](https://nextjs.org) with App Router
- [Vercel AI SDK](https://sdk.vercel.ai/docs) for streaming chat UI
- [OpenAI API](https://openai.com/blog/openai-api) (GPT-4)
- [Vercel KV](https://vercel.com/storage/kv) for data storage
- [NextAuth.js](https://next-auth.js.org) for authentication
- [Tailwind CSS](https://tailwindcss.com) for styling
- [shadcn/ui](https://ui.shadcn.com) for UI components

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- OpenAI API key
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

- [ ] Integrate NEAR-specific documentation and resources
- [ ] Implement fine-tuned AI model for NEAR development
- [ ] Add support for code completion and debugging assistance
- [ ] Integrate with NEAR Explorer for real-time blockchain data
- [ ] Implement multi-language support
- [ ] Create a plugin system for extending functionality

## Contributing

We welcome contributions to the NEAR Founder Copilot! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Vercel](https://vercel.com) for the Next.js framework and Vercel AI SDK
- [OpenAI](https://openai.com) for the GPT-4o model
- [NEAR Protocol](https://near.org) for the blockchain platform

---

<p align="center">
  Built with ❤️ by the NEAR community
</p>
