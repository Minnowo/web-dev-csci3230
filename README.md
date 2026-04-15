# Lapis — CSCI3230 Winter 2026

A personal knowledge management web app inspired by Obsidian. Write notes in Markdown, organize them into folders, tag them manually or let Gemini AI suggest tags, then explore your knowledge base through an interactive force-directed graph and an activity calendar.

---

## Table of Contents

1. [Overview](#overview)
2. [Screenshots](#screenshots)
3. [Tech Stack](#tech-stack)
4. [Course Requirements](#course-requirements)
5. [User Guide](#user-guide)
6. [Features Reference](#features-reference)
7. [API Overview](#api-overview)
8. [Setup](#setup)
9. [Project Structure](#project-structure)

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

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | Vue 3 (Composition API) + Vite |
| Styling | Tailwind CSS + CSS custom properties (theme tokens) |
| Visualizations | D3.js (force graph, calendar heatmap) |
| DOM manipulation | jQuery (dashboard recently-visited widget) |
| Backend | TypeScript + Express.js |
| Database | SQLite via `better-sqlite3` |
| Full-text search | SQLite FTS5 with BM25 ranking + Porter stemming |
| AI / external API | Google Gemini (`gemini-2.5-flash`) via `@google/generative-ai` |
| Containerization | Docker + Docker Compose |

---

## Course Requirements

| Requirement | How it is satisfied |
|---|---|
| **AJAX communication** | Every backend call goes through `frontend/src/services/api.js` using the Fetch API with `Authorization: Bearer` headers. No page reloads — all data is loaded and updated asynchronously. |
| **User authentication** | Session-cookie-based auth. Users register with a username and password (hashed server-side). A signed token is set as an `HttpOnly` cookie on login. All protected routes reject requests without a valid session. |
| **Data persistence** | SQLite database stores users, notes, folders, tags, links, uploaded files, and the FTS5 search index. Migrations run automatically on startup. |
| **Multiple pages / views** | Six distinct views: Login, Register, Dashboard, Editor, Graph, and Calendar — each with its own route and component tree. |
| **Vue.js SPA** | Built entirely with Vue 3 (Composition API). Client-side routing via Vue Router with navigation guards that enforce auth. |
| **D3.js visualizations** | Two separate D3 visualizations: (1) force-directed knowledge graph with multiple interaction modes, (2) GitHub-style activity calendar heatmap. |
| **Additional web technology (web service)** | Google Gemini API — an external AI web service called server-side via `POST /api/notes/:id/analyze`. Given a note's content, Gemini returns 3–6 relevant tags drawn from the user's existing tag library. |
| **File imports** | Users can import `.md` files directly into their note library. The file is parsed, its content loaded as a new note, and any `#tags` in the body are registered automatically. |
| **jQuery** | Used in the Dashboard to render the "Recently Visited" notes widget entirely through jQuery DOM manipulation and animated scroll arrows. |

---

## User Guide

### 1. Register and Log In

Navigate to `/register` to create an account with a username and password. On success you are redirected to the dashboard. Returning users log in at `/login`. Sessions persist via a secure cookie — you stay logged in across page refreshes until you log out.

---

### 2. Writing Notes

Click **Create Note** on the dashboard or the `+` button in the editor sidebar. Notes are written in Markdown with live syntax rendering inside the editor:

- `#` / `##` / `###` render as headings
- `**bold**` and `*italic*` render inline
- `[[Note Title]]` creates a wiki-style link to another note (shows up as an edge in the graph)
- `#tagname` anywhere in the body registers a tag on the note

The editor toolbar provides shortcuts for bold, italic, headings, and preview mode. Press the eye icon to toggle a fully rendered Markdown preview.

Notes are auto-saved as you type.

---

### 3. Organizing with Folders

The left sidebar shows your full folder and note tree. You can:

- Create a new folder with the folder-plus button
- Rename or delete folders and notes via right-click context actions
- Drag notes between folders (or move them via the move action)
- Collapse the sidebar to maximize writing space

The entire workspace can be exported as a ZIP file from the sidebar header.

---

### 4. Tagging Notes Manually

The **This Note** panel on the right side of the editor shows all tags currently on the active note. Tags are stored directly in the note content as `#hashtags`.

To add a tag:
1. Type in the tag input and press Enter (or select from the autocomplete dropdown)
2. Or type `#tagname` directly in the note body

Tags must be alphanumeric and at most 30 characters. Removing a tag from the panel removes the corresponding `#tag` from the note body.

The **All Tags** section below lists every tag across your entire library — click one to add it to the current note.

---

### 5. AI Auto-Tagging

With a note open, click the **Auto-tag** button (sparkle icon) in the tag panel. This sends the note's content to the Gemini API, which analyzes it and returns 3–6 tags selected from your existing tag library. The suggested tags are appended to the note content automatically.

Auto-tagging requires a `GEMINI_API_KEY` in the backend environment (see [Setup](#setup)).

---

### 6. Importing and Exporting

**Import:** Click the upload button in the **Import** panel (editor icon strip). Select a `.md` file — its content is loaded as a new note and any `#tags` in the body are parsed and registered automatically.

**Export a note:** Use the toolbar export menu to download the current note as:
- `.md` — raw Markdown source
- `.html` — fully rendered HTML

**Export a folder:** Right-click a folder in the sidebar and choose **Export as ZIP**. The ZIP contains all notes in that folder as `.md` files.

---

### 7. Exploring the Knowledge Graph

Navigate to **Graph** from the navbar. The force-directed graph shows every note as a node and every shared tag or wiki-link as an edge. Node size scales with the number of connections.

**Interaction modes (toolbar buttons):**

| Mode | What it does |
|---|---|
| Default | Pan and zoom freely. Click a node to focus it and highlight its neighbours. |
| Timeline | Arranges notes along the x-axis by creation date. Nodes spread vertically within each date column (beeswarm layout). Zoom rescales the time axis. |
| Path | Click two notes to find and highlight the shortest path between them through shared tags. |
| Select | Click multiple notes individually to highlight them as a group. |

**Search:** Type in the search bar to run a full-text search (FTS5). Matching nodes are spotlighted; non-matching nodes dim. Results are ranked by BM25 score with title matches weighted 10× over content.

**Appearance controls:** Adjust node size, repulsion, link distance, edge thickness, and label display from the settings panel.

---

### 8. Viewing the Activity Calendar

Navigate to **Calendar** from the navbar. The calendar heatmap shows how many notes you created on each day, styled like GitHub's contribution graph.

- Darker cells = more notes written that day
- Hover a cell to see the exact date and note count
- Toggle between **Year** view (full 52-week grid) and **Month** view (day-of-week grid for a single month)
- Use the year/month arrows to navigate history
- Summary stats at the top show your current writing streak, total notes, and active days

---

### 9. Searching Notes

Use the search bar in the editor sidebar to find notes by title or content. Search is powered by SQLite FTS5:

- **Prefix matching** — typing `prog` matches "programming", "progress", etc.
- **Porter stemming** — "running" and "run" match the same notes
- **Weighted ranking** — title matches rank above content matches (10× weight)

Results update as you type. Clicking a result opens that note in the editor.

---

## Features Reference

### Editor

| Feature | Detail |
|---|---|
| Markdown rendering | Live inline rendering of headings, bold, italic inside a `contenteditable` div |
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

## Setup

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 1. Clone the repo

```bash
git clone https://github.com/Sid-26/web-dev-csci3230.git
cd web-dev-csci3230
```

### 2. Add your Gemini API key

Create `backend/.env`:

```
GEMINI_API_KEY=your_key_here
```

Get a free key at https://aistudio.google.com. The app runs without it, but the Auto-tag feature will return an error.

### 3. Start the app

```bash
docker-compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:3000 |

### 4. Seed sample data (optional)

The seeder runs automatically as part of `docker-compose up`. It populates the database with ~110 sample notes across 4 folders, pre-linked and tagged. It is idempotent — running it again skips already-existing notes.

### 5. Create your account

Open http://localhost:5173 and click **Register**. The seeder creates notes under a default test user (`testuser` / `password123`) — log in with those credentials to explore the pre-seeded graph immediately.

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
