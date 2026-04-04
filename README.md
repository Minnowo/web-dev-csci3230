# NoteGraph — CSCI3230 Winter 2026

An Obsidian-like web note-taking app with a force-directed knowledge graph, sentiment calendar, and Gemini-powered smart search.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Node.js 20+ (only needed for the seed script)

## Setup

**1. Clone the repo**
```bash
git clone https://github.com/Sid-26/web-dev-csci3230.git
cd web-dev-csci3230
```

**2. Add your Gemini API key**

Create `backend/.env`:
```
GEMINI_API_KEY=your_key_here
```

Get a free key at https://aistudio.google.com

**3. Start the app**
```bash
docker-compose up --build
```

| Service  | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:3000 |

**4. Seed embeddings (optional — needed for smart search)**

Run once after setup to generate embeddings for all mock notes:
```bash
docker exec express-backend npx tsx scripts/seedEmbeddings.ts
```

## Features

- **Graph View** — force-directed graph of notes linked by shared tags. Node size = connections. Click to focus, search to spotlight.
- **Smart Search** — type a query in the graph search bar to find notes by meaning, not just keywords. Powered by Gemini embeddings.
- **Calendar** — sentiment heatmap and activity chart showing notes over time.
- **Auth** — register/login via `/api/register` and `/api/login`.

## Project Structure

```
frontend/   — Vue 3 + Vite + Tailwind
backend/    — TypeScript + Express + SQLite
```
