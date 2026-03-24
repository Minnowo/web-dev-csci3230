export const mockNotes = [
  {
    id: "1",
    title: "Q1 Planning Meeting",
    content: "Had a great meeting today. We finalized the project plan and everyone seems motivated. Next steps are clear and the team is aligned.",
    tags: ["work", "planning", "meeting"],
    sentiment_score: 0.9,
    summary: "A successful meeting finalized the project plan, leaving the team motivated and aligned.",
    created_at: "2026-01-05T09:00:00Z",
    updated_at: "2026-01-05T10:30:00Z"
  },
  {
    id: "2",
    title: "Project Roadmap Ideas",
    content: "Brainstorming new features for the roadmap. Lots of creative ideas on the table. Need to prioritize and cut scope.",
    tags: ["work", "planning", "creative"],
    sentiment_score: 0.7,
    summary: "Brainstorming session generated many creative roadmap ideas needing prioritization.",
    created_at: "2026-01-08T14:00:00Z",
    updated_at: "2026-01-08T15:00:00Z"
  },
  {
    id: "3",
    title: "Tough Week Reflection",
    content: "Really struggling this week. Deadlines piling up, feeling overwhelmed. Need to find a better way to manage my time.",
    tags: ["personal", "stress", "reflection"],
    sentiment_score: -0.7,
    summary: "Feeling overwhelmed by deadlines and struggling with time management this week.",
    created_at: "2026-01-12T20:00:00Z",
    updated_at: "2026-01-12T20:30:00Z"
  },
  {
    id: "4",
    title: "Learning D3.js",
    content: "Started learning D3 today. It's complex but powerful. Force simulations are really interesting for graph visualizations.",
    tags: ["learning", "programming", "d3"],
    sentiment_score: 0.6,
    summary: "Began learning D3.js, finding force simulations particularly interesting for graphs.",
    created_at: "2026-01-15T11:00:00Z",
    updated_at: "2026-01-15T13:00:00Z"
  },
  {
    id: "5",
    title: "Vue Component Architecture",
    content: "Spent time understanding Vue 3 composition API. Much cleaner than options API. Components are easier to reason about.",
    tags: ["learning", "programming", "vue"],
    sentiment_score: 0.8,
    summary: "Vue 3 composition API feels cleaner and more intuitive than the options API.",
    created_at: "2026-01-18T10:00:00Z",
    updated_at: "2026-01-18T11:30:00Z"
  },
  {
    id: "6",
    title: "Sprint Retrospective",
    content: "Retrospective went well. Team identified key blockers and agreed on action items. Communication needs improvement.",
    tags: ["work", "meeting", "reflection"],
    sentiment_score: 0.4,
    summary: "Sprint retrospective identified blockers and action items with focus on improving communication.",
    created_at: "2026-01-22T15:00:00Z",
    updated_at: "2026-01-22T16:00:00Z"
  },
  {
    id: "7",
    title: "Burnout Warning Signs",
    content: "Noticed I haven't been sleeping well. Work has been consuming everything. Need to set better boundaries and take breaks.",
    tags: ["personal", "stress", "health"],
    sentiment_score: -0.6,
    summary: "Poor sleep and work-life imbalance are warning signs of approaching burnout.",
    created_at: "2026-01-25T22:00:00Z",
    updated_at: "2026-01-25T22:15:00Z"
  },
  {
    id: "8",
    title: "Database Design Notes",
    content: "Worked through the schema design today. SQLite vs Postgres trade-offs. For this scale, SQLite is probably fine.",
    tags: ["programming", "planning", "database"],
    sentiment_score: 0.5,
    summary: "Evaluated SQLite vs Postgres trade-offs, concluding SQLite is sufficient for current scale.",
    created_at: "2026-02-02T09:30:00Z",
    updated_at: "2026-02-02T11:00:00Z"
  },
  {
    id: "9",
    title: "Morning Run",
    content: "Best run in weeks. 5km in under 25 minutes. Feeling energized and clear-headed. Exercise really helps with focus.",
    tags: ["health", "personal", "fitness"],
    sentiment_score: 0.95,
    summary: "Excellent 5km run boosted energy and mental clarity significantly.",
    created_at: "2026-02-05T07:00:00Z",
    updated_at: "2026-02-05T07:30:00Z"
  },
  {
    id: "10",
    title: "API Design Discussion",
    content: "Long debate about REST vs GraphQL. Settled on REST for simplicity. Defined core endpoints for the project.",
    tags: ["work", "programming", "meeting"],
    sentiment_score: 0.5,
    summary: "Team chose REST over GraphQL for simplicity and defined core API endpoints.",
    created_at: "2026-02-08T13:00:00Z",
    updated_at: "2026-02-08T14:30:00Z"
  },
  {
    id: "11",
    title: "Deadline Missed",
    content: "We missed the sprint deadline. Underestimated the complexity of the auth system. Stakeholders are unhappy. Need a better estimation process.",
    tags: ["work", "stress", "reflection"],
    sentiment_score: -0.8,
    summary: "Sprint deadline missed due to underestimated auth complexity, stakeholders are dissatisfied.",
    created_at: "2026-02-12T17:00:00Z",
    updated_at: "2026-02-12T17:30:00Z"
  },
  {
    id: "12",
    title: "New Book: Deep Work",
    content: "Started reading Deep Work by Cal Newport. Already feeling inspired to restructure my schedule for focused work blocks.",
    tags: ["learning", "personal", "productivity"],
    sentiment_score: 0.85,
    summary: "Reading Deep Work is inspiring a schedule restructure around focused work blocks.",
    created_at: "2026-02-15T19:00:00Z",
    updated_at: "2026-02-15T20:00:00Z"
  },
  {
    id: "13",
    title: "Gemini API Integration",
    content: "Got the Gemini API working today. The prompt engineering took a while but it's returning clean JSON with tags and sentiment. Really satisfying.",
    tags: ["programming", "work", "d3"],
    sentiment_score: 0.9,
    summary: "Successfully integrated Gemini API with clean JSON output for tags and sentiment.",
    created_at: "2026-03-01T11:00:00Z",
    updated_at: "2026-03-01T13:00:00Z"
  },
  {
    id: "14",
    title: "Anxious About Presentation",
    content: "Presenting to the class next week. Nervous about the demo working live. Need to prepare fallback plans and practice more.",
    tags: ["work", "stress", "planning"],
    sentiment_score: -0.4,
    summary: "Nervousness about upcoming class presentation prompts need for fallback plans and more practice.",
    created_at: "2026-03-05T21:00:00Z",
    updated_at: "2026-03-05T21:30:00Z"
  },
  {
    id: "15",
    title: "Graph Visualization Working",
    content: "The D3 force graph is finally looking great. Nodes cluster by tag, links show connections. Added zoom and pan. Really proud of this.",
    tags: ["programming", "d3", "creative"],
    sentiment_score: 0.95,
    summary: "D3 force graph with tag clustering, zoom, and pan is working beautifully.",
    created_at: "2026-03-10T16:00:00Z",
    updated_at: "2026-03-10T17:30:00Z"
  },
  {
    id: "16",
    title: "Team Sync",
    content: "Good sync with the team today. Everyone is making progress. Ryan has the DB schema ready. Sid's editor is looking solid.",
    tags: ["work", "meeting", "planning"],
    sentiment_score: 0.8,
    summary: "Productive team sync with DB schema and editor both progressing well.",
    created_at: "2026-03-15T14:00:00Z",
    updated_at: "2026-03-15T15:00:00Z"
  },
  {
    id: "17",
    title: "Fitness Goals Review",
    content: "Reviewed my fitness goals for the year. Behind on most of them. Need to be more consistent but not going to be too hard on myself.",
    tags: ["health", "personal", "reflection"],
    sentiment_score: -0.2,
    summary: "Fitness goals review reveals being behind schedule, with a resolve to be more consistent.",
    created_at: "2026-03-18T08:00:00Z",
    updated_at: "2026-03-18T08:30:00Z"
  },
  {
    id: "18",
    title: "Sentiment Calendar Complete",
    content: "Finished the sentiment calendar visualization. The color gradient from red to green looks great. Writing streaks are a nice touch.",
    tags: ["programming", "d3", "creative"],
    sentiment_score: 0.9,
    summary: "Sentiment calendar with red-to-green gradient and writing streaks is complete.",
    created_at: "2026-03-20T15:00:00Z",
    updated_at: "2026-03-20T16:30:00Z"
  }
]
