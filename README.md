# WebCode - Claude Code in your web browser

<div align="center">
  
  **Fast, lightweight, and built for modern Vibe coding. Run Claude Code on mobile or desktop, straight from your browser.**
  
  [![Deploy to Cloudflare Workers](https://img.shields.io/badge/Deploy%20to-Cloudflare%20Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  
</div>

## 🚀 Overview

WebCode brings the power of Claude Code directly to your browser using WebContainer technology. No installations, no setup hassles - just open your browser and start coding with Claude's assistance in a full-featured terminal environment.

## 🎥 Video

<p align="center">
  <a href="https://github.com/user-attachments/assets/02a082d4-a864-474b-9dae-0304046d3153">
    <img src="https://github.com/user-attachments/assets/02a082d4-a864-474b-9dae-0304046d3153" width="100%" alt="Demo video">
  </a>
</p>

### ✨ Features

- **🌐 Browser-Based**: Runs entirely in your browser - no backend servers required
- **📱 Cross-Platform**: Works seamlessly on desktop and mobile devices
- **⚡ Instant Boot**: Lightning-fast WebContainer initialization
- **🖥️ Full Terminal**: Complete terminal experience with xterm.js
- **🔧 Development Ready**: Includes package manager support (pnpm)
- **🎨 Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **☁️ Edge Deployment**: Optimized for Cloudflare Workers deployment
- **🔒 Secure**: Sandboxed environment for safe code execution

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite (Rolldown edition)
- **Styling**: Tailwind CSS v4
- **Terminal**: xterm.js with WebContainer API
- **Container Technology**: WebContainer by StackBlitz
- **Deployment**: Cloudflare Workers with Wrangler
- **Development Server**: Caddy for local proxying
- **UI Components**: Radix UI primitives

## 🏃 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- [Caddy](https://caddyserver.com/) for local development

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/webcode.git
cd webcode
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run dev
```

This will start both Vite and Caddy servers concurrently. The application will be available at `http://localhost:5173`.

## 📖 Usage

1. Open the application in your browser
2. Wait for the WebContainer to boot (you'll see a loading animation)
3. Once ready, you'll have access to a full terminal environment
4. Start coding with Claude Code commands directly in the terminal

### Terminal Commands

The terminal supports standard Unix commands and includes:
- File operations (`ls`, `cd`, `mkdir`, `touch`, etc.)
- Text editing capabilities
- Package management with `pnpm`
- Git operations
- Custom Claude Code integration

## 📁 Project Structure

```
webcode/
├── src/
│   ├── components/          # React components
│   │   ├── Terminal.tsx     # Terminal component wrapper
│   │   ├── TerminalPage.tsx # Main terminal page
│   │   └── ui/              # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   │   └── useWebContainer.ts # WebContainer management
│   ├── lib/                 # Utility libraries
│   │   └── files/           # File templates (e.g., .jshrc)
│   ├── utils/               # Helper functions
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── Caddyfile               # Caddy configuration
├── wrangler.toml           # Cloudflare Workers config
└── package.json            # Project dependencies
```

## 🚀 Deployment

### Build for Production

```bash
bun run build
```

### Deploy to Cloudflare Workers

1. Configure your Cloudflare account:
```bash
wrangler login
```

2. Deploy the application:
```bash
bun run deploy
```

### Preview Build Locally

```bash
bun run preview
```

## 🧪 Development Scripts

- `bun run dev` - Start development server with hot reload
- `bun run build` - Build for production
- `bun run preview` - Preview production build locally
- `bun run deploy` - Deploy to Cloudflare Workers
- `bun run cf-typegen` - Generate Cloudflare types

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Claude by Anthropic for the AI assistance
- StackBlitz team for WebContainer technology
- The open-source community for the amazing tools and libraries

---

<div align="center">
  
  **Powered by [WebContainer](https://webcontainers.io/)**
  
</div>
