export const mockNotes = [
  {
    id: "1",
    title: "Q1 Planning Meeting",
    content: "Had a great meeting today. We finalized the project plan and everyone seems motivated. Next steps are clear and the team is aligned.",
    tags: ["engineering","leadership"],
    sentiment_score: 0.9,
    summary: "A successful meeting finalized the project plan, leaving the team motivated and aligned.",
    created_at: "2026-01-05T09:00:00Z",
    updated_at: "2026-01-05T10:30:00Z"
  },
  {
    id: "2",
    title: "Project Roadmap Ideas",
    content: "Brainstorming new features for the roadmap. Lots of creative ideas on the table. Need to prioritize and cut scope.",
    tags: ["engineering","design"],
    sentiment_score: 0.7,
    summary: "Brainstorming session generated many creative roadmap ideas needing prioritization.",
    created_at: "2026-01-08T14:00:00Z",
    updated_at: "2026-01-08T15:00:00Z"
  },
  {
    id: "3",
    title: "Tough Week Reflection",
    content: "Really struggling this week. Deadlines piling up, feeling overwhelmed. Need to find a better way to manage my time.",
    tags: ["wellbeing","reflection"],
    sentiment_score: -0.7,
    summary: "Feeling overwhelmed by deadlines and struggling with time management this week.",
    created_at: "2026-01-12T20:00:00Z",
    updated_at: "2026-01-12T20:30:00Z"
  },
  {
    id: "4",
    title: "Learning D3.js",
    content: "Started learning D3 today. It's complex but powerful. Force simulations are really interesting for graph visualizations.",
    tags: ["d3","learning"],
    sentiment_score: 0.6,
    summary: "Began learning D3.js, finding force simulations particularly interesting for graphs.",
    created_at: "2026-01-15T11:00:00Z",
    updated_at: "2026-01-15T13:00:00Z"
  },
  {
    id: "5",
    title: "Vue Component Architecture",
    content: "Spent time understanding Vue 3 composition API. Much cleaner than options API. Components are easier to reason about.",
    tags: ["vue","design"],
    sentiment_score: 0.8,
    summary: "Vue 3 composition API feels cleaner and more intuitive than the options API.",
    created_at: "2026-01-18T10:00:00Z",
    updated_at: "2026-01-18T11:30:00Z"
  },
  {
    id: "6",
    title: "Sprint Retrospective",
    content: "Retrospective went well. Team identified key blockers and agreed on action items. Communication needs improvement.",
    tags: ["leadership","writing"],
    sentiment_score: 0.4,
    summary: "Sprint retrospective identified blockers and action items with focus on improving communication.",
    created_at: "2026-01-22T15:00:00Z",
    updated_at: "2026-01-22T16:00:00Z"
  },
  {
    id: "7",
    title: "Burnout Warning Signs",
    content: "Noticed I haven't been sleeping well. Work has been consuming everything. Need to set better boundaries and take breaks.",
    tags: ["wellbeing","sleep"],
    sentiment_score: -0.6,
    summary: "Poor sleep and work-life imbalance are warning signs of approaching burnout.",
    created_at: "2026-01-25T22:00:00Z",
    updated_at: "2026-01-25T22:15:00Z"
  },
  {
    id: "8",
    title: "Database Design Notes",
    content: "Worked through the schema design today. SQLite vs Postgres trade-offs. For this scale, SQLite is probably fine.",
    tags: ["nodejs","databases"],
    sentiment_score: 0.5,
    summary: "Evaluated SQLite vs Postgres trade-offs, concluding SQLite is sufficient for current scale.",
    created_at: "2026-02-02T09:30:00Z",
    updated_at: "2026-02-02T11:00:00Z"
  },
  {
    id: "9",
    title: "Morning Run",
    content: "Best run in weeks. 5km in under 25 minutes. Feeling energized and clear-headed. Exercise really helps with focus.",
    tags: ["fitness","wellbeing"],
    sentiment_score: 0.95,
    summary: "Excellent 5km run boosted energy and mental clarity significantly.",
    created_at: "2026-02-05T07:00:00Z",
    updated_at: "2026-02-05T07:30:00Z"
  },
  {
    id: "10",
    title: "API Design Discussion",
    content: "Long debate about REST vs GraphQL. Settled on REST for simplicity. Defined core endpoints for the project.",
    tags: ["nodejs","performance"],
    sentiment_score: 0.5,
    summary: "Team chose REST over GraphQL for simplicity and defined core API endpoints.",
    created_at: "2026-02-08T13:00:00Z",
    updated_at: "2026-02-08T14:30:00Z"
  },
  {
    id: "11",
    title: "Deadline Missed",
    content: "We missed the sprint deadline. Underestimated the complexity of the auth system. Stakeholders are unhappy. Need a better estimation process.",
    tags: ["wellbeing","journaling"],
    sentiment_score: -0.8,
    summary: "Sprint deadline missed due to underestimated auth complexity, stakeholders are dissatisfied.",
    created_at: "2026-02-12T17:00:00Z",
    updated_at: "2026-02-12T17:30:00Z"
  },
  {
    id: "12",
    title: "New Book: Deep Work",
    content: "Started reading Deep Work by Cal Newport. Already feeling inspired to restructure my schedule for focused work blocks.",
    tags: ["wellbeing","journaling"],
    sentiment_score: 0.85,
    summary: "Reading Deep Work is inspiring a schedule restructure around focused work blocks.",
    created_at: "2026-02-15T19:00:00Z",
    updated_at: "2026-02-15T20:00:00Z"
  },
  {
    id: "13",
    title: "Gemini API Integration",
    content: "Got the Gemini API working today. The prompt engineering took a while but it's returning clean JSON with tags and sentiment. Really satisfying.",
    tags: ["d3","engineering"],
    sentiment_score: 0.9,
    summary: "Successfully integrated Gemini API with clean JSON output for tags and sentiment.",
    created_at: "2026-03-01T11:00:00Z",
    updated_at: "2026-03-01T13:00:00Z"
  },
  {
    id: "14",
    title: "Anxious About Presentation",
    content: "Presenting to the class next week. Nervous about the demo working live. Need to prepare fallback plans and practice more.",
    tags: ["writing","journaling"],
    sentiment_score: -0.4,
    summary: "Nervousness about upcoming class presentation prompts need for fallback plans and more practice.",
    created_at: "2026-03-05T21:00:00Z",
    updated_at: "2026-03-05T21:30:00Z"
  },
  {
    id: "15",
    title: "Graph Visualization Working",
    content: "The D3 force graph is finally looking great. Nodes cluster by tag, links show connections. Added zoom and pan. Really proud of this.",
    tags: ["d3","creativity"],
    sentiment_score: 0.95,
    summary: "D3 force graph with tag clustering, zoom, and pan is working beautifully.",
    created_at: "2026-03-10T16:00:00Z",
    updated_at: "2026-03-10T17:30:00Z"
  },
  {
    id: "16",
    title: "Team Sync",
    content: "Good sync with the team today. Everyone is making progress. Ryan has the DB schema ready. Sid's editor is looking solid.",
    tags: ["vue","d3"],
    sentiment_score: 0.8,
    summary: "Productive team sync with DB schema and editor both progressing well.",
    created_at: "2026-03-15T14:00:00Z",
    updated_at: "2026-03-15T15:00:00Z"
  },
  {
    id: "17",
    title: "Fitness Goals Review",
    content: "Reviewed my fitness goals for the year. Behind on most of them. Need to be more consistent but not going to be too hard on myself.",
    tags: ["design","leadership"],
    sentiment_score: -0.2,
    summary: "Fitness goals review reveals being behind schedule, with a resolve to be more consistent.",
    created_at: "2026-03-18T08:00:00Z",
    updated_at: "2026-03-18T08:30:00Z"
  },
  {
    id: "18",
    title: "Sentiment Calendar Complete",
    content: "Finished the sentiment calendar visualization. The color gradient from red to green looks great. Writing streaks are a nice touch.",
    tags: ["finance","budgeting"],
    sentiment_score: 0.9,
    summary: "Sentiment calendar with red-to-green gradient and writing streaks is complete.",
    created_at: "2026-03-20T15:00:00Z",
    updated_at: "2026-03-20T16:30:00Z"
  },
  {
    id: "19",
    title: "Budget Review Q1",
    content: "Went through Q1 spending. Overspent on subscriptions and eating out. Need a tighter monthly budget going forward.",
    tags: ["reading","engineering"],
    sentiment_score: -0.3,
    summary: "Q1 budget review reveals overspending on subscriptions and dining.",
    created_at: "2026-01-06T18:00:00Z",
    updated_at: "2026-01-06T18:45:00Z"
  },
  {
    id: "20",
    title: "TypeScript Migration Plan",
    content: "Outlined a plan to migrate the codebase to TypeScript. Will take a few sprints but the type safety will be worth it.",
    tags: ["nodejs","databases"],
    sentiment_score: 0.6,
    summary: "TypeScript migration plan outlined across a few sprints for improved type safety.",
    created_at: "2026-01-09T10:00:00Z",
    updated_at: "2026-01-09T11:30:00Z"
  },
  {
    id: "21",
    title: "Meditation Practice Started",
    content: "Started a 10-minute morning meditation routine using Headspace. Feels awkward but I'm committing to 30 days.",
    tags: ["fitness","nutrition"],
    sentiment_score: 0.5,
    summary: "Beginning a 30-day morning meditation routine with Headspace.",
    created_at: "2026-01-10T07:30:00Z",
    updated_at: "2026-01-10T08:00:00Z"
  },
  {
    id: "22",
    title: "Design System Research",
    content: "Researched design systems — Material, Ant, Radix. Radix UI primitives seem most flexible for our use case.",
    tags: ["engineering","learning"],
    sentiment_score: 0.6,
    summary: "Radix UI primitives identified as the most flexible design system option.",
    created_at: "2026-01-13T14:00:00Z",
    updated_at: "2026-01-13T16:00:00Z"
  },
  {
    id: "23",
    title: "Cooking Experiment: Ramen",
    content: "Made homemade ramen from scratch. Broth took 6 hours but it was absolutely worth it. Will definitely do again.",
    tags: ["nodejs","databases"],
    sentiment_score: 0.92,
    summary: "Homemade ramen from scratch was a time-intensive but deeply satisfying success.",
    created_at: "2026-01-14T20:00:00Z",
    updated_at: "2026-01-14T21:00:00Z"
  },
  {
    id: "24",
    title: "Code Review Process Overhaul",
    content: "Our PR review process is too slow. Proposed async reviews with 24h SLA. Team agreed. Will trial next sprint.",
    tags: ["nodejs","performance"],
    sentiment_score: 0.55,
    summary: "Async PR review with 24h SLA proposed and agreed upon to speed up code reviews.",
    created_at: "2026-01-17T13:00:00Z",
    updated_at: "2026-01-17T14:00:00Z"
  },
  {
    id: "25",
    title: "Podcast Notes: Lex Fridman",
    content: "Listened to Lex interview a robotics researcher. Fascinating discussion on embodied intelligence and the gap between LLMs and physical world interaction.",
    tags: ["d3","engineering"],
    sentiment_score: 0.75,
    summary: "Lex Fridman podcast sparked thoughts on embodied intelligence vs LLM limitations.",
    created_at: "2026-01-20T18:30:00Z",
    updated_at: "2026-01-20T19:15:00Z"
  },
  {
    id: "26",
    title: "Sleep Tracking Experiment",
    content: "Using my watch to track sleep stages. Turns out I'm getting way less deep sleep than I thought. Cutting caffeine after 2pm.",
    tags: ["fitness","habits"],
    sentiment_score: -0.15,
    summary: "Sleep tracking reveals lack of deep sleep, prompting a caffeine cutoff at 2pm.",
    created_at: "2026-01-23T07:45:00Z",
    updated_at: "2026-01-23T08:15:00Z"
  },
  {
    id: "27",
    title: "React vs Vue Comparison",
    content: "Spent an afternoon comparing React and Vue 3 for a side project. Vue's single-file components and reactivity system feel more ergonomic to me.",
    tags: ["engineering","leadership"],
    sentiment_score: 0.65,
    summary: "Vue 3 feels more ergonomic than React for single-file component development.",
    created_at: "2026-01-26T15:00:00Z",
    updated_at: "2026-01-26T17:00:00Z"
  },
  {
    id: "28",
    title: "Weekend Hike Notes",
    content: "Hiked the Bruce Trail section near Rattlesnake Point. 12km, stunning views. Exactly the reset I needed after a rough week.",
    tags: ["fitness","wellbeing"],
    sentiment_score: 0.95,
    summary: "12km Bruce Trail hike provided a much-needed mental reset after a difficult week.",
    created_at: "2026-01-31T16:00:00Z",
    updated_at: "2026-01-31T17:00:00Z"
  },
  {
    id: "29",
    title: "CI/CD Pipeline Setup",
    content: "Got GitHub Actions running for the project. Auto-deploys on merge to main. Linting and tests gate the PR. Big productivity win.",
    tags: ["engineering","testing"],
    sentiment_score: 0.85,
    summary: "GitHub Actions CI/CD pipeline with auto-deploy and gated PRs is now live.",
    created_at: "2026-02-03T11:00:00Z",
    updated_at: "2026-02-03T13:30:00Z"
  },
  {
    id: "30",
    title: "Financial Goals 2026",
    content: "Set three financial goals: emergency fund at 3 months expenses, max TFSA contribution, pay off line of credit by December.",
    tags: ["vue","design"],
    sentiment_score: 0.7,
    summary: "Three clear 2026 financial goals set: emergency fund, TFSA max, and debt payoff.",
    created_at: "2026-02-06T20:00:00Z",
    updated_at: "2026-02-06T20:45:00Z"
  },
  {
    id: "31",
    title: "User Interview Prep",
    content: "Prepping for user interviews tomorrow. Drafted 8 open-ended questions around note-taking habits and pain points. Trying not to lead the witness.",
    tags: ["vue","typescript"],
    sentiment_score: 0.5,
    summary: "Eight open-ended user interview questions prepared around note-taking pain points.",
    created_at: "2026-02-09T19:00:00Z",
    updated_at: "2026-02-09T20:00:00Z"
  },
  {
    id: "32",
    title: "Music: Back to Guitar",
    content: "Picked up the guitar after six months. Fingers hurt but it felt so good. Working through some fingerpicking patterns.",
    tags: ["travel","journaling"],
    sentiment_score: 0.8,
    summary: "Returning to guitar after a six-month break with renewed focus on fingerpicking.",
    created_at: "2026-02-11T21:00:00Z",
    updated_at: "2026-02-11T21:45:00Z"
  },
  {
    id: "33",
    title: "Accessibility Audit",
    content: "Ran axe on the frontend. 12 violations, mostly missing aria labels and low contrast text. Filed issues for each one.",
    tags: ["vue","design"],
    sentiment_score: -0.1,
    summary: "Accessibility audit found 12 violations; issues filed for aria labels and contrast problems.",
    created_at: "2026-02-14T10:00:00Z",
    updated_at: "2026-02-14T11:30:00Z"
  },
  {
    id: "34",
    title: "Travel Planning: Japan",
    content: "Starting to plan a Japan trip for fall. Tokyo, Kyoto, Hiroshima. Bullet train pass seems worth it. Budget around $4k CAD.",
    tags: ["design","leadership"],
    sentiment_score: 0.88,
    summary: "Japan trip planned for fall: Tokyo, Kyoto, Hiroshima on a $4k CAD budget.",
    created_at: "2026-02-16T19:00:00Z",
    updated_at: "2026-02-16T20:30:00Z"
  },
  {
    id: "35",
    title: "Conflict With Teammate",
    content: "Had a disagreement with a teammate over architecture decisions. Got heated. Sent a follow-up message to clear the air. Feeling better now.",
    tags: ["wellbeing","reflection"],
    sentiment_score: -0.35,
    summary: "Architecture disagreement with teammate resolved after a follow-up conversation.",
    created_at: "2026-02-18T17:30:00Z",
    updated_at: "2026-02-18T22:00:00Z"
  },
  {
    id: "36",
    title: "Reading: The Pragmatic Programmer",
    content: "Re-reading The Pragmatic Programmer. The section on orthogonality is hitting differently now that I have more experience. Highly recommend revisiting classics.",
    tags: ["reading","learning"],
    sentiment_score: 0.82,
    summary: "Revisiting The Pragmatic Programmer reveals new insights on orthogonality with experience.",
    created_at: "2026-02-20T20:00:00Z",
    updated_at: "2026-02-20T21:30:00Z"
  },
  {
    id: "37",
    title: "Weekly Review System",
    content: "Implemented a GTD-style weekly review. 30 minutes every Sunday to clear inbox, review projects, and set priorities. Game changer for clarity.",
    tags: ["wellbeing","meditation"],
    sentiment_score: 0.88,
    summary: "GTD-style Sunday weekly review implemented for inbox clearing and priority setting.",
    created_at: "2026-02-22T11:00:00Z",
    updated_at: "2026-02-22T11:30:00Z"
  },
  {
    id: "38",
    title: "Performance Optimization",
    content: "Profiled the frontend and found two slow renders. Memoized computed properties and lazy-loaded three routes. Page load cut from 3.2s to 0.9s.",
    tags: ["journaling","reflection"],
    sentiment_score: 0.9,
    summary: "Frontend profiling and memoization cut page load time from 3.2s to 0.9s.",
    created_at: "2026-02-25T14:00:00Z",
    updated_at: "2026-02-25T16:00:00Z"
  },
  {
    id: "39",
    title: "Journaling Habit",
    content: "Committed to writing at least 3 sentences every night. Not for productivity, just to process the day. Easier than I expected.",
    tags: ["cooking","creativity"],
    sentiment_score: 0.7,
    summary: "Starting a nightly 3-sentence journaling habit for daily emotional processing.",
    created_at: "2026-02-27T22:00:00Z",
    updated_at: "2026-02-27T22:15:00Z"
  },
  {
    id: "40",
    title: "Stakeholder Demo Prep",
    content: "Preparing slides and a live demo for next Thursday's stakeholder review. Hoping the data visualizations land well.",
    tags: ["design","leadership"],
    sentiment_score: 0.3,
    summary: "Preparing stakeholder demo slides and live data visualization walkthrough.",
    created_at: "2026-03-02T18:00:00Z",
    updated_at: "2026-03-02T19:30:00Z"
  },
  {
    id: "41",
    title: "D3 Transitions Deep Dive",
    content: "Studied D3 transition internals today. Understanding the update pattern properly finally clicked — enter, update, exit. Clean animations now.",
    tags: ["d3","creativity"],
    sentiment_score: 0.88,
    summary: "D3 enter-update-exit transition pattern finally clicked, enabling clean animations.",
    created_at: "2026-03-04T13:00:00Z",
    updated_at: "2026-03-04T15:00:00Z"
  },
  {
    id: "42",
    title: "Cooking: Sourdough Attempt",
    content: "First sourdough loaf. Starter took 7 days. The loaf came out dense but it tasted great. Crust was perfect. Will try again with better shaping.",
    tags: ["journaling","leadership"],
    sentiment_score: 0.72,
    summary: "First sourdough loaf was dense but tasty with a perfect crust; will improve shaping.",
    created_at: "2026-03-06T14:00:00Z",
    updated_at: "2026-03-06T15:00:00Z"
  },
  {
    id: "43",
    title: "Negative Feedback Received",
    content: "Got feedback that my code is hard to review because commits are too large. Fair point. Will start making smaller, atomic commits.",
    tags: ["journaling","engineering"],
    sentiment_score: -0.25,
    summary: "Received feedback about large commits; committing to smaller, atomic changes.",
    created_at: "2026-03-07T16:00:00Z",
    updated_at: "2026-03-07T16:30:00Z"
  },
  {
    id: "44",
    title: "Music Playlist for Focus",
    content: "Curated a 3-hour lo-fi + ambient playlist for deep work sessions. Brian Eno's Music for Airports is a revelation.",
    tags: ["cooking","nutrition"],
    sentiment_score: 0.8,
    summary: "Curated focus playlist featuring lo-fi and Brian Eno ambient music for deep work.",
    created_at: "2026-03-08T10:00:00Z",
    updated_at: "2026-03-08T10:30:00Z"
  },
  {
    id: "45",
    title: "Tag Matrix Visualization",
    content: "Built the tag co-occurrence matrix. Sorting by most co-occurring pairs toward top-left makes the patterns obvious immediately.",
    tags: ["engineering","typescript"],
    sentiment_score: 0.85,
    summary: "Tag co-occurrence matrix sorts by frequency, making topic relationship patterns immediately clear.",
    created_at: "2026-03-09T14:00:00Z",
    updated_at: "2026-03-09T15:30:00Z"
  },
  {
    id: "46",
    title: "Travel Research: Japan Rail",
    content: "Looked into JR Pass options. 21-day pass is probably overkill. 14-day covers Tokyo-Kyoto-Hiroshima comfortably. Booked in principle.",
    tags: ["nodejs","engineering"],
    sentiment_score: 0.78,
    summary: "14-day JR Pass identified as optimal for Tokyo-Kyoto-Hiroshima itinerary.",
    created_at: "2026-03-11T20:00:00Z",
    updated_at: "2026-03-11T21:00:00Z"
  },
  {
    id: "47",
    title: "Writing First Blog Post",
    content: "Drafted a blog post about D3 force simulations. Hard to explain without interactive examples. Considering embedding CodeSandbox demos.",
    tags: ["writing","engineering"],
    sentiment_score: 0.6,
    summary: "Drafting a D3 force simulation blog post with plans for embedded interactive examples.",
    created_at: "2026-03-12T21:00:00Z",
    updated_at: "2026-03-12T22:30:00Z"
  },
  {
    id: "48",
    title: "Gym PR: Deadlift",
    content: "Hit a new deadlift PR today — 160kg. Six months of consistent training paid off. Feeling strong and motivated to keep going.",
    tags: ["fitness","wellbeing"],
    sentiment_score: 0.97,
    summary: "New 160kg deadlift PR achieved after six months of consistent training.",
    created_at: "2026-03-13T18:00:00Z",
    updated_at: "2026-03-13T18:30:00Z"
  },
  {
    id: "49",
    title: "Investment Research: ETFs",
    content: "Researching low-cost index ETFs for the TFSA. VFV vs XEQT debate. XEQT wins for simplicity and built-in diversification.",
    tags: ["vue","design"],
    sentiment_score: 0.6,
    summary: "XEQT chosen over VFV for TFSA investing due to simplicity and broader diversification.",
    created_at: "2026-03-14T19:30:00Z",
    updated_at: "2026-03-14T20:30:00Z"
  },
  {
    id: "50",
    title: "Activity Chart Done",
    content: "Wrapped up the writing activity chart. Daily and weekly views with animated transitions. The color scale by count is a nice touch.",
    tags: ["d3","creativity"],
    sentiment_score: 0.9,
    summary: "Writing activity chart with daily/weekly animated views and count color scale complete.",
    created_at: "2026-03-16T15:00:00Z",
    updated_at: "2026-03-16T16:00:00Z"
  },
  {
    id: "51",
    title: "Mentor Session Notes",
    content: "Great call with my mentor. He pushed back on my plan to rewrite the whole backend. Start with tests, then refactor incrementally. Wise advice.",
    tags: ["journaling","learning"],
    sentiment_score: 0.8,
    summary: "Mentor advised incremental refactoring with tests rather than a full backend rewrite.",
    created_at: "2026-03-17T11:00:00Z",
    updated_at: "2026-03-17T12:00:00Z"
  },
  {
    id: "52",
    title: "Reading: Atomic Habits",
    content: "Finished Atomic Habits. The identity-based habits framing is powerful — focus on being the type of person who does the thing, not just doing it.",
    tags: ["reading","productivity"],
    sentiment_score: 0.88,
    summary: "Atomic Habits identity-based habit framing reframes goals around who you want to become.",
    created_at: "2026-03-19T20:00:00Z",
    updated_at: "2026-03-19T21:00:00Z"
  },
  {
    id: "53",
    title: "Design Mockups Review",
    content: "Reviewed Sid's Figma mockups. The sidebar layout is clean but the note editor needs more breathing room. Left some comments.",
    tags: ["design","leadership"],
    sentiment_score: 0.55,
    summary: "Figma mockup review found clean sidebar but editor needs more whitespace.",
    created_at: "2026-03-21T14:00:00Z",
    updated_at: "2026-03-21T15:00:00Z"
  },
  {
    id: "54",
    title: "Stress About Deadlines",
    content: "April 17 is creeping up. Still have integration testing and documentation left. Feeling the crunch but staying focused.",
    tags: ["wellbeing","journaling"],
    sentiment_score: -0.45,
    summary: "Deadline pressure from April 17 submission with integration testing and docs remaining.",
    created_at: "2026-03-22T22:00:00Z",
    updated_at: "2026-03-22T22:30:00Z"
  },
  {
    id: "55",
    title: "Node.js Streams Research",
    content: "Went deep on Node.js streams for a data pipeline idea. Transform streams are elegant for building composable data processors.",
    tags: ["travel","finance"],
    sentiment_score: 0.7,
    summary: "Node.js transform streams explored as elegant building blocks for composable data pipelines.",
    created_at: "2026-01-16T14:00:00Z",
    updated_at: "2026-01-16T16:00:00Z"
  },
  {
    id: "56",
    title: "Cooking: Dumpling Night",
    content: "Made dumplings with my roommate. Folding is harder than it looks but we got the hang of it. Made about 60 and ate almost all of them.",
    tags: ["journaling","wellbeing"],
    sentiment_score: 0.93,
    summary: "Homemade dumpling session with roommate resulted in 60 dumplings and lots of laughs.",
    created_at: "2026-01-19T19:00:00Z",
    updated_at: "2026-01-19T21:00:00Z"
  },
  {
    id: "57",
    title: "Productivity System Reset",
    content: "My todo list had 80 items and I was ignoring it. Cleared everything and started fresh with a max-10-items rule. Already feels better.",
    tags: ["reading","productivity"],
    sentiment_score: 0.6,
    summary: "Productivity reset with a max-10-item todo rule replaced an 80-item backlog.",
    created_at: "2026-01-28T09:00:00Z",
    updated_at: "2026-01-28T09:30:00Z"
  },
  {
    id: "58",
    title: "Conference Talk Watched",
    content: "Watched a JSConf talk on rendering performance in large D3 visualizations. Canvas vs SVG trade-offs well explained. Relevant for the graph view.",
    tags: ["sleep","wellbeing"],
    sentiment_score: 0.75,
    summary: "JSConf talk on D3 canvas vs SVG rendering trade-offs directly applicable to graph view.",
    created_at: "2026-02-04T20:00:00Z",
    updated_at: "2026-02-04T21:00:00Z"
  },
  {
    id: "59",
    title: "Writing: Essay Draft",
    content: "Working on a personal essay about how note-taking changed how I think. It's harder to write personally than technically but more rewarding.",
    tags: ["reading","productivity"],
    sentiment_score: 0.65,
    summary: "Personal essay on note-taking's cognitive impact proves harder but more rewarding than technical writing.",
    created_at: "2026-02-10T21:00:00Z",
    updated_at: "2026-02-10T22:30:00Z"
  },
  {
    id: "60",
    title: "Sprint Planning",
    content: "Planned the final sprint before the April deadline. Broke down the remaining work into day-sized tasks. Feels achievable.",
    tags: ["cooking","wellbeing"],
    sentiment_score: 0.7,
    summary: "Final sprint planned with day-sized tasks making the April deadline feel achievable.",
    created_at: "2026-03-23T10:00:00Z",
    updated_at: "2026-03-23T11:00:00Z"
  },
  {
    id: "61",
    title: "Gym Routine Adjustment",
    content: "Switched from 5-day to 4-day training split to allow more recovery time. Body feels less beaten up and performance is up.",
    tags: ["fitness","wellbeing"],
    sentiment_score: 0.78,
    summary: "Switching to a 4-day training split improved recovery and overall performance.",
    created_at: "2026-02-07T18:00:00Z",
    updated_at: "2026-02-07T18:30:00Z"
  },
  {
    id: "62",
    title: "Music: Chord Progressions",
    content: "Discovered the i-VI-III-VII minor progression today. Used it to write a short instrumental piece. Very melancholic but satisfying.",
    tags: ["journaling","writing"],
    sentiment_score: 0.75,
    summary: "i-VI-III-VII minor progression used to compose a melancholic short instrumental piece.",
    created_at: "2026-02-19T21:30:00Z",
    updated_at: "2026-02-19T22:30:00Z"
  },
  {
    id: "63",
    title: "Imposter Syndrome",
    content: "Big meeting today with senior engineers. Felt completely out of my depth. Reminded myself that everyone starts somewhere and I'm still learning.",
    tags: ["travel","hiking"],
    sentiment_score: -0.5,
    summary: "Feeling out of depth with senior engineers prompted a reflection on growth mindset.",
    created_at: "2026-02-26T17:00:00Z",
    updated_at: "2026-02-26T22:00:00Z"
  },
  {
    id: "64",
    title: "Japan Food Research",
    content: "Deep dive into Japanese food I need to try: tsukemen, tamagoyaki, kaiseki, conveyor belt sushi. Made a running list by city.",
    tags: ["journaling","meditation"],
    sentiment_score: 0.92,
    summary: "City-by-city Japan food bucket list compiled with ramen, tamagoyaki, and kaiseki highlights.",
    created_at: "2026-03-03T20:00:00Z",
    updated_at: "2026-03-03T21:00:00Z"
  },
  {
    id: "65",
    title: "Refactoring Notes API",
    content: "Refactored the notes API route handlers into a service layer. Much cleaner separation of concerns. Tests are easier to write now too.",
    tags: ["vue","design"],
    sentiment_score: 0.8,
    summary: "Notes API refactored into a service layer, improving separation of concerns and testability.",
    created_at: "2026-03-24T09:00:00Z",
    updated_at: "2026-03-24T11:00:00Z"
  },
  {
    id: "66",
    title: "Reading: SICP",
    content: "Started Structure and Interpretation of Computer Programs. Chapter 1 on substitution model is brain-bending but essential. Lisp is strange.",
    tags: ["reading","learning"],
    sentiment_score: 0.7,
    summary: "SICP Chapter 1 substitution model is challenging but foundational for computational thinking.",
    created_at: "2026-01-30T20:00:00Z",
    updated_at: "2026-01-30T21:30:00Z"
  },
  {
    id: "67",
    title: "Finance: Tax Return Filed",
    content: "Filed my taxes early for once. Getting a small refund. Going straight to the emergency fund.",
    tags: ["finance","budgeting"],
    sentiment_score: 0.65,
    summary: "Early tax filing yields a small refund earmarked directly for the emergency fund.",
    created_at: "2026-02-28T19:00:00Z",
    updated_at: "2026-02-28T19:30:00Z"
  },
  {
    id: "68",
    title: "D3 Zoom Behavior Fix",
    content: "Fixed a bug where zooming on the graph also triggered scroll on the parent page. Solution: call event.preventDefault() in the zoom handler.",
    tags: ["finance","travel"],
    sentiment_score: 0.7,
    summary: "Graph scroll-zoom conflict fixed by calling preventDefault in the D3 zoom handler.",
    created_at: "2026-03-24T14:00:00Z",
    updated_at: "2026-03-24T14:30:00Z"
  },
  {
    id: "69",
    title: "Networking Event Recap",
    content: "Attended a local tech meetup. Met three interesting engineers, swapped contacts. These events feel awkward but always pay off.",
    tags: ["fitness","habits"],
    sentiment_score: 0.65,
    summary: "Tech meetup yielded three new contacts despite initial awkwardness.",
    created_at: "2026-01-21T21:00:00Z",
    updated_at: "2026-01-21T22:00:00Z"
  },
  {
    id: "70",
    title: "Postgres Full-Text Search",
    content: "Explored Postgres full-text search with tsvector. Surprisingly powerful without needing Elasticsearch. May use it for note search.",
    tags: ["engineering","databases"],
    sentiment_score: 0.72,
    summary: "Postgres full-text search with tsvector explored as a simpler alternative to Elasticsearch.",
    created_at: "2026-01-27T14:00:00Z",
    updated_at: "2026-01-27T16:00:00Z"
  },
  {
    id: "71",
    title: "Anxiety Spike",
    content: "Had a rough night. Couldn't stop catastrophizing about the future. Wrote it all out and it helped. Journaling is genuinely therapeutic.",
    tags: ["wellbeing","journaling"],
    sentiment_score: -0.55,
    summary: "Late-night anxiety managed through journaling, reinforcing its therapeutic value.",
    created_at: "2026-02-01T23:30:00Z",
    updated_at: "2026-02-01T23:59:00Z"
  },
  {
    id: "72",
    title: "Side Project Idea: Habit Tracker",
    content: "Had an idea for a minimal habit tracker with a streak visualization. Could be a good D3 practice project after the course wraps.",
    tags: ["design","creativity"],
    sentiment_score: 0.78,
    summary: "Minimal habit tracker with D3 streak visualization planned as a post-course side project.",
    created_at: "2026-02-13T20:00:00Z",
    updated_at: "2026-02-13T20:30:00Z"
  },
  {
    id: "73",
    title: "Coffee Brewing Deep Dive",
    content: "Went down a rabbit hole on pour-over coffee ratios. 1:15 coffee-to-water, bloom for 30s, total brew time 3 minutes. Life-changing.",
    tags: ["travel","cooking"],
    sentiment_score: 0.82,
    summary: "Optimal pour-over coffee ratio and technique discovered through deep research.",
    created_at: "2026-02-17T09:00:00Z",
    updated_at: "2026-02-17T09:30:00Z"
  },
  {
    id: "74",
    title: "Open Source Contribution",
    content: "Submitted my first open source PR — a small bug fix in a D3 utility library. Merged same day. Huge confidence boost.",
    tags: ["fitness","nutrition"],
    sentiment_score: 0.95,
    summary: "First open source PR merged same day, providing a significant confidence boost.",
    created_at: "2026-02-21T15:00:00Z",
    updated_at: "2026-02-21T16:00:00Z"
  },
  {
    id: "75",
    title: "Team Retrospective Friction",
    content: "Retro got tense today. Two team members have very different communication styles and it caused friction. Need to address this directly.",
    tags: ["wellbeing","leadership"],
    sentiment_score: -0.4,
    summary: "Team retrospective exposed communication style clashes requiring direct resolution.",
    created_at: "2026-02-24T16:30:00Z",
    updated_at: "2026-02-24T17:30:00Z"
  },
  {
    id: "76",
    title: "Photography Walk",
    content: "Took the camera out for a walk downtown. Shot in manual mode the whole time. Some great geometry shots. Need to edit and sort.",
    tags: ["journaling","reading"],
    sentiment_score: 0.85,
    summary: "Downtown photography walk in full manual mode yielded strong geometric compositions.",
    created_at: "2026-02-28T14:00:00Z",
    updated_at: "2026-02-28T15:30:00Z"
  },
  {
    id: "77",
    title: "Docker Compose Setup",
    content: "Set up Docker Compose for the project with separate containers for frontend, backend, and DB. Dev environment is now fully reproducible.",
    tags: ["nodejs","databases"],
    sentiment_score: 0.82,
    summary: "Docker Compose environment with frontend, backend, and DB containers now fully reproducible.",
    created_at: "2026-03-01T10:00:00Z",
    updated_at: "2026-03-01T12:00:00Z"
  },
  {
    id: "78",
    title: "Reading: Show Your Work",
    content: "Read Austin Kleon's Show Your Work in one sitting. The idea of sharing process not just outcomes is liberating. Want to start a dev blog.",
    tags: ["fitness","hiking"],
    sentiment_score: 0.88,
    summary: "Show Your Work inspires sharing the development process publicly through a blog.",
    created_at: "2026-03-05T19:00:00Z",
    updated_at: "2026-03-05T20:00:00Z"
  },
  {
    id: "79",
    title: "Cycling Route Explored",
    content: "Found a 25km cycling loop through the greenbelt. Did it in just under an hour. Beautiful route, will become a regular weekend ride.",
    tags: ["finance","meditation"],
    sentiment_score: 0.93,
    summary: "25km greenbelt cycling loop completed in under an hour, earmarked as a regular weekend ride.",
    created_at: "2026-03-08T09:00:00Z",
    updated_at: "2026-03-08T10:00:00Z"
  },
  {
    id: "80",
    title: "Error Handling Strategy",
    content: "Standardized error responses across the API. All errors now return a consistent JSON shape with code, message, and details fields.",
    tags: ["engineering","design"],
    sentiment_score: 0.75,
    summary: "API error responses standardized into a consistent JSON shape across all endpoints.",
    created_at: "2026-03-10T10:00:00Z",
    updated_at: "2026-03-10T11:30:00Z"
  },
  {
    id: "81",
    title: "Japan Accommodation Booked",
    content: "Booked a mix of capsule hotels and ryokan stays for Japan. The ryokan in Kyoto was pricey but it felt like a must-do.",
    tags: ["journaling","habits"],
    sentiment_score: 0.8,
    summary: "Japan accommodation booked — capsule hotels plus a splurge ryokan stay in Kyoto.",
    created_at: "2026-03-13T21:00:00Z",
    updated_at: "2026-03-13T21:30:00Z"
  },
  {
    id: "82",
    title: "Music: Recording Setup",
    content: "Picked up a Focusrite Scarlett Solo. Recorded a rough guitar demo. The tone is way better than using the laptop mic.",
    tags: ["reading","habits"],
    sentiment_score: 0.85,
    summary: "Focusrite Scarlett Solo setup dramatically improved home guitar recording quality.",
    created_at: "2026-03-15T20:00:00Z",
    updated_at: "2026-03-15T21:00:00Z"
  },
  {
    id: "83",
    title: "End-to-End Testing Plan",
    content: "Outlined an E2E test plan using Playwright. Will cover the critical paths: create note, analyze, view graph. Aiming for 80% critical path coverage.",
    tags: ["nodejs","performance"],
    sentiment_score: 0.65,
    summary: "Playwright E2E test plan targets critical note creation, analysis, and graph view paths.",
    created_at: "2026-03-17T14:00:00Z",
    updated_at: "2026-03-17T15:00:00Z"
  },
  {
    id: "84",
    title: "Writing: Technical Post Published",
    content: "Published my first technical blog post on force-directed graphs. Shared on Twitter and got 40 likes. Small but feels meaningful.",
    tags: ["vue","typescript"],
    sentiment_score: 0.9,
    summary: "First technical blog post on force-directed graphs published and received warmly.",
    created_at: "2026-03-19T18:00:00Z",
    updated_at: "2026-03-19T18:30:00Z"
  },
  {
    id: "85",
    title: "Cooking: Pasta from Scratch",
    content: "Made fresh tagliatelle by hand for the first time. Rolled it way too thick on the first pass but the second attempt was perfect.",
    tags: ["cooking","nutrition"],
    sentiment_score: 0.88,
    summary: "Second attempt at handmade tagliatelle achieved the right thickness after an initial failure.",
    created_at: "2026-03-21T18:00:00Z",
    updated_at: "2026-03-21T20:00:00Z"
  },
  {
    id: "86",
    title: "Research: LLM Context Windows",
    content: "Read several papers on context window management in LLMs. RAG vs long context is still an open question depending on use case.",
    tags: ["travel","learning"],
    sentiment_score: 0.68,
    summary: "LLM context window research reveals RAG vs long-context as a use-case-dependent trade-off.",
    created_at: "2026-01-29T15:00:00Z",
    updated_at: "2026-01-29T17:00:00Z"
  },
  {
    id: "87",
    title: "Finance: Investment Review",
    content: "Reviewed portfolio performance. Down slightly YTD but long-term holdings are solid. Staying the course, not panic selling.",
    tags: ["wellbeing","reflection"],
    sentiment_score: 0.35,
    summary: "Portfolio down slightly YTD but long-term position is solid; staying the course.",
    created_at: "2026-02-23T19:00:00Z",
    updated_at: "2026-02-23T19:45:00Z"
  },
  {
    id: "88",
    title: "Design: Dark Mode Polish",
    content: "Spent an afternoon polishing the dark mode. Fixed inconsistent grays, improved contrast ratios, and unified border colors throughout.",
    tags: ["d3","engineering"],
    sentiment_score: 0.78,
    summary: "Dark mode polished with consistent grays, improved contrast, and unified border colors.",
    created_at: "2026-03-06T15:00:00Z",
    updated_at: "2026-03-06T17:00:00Z"
  },
  {
    id: "89",
    title: "Morning Pages Experiment",
    content: "Tried Julia Cameron's morning pages — 3 pages of stream-of-consciousness writing first thing. Felt weird but unlocked some stuck ideas.",
    tags: ["design","creativity"],
    sentiment_score: 0.6,
    summary: "Morning pages experiment unlocked creative blocks through stream-of-consciousness writing.",
    created_at: "2026-03-11T07:30:00Z",
    updated_at: "2026-03-11T08:15:00Z"
  },
  {
    id: "90",
    title: "Gym Plateau",
    content: "Hit a wall on bench press. Same weight for three weeks. Coach says I need to deload and come back fresher. Trusting the process.",
    tags: ["fitness","hiking"],
    sentiment_score: -0.2,
    summary: "Bench press plateau addressed with a planned deload week on coach's advice.",
    created_at: "2026-03-14T18:30:00Z",
    updated_at: "2026-03-14T19:00:00Z"
  },
  {
    id: "91",
    title: "Project Documentation Draft",
    content: "Started the project README and API docs. Good documentation is the part I always procrastinate on. Forcing myself to do it now.",
    tags: ["vue","design"],
    sentiment_score: 0.45,
    summary: "Project README and API documentation drafted early to avoid last-minute procrastination.",
    created_at: "2026-03-18T14:00:00Z",
    updated_at: "2026-03-18T16:00:00Z"
  },
  {
    id: "92",
    title: "Database Indexing Notes",
    content: "Added composite indexes on notes table for (user_id, created_at) and (user_id, updated_at). Query time dropped from 120ms to 4ms.",
    tags: ["design","writing"],
    sentiment_score: 0.88,
    summary: "Composite indexes on notes table reduced query time from 120ms to 4ms.",
    created_at: "2026-03-20T11:00:00Z",
    updated_at: "2026-03-20T12:00:00Z"
  },
  {
    id: "93",
    title: "Productivity: Time Blocking",
    content: "Started time blocking my calendar with 90-minute deep work sessions. Turning off notifications during blocks. Focus quality is noticeably better.",
    tags: ["travel","writing"],
    sentiment_score: 0.82,
    summary: "90-minute calendar time blocks with notifications off significantly improved focus quality.",
    created_at: "2026-02-05T08:00:00Z",
    updated_at: "2026-02-05T08:30:00Z"
  },
  {
    id: "94",
    title: "Travel: Packing List",
    content: "Building a Japan packing list. Going carry-on only. Key items: portable charger, IC card, pocket wifi, merino wool layers.",
    tags: ["reading","habits"],
    sentiment_score: 0.72,
    summary: "Carry-on only Japan packing list built around merino layers, IC card, and pocket wifi.",
    created_at: "2026-03-22T19:00:00Z",
    updated_at: "2026-03-22T20:00:00Z"
  },
  {
    id: "95",
    title: "Reading: A Philosophy of Software Design",
    content: "Excellent book on managing complexity in software. The idea of deep modules — simple interfaces hiding complex implementation — is central to good design.",
    tags: ["reading","writing"],
    sentiment_score: 0.85,
    summary: "Deep modules with simple interfaces identified as the core principle of managing software complexity.",
    created_at: "2026-03-02T20:00:00Z",
    updated_at: "2026-03-02T21:30:00Z"
  },
  {
    id: "96",
    title: "Music: Song Finished",
    content: "Completed a full instrumental track. Guitar, bass, and a simple drum loop. Four minutes. Really happy with how the bridge turned out.",
    tags: ["writing","creativity"],
    sentiment_score: 0.96,
    summary: "First complete instrumental track finished with guitar, bass, and drums.",
    created_at: "2026-03-23T21:00:00Z",
    updated_at: "2026-03-23T22:30:00Z"
  },
  {
    id: "97",
    title: "Research: Graph Algorithms",
    content: "Studied BFS, DFS, and Dijkstra's algorithm. Thinking about how to implement shortest path between notes for the graph view as a future feature.",
    tags: ["engineering","learning"],
    sentiment_score: 0.75,
    summary: "Graph algorithm study sparked idea for note shortest-path feature in future graph view.",
    created_at: "2026-03-16T19:00:00Z",
    updated_at: "2026-03-16T21:00:00Z"
  },
  {
    id: "98",
    title: "Cooking: Meal Prep Sunday",
    content: "Prepped the whole week's lunches in 90 minutes. Grain bowls with roasted veggies and tahini. Saves so much time and money mid-week.",
    tags: ["cooking","nutrition"],
    sentiment_score: 0.87,
    summary: "90-minute Sunday meal prep for the week saves mid-week time and money.",
    created_at: "2026-03-08T15:00:00Z",
    updated_at: "2026-03-08T16:30:00Z"
  },
  {
    id: "99",
    title: "Self-Compassion Note",
    content: "Reminder to myself: perfection is not the goal. Shipping something imperfect beats polishing forever. Progress over perfection.",
    tags: ["nodejs","engineering"],
    sentiment_score: 0.7,
    summary: "Personal reminder that shipping imperfect work beats endless polishing.",
    created_at: "2026-03-24T08:00:00Z",
    updated_at: "2026-03-24T08:15:00Z"
  },
  {
    id: "100",
    title: "Project Retrospective",
    content: "Looking back at this whole project. Learned more than any course before it. D3, Vue, Gemini API, team collaboration — it all came together.",
    tags: ["journaling","engineering"],
    sentiment_score: 0.95,
    summary: "Final project retrospective reflects on significant growth across D3, Vue, APIs, and teamwork.",
    created_at: "2026-03-24T17:00:00Z",
    updated_at: "2026-03-24T17:30:00Z"
  },

  // ── Orphan nodes (unique tags, no connections) ─────────────────────────────
  {
    id: "101",
    title: "Beekeeping Notes",
    content: "Started reading about urban beekeeping. Fascinating hobby but requires a lot of equipment upfront.",
    tags: ["beekeeping"],
    sentiment_score: 0.5,
    summary: "Initial research into urban beekeeping as a potential hobby.",
    created_at: "2026-02-10T10:00:00Z",
    updated_at: "2026-02-10T10:30:00Z"
  },
  {
    id: "102",
    title: "Sourdough Hydration Experiments",
    content: "Testing 80% vs 90% hydration doughs. The higher hydration creates a more open crumb but is harder to shape.",
    tags: ["sourdough"],
    sentiment_score: 0.6,
    summary: "Experimenting with different hydration levels in sourdough bread.",
    created_at: "2026-02-14T09:00:00Z",
    updated_at: "2026-02-14T11:00:00Z"
  },
  {
    id: "103",
    title: "Telescope Calibration",
    content: "Spent the evening calibrating the new refractor telescope. Jupiter's moons were clearly visible.",
    tags: ["astronomy"],
    sentiment_score: 0.85,
    summary: "Calibrated new telescope and observed Jupiter's moons.",
    created_at: "2026-02-18T22:00:00Z",
    updated_at: "2026-02-18T23:30:00Z"
  },
  {
    id: "104",
    title: "Pottery Wheel Session",
    content: "First time on a pottery wheel. Centering the clay is much harder than it looks. Ended up with a lopsided bowl.",
    tags: ["pottery"],
    sentiment_score: 0.4,
    summary: "First pottery wheel session — centering clay proved more difficult than expected.",
    created_at: "2026-02-22T14:00:00Z",
    updated_at: "2026-02-22T15:30:00Z"
  },
  {
    id: "105",
    title: "Foraging Walk",
    content: "Went on a guided foraging walk. Identified wild garlic, nettles and wood sorrel. Need to buy a field guide.",
    tags: ["foraging"],
    sentiment_score: 0.7,
    summary: "Guided foraging walk identified several edible wild plants.",
    created_at: "2026-03-01T11:00:00Z",
    updated_at: "2026-03-01T12:00:00Z"
  },
  {
    id: "106",
    title: "Origami Cranes",
    content: "Folded 20 paper cranes today. Trying to reach 1000 for the traditional wish. Patience is key.",
    tags: ["origami"],
    sentiment_score: 0.65,
    summary: "Progress toward folding 1000 origami cranes — patience is essential.",
    created_at: "2026-03-05T16:00:00Z",
    updated_at: "2026-03-05T18:00:00Z"
  },
  {
    id: "107",
    title: "Lockpicking Practice",
    content: "Been learning lockpicking as a hobby. Picked my first padlock today after weeks of practice. Very satisfying.",
    tags: ["lockpicking"],
    sentiment_score: 0.8,
    summary: "Successfully picked first padlock after weeks of lockpicking practice.",
    created_at: "2026-03-08T19:00:00Z",
    updated_at: "2026-03-08T20:00:00Z"
  },
  {
    id: "108",
    title: "Candle Making Batch",
    content: "Made a batch of soy candles with lavender and cedarwood scents. The pour temperature matters a lot.",
    tags: ["candlemaking"],
    sentiment_score: 0.75,
    summary: "First soy candle batch with lavender and cedarwood — pour temperature is critical.",
    created_at: "2026-03-12T13:00:00Z",
    updated_at: "2026-03-12T14:30:00Z"
  },
  {
    id: "109",
    title: "Archery Range Visit",
    content: "First time at an archery range. Shot 30 arrows, hit the target maybe 10 times. Long way to go.",
    tags: ["archery"],
    sentiment_score: 0.5,
    summary: "First archery range visit — accuracy needs significant improvement.",
    created_at: "2026-03-16T10:00:00Z",
    updated_at: "2026-03-16T11:30:00Z"
  },
  {
    id: "110",
    title: "Mushroom Cultivation Log",
    content: "Set up a first oyster mushroom grow kit. Keeping humidity high and waiting for pinning. Exciting experiment.",
    tags: ["mycology"],
    sentiment_score: 0.7,
    summary: "Started oyster mushroom cultivation — monitoring humidity for pinning.",
    created_at: "2026-03-20T09:00:00Z",
    updated_at: "2026-03-20T10:00:00Z"
  }
]
