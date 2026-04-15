# Lapis — CSCI3230 Winter 2026

A personal knowledge management web app inspired by Obsidian. Write notes in Markdown, organize them into folders, tag them manually or let Gemini AI suggest tags, then explore your knowledge base through an interactive force-directed graph and an activity calendar.

---

## Table of Contents

1. [Overview](#overview)
2. [Screenshots](#screenshots)
3. [Implementation Highlights](#implementation-highlights)
4. [Setup](#setup)
5. [User Guide](#user-guide)
6. [Features Reference](#features-reference)
7. [API Overview](#api-overview)
8. [Project Structure](#project-structure)

---

## Overview

Lapis lets you build a personal knowledge base where the relationships between ideas are first-class citizens. Every note you write is automatically indexed for full-text search and connected to others through shared tags. The graph view makes those connections visual — you can see clusters of related notes, trace paths between ideas, and arrange everything chronologically on a timeline.

The app is a single-page application with a Vue 3 frontend and a TypeScript/Express backend backed by SQLite. All communication between the two uses AJAX (the Fetch API). User sessions are authenticated via a cookie-based token. The Google Gemini API is integrated as an additional external web service for AI-powered tag suggestions.

---

## Screenshots

> **Dashboard**
> ![Dashboard](docs/screenshots/dashboard.png)

> **Editor**
> ![Editor](docs/screenshots/editor.png)

> **Graph View — Standard**
> ![Graph View](docs/screenshots/graph.png)

> **Graph View — Timeline Mode**
> ![Timeline Mode](docs/screenshots/timeline.png)

> **Activity Calendar**
> ![Activity Calendar](docs/screenshots/calendar.png)

---

## Implementation Highlights

| Area | Technology / Approach |
|---|---|
| **Frontend** | Vue 3 (Composition API) + Vite + Tailwind CSS |
| **Backend** | TypeScript + Express.js |
| **Database** | SQLite via `better-sqlite3` — migrations run automatically on startup |
| **AJAX** | All backend calls go through `frontend/src/services/api.js` using the Fetch API — no page reloads |
| **Authentication** | Session-cookie-based auth; passwords hashed server-side; navigation guards enforce auth on all protected routes |
| **Visualizations** | D3.js — force-directed knowledge graph with multiple interaction modes, and a GitHub-style activity calendar heatmap |
| **Full-text search** | SQLite FTS5 with BM25 ranking + Porter stemming; title weighted 10× over content |
| **AI (external web service)** | Google Gemini (`gemini-2.5-flash`) called server-side — analyzes note content and returns tag suggestions from the user's existing library |
| **jQuery** | Powers the "Recently Visited" widget on the Dashboard entirely through jQuery DOM manipulation and animated scroll arrows |
| **File imports** | `.md` files imported via upload; content loaded as a new note with `#tags` parsed automatically |
| **Containerization** | Docker + Docker Compose — frontend, backend, and seeder run as separate services |

---

## Setup

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 1. Extract the ZIP

Unzip the submission and open a terminal in the project root (`web-dev-csci3230/`).

### 2. Start the app

```bash
docker-compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:3000 |

### 3. Seed sample data

The seeder runs automatically as part of `docker-compose up`. It populates the database with ~110 sample notes across 4 folders, pre-linked and tagged. It is idempotent — restarting Docker skips already-existing notes.

### 4. Create your account

Open http://localhost:5173 and click **Register**. The seeder creates notes under a default test user (`testuser` / `password123`) — log in with those credentials to explore the pre-seeded graph immediately.

---

## User Guide

### Writing Notes

Click **Create Note** on the dashboard or the `+` button in the editor sidebar. Write in Markdown — headings (`#`), bold (`**text**`), italic (`*text*`), and `[[wiki links]]`. Notes are auto-saved as you type. Press the eye icon in the toolbar to switch to a fully rendered preview.

### Organizing with Folders

The left sidebar shows your folder and note tree. Create folders, rename or delete items, and move notes between folders. Export your entire workspace as a ZIP from the sidebar header.

### Tagging Notes

Type `#tagname` anywhere in the note body to add a tag. Tags must be alphanumeric and at most 30 characters. The **This Note** panel on the right shows the current note's tags. Click **Auto-tag** (sparkle icon) to let Gemini suggest tags from your existing library — they are appended to the note content automatically.

### Importing and Exporting

**Import:** Use the **Import** panel (editor icon strip) to upload a `.md` file — it becomes a new note with any `#tags` parsed automatically.

**Export a note:** Download as `.md` or rendered `.html` from the toolbar.

**Export a folder:** Right-click a folder → **Export as ZIP**.

### Knowledge Graph

Navigate to **Graph**. Notes are nodes, shared tags and wiki-links are edges, node size reflects connection count. Use the toolbar to switch modes:

| Mode | What it does |
|---|---|
| Default | Pan, zoom, click a node to focus and highlight neighbours |
| Timeline | Arranges notes by creation date on the x-axis; zoom rescales the time axis |
| Path | Click two notes to highlight the shortest path between them |
| Select | Click multiple notes to highlight them as a group |

Type in the search bar to spotlight matching notes (FTS5, title weighted 10×).

### Activity Calendar

Navigate to **Calendar**. The heatmap shows notes created per day — darker = more. Toggle **Year** / **Month** view, navigate with the arrows, and hover any cell for the exact count. Stats at the top show your streak, total notes, and active days.

---

## Features Reference

### Editor

| Feature | Detail |
|---|---|
| Markdown editor | Write in plain Markdown; switch to preview mode for fully rendered output |
| Wiki links | `[[Note Title]]` syntax creates cross-note links visible in the graph |
| Tags in content | `#tagname` in the body is the source of truth for a note's tags |
| Preview mode | Full rendered Markdown view via the toolbar |
| Icon picker | Assign a custom icon to any note (shown in the sidebar tree) |
| Autocomplete | Tag autocomplete dropdown when typing `#` in the editor |
| Dark / light mode | Toggle in the editor toolbar; preference is persisted |

### Graph View

| Feature | Detail |
|---|---|
| Force-directed layout | D3 force simulation with configurable repulsion, gravity, and link distance |
| Edge types | Wiki-link edges (directed) and shared-tag edges (undirected) rendered separately |
| Timeline mode | Beeswarm layout pinning notes to their creation date on the x-axis |
| Path mode | BFS shortest path between two selected notes |
| Cluster focus | Click a tag node to highlight all notes in that cluster |
| Zoom | Semantic zoom in timeline mode (rescales the time axis rather than scaling the canvas) |
| Smart search | FTS5 search spotlights matching nodes in-graph with score-based opacity |

### Activity Calendar

| Feature | Detail |
|---|---|
| Heatmap | D3 calendar grid, one cell per day, colored by note count |
| Color scale | D3 sequential scale (Blues), domain 0 → max notes in any single day |
| Tooltip | Hover shows date and note count |
| Year / month views | Full year grid or zoomed single-month grid |
| Stats bar | Current streak, total notes, active days, max in a day |
| Theme-aware | Empty cell color adapts to dark / light mode |

---

## API Overview

All endpoints are prefixed with `/api`. Protected routes require a valid session cookie.

| Group | Endpoints |
|---|---|
| **Auth** | `POST /register`, `POST /login`, `GET /whoami` |
| **Notes** | CRUD for notes; get/update content, list all, delete |
| **Tags** | Create and delete global tags; get/set tags on a note |
| **Links** | Create and delete wiki-link edges between notes |
| **Folders** | Create, rename, delete, move folders; list children |
| **Files** | Upload file, list files, download file |
| **Export** | Export a note as `.md` or `.html`; export a folder as ZIP |
| **Search** | `POST /search/hybrid` — FTS5 search with BM25 ranking |
| **AI** | `POST /notes/:id/analyze` — Gemini auto-tag suggestion |

---

## Project Structure

```
web-dev-csci3230/
├── frontend/
│   └── src/
│       ├── views/              # Top-level page components (Graph, Calendar, Editor, …)
│       ├── components/
│       │   ├── editor/         # Editor, sidebar, tag panel, toolbar, asset panel
│       │   └── visualizations/ # GraphView, ActivityCalendar
│       ├── composables/        # useEditorStore (state), useAuth, useTheme
│       ├── services/
│       │   └── api.js          # All AJAX calls to the backend
│       └── router/index.js     # Vue Router routes + auth guards
└── backend/
    └── src/
        ├── api/                # One file per endpoint handler
        ├── routes/             # Multi-step routes (search, AI analysis, FTS index)
        ├── db/                 # SQLite connection, migrations, query helpers
        ├── types/              # Shared TypeScript types
        └── index.ts            # Express app setup, route registration
```
