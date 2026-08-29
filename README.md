# Product Planner Workspace

Live Demo: https://product-planner-vert.vercel.app

Category: Product Planning & Technical Strategy

Stack: React 19 Â· TypeScript Â· Python 3.11 Â· Workflow Engine Â· Vite Â· Tailwind CSS

## Overview

Product Planner Workspace is a full-stack collaborative planning platform that transforms a product concept into a comprehensive Product Requirements Document (PRD) and Technical Specification through structured, interactive workflows. Three specialized service modules â€” Product Manager, Tech Lead, and Reviewer â€” operate in sequence via Workflow Engine Flows, guiding stakeholders through discovery, drafting, and iterative refinement.

The system delivers a conversational planning experience where participants shape direction through guided options or free-form input, with session-persistent state and real-time streaming for a production-grade planning environment.

## Features

- **Multi-Service Orchestration** â€” Three role-specific modules (Product Manager, Tech Lead, Reviewer) collaborate sequentially via Workflow Engine Flows to generate PRD and technical outputs.
- **Interactive Discovery & Refinement** â€” Guided Q&A with multiple-choice prompts and free-text support; iterative feedback loops continue until stakeholder approval.
- **Real-Time SSE Streaming** â€” Live streaming of service responses with per-service attribution for transparent progress tracking.
- **Session Persistence & Recovery** â€” Conversation state synchronized to an external store, enabling recovery across instances and sticky routing for continuity.
- **Structured Document Generation** â€” Automated production of PRD and Technical Specification documents with reviewer-driven improvement suggestions at each stage.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TypeScript 5.6, Vite 8, Tailwind CSS 4 |
| Services | Python 3.11, Workflow Engine (Flows), Platform Services |
| Streaming | SSE (Server-Sent Events), FlowStreamingOutput |
| Runtime | EdgeOne Makers, Cloud Functions (Python) |
| Build | Vite, npm |

## Project Structure

```
product-planner/
â”œâ”€â”€ services/                         # Service orchestration (Python) â€” formerly agents/
â”‚   â”œâ”€â”€ stream.py                     # POST /stream â€” main conversation endpoint (SSE)
â”‚   â”œâ”€â”€ _lib/
â”‚   â”‚   â”œâ”€â”€ flow.py                   # TurnFlow: workflow with pause/resume
â”‚   â”‚   â”œâ”€â”€ llm.py                    # Platform Services initialization
â”‚   â”‚   â”œâ”€â”€ persistence.py            # In-memory + store-backed state persistence
â”‚   â”‚   â”œâ”€â”€ feedback_provider.py      # Async feedback provider (HumanFeedbackPending)
â”‚   â”‚   â””â”€â”€ logger.py                # Shared logger factory
â”‚   â”œâ”€â”€ _crews/
â”‚   â”‚   â”œâ”€â”€ agents.yaml               # Service role definitions (PM, TL, Reviewer)
â”‚   â”‚   â”œâ”€â”€ discovery_crew/           # Requirements gathering module
â”‚   â”‚   â”œâ”€â”€ planning_crew/            # PRD + Tech Spec generation module
â”‚   â”‚   â””â”€â”€ iteration_crew/           # Feedback iteration module
â”‚   â””â”€â”€ requirements.txt
â”œâ”€â”€ cloud-functions/
â”‚   â”œâ”€â”€ history.py                    # POST /history â€” retrieve conversation messages
â”‚   â””â”€â”€ delete.py                     # POST /delete â€” delete conversation data
â”œâ”€â”€ src/                              # Frontend (React + Tailwind)
â”‚   â”œâ”€â”€ App.tsx
â”‚   â”œâ”€â”€ components/
â”‚   â”œâ”€â”€ hooks/
â”‚   â”œâ”€â”€ i18n.ts
â”‚   â””â”€â”€ types/
â”œâ”€â”€ edgeone.json                      # Deployment config (framework: workflow)
â””â”€â”€ package.json
```

> `services/` contains all workflow modules. Environment variables follow the `SERVICE_*` convention â€” `SERVICE_* (alias for AI_GATEWAY_* for backward compat)` where applicable.

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+

### Installation

```bash
npm install
cp .env.example .env
```

Configure `.env`:

```bash
SERVICE_API_KEY=your_service_key
SERVICE_BASE_URL=https://your-gateway-base-url.example.com/v1
# Optional: SERVICE_MODEL=@makers/deepseek-v4-flash
# SERVICE_* (alias for AI_GATEWAY_* for backward compat)
```

### Development

```bash
npm run dev
edgeone makers dev
```

The unified dev server runs the Vite frontend, service runtime, and cloud functions. Observe metrics at `http://localhost:8080/service-metrics` if enabled.

### Build

```bash
npm run build
```

Produces optimized assets in `dist/`.

## Deployment

### EdgeOne Makers

`edgeone.json` is configured with `framework: workflow` and `dir: services`. Connect the repository â€” build command `npm run build`, output directory `dist`. Sticky routing ensures conversations remain pinned to the correct service instance.

### GitHub Pages (Frontend Preview)

For static frontend hosting:

```bash
npm run build
# Deploy dist/ to Pages
```

Available at `https://product-planner-vert.vercel.app`.

### Custom Hosting

Deploy `dist/` to any static host and run `services/` + `cloud-functions/` on your Python runtime. Ensure `SERVICE_*` environment variables are configured server-side.

## Customization

- **Workflow & Roles** â€” Edit `services/_lib/flow.py` and `services/_crews/agents.yaml` to adjust service roles, phase transitions, and feedback gates.
- **Document Templates** â€” Modify crew definitions under `services/_crews/` to tailor PRD/Tech Spec structure and reviewer criteria.
- **Frontend Experience** â€” Update `src/App.tsx`, `src/components/`, and `src/i18n.ts` for UI layout, theming, or additional languages.
- **Persistence** â€” Extend `services/_lib/persistence.py` to integrate external storage or custom recovery logic.

## License

MIT
