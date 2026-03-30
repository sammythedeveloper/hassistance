🛸 HolisticAI v2.0.1
The Health Operating System for Engineers. > Optimizing human hardware through real-time telemetry and RAG-driven intelligence.

⚡ The Problem: "The Silent Memory Leak"
Software engineering is a high-performance sport with a 100% injury rate. Burnout, Ocular Strain, and Postural Collapse aren't just inconveniences—they are systemic failures in the developer's execution environment.

🧬 The Solution: HolisticAI
HolisticAI isn't a "health app." It’s a service-centric wellness engine that treats your body like the primary server it is.

Telemetry-Driven AI: Real-time calculation of Focus Capacity, Ocular Strain, and Static Load.

RAG (Retrieval-Augmented Generation): AI responses are grounded in a private vector-style knowledge base of musculoskeletal protocols. No hallucinations. Just fixes.

Context-Aware Logic: Dynamic intent switching between Diagnostic Mode (symptoms) and Consultation Mode (architectural "why").

🛠️ Architecture & Stack
Designed for the Universe Metamorphosis (Next.js/Node/TypeScript).

Code snippet
graph LR
  A[User Telemetry] --> B(Metrics Engine)
  B --> C{RAG Controller}
  D[(Knowledge Base)] --> C
  C --> E[Gemini 2.5 Flash]
  E --> F[Human-First UI]
Runtime: Node.js 22+ / Next.js 15 (App Router)

Database: PostgreSQL + Prisma ORM (Relational persistence for session logs)

Inference: Google Generative AI (Gemini) with behavioral heuristics

Infrastructure: Containerized via Docker for seamless environment parity

🚀 Performance Features
Zero-Latent UI: High-fidelity terminal aesthetic with ReactMarkdown styling.

Observability Sidebar: Mimics enterprise monitoring tools (Grafana/Datadog) for human vitals.

Security Sandbox: Hard-coded guardrails preventing prompt injection and persona drift.

🏁 Quick Start
Bash
# Clone the source
git clone https://github.com/sammythedeveloper/holistic-ai.git

# Initialize environment
cp .env.example .env

# Spin up the stack
docker-compose up -d && npx prisma db push

# Start the dev server
npm run dev

P.S - This is a scalable application i will be pushing more freatures as i am working and making the ai more personalized.
