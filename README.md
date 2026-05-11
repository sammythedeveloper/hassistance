<div align="center">

# <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Satellite%20Antenna.png" width="40" height="40" /> HolisticAI `v2.0.1`

**The Health Operating System for Engineers.** *Optimizing human hardware through real-time telemetry, Rule-based retrieval + LLM-augmented intelligence, and automated CI/CD pipelines.*

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Aiven_Postgres-FF4C4C?style=for-the-badge&logo=aiven&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
</div>

---

### ⚡ The Problem: "The Silent Memory Leak"
Software engineering is a high-performance sport. **Burnout, Ocular Strain, and Postural Collapse** aren't just inconveniences—they are systemic failures in the developer's execution environment. 

</div>

---

## 🏗️ System Architecture & Infrastructure
Designed with modular full-stack architecture principles focused on observability, maintainability, and continuous delivery.

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime** | `Node.js` + `Next.js` | High-performance full-stack execution |
| **Hosting** | `AWS Amplify` | Managed server side rendering deployment and CI/CD orchestration |
| **Managed DB** | `Aiven PostgreSQL` | Production-grade relational persistence for telemetry logs |
| **CI/CD** | `GitHub Actions` | Automated linting, type-checking, and deployment triggers |
| **Inference** | `Gemini 2.5 Flash` + `Rule-Based Retrieval` | Telemetry-grounded wellness recommendations |
| **DevOps** | `Docker Compose` | Local environment parity for rapid prototyping |

---

## 🚀 Key Features

### 🟢 Automated CI/CD Pipeline
Integrated **GitHub Actions** workflows to ensure code quality and system stability. Every PR triggers automated linting and type-safety checks before merging to `main`.

### 🔵 Production-Grade Data (Aiven)
Leveraged **Aiven** for a fully managed **PostgreSQL** instance, ensuring high availability for critical telemetry storage and seamless **Prisma** migrations across local and cloud environments.

### 🟡 Rule-Based Retrieval Intelligence
Unlike standard LLM workflows, responses are grounded in a structured telemetry-aware knowledge base. The system evaluates developer state signals against predefined intervention protocols and injects the most relevant recommendations into the LLM context before generation.

---


## 🛠️ Installation & Setup

```bash
# 1. Clone & Setup
git clone [https://github.com/sammythedeveloper/holistic-ai.git](https://github.com/sammythedeveloper/holistic-ai.git)
cd holistic-ai && cp .env.example .env

# 2. Boot the Stack
docker-compose up -d && npx prisma db push

# 3. Launch
npm run dev

P.S - This is a scalable application and right now its on its v.0.1 , i will be pushing more freatures as i am working and making the ai more personalized.

