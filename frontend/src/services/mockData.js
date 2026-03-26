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
,
  {
    id: "111",
    title: "Exploring Microservices Architecture",
    content: "Deep dive into microservices today. The separation of concerns is powerful but adds complexity. Need to understand service discovery and load balancing better.",
    tags: ["engineering","learning"],
    sentiment_score: 0.46,
    summary: "Researched microservices benefits and challenges including service discovery.",
    created_at: "2025-01-02T08:00:00Z",
    updated_at: "2025-01-02T09:00:00Z"
  },
  {
    id: "112",
    title: "Node.js Event Loop Deep Dive",
    content: "Finally understood the Node.js event loop properly. The libuv thread pool is separate from the main event loop. This changes how I think about async operations.",
    tags: ["engineering","nodejs"],
    sentiment_score: 0.66,
    summary: "Gained clarity on Node.js event loop and libuv thread pool mechanics.",
    created_at: "2025-01-04T12:00:00Z",
    updated_at: "2025-01-04T13:00:00Z"
  },
  {
    id: "113",
    title: "TypeScript Generics Practice",
    content: "Spent time practicing TypeScript generics. They're complex but make code much more reusable. Conditional types are particularly mind-bending.",
    tags: ["engineering","typescript"],
    sentiment_score: 0.63,
    summary: "Practiced TypeScript generics and conditional types for reusable code.",
    created_at: "2025-01-05T12:00:00Z",
    updated_at: "2025-01-05T13:00:00Z"
  },
  {
    id: "114",
    title: "Unit Testing Strategy",
    content: "Revisiting our unit testing approach. We have too many integration tests and not enough unit tests. Need to shift the testing pyramid.",
    tags: ["engineering","testing"],
    sentiment_score: 0.45,
    summary: "Evaluated testing strategy, identified need to increase unit test coverage.",
    created_at: "2025-01-07T15:00:00Z",
    updated_at: "2025-01-07T16:00:00Z"
  },
  {
    id: "115",
    title: "Docker Multi-Stage Builds",
    content: "Learned about multi-stage Docker builds today. Production images are now 60% smaller. The build cache optimization is a game changer.",
    tags: ["engineering","docker"],
    sentiment_score: 0.77,
    summary: "Implemented multi-stage Docker builds reducing image size by 60%.",
    created_at: "2025-01-10T12:00:00Z",
    updated_at: "2025-01-10T13:00:00Z"
  },
  {
    id: "116",
    title: "API Rate Limiting Implementation",
    content: "Implemented rate limiting on our API endpoints. Used a token bucket algorithm. Testing edge cases with concurrent requests was tricky.",
    tags: ["engineering"],
    sentiment_score: 0.62,
    summary: "Implemented token bucket rate limiting for API endpoints.",
    created_at: "2025-01-11T17:00:00Z",
    updated_at: "2025-01-11T18:00:00Z"
  },
  {
    id: "117",
    title: "REST vs GraphQL Decision",
    content: "Team discussion about switching parts of our API to GraphQL. REST is simpler but GraphQL solves our over-fetching problem. Still undecided.",
    tags: ["engineering","design"],
    sentiment_score: 0.32,
    summary: "Team debated REST vs GraphQL trade-offs for API architecture.",
    created_at: "2025-01-14T08:00:00Z",
    updated_at: "2025-01-14T09:00:00Z"
  },
  {
    id: "118",
    title: "Vue 3 Composition API Refactor",
    content: "Refactoring old Options API code to Composition API. The code is much cleaner. Composables are like React hooks but feel more natural to me.",
    tags: ["engineering","vue"],
    sentiment_score: 0.71,
    summary: "Refactored Vue components from Options to Composition API using composables.",
    created_at: "2025-01-15T16:00:00Z",
    updated_at: "2025-01-15T17:00:00Z"
  },
  {
    id: "119",
    title: "Burnout Warning Signs",
    content: "Noticing early burnout signs. Irritable, tired, losing interest in things I usually enjoy. Need to slow down and recover before it gets worse.",
    tags: ["wellbeing"],
    sentiment_score: -0.69,
    summary: "Identified early burnout signs and need to prioritize recovery.",
    created_at: "2025-01-18T09:00:00Z",
    updated_at: "2025-01-18T10:00:00Z"
  },
  {
    id: "120",
    title: "Work-Life Balance Check-In",
    content: "Took stock of my work-life balance this week. I've been putting in too many late nights. Making a rule to stop working at 7pm.",
    tags: ["wellbeing","reflection"],
    sentiment_score: -0.18,
    summary: "Assessed work-life balance and set boundaries around evening work hours.",
    created_at: "2025-01-20T15:00:00Z",
    updated_at: "2025-01-20T16:00:00Z"
  },
  {
    id: "121",
    title: "Starting Meditation Practice",
    content: "Day 5 of daily meditation. Noticing a real difference in how I respond to stressful situations. 10 minutes in the morning is all it takes.",
    tags: ["wellbeing","meditation"],
    sentiment_score: 0.61,
    summary: "Five days into meditation practice, noticing improved stress responses.",
    created_at: "2025-01-22T15:00:00Z",
    updated_at: "2025-01-22T16:00:00Z"
  },
  {
    id: "122",
    title: "Mental Health and Exercise Link",
    content: "The research is clear - exercise directly improves mental health. Had a bad day, went for a run, felt completely different after. Need to make this a non-negotiable.",
    tags: ["wellbeing","fitness"],
    sentiment_score: 0.43,
    summary: "Experienced firsthand how exercise transformed a difficult mental health day.",
    created_at: "2025-01-24T11:00:00Z",
    updated_at: "2025-01-24T12:00:00Z"
  },
  {
    id: "123",
    title: "Difficult Conversation at Work",
    content: "Had a hard conversation with my manager about workload. It went better than expected. Being direct was the right call. Feeling lighter now.",
    tags: ["wellbeing"],
    sentiment_score: 0.39,
    summary: "Had productive direct conversation with manager about workload concerns.",
    created_at: "2025-02-02T10:00:00Z",
    updated_at: "2025-02-02T11:00:00Z"
  },
  {
    id: "124",
    title: "Year in Review — Gratitude",
    content: "Looking back at everything this year. Despite the hard patches, there's so much to be grateful for. Growth, friendships, skills learned. A good year overall.",
    tags: ["wellbeing","journaling"],
    sentiment_score: 0.84,
    summary: "Reflected on the year with gratitude, noting significant personal growth.",
    created_at: "2025-02-04T18:00:00Z",
    updated_at: "2025-02-04T19:00:00Z"
  },
  {
    id: "125",
    title: "Thinking Fast and Slow — Notes",
    content: "Kahneman's System 1 vs System 2 thinking is reshaping how I make decisions. I catch myself defaulting to fast thinking when I should slow down.",
    tags: ["reading"],
    sentiment_score: 0.78,
    summary: "Applied Kahneman's dual-process theory to improve decision-making awareness.",
    created_at: "2025-02-06T08:00:00Z",
    updated_at: "2025-02-06T09:00:00Z"
  },
  {
    id: "126",
    title: "The Pragmatic Programmer Notes",
    content: "Re-reading The Pragmatic Programmer. The orthogonality principle is something I've been violating. Components should be independent and have a single responsibility.",
    tags: ["reading","learning"],
    sentiment_score: 0.68,
    summary: "Revisited orthogonality principle from The Pragmatic Programmer.",
    created_at: "2025-02-08T11:00:00Z",
    updated_at: "2025-02-08T12:00:00Z"
  },
  {
    id: "127",
    title: "Essentialism Book Summary",
    content: "Essentialism is about doing less but better. The key question: what is the most important thing I can do right now? Learning to say no more deliberately.",
    tags: ["reading"],
    sentiment_score: 0.57,
    summary: "Essentialism taught the importance of selective focus and deliberate 'no'.",
    created_at: "2025-02-09T12:00:00Z",
    updated_at: "2025-02-09T13:00:00Z"
  },
  {
    id: "128",
    title: "Deep Work — Key Takeaways",
    content: "Cal Newport's Deep Work is exactly what I needed. Scheduling deep work blocks in the morning before checking email. Already seeing a difference.",
    tags: ["reading","productivity"],
    sentiment_score: 0.87,
    summary: "Implementing deep work blocks in the morning based on Cal Newport's principles.",
    created_at: "2025-02-12T19:00:00Z",
    updated_at: "2025-02-12T20:00:00Z"
  },
  {
    id: "129",
    title: "Articles: Distributed Systems",
    content: "Read several articles on distributed systems consistency models. CAP theorem is less a theorem and more a design trade-off. Choosing between availability and consistency.",
    tags: ["reading"],
    sentiment_score: 0.42,
    summary: "Researched distributed systems consistency models and CAP theorem implications.",
    created_at: "2025-02-14T18:00:00Z",
    updated_at: "2025-02-14T19:00:00Z"
  },
  {
    id: "130",
    title: "Pinia vs Vuex Comparison",
    content: "Migrating from Vuex to Pinia. Pinia is so much simpler — no mutations, just actions. The DevTools integration is also better.",
    tags: ["vue","engineering"],
    sentiment_score: 0.79,
    summary: "Migrated state management from Vuex to Pinia, finding it significantly simpler.",
    created_at: "2025-02-16T08:00:00Z",
    updated_at: "2025-02-16T09:00:00Z"
  },
  {
    id: "131",
    title: "Vue Router Guards Research",
    content: "Implementing auth guards in Vue Router. The beforeEach hook is powerful but easy to mess up. Need to handle async checks correctly to avoid race conditions.",
    tags: ["vue"],
    sentiment_score: 0.39,
    summary: "Researched Vue Router navigation guards for authentication flow.",
    created_at: "2025-02-18T14:00:00Z",
    updated_at: "2025-02-18T15:00:00Z"
  },
  {
    id: "132",
    title: "Component Library Planning",
    content: "Planning our internal component library. Deciding between building from scratch vs extending Shadcn/Vue. Building is slower but gives more control.",
    tags: ["vue","design"],
    sentiment_score: 0.58,
    summary: "Evaluated component library approach: custom build vs extending existing library.",
    created_at: "2025-02-19T15:00:00Z",
    updated_at: "2025-02-19T16:00:00Z"
  },
  {
    id: "133",
    title: "New Running Program Started",
    content: "Started a structured 10K training program. First week is easy — just building the habit. Running 3x per week feels manageable alongside everything else.",
    tags: ["fitness"],
    sentiment_score: 0.73,
    summary: "Began structured 10K training program with 3x weekly runs.",
    created_at: "2025-02-22T11:00:00Z",
    updated_at: "2025-02-22T12:00:00Z"
  },
  {
    id: "134",
    title: "Rest Day Is Important Too",
    content: "Learning that rest days are as important as training days. Overtraining is a real risk. My body needs time to adapt and recover.",
    tags: ["fitness","wellbeing"],
    sentiment_score: 0.54,
    summary: "Recognized importance of rest days in training cycle to prevent overtraining.",
    created_at: "2025-02-23T16:00:00Z",
    updated_at: "2025-02-23T17:00:00Z"
  },
  {
    id: "135",
    title: "Pre-Workout Nutrition Experiment",
    content: "Trying different pre-workout meals. Banana + peanut butter 1 hour before is working well. Energy is consistent without the crash.",
    tags: ["fitness","nutrition"],
    sentiment_score: 0.59,
    summary: "Found banana and peanut butter optimal for pre-workout energy.",
    created_at: "2025-03-02T10:00:00Z",
    updated_at: "2025-03-02T11:00:00Z"
  },
  {
    id: "136",
    title: "Personal Best — 5K Time",
    content: "New 5K personal best today! 24:32. Months of consistent training paying off. The key was building base mileage slowly before adding speed work.",
    tags: ["fitness"],
    sentiment_score: 0.9,
    summary: "Achieved new 5K personal best of 24:32 through consistent base training.",
    created_at: "2025-03-03T11:00:00Z",
    updated_at: "2025-03-03T12:00:00Z"
  },
  {
    id: "137",
    title: "Trail Running Discovery",
    content: "Tried trail running for the first time. Much harder than road running but infinitely more enjoyable. The connection to nature makes it feel less like exercise.",
    tags: ["fitness","hiking"],
    sentiment_score: 0.73,
    summary: "Discovered trail running as more enjoyable and connected to nature.",
    created_at: "2025-03-05T11:00:00Z",
    updated_at: "2025-03-05T12:00:00Z"
  },
  {
    id: "138",
    title: "Design Tokens System",
    content: "Implemented a design tokens system for our app. Colors, spacing, and typography are all tokenized now. Theme switching is trivial.",
    tags: ["design"],
    sentiment_score: 0.78,
    summary: "Implemented design tokens system enabling easy theme switching.",
    created_at: "2025-03-07T10:00:00Z",
    updated_at: "2025-03-07T11:00:00Z"
  },
  {
    id: "139",
    title: "Responsive Layout Patterns",
    content: "Revisiting responsive design patterns. CSS Grid with named areas is so clean. The old float-based layouts feel prehistoric now.",
    tags: ["design","vue"],
    sentiment_score: 0.66,
    summary: "Modernized responsive layout approach using CSS Grid named areas.",
    created_at: "2025-03-09T14:00:00Z",
    updated_at: "2025-03-09T15:00:00Z"
  },
  {
    id: "140",
    title: "User Testing Session Notes",
    content: "Ran user testing on our onboarding flow. Three out of five users struggled with step 3. The copy is confusing. Need to redesign.",
    tags: ["design"],
    sentiment_score: -0.23,
    summary: "User testing revealed step 3 of onboarding confuses 60% of users.",
    created_at: "2025-03-11T12:00:00Z",
    updated_at: "2025-03-11T13:00:00Z"
  },
  {
    id: "141",
    title: "Typography Fundamentals",
    content: "Deep dive into typography. Line height, letter spacing, and font pairing make such a huge difference. Going through Practical Typography by Matthew Butterick.",
    tags: ["design","learning"],
    sentiment_score: 0.6,
    summary: "Studied typography fundamentals including line height, spacing, and font pairing.",
    created_at: "2025-03-13T18:00:00Z",
    updated_at: "2025-03-13T19:00:00Z"
  },
  {
    id: "142",
    title: "Morning Pages — Week 3",
    content: "Three weeks of morning pages. The mental clarity it brings is incredible. I process a lot of background anxiety by just writing it out.",
    tags: ["journaling"],
    sentiment_score: 0.71,
    summary: "Three weeks of morning pages delivering mental clarity and anxiety processing.",
    created_at: "2025-03-16T08:00:00Z",
    updated_at: "2025-03-16T09:00:00Z"
  },
  {
    id: "143",
    title: "Quarterly Review — Q2",
    content: "Q2 review done. Hit most goals, missed two. The fitness goal slipped because I wasn't tracking consistently. Q3 needs a better tracking system.",
    tags: ["journaling","reflection"],
    sentiment_score: 0.3,
    summary: "Q2 review: achieved most goals, fitness goal missed due to inconsistent tracking.",
    created_at: "2025-03-17T11:00:00Z",
    updated_at: "2025-03-17T12:00:00Z"
  },
  {
    id: "144",
    title: "What Am I Avoiding?",
    content: "Honest journaling question today: what am I avoiding? Turns out — a difficult code review feedback I haven't fully processed and a conversation I keep putting off.",
    tags: ["journaling"],
    sentiment_score: -0.45,
    summary: "Identified avoided tasks: unprocessed code review feedback and delayed conversation.",
    created_at: "2025-03-19T15:00:00Z",
    updated_at: "2025-03-19T16:00:00Z"
  },
  {
    id: "145",
    title: "Celebrating Small Wins",
    content: "Trying to be better at celebrating small wins. Shipped a feature today, got positive feedback, and immediately moved to the next thing. Paused to acknowledge it.",
    tags: ["journaling","wellbeing"],
    sentiment_score: 0.76,
    summary: "Practiced acknowledging small wins rather than immediately moving to next tasks.",
    created_at: "2025-03-21T12:00:00Z",
    updated_at: "2025-03-21T13:00:00Z"
  },
  {
    id: "146",
    title: "Express Middleware Deep Dive",
    content: "Understanding the Express middleware stack better. Error handling middleware must have 4 parameters. Request lifecycle is clearer now.",
    tags: ["nodejs"],
    sentiment_score: 0.44,
    summary: "Deepened understanding of Express middleware stack and error handling patterns.",
    created_at: "2025-03-23T09:00:00Z",
    updated_at: "2025-03-23T10:00:00Z"
  },
  {
    id: "147",
    title: "Database Connection Pooling",
    content: "Implemented connection pooling for PostgreSQL. Was creating a new connection per request — rookie mistake. Pool of 10 connections handles our load fine.",
    tags: ["nodejs","engineering"],
    sentiment_score: 0.6,
    summary: "Fixed connection pooling implementation reducing database connection overhead.",
    created_at: "2025-04-01T15:00:00Z",
    updated_at: "2025-04-01T16:00:00Z"
  },
  {
    id: "148",
    title: "WebSockets First Attempt",
    content: "First time using WebSockets in Node. The real-time updates feel like magic after years of polling. Socket.io abstracts away the complexity nicely.",
    tags: ["nodejs"],
    sentiment_score: 0.87,
    summary: "Implemented real-time WebSocket communication using Socket.io.",
    created_at: "2025-04-04T11:00:00Z",
    updated_at: "2025-04-04T12:00:00Z"
  },
  {
    id: "149",
    title: "D3 Scales and Axes",
    content: "Getting more comfortable with D3 scales. Linear, log, and ordinal scales each have their place. Axes are built from scales — that was the mental model I was missing.",
    tags: ["d3"],
    sentiment_score: 0.51,
    summary: "Developed clearer mental model of D3 scales and their relationship to axes.",
    created_at: "2025-04-06T15:00:00Z",
    updated_at: "2025-04-06T16:00:00Z"
  },
  {
    id: "150",
    title: "Interactive D3 Brushing",
    content: "Implemented D3 brushing for range selection. The event system is low level but gives total control. Users can now select date ranges directly on the chart.",
    tags: ["d3","engineering"],
    sentiment_score: 0.79,
    summary: "Implemented D3 brush interaction for interactive date range selection.",
    created_at: "2025-04-07T13:00:00Z",
    updated_at: "2025-04-07T14:00:00Z"
  },
  {
    id: "151",
    title: "SVG vs Canvas for Data Viz",
    content: "Research on SVG vs Canvas rendering. SVG is DOM-based and interactive but slow at scale. Canvas is fast but requires manual hit testing. Going with SVG for now.",
    tags: ["d3"],
    sentiment_score: 0.47,
    summary: "Evaluated SVG vs Canvas trade-offs, choosing SVG for interactive graph visualization.",
    created_at: "2025-04-09T12:00:00Z",
    updated_at: "2025-04-09T13:00:00Z"
  },
  {
    id: "152",
    title: "Portugal Trip Planning",
    content: "Starting to plan a trip to Portugal. Lisbon and Porto both look incredible. Late September seems like the ideal time — crowds thin out but weather is still great.",
    tags: ["travel"],
    sentiment_score: 0.69,
    summary: "Began planning Portugal trip targeting late September for Lisbon and Porto.",
    created_at: "2025-04-12T12:00:00Z",
    updated_at: "2025-04-12T13:00:00Z"
  },
  {
    id: "153",
    title: "Food Research: Lisbon",
    content: "Researching food in Lisbon. Pastéis de nata, bacalhau, and bifanas are non-negotiable. Found a food tour that hits all the traditional spots.",
    tags: ["travel","cooking"],
    sentiment_score: 0.83,
    summary: "Researched Lisbon food scene and booked a traditional food tour.",
    created_at: "2025-04-13T19:00:00Z",
    updated_at: "2025-04-13T20:00:00Z"
  },
  {
    id: "154",
    title: "Solo Travel Reflections",
    content: "Thinking about why solo travel appeals to me. Full control of the itinerary, no compromises. The unexpected conversations with strangers are often the highlight.",
    tags: ["travel"],
    sentiment_score: 0.79,
    summary: "Reflected on appeal of solo travel: autonomy and unexpected human connections.",
    created_at: "2025-04-16T12:00:00Z",
    updated_at: "2025-04-16T13:00:00Z"
  },
  {
    id: "155",
    title: "Sourdough Starter — Day 7",
    content: "Sourdough starter finally active after a week. It's bubbling and has that sour smell. First bake tomorrow. Expecting a dense disaster but excited to try.",
    tags: ["cooking"],
    sentiment_score: 0.62,
    summary: "Sourdough starter became active after 7 days, ready for first bake.",
    created_at: "2025-04-18T15:00:00Z",
    updated_at: "2025-04-18T16:00:00Z"
  },
  {
    id: "156",
    title: "Meal Prep Sunday System",
    content: "Perfected my Sunday meal prep routine. 2 hours, 5 meals for the week. Grains, proteins, and vegetables prepped separately for flexibility.",
    tags: ["cooking","nutrition"],
    sentiment_score: 0.75,
    summary: "Established efficient 2-hour Sunday meal prep system for the week.",
    created_at: "2025-04-19T08:00:00Z",
    updated_at: "2025-04-19T09:00:00Z"
  },
  {
    id: "157",
    title: "Learning Knife Skills",
    content: "Watching knife skills videos and actually practicing. The difference between a sharp and dull knife is enormous. Julienne cuts are coming along.",
    tags: ["cooking"],
    sentiment_score: 0.64,
    summary: "Actively practicing knife skills, noting major difference with properly sharpened knife.",
    created_at: "2025-04-22T16:00:00Z",
    updated_at: "2025-04-22T17:00:00Z"
  },
  {
    id: "158",
    title: "First Attempt: Homemade Pasta",
    content: "Made pasta from scratch today. Just flour and eggs. The kneading is meditative. Fresh pasta taste is incomparable to dried — worth the effort.",
    tags: ["cooking"],
    sentiment_score: 0.89,
    summary: "Made fresh pasta from scratch, finding kneading meditative and result superior.",
    created_at: "2025-04-24T10:00:00Z",
    updated_at: "2025-04-24T11:00:00Z"
  },
  {
    id: "159",
    title: "Annual Budget Review",
    content: "Reviewing this year's budget against actual spending. Biggest overspend: eating out (2x budget). Biggest underspend: entertainment. Need better food habit tracking.",
    tags: ["finance"],
    sentiment_score: -0.24,
    summary: "Annual budget review revealed 2x overspend on eating out vs entertainment savings.",
    created_at: "2025-05-01T19:00:00Z",
    updated_at: "2025-05-01T20:00:00Z"
  },
  {
    id: "160",
    title: "Emergency Fund Goal Hit",
    content: "Hit my 6-month emergency fund target today. Took 18 months of consistent saving. The peace of mind it brings is worth every sacrifice.",
    tags: ["finance","budgeting"],
    sentiment_score: 0.82,
    summary: "Achieved 6-month emergency fund goal after 18 months of consistent saving.",
    created_at: "2025-05-04T10:00:00Z",
    updated_at: "2025-05-04T11:00:00Z"
  },
  {
    id: "161",
    title: "Investment Portfolio Review",
    content: "Quarterly portfolio check. Index funds are performing as expected — boring but consistent. Resisting the urge to tinker. Staying the course.",
    tags: ["finance"],
    sentiment_score: 0.48,
    summary: "Quarterly portfolio review confirmed index fund strategy on track, avoiding tinkering.",
    created_at: "2025-05-06T19:00:00Z",
    updated_at: "2025-05-06T20:00:00Z"
  },
  {
    id: "162",
    title: "First Draft Complete",
    content: "Finished the first draft of the technical article I've been working on for two weeks. It's rough but it exists. Editing is easier than creating from nothing.",
    tags: ["writing"],
    sentiment_score: 0.73,
    summary: "Completed first draft of technical article, ready for revision phase.",
    created_at: "2025-05-08T11:00:00Z",
    updated_at: "2025-05-08T12:00:00Z"
  },
  {
    id: "163",
    title: "Writing Process Reflection",
    content: "Thinking about my writing process. I write best in the morning before other tasks fill my head. Need to protect that time more jealously.",
    tags: ["writing","learning"],
    sentiment_score: 0.51,
    summary: "Identified morning as optimal writing time and need to protect it.",
    created_at: "2025-05-10T16:00:00Z",
    updated_at: "2025-05-10T17:00:00Z"
  },
  {
    id: "164",
    title: "Published First Blog Post",
    content: "Published the technical article. Posted on dev.to and LinkedIn. Better reception than expected — 200 views on day one. The feedback is encouraging.",
    tags: ["writing"],
    sentiment_score: 0.99,
    summary: "Published first technical article, received 200 views and positive feedback on day one.",
    created_at: "2025-05-11T16:00:00Z",
    updated_at: "2025-05-11T17:00:00Z"
  },
  {
    id: "165",
    title: "First Time Leading a Sprint",
    content: "Led my first full sprint as unofficial team lead. Keeping everyone unblocked is a different skill than writing code. Enjoyed it more than expected.",
    tags: ["leadership"],
    sentiment_score: 0.69,
    summary: "Led first sprint as team lead, discovering enjoyment of the facilitation role.",
    created_at: "2025-05-13T15:00:00Z",
    updated_at: "2025-05-13T16:00:00Z"
  },
  {
    id: "166",
    title: "Giving Constructive Feedback",
    content: "Had to give difficult feedback to a colleague today. Used the SBI model (Situation-Behavior-Impact). It was uncomfortable but the conversation was productive.",
    tags: ["leadership","wellbeing"],
    sentiment_score: 0.35,
    summary: "Delivered constructive feedback using SBI model, resulting in productive dialogue.",
    created_at: "2025-05-15T18:00:00Z",
    updated_at: "2025-05-15T19:00:00Z"
  },
  {
    id: "167",
    title: "Spaced Repetition System Setup",
    content: "Set up Anki for spaced repetition. Adding cards for programming concepts, vocabulary, and ideas from books. The forgetting curve is real.",
    tags: ["learning"],
    sentiment_score: 0.53,
    summary: "Configured Anki spaced repetition system for programming concepts and book insights.",
    created_at: "2025-05-18T11:00:00Z",
    updated_at: "2025-05-18T12:00:00Z"
  },
  {
    id: "168",
    title: "System Design Interview Prep",
    content: "Practicing system design. Designing a URL shortener end-to-end. Database choices, caching strategies, and scaling decisions feel more natural with practice.",
    tags: ["learning","engineering"],
    sentiment_score: 0.55,
    summary: "Practiced system design with URL shortener exercise, improving scaling intuition.",
    created_at: "2025-05-19T10:00:00Z",
    updated_at: "2025-05-19T11:00:00Z"
  },
  {
    id: "169",
    title: "Learning in Public Benefits",
    content: "Reflecting on the benefits of learning in public. Writing about what I learn forces me to understand it deeply. The audience is almost secondary.",
    tags: ["learning"],
    sentiment_score: 0.77,
    summary: "Recognized that writing publicly about learning deepens personal understanding.",
    created_at: "2025-05-22T08:00:00Z",
    updated_at: "2025-05-22T09:00:00Z"
  },
  {
    id: "170",
    title: "Time Blocking Trial — Week 1",
    content: "First week of strict time blocking. More got done but felt rigid. Needs refinement — some blocks should be protected, others flexible.",
    tags: ["productivity"],
    sentiment_score: 0.41,
    summary: "Time blocking increased output but needs adjustment for flexibility vs focus balance.",
    created_at: "2025-05-24T16:00:00Z",
    updated_at: "2025-05-24T17:00:00Z"
  },
  {
    id: "171",
    title: "GTD System Review",
    content: "Revisiting Getting Things Done methodology. The capture and process steps are the most valuable. Inbox zero isn't the goal — decision clarity is.",
    tags: ["productivity","reading"],
    sentiment_score: 0.43,
    summary: "Revisited GTD methodology, identifying capture and decision clarity as core values.",
    created_at: "2025-06-01T16:00:00Z",
    updated_at: "2025-06-01T17:00:00Z"
  },
  {
    id: "172",
    title: "Single-Tasking Experiment",
    content: "Tried single-tasking for a full week. Phone in another room, one browser tab, no Slack. Deepest focus I've had in years. Will continue.",
    tags: ["productivity"],
    sentiment_score: 0.89,
    summary: "Single-tasking experiment produced deepest focus in years, committing to continue.",
    created_at: "2025-06-03T12:00:00Z",
    updated_at: "2025-06-03T13:00:00Z"
  },
  {
    id: "173",
    title: "30-Day Meditation Streak",
    content: "30 consecutive days of meditation. The biggest change is noticing when I'm reactive. I create a small gap between stimulus and response now.",
    tags: ["meditation"],
    sentiment_score: 0.83,
    summary: "30-day meditation streak developed improved stimulus-response awareness.",
    created_at: "2025-06-05T10:00:00Z",
    updated_at: "2025-06-05T11:00:00Z"
  },
  {
    id: "174",
    title: "Meditation and Anxiety",
    content: "Meditation has noticeably reduced my baseline anxiety. Not dramatic but consistent. Like the volume on background noise has been turned down.",
    tags: ["meditation","wellbeing"],
    sentiment_score: 0.59,
    summary: "Regular meditation noticeably reduced baseline anxiety levels over time.",
    created_at: "2025-06-07T11:00:00Z",
    updated_at: "2025-06-07T12:00:00Z"
  },
  {
    id: "175",
    title: "Learning Manual Mode",
    content: "Finally committed to shooting in manual mode only. Frustrating at first but understanding the exposure triangle is changing how I see light.",
    tags: ["photography"],
    sentiment_score: 0.45,
    summary: "Committed to manual mode photography, developing new awareness of light and exposure.",
    created_at: "2025-06-10T14:00:00Z",
    updated_at: "2025-06-10T15:00:00Z"
  },
  {
    id: "176",
    title: "Street Photography Walk",
    content: "Morning street photography in the old town. Got 3 shots I'm genuinely happy with out of 200. That ratio is apparently normal. Patience is the skill.",
    tags: ["photography"],
    sentiment_score: 0.56,
    summary: "Street photography session yielded 3 strong shots, learning patience is key.",
    created_at: "2025-06-11T12:00:00Z",
    updated_at: "2025-06-11T13:00:00Z"
  },
  {
    id: "177",
    title: "Guitar — Chord Transitions Improving",
    content: "Guitar practice is finally clicking. Chord transitions between G and C are smooth now. Muscle memory is forming. Two months in and I can play a real song.",
    tags: ["music"],
    sentiment_score: 0.73,
    summary: "Guitar chord transitions becoming smooth after two months of consistent practice.",
    created_at: "2025-06-14T11:00:00Z",
    updated_at: "2025-06-14T12:00:00Z"
  },
  {
    id: "178",
    title: "Music Theory Basics",
    content: "Learning music theory basics. Understanding scales and intervals makes the fretboard make sense. Everything connects — it's like learning the grammar of music.",
    tags: ["music"],
    sentiment_score: 0.72,
    summary: "Music theory knowledge making fretboard patterns finally logical and connected.",
    created_at: "2025-06-16T09:00:00Z",
    updated_at: "2025-06-16T10:00:00Z"
  },
  {
    id: "179",
    title: "Sleep Hygiene Overhaul",
    content: "Overhauling sleep habits. No screens 1 hour before bed, consistent wake time, room temperature at 18°C. First week results are promising.",
    tags: ["sleep","wellbeing"],
    sentiment_score: 0.46,
    summary: "Implemented comprehensive sleep hygiene changes with promising first-week results.",
    created_at: "2025-06-17T08:00:00Z",
    updated_at: "2025-06-17T09:00:00Z"
  },
  {
    id: "180",
    title: "Sleep Tracking 30-Day Report",
    content: "30 days of sleep tracking complete. Average 7.2 hours. Deep sleep percentage is low — need more exercise and less evening alcohol.",
    tags: ["sleep"],
    sentiment_score: 0.27,
    summary: "30-day sleep tracking revealed 7.2 hour average with low deep sleep percentage.",
    created_at: "2025-06-20T15:00:00Z",
    updated_at: "2025-06-20T16:00:00Z"
  },
  {
    id: "181",
    title: "Plant-Based Month Experiment",
    content: "Trying a plant-based month. Day 10 — energy is surprisingly good. Missing cheese more than meat. Need to learn more plant protein sources.",
    tags: ["nutrition"],
    sentiment_score: 0.42,
    summary: "Ten days into plant-based experiment with good energy, focusing on protein sources.",
    created_at: "2025-06-21T19:00:00Z",
    updated_at: "2025-06-21T20:00:00Z"
  },
  {
    id: "182",
    title: "First Mountain Summit",
    content: "First proper mountain summit today. 6 hours round trip, 900m elevation gain. The view at the top erased all the suffering. Will absolutely do again.",
    tags: ["hiking"],
    sentiment_score: 0.97,
    summary: "Completed first mountain summit (900m gain), found the view worth every step.",
    created_at: "2025-06-23T12:00:00Z",
    updated_at: "2025-06-23T13:00:00Z"
  },
  {
    id: "183",
    title: "Trail Preparation Notes",
    content: "Researching proper trail preparation. Blister prevention, layering system, emergency kit. The ten essentials are non-negotiable for longer hikes.",
    tags: ["hiking","fitness"],
    sentiment_score: 0.5,
    summary: "Researched trail preparation essentials including first aid and layering systems.",
    created_at: "2025-07-01T19:00:00Z",
    updated_at: "2025-07-01T20:00:00Z"
  },
  {
    id: "184",
    title: "One Year at the Company",
    content: "One year at the company today. Technically much stronger. The team culture is better than I expected. The work is meaningful. A year well spent.",
    tags: ["reflection"],
    sentiment_score: 0.75,
    summary: "One-year company anniversary reflection: strong technical growth and positive culture.",
    created_at: "2025-07-04T10:00:00Z",
    updated_at: "2025-07-04T11:00:00Z"
  },
  {
    id: "185",
    title: "Values Clarification Exercise",
    content: "Did a values clarification exercise. Top three: autonomy, mastery, connection. Interesting that security didn't make the top three. Need to think about that.",
    tags: ["reflection","journaling"],
    sentiment_score: 0.52,
    summary: "Values clarification revealed top three: autonomy, mastery, connection.",
    created_at: "2025-07-05T17:00:00Z",
    updated_at: "2025-07-05T18:00:00Z"
  },
  {
    id: "186",
    title: "Mid-Year Check-In",
    content: "Halfway through the year. More growth than expected in technical skills, less than expected in health. The imbalance is something to correct in H2.",
    tags: ["reflection"],
    sentiment_score: 0.29,
    summary: "Mid-year review revealed technical over-achievement and health under-achievement.",
    created_at: "2025-07-08T15:00:00Z",
    updated_at: "2025-07-08T16:00:00Z"
  },
  {
    id: "187",
    title: "Kubernetes First Steps",
    content: "Started learning Kubernetes basics. The mental model of pods, services, and deployments took a while to click. Kind is great for local development.",
    tags: ["engineering","docker"],
    sentiment_score: 0.56,
    summary: "Began Kubernetes learning with local Kind cluster for pod and service concepts.",
    created_at: "2025-07-10T11:00:00Z",
    updated_at: "2025-07-10T12:00:00Z"
  },
  {
    id: "188",
    title: "Feynman Technique Application",
    content: "Applied the Feynman Technique to truly understand OAuth 2.0. Explaining it like I would to someone with no background exposed all the gaps in my understanding.",
    tags: ["learning","reading"],
    sentiment_score: 0.56,
    summary: "Used Feynman Technique on OAuth 2.0, identifying and filling knowledge gaps.",
    created_at: "2025-07-12T11:00:00Z",
    updated_at: "2025-07-12T12:00:00Z"
  },
  {
    id: "189",
    title: "Code Review Mindset Shift",
    content: "Shifted my code review mindset from 'finding mistakes' to 'knowledge sharing'. Reviews are now faster, less defensive, and more educational.",
    tags: ["engineering"],
    sentiment_score: 0.76,
    summary: "Reframed code review as knowledge sharing, making process more productive.",
    created_at: "2025-07-13T14:00:00Z",
    updated_at: "2025-07-13T15:00:00Z"
  },
  {
    id: "190",
    title: "Comparing Myself to Others",
    content: "Caught myself comparing my progress to colleagues. Comparison is a trap — everyone's journey is different. Refocused on my own metrics.",
    tags: ["wellbeing","reflection"],
    sentiment_score: -0.3,
    summary: "Recognized comparison trap with colleagues, refocused on personal growth metrics.",
    created_at: "2025-07-15T11:00:00Z",
    updated_at: "2025-07-15T12:00:00Z"
  },
  {
    id: "191",
    title: "Weekly Review System Update",
    content: "Updated my weekly review system. Added a 'What drained me?' section alongside 'What went well?'. Identifying energy drains is as important as celebrating wins.",
    tags: ["productivity","journaling"],
    sentiment_score: 0.59,
    summary: "Updated weekly review to include energy drain identification alongside wins.",
    created_at: "2025-07-17T12:00:00Z",
    updated_at: "2025-07-17T13:00:00Z"
  },
  {
    id: "192",
    title: "Caching Strategy Deep Dive",
    content: "Deep dive into caching strategies. Redis for session data, CDN for static assets, and in-memory for frequently computed values. Each layer serves a different purpose.",
    tags: ["engineering","nodejs"],
    sentiment_score: 0.58,
    summary: "Researched multi-layer caching strategy using Redis, CDN, and in-memory cache.",
    created_at: "2025-07-20T08:00:00Z",
    updated_at: "2025-07-20T09:00:00Z"
  },
  {
    id: "193",
    title: "Cooking as Mindfulness",
    content: "Started to see cooking as a mindfulness practice. Chopping vegetables, watching a reduction happen — present moment stuff. The food is just the outcome.",
    tags: ["cooking","reflection"],
    sentiment_score: 0.71,
    summary: "Discovered cooking as a present-moment mindfulness practice beyond just making food.",
    created_at: "2025-07-21T08:00:00Z",
    updated_at: "2025-07-21T09:00:00Z"
  },
  {
    id: "194",
    title: "Money and Happiness Research",
    content: "Read about money and happiness research. Beyond $75k baseline, more money has diminishing returns on happiness. Experiences beat things consistently.",
    tags: ["finance","reflection"],
    sentiment_score: 0.43,
    summary: "Research confirmed diminishing happiness returns above income baseline; experiences beat possessions.",
    created_at: "2025-07-23T15:00:00Z",
    updated_at: "2025-07-23T16:00:00Z"
  },
  {
    id: "195",
    title: "Technical Documentation Is Underrated",
    content: "Spent time improving our project docs. Future me and colleagues will thank present me. Good documentation is a force multiplier for the whole team.",
    tags: ["writing","engineering"],
    sentiment_score: 0.78,
    summary: "Improved project documentation recognizing it as force multiplier for team productivity.",
    created_at: "2025-07-25T11:00:00Z",
    updated_at: "2025-07-25T12:00:00Z"
  },
  {
    id: "196",
    title: "Vue and D3 Integration Patterns",
    content: "Found the right pattern for integrating D3 with Vue. D3 handles SVG manipulation, Vue handles reactivity and data. Don't fight the frameworks.",
    tags: ["vue","d3"],
    sentiment_score: 0.6,
    summary: "Established clear Vue+D3 integration pattern: D3 for SVG, Vue for reactivity.",
    created_at: "2025-08-02T12:00:00Z",
    updated_at: "2025-08-02T13:00:00Z"
  },
  {
    id: "197",
    title: "Social Battery Awareness",
    content: "Recognizing I'm an introvert who can act extroverted. Social events are energising in the moment but I need recovery time after. Planning accordingly.",
    tags: ["wellbeing"],
    sentiment_score: 0.46,
    summary: "Recognized ambivert tendencies and started planning social recovery time.",
    created_at: "2025-08-04T11:00:00Z",
    updated_at: "2025-08-04T12:00:00Z"
  },
  {
    id: "198",
    title: "Input vs Output Learning",
    content: "Shifting from input-heavy (reading, watching) to output-heavy (building, writing) learning. The knowledge sticks better. The projects don't have to be polished.",
    tags: ["learning","productivity"],
    sentiment_score: 0.57,
    summary: "Shifted learning strategy from input-heavy to output-heavy for better retention.",
    created_at: "2025-08-05T12:00:00Z",
    updated_at: "2025-08-05T13:00:00Z"
  },
  {
    id: "199",
    title: "Authentication Best Practices",
    content: "Reviewing authentication best practices. JWTs for stateless auth, refresh tokens with rotation, httpOnly cookies to prevent XSS. Security in layers.",
    tags: ["nodejs","engineering"],
    sentiment_score: 0.57,
    summary: "Reviewed auth security: JWTs, refresh token rotation, and httpOnly cookie defense.",
    created_at: "2025-08-08T18:00:00Z",
    updated_at: "2025-08-08T19:00:00Z"
  },
  {
    id: "200",
    title: "Fitness as Identity Shift",
    content: "Reframing fitness from 'something I do' to 'who I am'. Identity-based habits are stickier. I'm not trying to get fit — I'm a person who takes care of their body.",
    tags: ["fitness","reflection"],
    sentiment_score: 0.76,
    summary: "Adopted identity-based fitness mindset: being someone who takes care of their body.",
    created_at: "2025-08-09T17:00:00Z",
    updated_at: "2025-08-09T18:00:00Z"
  },
  {
    id: "201",
    title: "Fear Setting Exercise",
    content: "Did Tim Ferriss's fear setting exercise for a big decision. Defining the worst case made the risk seem manageable. Deciding not to decide is also a decision.",
    tags: ["reflection","journaling"],
    sentiment_score: 0.45,
    summary: "Fear setting exercise made big decision's worst case manageable and clarified choice.",
    created_at: "2025-08-12T13:00:00Z",
    updated_at: "2025-08-12T14:00:00Z"
  },
  {
    id: "202",
    title: "Dark Mode Design Principles",
    content: "Deep dive into dark mode design. Not just inverting colors — shadows become highlights, saturation drops, and elevation uses lighter surfaces.",
    tags: ["design"],
    sentiment_score: 0.55,
    summary: "Learned dark mode requires rethinking shadows, elevation, and color saturation.",
    created_at: "2025-08-13T12:00:00Z",
    updated_at: "2025-08-13T13:00:00Z"
  },
  {
    id: "203",
    title: "TDD Experiment — Two Weeks",
    content: "Two weeks of strict TDD. Tests first, code second. Initial friction was high but the code quality improvement is undeniable. Debugging time dropped significantly.",
    tags: ["engineering","testing"],
    sentiment_score: 0.79,
    summary: "Two-week TDD experiment showed significant code quality and debugging improvements.",
    created_at: "2025-08-15T13:00:00Z",
    updated_at: "2025-08-15T14:00:00Z"
  },
  {
    id: "204",
    title: "Exploring Microservices Architecture (2)",
    content: "Deep dive into microservices today. The separation of concerns is powerful but adds complexity. Need to understand service discovery and load balancing better.",
    tags: ["engineering","learning"],
    sentiment_score: 0.48,
    summary: "Researched microservices benefits and challenges including service discovery.",
    created_at: "2025-08-18T14:00:00Z",
    updated_at: "2025-08-18T15:00:00Z"
  },
  {
    id: "205",
    title: "Node.js Event Loop Deep Dive (2)",
    content: "Finally understood the Node.js event loop properly. The libuv thread pool is separate from the main event loop. This changes how I think about async operations.",
    tags: ["engineering","nodejs"],
    sentiment_score: 0.75,
    summary: "Gained clarity on Node.js event loop and libuv thread pool mechanics.",
    created_at: "2025-08-20T10:00:00Z",
    updated_at: "2025-08-20T11:00:00Z"
  },
  {
    id: "206",
    title: "TypeScript Generics Practice (2)",
    content: "Spent time practicing TypeScript generics. They're complex but make code much more reusable. Conditional types are particularly mind-bending.",
    tags: ["engineering","typescript"],
    sentiment_score: 0.54,
    summary: "Practiced TypeScript generics and conditional types for reusable code.",
    created_at: "2025-08-21T08:00:00Z",
    updated_at: "2025-08-21T09:00:00Z"
  },
  {
    id: "207",
    title: "Unit Testing Strategy (2)",
    content: "Revisiting our unit testing approach. We have too many integration tests and not enough unit tests. Need to shift the testing pyramid.",
    tags: ["engineering","testing"],
    sentiment_score: 0.35,
    summary: "Evaluated testing strategy, identified need to increase unit test coverage.",
    created_at: "2025-08-24T08:00:00Z",
    updated_at: "2025-08-24T09:00:00Z"
  },
  {
    id: "208",
    title: "Docker Multi-Stage Builds (2)",
    content: "Learned about multi-stage Docker builds today. Production images are now 60% smaller. The build cache optimization is a game changer.",
    tags: ["engineering","docker"],
    sentiment_score: 0.81,
    summary: "Implemented multi-stage Docker builds reducing image size by 60%.",
    created_at: "2025-08-25T15:00:00Z",
    updated_at: "2025-08-25T16:00:00Z"
  },
  {
    id: "209",
    title: "API Rate Limiting Implementation (2)",
    content: "Implemented rate limiting on our API endpoints. Used a token bucket algorithm. Testing edge cases with concurrent requests was tricky.",
    tags: ["engineering"],
    sentiment_score: 0.5,
    summary: "Implemented token bucket rate limiting for API endpoints.",
    created_at: "2025-09-02T09:00:00Z",
    updated_at: "2025-09-02T10:00:00Z"
  },
  {
    id: "210",
    title: "REST vs GraphQL Decision (2)",
    content: "Team discussion about switching parts of our API to GraphQL. REST is simpler but GraphQL solves our over-fetching problem. Still undecided.",
    tags: ["engineering","design"],
    sentiment_score: 0.24,
    summary: "Team debated REST vs GraphQL trade-offs for API architecture.",
    created_at: "2025-09-04T14:00:00Z",
    updated_at: "2025-09-04T15:00:00Z"
  },
  {
    id: "211",
    title: "Vue 3 Composition API Refactor (2)",
    content: "Refactoring old Options API code to Composition API. The code is much cleaner. Composables are like React hooks but feel more natural to me.",
    tags: ["engineering","vue"],
    sentiment_score: 0.61,
    summary: "Refactored Vue components from Options to Composition API using composables.",
    created_at: "2025-09-06T19:00:00Z",
    updated_at: "2025-09-06T20:00:00Z"
  },
  {
    id: "212",
    title: "Burnout Warning Signs (2)",
    content: "Noticing early burnout signs. Irritable, tired, losing interest in things I usually enjoy. Need to slow down and recover before it gets worse.",
    tags: ["wellbeing"],
    sentiment_score: -0.53,
    summary: "Identified early burnout signs and need to prioritize recovery.",
    created_at: "2025-09-08T16:00:00Z",
    updated_at: "2025-09-08T17:00:00Z"
  },
  {
    id: "213",
    title: "Work-Life Balance Check-In (2)",
    content: "Took stock of my work-life balance this week. I've been putting in too many late nights. Making a rule to stop working at 7pm.",
    tags: ["wellbeing","reflection"],
    sentiment_score: -0.16,
    summary: "Assessed work-life balance and set boundaries around evening work hours.",
    created_at: "2025-09-10T18:00:00Z",
    updated_at: "2025-09-10T19:00:00Z"
  },
  {
    id: "214",
    title: "Starting Meditation Practice (2)",
    content: "Day 5 of daily meditation. Noticing a real difference in how I respond to stressful situations. 10 minutes in the morning is all it takes.",
    tags: ["wellbeing","meditation"],
    sentiment_score: 0.66,
    summary: "Five days into meditation practice, noticing improved stress responses.",
    created_at: "2025-09-12T10:00:00Z",
    updated_at: "2025-09-12T11:00:00Z"
  },
  {
    id: "215",
    title: "Mental Health and Exercise Link (2)",
    content: "The research is clear - exercise directly improves mental health. Had a bad day, went for a run, felt completely different after. Need to make this a non-negotiable.",
    tags: ["wellbeing","fitness"],
    sentiment_score: 0.42,
    summary: "Experienced firsthand how exercise transformed a difficult mental health day.",
    created_at: "2025-09-14T19:00:00Z",
    updated_at: "2025-09-14T20:00:00Z"
  },
  {
    id: "216",
    title: "Difficult Conversation at Work (2)",
    content: "Had a hard conversation with my manager about workload. It went better than expected. Being direct was the right call. Feeling lighter now.",
    tags: ["wellbeing"],
    sentiment_score: 0.31,
    summary: "Had productive direct conversation with manager about workload concerns.",
    created_at: "2025-09-16T14:00:00Z",
    updated_at: "2025-09-16T15:00:00Z"
  },
  {
    id: "217",
    title: "Year in Review — Gratitude (2)",
    content: "Looking back at everything this year. Despite the hard patches, there's so much to be grateful for. Growth, friendships, skills learned. A good year overall.",
    tags: ["wellbeing","journaling"],
    sentiment_score: 0.71,
    summary: "Reflected on the year with gratitude, noting significant personal growth.",
    created_at: "2025-09-17T16:00:00Z",
    updated_at: "2025-09-17T17:00:00Z"
  },
  {
    id: "218",
    title: "Thinking Fast and Slow — Notes (2)",
    content: "Kahneman's System 1 vs System 2 thinking is reshaping how I make decisions. I catch myself defaulting to fast thinking when I should slow down.",
    tags: ["reading"],
    sentiment_score: 0.78,
    summary: "Applied Kahneman's dual-process theory to improve decision-making awareness.",
    created_at: "2025-09-19T09:00:00Z",
    updated_at: "2025-09-19T10:00:00Z"
  },
  {
    id: "219",
    title: "The Pragmatic Programmer Notes (2)",
    content: "Re-reading The Pragmatic Programmer. The orthogonality principle is something I've been violating. Components should be independent and have a single responsibility.",
    tags: ["reading","learning"],
    sentiment_score: 0.67,
    summary: "Revisited orthogonality principle from The Pragmatic Programmer.",
    created_at: "2025-09-22T15:00:00Z",
    updated_at: "2025-09-22T16:00:00Z"
  },
  {
    id: "220",
    title: "Essentialism Book Summary (2)",
    content: "Essentialism is about doing less but better. The key question: what is the most important thing I can do right now? Learning to say no more deliberately.",
    tags: ["reading"],
    sentiment_score: 0.68,
    summary: "Essentialism taught the importance of selective focus and deliberate 'no'.",
    created_at: "2025-09-24T15:00:00Z",
    updated_at: "2025-09-24T16:00:00Z"
  },
  {
    id: "221",
    title: "Deep Work — Key Takeaways (2)",
    content: "Cal Newport's Deep Work is exactly what I needed. Scheduling deep work blocks in the morning before checking email. Already seeing a difference.",
    tags: ["reading","productivity"],
    sentiment_score: 0.89,
    summary: "Implementing deep work blocks in the morning based on Cal Newport's principles.",
    created_at: "2025-09-25T18:00:00Z",
    updated_at: "2025-09-25T19:00:00Z"
  },
  {
    id: "222",
    title: "Articles: Distributed Systems (2)",
    content: "Read several articles on distributed systems consistency models. CAP theorem is less a theorem and more a design trade-off. Choosing between availability and consistency.",
    tags: ["reading"],
    sentiment_score: 0.52,
    summary: "Researched distributed systems consistency models and CAP theorem implications.",
    created_at: "2025-10-02T13:00:00Z",
    updated_at: "2025-10-02T14:00:00Z"
  },
  {
    id: "223",
    title: "Pinia vs Vuex Comparison (2)",
    content: "Migrating from Vuex to Pinia. Pinia is so much simpler — no mutations, just actions. The DevTools integration is also better.",
    tags: ["vue","engineering"],
    sentiment_score: 0.73,
    summary: "Migrated state management from Vuex to Pinia, finding it significantly simpler.",
    created_at: "2025-10-04T18:00:00Z",
    updated_at: "2025-10-04T19:00:00Z"
  },
  {
    id: "224",
    title: "Vue Router Guards Research (2)",
    content: "Implementing auth guards in Vue Router. The beforeEach hook is powerful but easy to mess up. Need to handle async checks correctly to avoid race conditions.",
    tags: ["vue"],
    sentiment_score: 0.4,
    summary: "Researched Vue Router navigation guards for authentication flow.",
    created_at: "2025-10-06T18:00:00Z",
    updated_at: "2025-10-06T19:00:00Z"
  },
  {
    id: "225",
    title: "Component Library Planning (2)",
    content: "Planning our internal component library. Deciding between building from scratch vs extending Shadcn/Vue. Building is slower but gives more control.",
    tags: ["vue","design"],
    sentiment_score: 0.55,
    summary: "Evaluated component library approach: custom build vs extending existing library.",
    created_at: "2025-10-07T19:00:00Z",
    updated_at: "2025-10-07T20:00:00Z"
  },
  {
    id: "226",
    title: "New Running Program Started (2)",
    content: "Started a structured 10K training program. First week is easy — just building the habit. Running 3x per week feels manageable alongside everything else.",
    tags: ["fitness"],
    sentiment_score: 0.62,
    summary: "Began structured 10K training program with 3x weekly runs.",
    created_at: "2025-10-10T11:00:00Z",
    updated_at: "2025-10-10T12:00:00Z"
  },
  {
    id: "227",
    title: "Rest Day Is Important Too (2)",
    content: "Learning that rest days are as important as training days. Overtraining is a real risk. My body needs time to adapt and recover.",
    tags: ["fitness","wellbeing"],
    sentiment_score: 0.45,
    summary: "Recognized importance of rest days in training cycle to prevent overtraining.",
    created_at: "2025-10-12T12:00:00Z",
    updated_at: "2025-10-12T13:00:00Z"
  },
  {
    id: "228",
    title: "Pre-Workout Nutrition Experiment (2)",
    content: "Trying different pre-workout meals. Banana + peanut butter 1 hour before is working well. Energy is consistent without the crash.",
    tags: ["fitness","nutrition"],
    sentiment_score: 0.68,
    summary: "Found banana and peanut butter optimal for pre-workout energy.",
    created_at: "2025-10-13T08:00:00Z",
    updated_at: "2025-10-13T09:00:00Z"
  },
  {
    id: "229",
    title: "Personal Best — 5K Time (2)",
    content: "New 5K personal best today! 24:32. Months of consistent training paying off. The key was building base mileage slowly before adding speed work.",
    tags: ["fitness"],
    sentiment_score: 0.87,
    summary: "Achieved new 5K personal best of 24:32 through consistent base training.",
    created_at: "2025-10-15T10:00:00Z",
    updated_at: "2025-10-15T11:00:00Z"
  },
  {
    id: "230",
    title: "Trail Running Discovery (2)",
    content: "Tried trail running for the first time. Much harder than road running but infinitely more enjoyable. The connection to nature makes it feel less like exercise.",
    tags: ["fitness","hiking"],
    sentiment_score: 0.83,
    summary: "Discovered trail running as more enjoyable and connected to nature.",
    created_at: "2025-10-18T14:00:00Z",
    updated_at: "2025-10-18T15:00:00Z"
  },
  {
    id: "231",
    title: "Design Tokens System (2)",
    content: "Implemented a design tokens system for our app. Colors, spacing, and typography are all tokenized now. Theme switching is trivial.",
    tags: ["design"],
    sentiment_score: 0.69,
    summary: "Implemented design tokens system enabling easy theme switching.",
    created_at: "2025-10-19T17:00:00Z",
    updated_at: "2025-10-19T18:00:00Z"
  },
  {
    id: "232",
    title: "Responsive Layout Patterns (2)",
    content: "Revisiting responsive design patterns. CSS Grid with named areas is so clean. The old float-based layouts feel prehistoric now.",
    tags: ["design","vue"],
    sentiment_score: 0.51,
    summary: "Modernized responsive layout approach using CSS Grid named areas.",
    created_at: "2025-10-21T16:00:00Z",
    updated_at: "2025-10-21T17:00:00Z"
  },
  {
    id: "233",
    title: "User Testing Session Notes (2)",
    content: "Ran user testing on our onboarding flow. Three out of five users struggled with step 3. The copy is confusing. Need to redesign.",
    tags: ["design"],
    sentiment_score: -0.31,
    summary: "User testing revealed step 3 of onboarding confuses 60% of users.",
    created_at: "2025-10-24T12:00:00Z",
    updated_at: "2025-10-24T13:00:00Z"
  },
  {
    id: "234",
    title: "Typography Fundamentals (2)",
    content: "Deep dive into typography. Line height, letter spacing, and font pairing make such a huge difference. Going through Practical Typography by Matthew Butterick.",
    tags: ["design","learning"],
    sentiment_score: 0.63,
    summary: "Studied typography fundamentals including line height, spacing, and font pairing.",
    created_at: "2025-10-26T10:00:00Z",
    updated_at: "2025-10-26T11:00:00Z"
  },
  {
    id: "235",
    title: "Morning Pages — Week 3 (2)",
    content: "Three weeks of morning pages. The mental clarity it brings is incredible. I process a lot of background anxiety by just writing it out.",
    tags: ["journaling"],
    sentiment_score: 0.72,
    summary: "Three weeks of morning pages delivering mental clarity and anxiety processing.",
    created_at: "2025-11-01T16:00:00Z",
    updated_at: "2025-11-01T17:00:00Z"
  },
  {
    id: "236",
    title: "Quarterly Review — Q2 (2)",
    content: "Q2 review done. Hit most goals, missed two. The fitness goal slipped because I wasn't tracking consistently. Q3 needs a better tracking system.",
    tags: ["journaling","reflection"],
    sentiment_score: 0.37,
    summary: "Q2 review: achieved most goals, fitness goal missed due to inconsistent tracking.",
    created_at: "2025-11-04T19:00:00Z",
    updated_at: "2025-11-04T20:00:00Z"
  },
  {
    id: "237",
    title: "What Am I Avoiding? (2)",
    content: "Honest journaling question today: what am I avoiding? Turns out — a difficult code review feedback I haven't fully processed and a conversation I keep putting off.",
    tags: ["journaling"],
    sentiment_score: -0.4,
    summary: "Identified avoided tasks: unprocessed code review feedback and delayed conversation.",
    created_at: "2025-11-06T15:00:00Z",
    updated_at: "2025-11-06T16:00:00Z"
  },
  {
    id: "238",
    title: "Celebrating Small Wins (2)",
    content: "Trying to be better at celebrating small wins. Shipped a feature today, got positive feedback, and immediately moved to the next thing. Paused to acknowledge it.",
    tags: ["journaling","wellbeing"],
    sentiment_score: 0.75,
    summary: "Practiced acknowledging small wins rather than immediately moving to next tasks.",
    created_at: "2025-11-07T15:00:00Z",
    updated_at: "2025-11-07T16:00:00Z"
  },
  {
    id: "239",
    title: "Express Middleware Deep Dive (2)",
    content: "Understanding the Express middleware stack better. Error handling middleware must have 4 parameters. Request lifecycle is clearer now.",
    tags: ["nodejs"],
    sentiment_score: 0.46,
    summary: "Deepened understanding of Express middleware stack and error handling patterns.",
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T11:00:00Z"
  },
  {
    id: "240",
    title: "Database Connection Pooling (2)",
    content: "Implemented connection pooling for PostgreSQL. Was creating a new connection per request — rookie mistake. Pool of 10 connections handles our load fine.",
    tags: ["nodejs","engineering"],
    sentiment_score: 0.56,
    summary: "Fixed connection pooling implementation reducing database connection overhead.",
    created_at: "2025-11-11T11:00:00Z",
    updated_at: "2025-11-11T12:00:00Z"
  },
  {
    id: "241",
    title: "WebSockets First Attempt (2)",
    content: "First time using WebSockets in Node. The real-time updates feel like magic after years of polling. Socket.io abstracts away the complexity nicely.",
    tags: ["nodejs"],
    sentiment_score: 0.82,
    summary: "Implemented real-time WebSocket communication using Socket.io.",
    created_at: "2025-11-13T15:00:00Z",
    updated_at: "2025-11-13T16:00:00Z"
  },
  {
    id: "242",
    title: "D3 Scales and Axes (2)",
    content: "Getting more comfortable with D3 scales. Linear, log, and ordinal scales each have their place. Axes are built from scales — that was the mental model I was missing.",
    tags: ["d3"],
    sentiment_score: 0.62,
    summary: "Developed clearer mental model of D3 scales and their relationship to axes.",
    created_at: "2025-11-16T12:00:00Z",
    updated_at: "2025-11-16T13:00:00Z"
  },
  {
    id: "243",
    title: "Interactive D3 Brushing (2)",
    content: "Implemented D3 brushing for range selection. The event system is low level but gives total control. Users can now select date ranges directly on the chart.",
    tags: ["d3","engineering"],
    sentiment_score: 0.6,
    summary: "Implemented D3 brush interaction for interactive date range selection.",
    created_at: "2025-11-18T13:00:00Z",
    updated_at: "2025-11-18T14:00:00Z"
  },
  {
    id: "244",
    title: "SVG vs Canvas for Data Viz (2)",
    content: "Research on SVG vs Canvas rendering. SVG is DOM-based and interactive but slow at scale. Canvas is fast but requires manual hit testing. Going with SVG for now.",
    tags: ["d3"],
    sentiment_score: 0.5,
    summary: "Evaluated SVG vs Canvas trade-offs, choosing SVG for interactive graph visualization.",
    created_at: "2025-11-20T10:00:00Z",
    updated_at: "2025-11-20T11:00:00Z"
  },
  {
    id: "245",
    title: "Portugal Trip Planning (2)",
    content: "Starting to plan a trip to Portugal. Lisbon and Porto both look incredible. Late September seems like the ideal time — crowds thin out but weather is still great.",
    tags: ["travel"],
    sentiment_score: 0.79,
    summary: "Began planning Portugal trip targeting late September for Lisbon and Porto.",
    created_at: "2025-11-21T18:00:00Z",
    updated_at: "2025-11-21T19:00:00Z"
  },
  {
    id: "246",
    title: "Food Research: Lisbon (2)",
    content: "Researching food in Lisbon. Pastéis de nata, bacalhau, and bifanas are non-negotiable. Found a food tour that hits all the traditional spots.",
    tags: ["travel","cooking"],
    sentiment_score: 0.71,
    summary: "Researched Lisbon food scene and booked a traditional food tour.",
    created_at: "2025-11-23T08:00:00Z",
    updated_at: "2025-11-23T09:00:00Z"
  },
  {
    id: "247",
    title: "Solo Travel Reflections (2)",
    content: "Thinking about why solo travel appeals to me. Full control of the itinerary, no compromises. The unexpected conversations with strangers are often the highlight.",
    tags: ["travel"],
    sentiment_score: 0.66,
    summary: "Reflected on appeal of solo travel: autonomy and unexpected human connections.",
    created_at: "2025-11-25T08:00:00Z",
    updated_at: "2025-11-25T09:00:00Z"
  },
  {
    id: "248",
    title: "Sourdough Starter — Day 7 (2)",
    content: "Sourdough starter finally active after a week. It's bubbling and has that sour smell. First bake tomorrow. Expecting a dense disaster but excited to try.",
    tags: ["cooking"],
    sentiment_score: 0.67,
    summary: "Sourdough starter became active after 7 days, ready for first bake.",
    created_at: "2025-12-02T14:00:00Z",
    updated_at: "2025-12-02T15:00:00Z"
  },
  {
    id: "249",
    title: "Meal Prep Sunday System (2)",
    content: "Perfected my Sunday meal prep routine. 2 hours, 5 meals for the week. Grains, proteins, and vegetables prepped separately for flexibility.",
    tags: ["cooking","nutrition"],
    sentiment_score: 0.81,
    summary: "Established efficient 2-hour Sunday meal prep system for the week.",
    created_at: "2025-12-04T14:00:00Z",
    updated_at: "2025-12-04T15:00:00Z"
  },
  {
    id: "250",
    title: "Learning Knife Skills (2)",
    content: "Watching knife skills videos and actually practicing. The difference between a sharp and dull knife is enormous. Julienne cuts are coming along.",
    tags: ["cooking"],
    sentiment_score: 0.56,
    summary: "Actively practicing knife skills, noting major difference with properly sharpened knife.",
    created_at: "2025-12-05T12:00:00Z",
    updated_at: "2025-12-05T13:00:00Z"
  },
  {
    id: "251",
    title: "First Attempt: Homemade Pasta (2)",
    content: "Made pasta from scratch today. Just flour and eggs. The kneading is meditative. Fresh pasta taste is incomparable to dried — worth the effort.",
    tags: ["cooking"],
    sentiment_score: 0.84,
    summary: "Made fresh pasta from scratch, finding kneading meditative and result superior.",
    created_at: "2025-12-07T08:00:00Z",
    updated_at: "2025-12-07T09:00:00Z"
  },
  {
    id: "252",
    title: "Annual Budget Review (2)",
    content: "Reviewing this year's budget against actual spending. Biggest overspend: eating out (2x budget). Biggest underspend: entertainment. Need better food habit tracking.",
    tags: ["finance"],
    sentiment_score: -0.29,
    summary: "Annual budget review revealed 2x overspend on eating out vs entertainment savings.",
    created_at: "2025-12-10T14:00:00Z",
    updated_at: "2025-12-10T15:00:00Z"
  },
  {
    id: "253",
    title: "Emergency Fund Goal Hit (2)",
    content: "Hit my 6-month emergency fund target today. Took 18 months of consistent saving. The peace of mind it brings is worth every sacrifice.",
    tags: ["finance","budgeting"],
    sentiment_score: 0.84,
    summary: "Achieved 6-month emergency fund goal after 18 months of consistent saving.",
    created_at: "2025-12-12T17:00:00Z",
    updated_at: "2025-12-12T18:00:00Z"
  },
  {
    id: "254",
    title: "Investment Portfolio Review (2)",
    content: "Quarterly portfolio check. Index funds are performing as expected — boring but consistent. Resisting the urge to tinker. Staying the course.",
    tags: ["finance"],
    sentiment_score: 0.52,
    summary: "Quarterly portfolio review confirmed index fund strategy on track, avoiding tinkering.",
    created_at: "2025-12-14T17:00:00Z",
    updated_at: "2025-12-14T18:00:00Z"
  },
  {
    id: "255",
    title: "First Draft Complete (2)",
    content: "Finished the first draft of the technical article I've been working on for two weeks. It's rough but it exists. Editing is easier than creating from nothing.",
    tags: ["writing"],
    sentiment_score: 0.7,
    summary: "Completed first draft of technical article, ready for revision phase.",
    created_at: "2025-12-15T19:00:00Z",
    updated_at: "2025-12-15T20:00:00Z"
  },
  {
    id: "256",
    title: "Writing Process Reflection (2)",
    content: "Thinking about my writing process. I write best in the morning before other tasks fill my head. Need to protect that time more jealously.",
    tags: ["writing","learning"],
    sentiment_score: 0.47,
    summary: "Identified morning as optimal writing time and need to protect it.",
    created_at: "2025-12-18T15:00:00Z",
    updated_at: "2025-12-18T16:00:00Z"
  },
  {
    id: "257",
    title: "Published First Blog Post (2)",
    content: "Published the technical article. Posted on dev.to and LinkedIn. Better reception than expected — 200 views on day one. The feedback is encouraging.",
    tags: ["writing"],
    sentiment_score: 0.99,
    summary: "Published first technical article, received 200 views and positive feedback on day one.",
    created_at: "2025-12-20T14:00:00Z",
    updated_at: "2025-12-20T15:00:00Z"
  },
  {
    id: "258",
    title: "First Time Leading a Sprint (2)",
    content: "Led my first full sprint as unofficial team lead. Keeping everyone unblocked is a different skill than writing code. Enjoyed it more than expected.",
    tags: ["leadership"],
    sentiment_score: 0.74,
    summary: "Led first sprint as team lead, discovering enjoyment of the facilitation role.",
    created_at: "2025-12-22T13:00:00Z",
    updated_at: "2025-12-22T14:00:00Z"
  },
  {
    id: "259",
    title: "Giving Constructive Feedback (2)",
    content: "Had to give difficult feedback to a colleague today. Used the SBI model (Situation-Behavior-Impact). It was uncomfortable but the conversation was productive.",
    tags: ["leadership","wellbeing"],
    sentiment_score: 0.49,
    summary: "Delivered constructive feedback using SBI model, resulting in productive dialogue.",
    created_at: "2025-12-24T14:00:00Z",
    updated_at: "2025-12-24T15:00:00Z"
  },
  {
    id: "260",
    title: "Spaced Repetition System Setup (2)",
    content: "Set up Anki for spaced repetition. Adding cards for programming concepts, vocabulary, and ideas from books. The forgetting curve is real.",
    tags: ["learning"],
    sentiment_score: 0.58,
    summary: "Configured Anki spaced repetition system for programming concepts and book insights.",
    created_at: "2025-12-25T11:00:00Z",
    updated_at: "2025-12-25T12:00:00Z"
  }
,
  {
    id: "261",
    title: "Marathon Training — Long Run PB",
    content: "Longest run yet — 28km. Felt strong the whole way. Marathon is within reach.",
    tags: ["fitness"],
    sentiment_score: 0.97,
    summary: "Achieved 28km long run PB, marathon goal now feels realistic.",
    created_at: "2025-01-01T12:00:00Z",
    updated_at: "2025-01-01T13:00:00Z"
  },
  {
    id: "262",
    title: "Feature Shipped to Production",
    content: "Big feature finally in production. Zero issues. The testing paid off.",
    tags: ["engineering"],
    sentiment_score: 0.84,
    summary: "Major feature shipped cleanly to production after thorough testing.",
    created_at: "2025-01-04T13:00:00Z",
    updated_at: "2025-01-04T14:00:00Z"
  },
  {
    id: "263",
    title: "Article Hit 1000 Views",
    content: "The technical article crossed 1000 views. Community feedback is overwhelmingly positive.",
    tags: ["writing"],
    sentiment_score: 0.91,
    summary: "Technical article reached 1000 views with strong community reception.",
    created_at: "2025-01-04T17:00:00Z",
    updated_at: "2025-01-04T18:00:00Z"
  },
  {
    id: "264",
    title: "Sourdough Finally Perfect",
    content: "After 12 attempts, the sourdough is perfect. Open crumb, crispy crust. Worth every failure.",
    tags: ["cooking"],
    sentiment_score: 0.89,
    summary: "Achieved perfect sourdough after 12 iterations — open crumb and crispy crust.",
    created_at: "2025-01-09T14:00:00Z",
    updated_at: "2025-01-09T15:00:00Z"
  },
  {
    id: "265",
    title: "Certification Passed",
    content: "Passed the AWS Solutions Architect exam on first attempt. Months of studying paid off.",
    tags: ["learning"],
    sentiment_score: 0.92,
    summary: "Passed AWS Solutions Architect certification on first attempt.",
    created_at: "2025-01-18T16:00:00Z",
    updated_at: "2025-01-18T17:00:00Z"
  },
  {
    id: "266",
    title: "Best Week in a Long Time",
    content: "Everything clicked this week. Work, health, relationships. Rare alignment.",
    tags: ["journaling"],
    sentiment_score: 0.97,
    summary: "Exceptional week with work, health, and relationships all aligned positively.",
    created_at: "2025-01-20T13:00:00Z",
    updated_at: "2025-01-20T14:00:00Z"
  },
  {
    id: "267",
    title: "Played First Open Mic Night",
    content: "Performed at an open mic for the first time. Nervous but pulled it off. People clapped.",
    tags: ["music"],
    sentiment_score: 0.83,
    summary: "Successfully completed first open mic performance despite nerves.",
    created_at: "2025-01-24T13:00:00Z",
    updated_at: "2025-01-24T14:00:00Z"
  },
  {
    id: "268",
    title: "Got the Promotion",
    content: "Officially promoted to senior. A year of hard work recognized. Feeling proud.",
    tags: ["reflection"],
    sentiment_score: 0.93,
    summary: "Received senior promotion after a year of consistent effort and results.",
    created_at: "2025-01-25T18:00:00Z",
    updated_at: "2025-01-25T19:00:00Z"
  },
  {
    id: "269",
    title: "Refactor Complete — Code Quality Up",
    content: "Finished the component refactor. Test coverage went from 40% to 78%. Feels much better.",
    tags: ["engineering","vue"],
    sentiment_score: 0.62,
    summary: "Component refactor improved test coverage from 40% to 78%.",
    created_at: "2025-01-25T19:00:00Z",
    updated_at: "2025-01-25T20:00:00Z"
  },
  {
    id: "270",
    title: "Finished Atomic Habits",
    content: "Completed Atomic Habits. The 1% better every day concept is deceptively simple but powerful.",
    tags: ["reading"],
    sentiment_score: 0.64,
    summary: "Atomic Habits reinforced compound improvement through 1% daily gains.",
    created_at: "2025-01-26T15:00:00Z",
    updated_at: "2025-01-26T16:00:00Z"
  },
  {
    id: "271",
    title: "Sunrise Hike — Worth the 4am Alarm",
    content: "Woke at 4am for a sunrise hike. The view at the top in golden light was surreal.",
    tags: ["fitness","hiking"],
    sentiment_score: 0.74,
    summary: "Early morning sunrise hike delivered breathtaking light views.",
    created_at: "2025-01-26T17:00:00Z",
    updated_at: "2025-01-26T18:00:00Z"
  },
  {
    id: "272",
    title: "Inbox Zero Achieved",
    content: "Cleared my inbox for the first time in 8 months. Took 3 hours. Feels like a fresh start.",
    tags: ["productivity"],
    sentiment_score: 0.56,
    summary: "Achieved inbox zero after 8 months, creating mental clarity.",
    created_at: "2025-01-28T19:00:00Z",
    updated_at: "2025-01-28T20:00:00Z"
  },
  {
    id: "273",
    title: "API Response Time Improved 60%",
    content: "Query optimization and caching cut API response from 800ms to 320ms. Significant win.",
    tags: ["nodejs"],
    sentiment_score: 0.74,
    summary: "API optimization reduced response time by 60% through caching and query tuning.",
    created_at: "2025-01-28T19:00:00Z",
    updated_at: "2025-01-28T20:00:00Z"
  },
  {
    id: "274",
    title: "60-Day Meditation Streak",
    content: "Hit 60 days consecutive meditation. The practice is now automatic — like brushing teeth.",
    tags: ["meditation"],
    sentiment_score: 0.77,
    summary: "60-day meditation streak reached, practice now deeply habitual.",
    created_at: "2025-01-29T15:00:00Z",
    updated_at: "2025-01-29T16:00:00Z"
  },
  {
    id: "275",
    title: "Design System v2 Launched",
    content: "New design system adopted by all three product teams. Consistency across products finally.",
    tags: ["design"],
    sentiment_score: 0.7,
    summary: "Design system v2 successfully adopted across all three product teams.",
    created_at: "2025-02-01T23:00:00Z",
    updated_at: "2025-02-02T00:00:00Z"
  },
  {
    id: "276",
    title: "Investments Up 18% YTD",
    content: "Portfolio review: 18% year-to-date return. Index funds boring but effective.",
    tags: ["finance"],
    sentiment_score: 0.75,
    summary: "Portfolio achieved 18% YTD return through consistent index fund strategy.",
    created_at: "2025-02-04T19:00:00Z",
    updated_at: "2025-02-04T20:00:00Z"
  },
  {
    id: "277",
    title: "Long Bug Hunt — Finally Found It",
    content: "Spent 6 hours on a bug that turned out to be a timezone issue. Frustrating but resolved.",
    tags: ["engineering"],
    sentiment_score: 0.04,
    summary: "6-hour debugging session resolved timezone-related bug.",
    created_at: "2025-02-05T12:00:00Z",
    updated_at: "2025-02-05T13:00:00Z"
  },
  {
    id: "278",
    title: "Feeling Stuck Professionally",
    content: "Not sure where to go next in my career. Multiple paths, none feel clearly right.",
    tags: ["reflection"],
    sentiment_score: -0.15,
    summary: "Experiencing career direction uncertainty with multiple viable but unclear paths.",
    created_at: "2025-02-05T17:00:00Z",
    updated_at: "2025-02-05T18:00:00Z"
  },
  {
    id: "279",
    title: "Rainy Sunday — Low Energy",
    content: "Low energy day. Not productive but not terrible either. Sometimes rest looks like this.",
    tags: ["journaling"],
    sentiment_score: 0.07,
    summary: "Low energy rest day — unproductive but necessary recovery.",
    created_at: "2025-02-06T18:00:00Z",
    updated_at: "2025-02-06T19:00:00Z"
  },
  {
    id: "280",
    title: "Sleep Quality Declining",
    content: "Bad sleep for the third night. Affecting mood and focus. Need to fix the root cause.",
    tags: ["wellbeing"],
    sentiment_score: -0.18,
    summary: "Three nights of poor sleep beginning to impact mood and concentration.",
    created_at: "2025-02-11T23:00:00Z",
    updated_at: "2025-02-12T00:00:00Z"
  },
  {
    id: "281",
    title: "Complex Topic — Progress Slow",
    content: "Trying to understand distributed consensus algorithms. Progress is slow. It clicks, then un-clicks.",
    tags: ["learning"],
    sentiment_score: 0.16,
    summary: "Struggling with distributed consensus algorithms, progress inconsistent.",
    created_at: "2025-02-14T12:00:00Z",
    updated_at: "2025-02-14T13:00:00Z"
  },
  {
    id: "282",
    title: "Missed Two Weeks — Starting Over",
    content: "Travel broke the training routine. Back to basics. The first run back is always the hardest.",
    tags: ["fitness"],
    sentiment_score: 0.06,
    summary: "Resumed training after travel break — restarting base-building phase.",
    created_at: "2025-02-14T14:00:00Z",
    updated_at: "2025-02-14T15:00:00Z"
  },
  {
    id: "283",
    title: "Distracted Day — Nothing Shipped",
    content: "Constant interruptions today. Context switching destroyed focus. Need to protect deep work time.",
    tags: ["productivity"],
    sentiment_score: -0.17,
    summary: "Interruption-heavy day with context switching preventing meaningful progress.",
    created_at: "2025-02-17T14:00:00Z",
    updated_at: "2025-02-17T15:00:00Z"
  },
  {
    id: "284",
    title: "Panic Attack at Work",
    content: "Had a panic attack during a presentation. Embarrassing and scary. Need to address this properly.",
    tags: ["wellbeing"],
    sentiment_score: -0.82,
    summary: "Experienced panic attack during work presentation — needs professional support.",
    created_at: "2025-02-17T20:00:00Z",
    updated_at: "2025-02-17T21:00:00Z"
  },
  {
    id: "285",
    title: "Project Cancelled After 3 Months",
    content: "The project I've been working on for 3 months was cancelled. Feels like wasted effort.",
    tags: ["reflection"],
    sentiment_score: -0.76,
    summary: "Major project cancelled after 3 months, leaving work feeling purposeless.",
    created_at: "2025-02-17T23:00:00Z",
    updated_at: "2025-02-18T00:00:00Z"
  },
  {
    id: "286",
    title: "Comparison Spiral — Dark Thoughts",
    content: "Fell into a comparison spiral on social media. Everyone looks more successful. I know it's not real but it stings.",
    tags: ["journaling"],
    sentiment_score: -0.82,
    summary: "Social media comparison spiral triggering feelings of inadequacy.",
    created_at: "2025-02-22T16:00:00Z",
    updated_at: "2025-02-22T17:00:00Z"
  },
  {
    id: "287",
    title: "Overwhelmed by Everything",
    content: "Too many things at once. Work, health, relationships, side projects. Can't prioritize. Paralyzed.",
    tags: ["wellbeing"],
    sentiment_score: -0.84,
    summary: "Overwhelmed by competing demands across work, health, and personal life.",
    created_at: "2025-02-23T00:00:00Z",
    updated_at: "2025-02-23T01:00:00Z"
  },
  {
    id: "288",
    title: "Production Outage — My Fault",
    content: "I caused a production outage. 45 minutes of downtime. Worst feeling. Need better deployment checks.",
    tags: ["engineering"],
    sentiment_score: -0.86,
    summary: "Caused 45-minute production outage, triggering deployment process review.",
    created_at: "2025-02-25T16:00:00Z",
    updated_at: "2025-02-25T17:00:00Z"
  },
  {
    id: "289",
    title: "Received Harsh Criticism",
    content: "Got harsh feedback on my work in front of the team. Some valid, delivery was brutal. Need to process this.",
    tags: ["reflection"],
    sentiment_score: -0.77,
    summary: "Received harsh public criticism — processing validity vs delivery style.",
    created_at: "2025-03-05T18:00:00Z",
    updated_at: "2025-03-05T19:00:00Z"
  },
  {
    id: "290",
    title: "Loneliness After Moving Cities",
    content: "Six months in the new city. Work is good but haven't built real friendships yet. Quietly lonely.",
    tags: ["wellbeing"],
    sentiment_score: -0.61,
    summary: "Experiencing quiet loneliness six months after relocating to new city.",
    created_at: "2025-03-07T14:00:00Z",
    updated_at: "2025-03-07T15:00:00Z"
  },
  {
    id: "291",
    title: "Rejected from Dream Job",
    content: "Didn't get the job I really wanted. Made it to final round then no. Hard to accept.",
    tags: ["journaling"],
    sentiment_score: -0.92,
    summary: "Final round rejection from dream job opportunity, processing disappointment.",
    created_at: "2025-03-07T17:00:00Z",
    updated_at: "2025-03-07T18:00:00Z"
  },
  {
    id: "292",
    title: "Injury — Forced to Stop Training",
    content: "Knee injury means no running for 6 weeks. Devastating after building momentum for months.",
    tags: ["fitness"],
    sentiment_score: -0.69,
    summary: "Knee injury forcing 6-week running break at height of training momentum.",
    created_at: "2025-03-09T00:00:00Z",
    updated_at: "2025-03-09T01:00:00Z"
  },
  {
    id: "293",
    title: "Unexpected Expense — Budget Blown",
    content: "Car repair wiped out the savings buffer. Back to square one on the emergency fund.",
    tags: ["finance"],
    sentiment_score: -0.6,
    summary: "Unexpected car repair expenses depleted savings buffer completely.",
    created_at: "2025-03-09T20:00:00Z",
    updated_at: "2025-03-09T21:00:00Z"
  },
  {
    id: "294",
    title: "Exhausted — Running on Empty",
    content: "Physically and mentally exhausted. Can't remember the last time I felt truly rested.",
    tags: ["wellbeing"],
    sentiment_score: -0.87,
    summary: "Deep exhaustion with no memory of feeling genuinely rested.",
    created_at: "2025-03-09T23:00:00Z",
    updated_at: "2025-03-10T00:00:00Z"
  },
  {
    id: "295",
    title: "Legacy Codebase Despair",
    content: "Inheriting this legacy codebase is demoralising. No tests, no docs, spaghetti everywhere.",
    tags: ["engineering"],
    sentiment_score: -0.68,
    summary: "Inheriting undocumented, untested legacy codebase causing significant morale drop.",
    created_at: "2025-03-09T23:00:00Z",
    updated_at: "2025-03-10T00:00:00Z"
  },
  {
    id: "296",
    title: "Arrived in Lisbon",
    content: "First day in Lisbon. Warm, beautiful, pastéis de nata for breakfast. Already love it.",
    tags: ["travel"],
    sentiment_score: 0.95,
    summary: "Arrived in Lisbon to perfect weather and iconic pastéis de nata.",
    created_at: "2025-03-09T23:00:00Z",
    updated_at: "2025-03-10T00:00:00Z"
  },
  {
    id: "297",
    title: "Dinner Party — Everyone Loved It",
    content: "Hosted a dinner party for 8. The risotto was the highlight. Happy guests, great conversations.",
    tags: ["cooking"],
    sentiment_score: 0.9,
    summary: "Successful dinner party of 8 with standout risotto and great conversation.",
    created_at: "2025-03-16T23:00:00Z",
    updated_at: "2025-03-17T00:00:00Z"
  },
  {
    id: "298",
    title: "Photo Accepted by Magazine",
    content: "A photo I submitted got accepted for publication. First time being published. Incredible feeling.",
    tags: ["photography"],
    sentiment_score: 0.87,
    summary: "First photography publication acceptance — photo selected for magazine.",
    created_at: "2025-03-17T17:00:00Z",
    updated_at: "2025-03-17T18:00:00Z"
  },
  {
    id: "299",
    title: "Concept Finally Clicked",
    content: "Monads. Three months of confusion and today it just clicked. That moment is addictive.",
    tags: ["learning"],
    sentiment_score: 0.84,
    summary: "Monadic programming concept finally clicked after three months of confusion.",
    created_at: "2025-03-18T23:00:00Z",
    updated_at: "2025-03-19T00:00:00Z"
  },
  {
    id: "300",
    title: "Visualization Featured on Hacker News",
    content: "Posted the D3 graph visualization on HN. Made the front page for 2 hours. 500 upvotes.",
    tags: ["d3"],
    sentiment_score: 0.81,
    summary: "D3 visualization reached Hacker News front page with 500 upvotes.",
    created_at: "2025-03-19T16:00:00Z",
    updated_at: "2025-03-19T17:00:00Z"
  },
  {
    id: "301",
    title: "Therapy Is Working",
    content: "Noticing real changes from therapy. Catching negative thought patterns before they spiral.",
    tags: ["wellbeing"],
    sentiment_score: 0.63,
    summary: "Therapy producing measurable results in negative thought pattern recognition.",
    created_at: "2025-03-25T11:00:00Z",
    updated_at: "2025-03-25T12:00:00Z"
  },
  {
    id: "302",
    title: "Open Source PR Merged",
    content: "First open source contribution merged into a popular library. Small fix but meaningful.",
    tags: ["engineering"],
    sentiment_score: 0.87,
    summary: "First open source contribution merged into widely-used library.",
    created_at: "2025-03-25T13:00:00Z",
    updated_at: "2025-03-25T14:00:00Z"
  },
  {
    id: "303",
    title: "Energy Levels Transformed",
    content: "Three weeks of better nutrition and my energy levels are unrecognisable. No afternoon crash.",
    tags: ["nutrition"],
    sentiment_score: 0.79,
    summary: "Three weeks of improved nutrition eliminated afternoon energy crashes.",
    created_at: "2025-03-25T17:00:00Z",
    updated_at: "2025-03-25T18:00:00Z"
  },
  {
    id: "304",
    title: "Gratitude Practice — 90 Days",
    content: "90 days of daily gratitude journaling. Genuine shift in how I default-interpret events.",
    tags: ["reflection"],
    sentiment_score: 0.8,
    summary: "90-day gratitude practice has shifted default interpretations to positive.",
    created_at: "2025-03-25T18:00:00Z",
    updated_at: "2025-03-25T19:00:00Z"
  },
  {
    id: "305",
    title: "App Performance 3x Faster",
    content: "Lazy loading, code splitting, and virtual scrolling. App feels completely different now.",
    tags: ["vue"],
    sentiment_score: 0.79,
    summary: "Three performance optimizations delivered 3x app speed improvement.",
    created_at: "2025-03-25T22:00:00Z",
    updated_at: "2025-03-25T23:00:00Z"
  },
  {
    id: "306",
    title: "Zero-Downtime Deployment Working",
    content: "Blue-green deployment configured and tested. Deployments are now invisible to users.",
    tags: ["docker"],
    sentiment_score: 0.73,
    summary: "Blue-green deployment enables zero-downtime releases invisible to users.",
    created_at: "2025-03-27T18:00:00Z",
    updated_at: "2025-03-27T19:00:00Z"
  },
  {
    id: "307",
    title: "First Full Week of Good Sleep",
    content: "Seven consecutive nights of quality sleep. Mood, focus, and patience are dramatically better.",
    tags: ["sleep"],
    sentiment_score: 0.69,
    summary: "First week of consistent quality sleep producing dramatic mood and focus improvements.",
    created_at: "2025-03-30T20:00:00Z",
    updated_at: "2025-03-30T21:00:00Z"
  },
  {
    id: "308",
    title: "Marathon Training — Long Run PB (2)",
    content: "Longest run yet — 28km. Felt strong the whole way. Marathon is within reach.",
    tags: ["fitness"],
    sentiment_score: 0.93,
    summary: "Achieved 28km long run PB, marathon goal now feels realistic.",
    created_at: "2025-04-02T13:00:00Z",
    updated_at: "2025-04-02T14:00:00Z"
  },
  {
    id: "309",
    title: "Feature Shipped to Production (2)",
    content: "Big feature finally in production. Zero issues. The testing paid off.",
    tags: ["engineering"],
    sentiment_score: 0.88,
    summary: "Major feature shipped cleanly to production after thorough testing.",
    created_at: "2025-04-03T18:00:00Z",
    updated_at: "2025-04-03T19:00:00Z"
  },
  {
    id: "310",
    title: "Article Hit 1000 Views (2)",
    content: "The technical article crossed 1000 views. Community feedback is overwhelmingly positive.",
    tags: ["writing"],
    sentiment_score: 0.98,
    summary: "Technical article reached 1000 views with strong community reception.",
    created_at: "2025-04-03T18:00:00Z",
    updated_at: "2025-04-03T19:00:00Z"
  },
  {
    id: "311",
    title: "Sourdough Finally Perfect (2)",
    content: "After 12 attempts, the sourdough is perfect. Open crumb, crispy crust. Worth every failure.",
    tags: ["cooking"],
    sentiment_score: 0.93,
    summary: "Achieved perfect sourdough after 12 iterations — open crumb and crispy crust.",
    created_at: "2025-04-05T14:00:00Z",
    updated_at: "2025-04-05T15:00:00Z"
  },
  {
    id: "312",
    title: "Certification Passed (2)",
    content: "Passed the AWS Solutions Architect exam on first attempt. Months of studying paid off.",
    tags: ["learning"],
    sentiment_score: 0.86,
    summary: "Passed AWS Solutions Architect certification on first attempt.",
    created_at: "2025-04-05T16:00:00Z",
    updated_at: "2025-04-05T17:00:00Z"
  },
  {
    id: "313",
    title: "Best Week in a Long Time (2)",
    content: "Everything clicked this week. Work, health, relationships. Rare alignment.",
    tags: ["journaling"],
    sentiment_score: 0.91,
    summary: "Exceptional week with work, health, and relationships all aligned positively.",
    created_at: "2025-04-05T23:00:00Z",
    updated_at: "2025-04-06T00:00:00Z"
  },
  {
    id: "314",
    title: "Played First Open Mic Night (2)",
    content: "Performed at an open mic for the first time. Nervous but pulled it off. People clapped.",
    tags: ["music"],
    sentiment_score: 0.95,
    summary: "Successfully completed first open mic performance despite nerves.",
    created_at: "2025-04-07T22:00:00Z",
    updated_at: "2025-04-07T23:00:00Z"
  },
  {
    id: "315",
    title: "Got the Promotion (2)",
    content: "Officially promoted to senior. A year of hard work recognized. Feeling proud.",
    tags: ["reflection"],
    sentiment_score: 0.93,
    summary: "Received senior promotion after a year of consistent effort and results.",
    created_at: "2025-04-07T22:00:00Z",
    updated_at: "2025-04-07T23:00:00Z"
  },
  {
    id: "316",
    title: "Refactor Complete — Code Quality Up (2)",
    content: "Finished the component refactor. Test coverage went from 40% to 78%. Feels much better.",
    tags: ["engineering","vue"],
    sentiment_score: 0.63,
    summary: "Component refactor improved test coverage from 40% to 78%.",
    created_at: "2025-04-13T12:00:00Z",
    updated_at: "2025-04-13T13:00:00Z"
  },
  {
    id: "317",
    title: "Finished Atomic Habits (2)",
    content: "Completed Atomic Habits. The 1% better every day concept is deceptively simple but powerful.",
    tags: ["reading"],
    sentiment_score: 0.7,
    summary: "Atomic Habits reinforced compound improvement through 1% daily gains.",
    created_at: "2025-04-13T15:00:00Z",
    updated_at: "2025-04-13T16:00:00Z"
  },
  {
    id: "318",
    title: "Sunrise Hike — Worth the 4am Alarm (2)",
    content: "Woke at 4am for a sunrise hike. The view at the top in golden light was surreal.",
    tags: ["fitness","hiking"],
    sentiment_score: 0.71,
    summary: "Early morning sunrise hike delivered breathtaking light views.",
    created_at: "2025-04-15T12:00:00Z",
    updated_at: "2025-04-15T13:00:00Z"
  },
  {
    id: "319",
    title: "Inbox Zero Achieved (2)",
    content: "Cleared my inbox for the first time in 8 months. Took 3 hours. Feels like a fresh start.",
    tags: ["productivity"],
    sentiment_score: 0.66,
    summary: "Achieved inbox zero after 8 months, creating mental clarity.",
    created_at: "2025-04-15T20:00:00Z",
    updated_at: "2025-04-15T21:00:00Z"
  },
  {
    id: "320",
    title: "API Response Time Improved 60% (2)",
    content: "Query optimization and caching cut API response from 800ms to 320ms. Significant win.",
    tags: ["nodejs"],
    sentiment_score: 0.63,
    summary: "API optimization reduced response time by 60% through caching and query tuning.",
    created_at: "2025-04-15T23:00:00Z",
    updated_at: "2025-04-16T00:00:00Z"
  },
  {
    id: "321",
    title: "60-Day Meditation Streak (2)",
    content: "Hit 60 days consecutive meditation. The practice is now automatic — like brushing teeth.",
    tags: ["meditation"],
    sentiment_score: 0.76,
    summary: "60-day meditation streak reached, practice now deeply habitual.",
    created_at: "2025-04-23T14:00:00Z",
    updated_at: "2025-04-23T15:00:00Z"
  },
  {
    id: "322",
    title: "Design System v2 Launched (2)",
    content: "New design system adopted by all three product teams. Consistency across products finally.",
    tags: ["design"],
    sentiment_score: 0.64,
    summary: "Design system v2 successfully adopted across all three product teams.",
    created_at: "2025-04-23T22:00:00Z",
    updated_at: "2025-04-23T23:00:00Z"
  },
  {
    id: "323",
    title: "Investments Up 18% YTD (2)",
    content: "Portfolio review: 18% year-to-date return. Index funds boring but effective.",
    tags: ["finance"],
    sentiment_score: 0.67,
    summary: "Portfolio achieved 18% YTD return through consistent index fund strategy.",
    created_at: "2025-04-24T13:00:00Z",
    updated_at: "2025-04-24T14:00:00Z"
  },
  {
    id: "324",
    title: "Long Bug Hunt — Finally Found It (2)",
    content: "Spent 6 hours on a bug that turned out to be a timezone issue. Frustrating but resolved.",
    tags: ["engineering"],
    sentiment_score: 0.03,
    summary: "6-hour debugging session resolved timezone-related bug.",
    created_at: "2025-04-24T13:00:00Z",
    updated_at: "2025-04-24T14:00:00Z"
  },
  {
    id: "325",
    title: "Feeling Stuck Professionally (2)",
    content: "Not sure where to go next in my career. Multiple paths, none feel clearly right.",
    tags: ["reflection"],
    sentiment_score: -0.17,
    summary: "Experiencing career direction uncertainty with multiple viable but unclear paths.",
    created_at: "2025-04-24T19:00:00Z",
    updated_at: "2025-04-24T20:00:00Z"
  },
  {
    id: "326",
    title: "Rainy Sunday — Low Energy (2)",
    content: "Low energy day. Not productive but not terrible either. Sometimes rest looks like this.",
    tags: ["journaling"],
    sentiment_score: 0.11,
    summary: "Low energy rest day — unproductive but necessary recovery.",
    created_at: "2025-04-26T11:00:00Z",
    updated_at: "2025-04-26T12:00:00Z"
  },
  {
    id: "327",
    title: "Sleep Quality Declining (2)",
    content: "Bad sleep for the third night. Affecting mood and focus. Need to fix the root cause.",
    tags: ["wellbeing"],
    sentiment_score: -0.2,
    summary: "Three nights of poor sleep beginning to impact mood and concentration.",
    created_at: "2025-04-27T13:00:00Z",
    updated_at: "2025-04-27T14:00:00Z"
  },
  {
    id: "328",
    title: "Complex Topic — Progress Slow (2)",
    content: "Trying to understand distributed consensus algorithms. Progress is slow. It clicks, then un-clicks.",
    tags: ["learning"],
    sentiment_score: 0.15,
    summary: "Struggling with distributed consensus algorithms, progress inconsistent.",
    created_at: "2025-04-28T19:00:00Z",
    updated_at: "2025-04-28T20:00:00Z"
  },
  {
    id: "329",
    title: "Missed Two Weeks — Starting Over (2)",
    content: "Travel broke the training routine. Back to basics. The first run back is always the hardest.",
    tags: ["fitness"],
    sentiment_score: 0.06,
    summary: "Resumed training after travel break — restarting base-building phase.",
    created_at: "2025-05-03T20:00:00Z",
    updated_at: "2025-05-03T21:00:00Z"
  },
  {
    id: "330",
    title: "Distracted Day — Nothing Shipped (2)",
    content: "Constant interruptions today. Context switching destroyed focus. Need to protect deep work time.",
    tags: ["productivity"],
    sentiment_score: -0.26,
    summary: "Interruption-heavy day with context switching preventing meaningful progress.",
    created_at: "2025-05-03T23:00:00Z",
    updated_at: "2025-05-04T00:00:00Z"
  },
  {
    id: "331",
    title: "Panic Attack at Work (2)",
    content: "Had a panic attack during a presentation. Embarrassing and scary. Need to address this properly.",
    tags: ["wellbeing"],
    sentiment_score: -0.8,
    summary: "Experienced panic attack during work presentation — needs professional support.",
    created_at: "2025-05-07T18:00:00Z",
    updated_at: "2025-05-07T19:00:00Z"
  },
  {
    id: "332",
    title: "Project Cancelled After 3 Months (2)",
    content: "The project I've been working on for 3 months was cancelled. Feels like wasted effort.",
    tags: ["reflection"],
    sentiment_score: -0.83,
    summary: "Major project cancelled after 3 months, leaving work feeling purposeless.",
    created_at: "2025-05-10T17:00:00Z",
    updated_at: "2025-05-10T18:00:00Z"
  },
  {
    id: "333",
    title: "Comparison Spiral — Dark Thoughts (2)",
    content: "Fell into a comparison spiral on social media. Everyone looks more successful. I know it's not real but it stings.",
    tags: ["journaling"],
    sentiment_score: -0.81,
    summary: "Social media comparison spiral triggering feelings of inadequacy.",
    created_at: "2025-05-10T18:00:00Z",
    updated_at: "2025-05-10T19:00:00Z"
  },
  {
    id: "334",
    title: "Overwhelmed by Everything (2)",
    content: "Too many things at once. Work, health, relationships, side projects. Can't prioritize. Paralyzed.",
    tags: ["wellbeing"],
    sentiment_score: -0.81,
    summary: "Overwhelmed by competing demands across work, health, and personal life.",
    created_at: "2025-05-10T20:00:00Z",
    updated_at: "2025-05-10T21:00:00Z"
  },
  {
    id: "335",
    title: "Production Outage — My Fault (2)",
    content: "I caused a production outage. 45 minutes of downtime. Worst feeling. Need better deployment checks.",
    tags: ["engineering"],
    sentiment_score: -0.89,
    summary: "Caused 45-minute production outage, triggering deployment process review.",
    created_at: "2025-05-10T21:00:00Z",
    updated_at: "2025-05-10T22:00:00Z"
  },
  {
    id: "336",
    title: "Received Harsh Criticism (2)",
    content: "Got harsh feedback on my work in front of the team. Some valid, delivery was brutal. Need to process this.",
    tags: ["reflection"],
    sentiment_score: -0.76,
    summary: "Received harsh public criticism — processing validity vs delivery style.",
    created_at: "2025-05-13T23:00:00Z",
    updated_at: "2025-05-14T00:00:00Z"
  },
  {
    id: "337",
    title: "Loneliness After Moving Cities (2)",
    content: "Six months in the new city. Work is good but haven't built real friendships yet. Quietly lonely.",
    tags: ["wellbeing"],
    sentiment_score: -0.66,
    summary: "Experiencing quiet loneliness six months after relocating to new city.",
    created_at: "2025-05-14T13:00:00Z",
    updated_at: "2025-05-14T14:00:00Z"
  },
  {
    id: "338",
    title: "Rejected from Dream Job (2)",
    content: "Didn't get the job I really wanted. Made it to final round then no. Hard to accept.",
    tags: ["journaling"],
    sentiment_score: -0.85,
    summary: "Final round rejection from dream job opportunity, processing disappointment.",
    created_at: "2025-05-16T11:00:00Z",
    updated_at: "2025-05-16T12:00:00Z"
  },
  {
    id: "339",
    title: "Injury — Forced to Stop Training (2)",
    content: "Knee injury means no running for 6 weeks. Devastating after building momentum for months.",
    tags: ["fitness"],
    sentiment_score: -0.75,
    summary: "Knee injury forcing 6-week running break at height of training momentum.",
    created_at: "2025-05-16T19:00:00Z",
    updated_at: "2025-05-16T20:00:00Z"
  },
  {
    id: "340",
    title: "Unexpected Expense — Budget Blown (2)",
    content: "Car repair wiped out the savings buffer. Back to square one on the emergency fund.",
    tags: ["finance"],
    sentiment_score: -0.56,
    summary: "Unexpected car repair expenses depleted savings buffer completely.",
    created_at: "2025-05-16T23:00:00Z",
    updated_at: "2025-05-17T00:00:00Z"
  },
  {
    id: "341",
    title: "Exhausted — Running on Empty (2)",
    content: "Physically and mentally exhausted. Can't remember the last time I felt truly rested.",
    tags: ["wellbeing"],
    sentiment_score: -0.87,
    summary: "Deep exhaustion with no memory of feeling genuinely rested.",
    created_at: "2025-05-21T18:00:00Z",
    updated_at: "2025-05-21T19:00:00Z"
  },
  {
    id: "342",
    title: "Legacy Codebase Despair (2)",
    content: "Inheriting this legacy codebase is demoralising. No tests, no docs, spaghetti everywhere.",
    tags: ["engineering"],
    sentiment_score: -0.67,
    summary: "Inheriting undocumented, untested legacy codebase causing significant morale drop.",
    created_at: "2025-05-23T19:00:00Z",
    updated_at: "2025-05-23T20:00:00Z"
  },
  {
    id: "343",
    title: "Arrived in Lisbon (2)",
    content: "First day in Lisbon. Warm, beautiful, pastéis de nata for breakfast. Already love it.",
    tags: ["travel"],
    sentiment_score: 0.86,
    summary: "Arrived in Lisbon to perfect weather and iconic pastéis de nata.",
    created_at: "2025-05-25T14:00:00Z",
    updated_at: "2025-05-25T15:00:00Z"
  },
  {
    id: "344",
    title: "Dinner Party — Everyone Loved It (2)",
    content: "Hosted a dinner party for 8. The risotto was the highlight. Happy guests, great conversations.",
    tags: ["cooking"],
    sentiment_score: 0.92,
    summary: "Successful dinner party of 8 with standout risotto and great conversation.",
    created_at: "2025-05-27T16:00:00Z",
    updated_at: "2025-05-27T17:00:00Z"
  },
  {
    id: "345",
    title: "Photo Accepted by Magazine (2)",
    content: "A photo I submitted got accepted for publication. First time being published. Incredible feeling.",
    tags: ["photography"],
    sentiment_score: 0.97,
    summary: "First photography publication acceptance — photo selected for magazine.",
    created_at: "2025-05-28T16:00:00Z",
    updated_at: "2025-05-28T17:00:00Z"
  },
  {
    id: "346",
    title: "Concept Finally Clicked (2)",
    content: "Monads. Three months of confusion and today it just clicked. That moment is addictive.",
    tags: ["learning"],
    sentiment_score: 0.87,
    summary: "Monadic programming concept finally clicked after three months of confusion.",
    created_at: "2025-05-28T18:00:00Z",
    updated_at: "2025-05-28T19:00:00Z"
  },
  {
    id: "347",
    title: "Visualization Featured on Hacker News (2)",
    content: "Posted the D3 graph visualization on HN. Made the front page for 2 hours. 500 upvotes.",
    tags: ["d3"],
    sentiment_score: 0.83,
    summary: "D3 visualization reached Hacker News front page with 500 upvotes.",
    created_at: "2025-05-28T18:00:00Z",
    updated_at: "2025-05-28T19:00:00Z"
  },
  {
    id: "348",
    title: "Therapy Is Working (2)",
    content: "Noticing real changes from therapy. Catching negative thought patterns before they spiral.",
    tags: ["wellbeing"],
    sentiment_score: 0.65,
    summary: "Therapy producing measurable results in negative thought pattern recognition.",
    created_at: "2025-05-28T20:00:00Z",
    updated_at: "2025-05-28T21:00:00Z"
  },
  {
    id: "349",
    title: "Open Source PR Merged (2)",
    content: "First open source contribution merged into a popular library. Small fix but meaningful.",
    tags: ["engineering"],
    sentiment_score: 0.87,
    summary: "First open source contribution merged into widely-used library.",
    created_at: "2025-05-28T23:00:00Z",
    updated_at: "2025-05-29T00:00:00Z"
  },
  {
    id: "350",
    title: "Energy Levels Transformed (2)",
    content: "Three weeks of better nutrition and my energy levels are unrecognisable. No afternoon crash.",
    tags: ["nutrition"],
    sentiment_score: 0.8,
    summary: "Three weeks of improved nutrition eliminated afternoon energy crashes.",
    created_at: "2025-06-01T17:00:00Z",
    updated_at: "2025-06-01T18:00:00Z"
  },
  {
    id: "351",
    title: "Gratitude Practice — 90 Days (2)",
    content: "90 days of daily gratitude journaling. Genuine shift in how I default-interpret events.",
    tags: ["reflection"],
    sentiment_score: 0.82,
    summary: "90-day gratitude practice has shifted default interpretations to positive.",
    created_at: "2025-06-01T23:00:00Z",
    updated_at: "2025-06-02T00:00:00Z"
  },
  {
    id: "352",
    title: "App Performance 3x Faster (2)",
    content: "Lazy loading, code splitting, and virtual scrolling. App feels completely different now.",
    tags: ["vue"],
    sentiment_score: 0.77,
    summary: "Three performance optimizations delivered 3x app speed improvement.",
    created_at: "2025-06-06T11:00:00Z",
    updated_at: "2025-06-06T12:00:00Z"
  },
  {
    id: "353",
    title: "Zero-Downtime Deployment Working (2)",
    content: "Blue-green deployment configured and tested. Deployments are now invisible to users.",
    tags: ["docker"],
    sentiment_score: 0.66,
    summary: "Blue-green deployment enables zero-downtime releases invisible to users.",
    created_at: "2025-06-06T12:00:00Z",
    updated_at: "2025-06-06T13:00:00Z"
  },
  {
    id: "354",
    title: "First Full Week of Good Sleep (2)",
    content: "Seven consecutive nights of quality sleep. Mood, focus, and patience are dramatically better.",
    tags: ["sleep"],
    sentiment_score: 0.72,
    summary: "First week of consistent quality sleep producing dramatic mood and focus improvements.",
    created_at: "2025-06-06T15:00:00Z",
    updated_at: "2025-06-06T16:00:00Z"
  },
  {
    id: "355",
    title: "Marathon Training — Long Run PB (3)",
    content: "Longest run yet — 28km. Felt strong the whole way. Marathon is within reach.",
    tags: ["fitness"],
    sentiment_score: 1,
    summary: "Achieved 28km long run PB, marathon goal now feels realistic.",
    created_at: "2025-06-06T20:00:00Z",
    updated_at: "2025-06-06T21:00:00Z"
  },
  {
    id: "356",
    title: "Feature Shipped to Production (3)",
    content: "Big feature finally in production. Zero issues. The testing paid off.",
    tags: ["engineering"],
    sentiment_score: 0.93,
    summary: "Major feature shipped cleanly to production after thorough testing.",
    created_at: "2025-06-13T11:00:00Z",
    updated_at: "2025-06-13T12:00:00Z"
  },
  {
    id: "357",
    title: "Article Hit 1000 Views (3)",
    content: "The technical article crossed 1000 views. Community feedback is overwhelmingly positive.",
    tags: ["writing"],
    sentiment_score: 0.97,
    summary: "Technical article reached 1000 views with strong community reception.",
    created_at: "2025-06-13T13:00:00Z",
    updated_at: "2025-06-13T14:00:00Z"
  },
  {
    id: "358",
    title: "Sourdough Finally Perfect (3)",
    content: "After 12 attempts, the sourdough is perfect. Open crumb, crispy crust. Worth every failure.",
    tags: ["cooking"],
    sentiment_score: 0.99,
    summary: "Achieved perfect sourdough after 12 iterations — open crumb and crispy crust.",
    created_at: "2025-06-13T15:00:00Z",
    updated_at: "2025-06-13T16:00:00Z"
  },
  {
    id: "359",
    title: "Certification Passed (3)",
    content: "Passed the AWS Solutions Architect exam on first attempt. Months of studying paid off.",
    tags: ["learning"],
    sentiment_score: 0.86,
    summary: "Passed AWS Solutions Architect certification on first attempt.",
    created_at: "2025-06-13T22:00:00Z",
    updated_at: "2025-06-13T23:00:00Z"
  },
  {
    id: "360",
    title: "Best Week in a Long Time (3)",
    content: "Everything clicked this week. Work, health, relationships. Rare alignment.",
    tags: ["journaling"],
    sentiment_score: 0.96,
    summary: "Exceptional week with work, health, and relationships all aligned positively.",
    created_at: "2025-06-13T23:00:00Z",
    updated_at: "2025-06-14T00:00:00Z"
  },
  {
    id: "361",
    title: "Played First Open Mic Night (3)",
    content: "Performed at an open mic for the first time. Nervous but pulled it off. People clapped.",
    tags: ["music"],
    sentiment_score: 0.95,
    summary: "Successfully completed first open mic performance despite nerves.",
    created_at: "2025-06-16T14:00:00Z",
    updated_at: "2025-06-16T15:00:00Z"
  },
  {
    id: "362",
    title: "Got the Promotion (3)",
    content: "Officially promoted to senior. A year of hard work recognized. Feeling proud.",
    tags: ["reflection"],
    sentiment_score: 0.91,
    summary: "Received senior promotion after a year of consistent effort and results.",
    created_at: "2025-06-16T19:00:00Z",
    updated_at: "2025-06-16T20:00:00Z"
  },
  {
    id: "363",
    title: "Refactor Complete — Code Quality Up (3)",
    content: "Finished the component refactor. Test coverage went from 40% to 78%. Feels much better.",
    tags: ["engineering","vue"],
    sentiment_score: 0.6,
    summary: "Component refactor improved test coverage from 40% to 78%.",
    created_at: "2025-06-16T19:00:00Z",
    updated_at: "2025-06-16T20:00:00Z"
  },
  {
    id: "364",
    title: "Finished Atomic Habits (3)",
    content: "Completed Atomic Habits. The 1% better every day concept is deceptively simple but powerful.",
    tags: ["reading"],
    sentiment_score: 0.66,
    summary: "Atomic Habits reinforced compound improvement through 1% daily gains.",
    created_at: "2025-06-18T18:00:00Z",
    updated_at: "2025-06-18T19:00:00Z"
  },
  {
    id: "365",
    title: "Sunrise Hike — Worth the 4am Alarm (3)",
    content: "Woke at 4am for a sunrise hike. The view at the top in golden light was surreal.",
    tags: ["fitness","hiking"],
    sentiment_score: 0.72,
    summary: "Early morning sunrise hike delivered breathtaking light views.",
    created_at: "2025-06-19T15:00:00Z",
    updated_at: "2025-06-19T16:00:00Z"
  },
  {
    id: "366",
    title: "Inbox Zero Achieved (3)",
    content: "Cleared my inbox for the first time in 8 months. Took 3 hours. Feels like a fresh start.",
    tags: ["productivity"],
    sentiment_score: 0.55,
    summary: "Achieved inbox zero after 8 months, creating mental clarity.",
    created_at: "2025-06-19T17:00:00Z",
    updated_at: "2025-06-19T18:00:00Z"
  },
  {
    id: "367",
    title: "API Response Time Improved 60% (3)",
    content: "Query optimization and caching cut API response from 800ms to 320ms. Significant win.",
    tags: ["nodejs"],
    sentiment_score: 0.65,
    summary: "API optimization reduced response time by 60% through caching and query tuning.",
    created_at: "2025-06-23T13:00:00Z",
    updated_at: "2025-06-23T14:00:00Z"
  },
  {
    id: "368",
    title: "60-Day Meditation Streak (3)",
    content: "Hit 60 days consecutive meditation. The practice is now automatic — like brushing teeth.",
    tags: ["meditation"],
    sentiment_score: 0.68,
    summary: "60-day meditation streak reached, practice now deeply habitual.",
    created_at: "2025-06-23T20:00:00Z",
    updated_at: "2025-06-23T21:00:00Z"
  },
  {
    id: "369",
    title: "Design System v2 Launched (3)",
    content: "New design system adopted by all three product teams. Consistency across products finally.",
    tags: ["design"],
    sentiment_score: 0.63,
    summary: "Design system v2 successfully adopted across all three product teams.",
    created_at: "2025-06-26T17:00:00Z",
    updated_at: "2025-06-26T18:00:00Z"
  },
  {
    id: "370",
    title: "Investments Up 18% YTD (3)",
    content: "Portfolio review: 18% year-to-date return. Index funds boring but effective.",
    tags: ["finance"],
    sentiment_score: 0.66,
    summary: "Portfolio achieved 18% YTD return through consistent index fund strategy.",
    created_at: "2025-07-02T11:00:00Z",
    updated_at: "2025-07-02T12:00:00Z"
  },
  {
    id: "371",
    title: "Long Bug Hunt — Finally Found It (3)",
    content: "Spent 6 hours on a bug that turned out to be a timezone issue. Frustrating but resolved.",
    tags: ["engineering"],
    sentiment_score: 0.17,
    summary: "6-hour debugging session resolved timezone-related bug.",
    created_at: "2025-07-02T11:00:00Z",
    updated_at: "2025-07-02T12:00:00Z"
  },
  {
    id: "372",
    title: "Feeling Stuck Professionally (3)",
    content: "Not sure where to go next in my career. Multiple paths, none feel clearly right.",
    tags: ["reflection"],
    sentiment_score: -0.13,
    summary: "Experiencing career direction uncertainty with multiple viable but unclear paths.",
    created_at: "2025-07-02T12:00:00Z",
    updated_at: "2025-07-02T13:00:00Z"
  },
  {
    id: "373",
    title: "Rainy Sunday — Low Energy (3)",
    content: "Low energy day. Not productive but not terrible either. Sometimes rest looks like this.",
    tags: ["journaling"],
    sentiment_score: 0.03,
    summary: "Low energy rest day — unproductive but necessary recovery.",
    created_at: "2025-07-02T18:00:00Z",
    updated_at: "2025-07-02T19:00:00Z"
  },
  {
    id: "374",
    title: "Sleep Quality Declining (3)",
    content: "Bad sleep for the third night. Affecting mood and focus. Need to fix the root cause.",
    tags: ["wellbeing"],
    sentiment_score: -0.08,
    summary: "Three nights of poor sleep beginning to impact mood and concentration.",
    created_at: "2025-07-02T19:00:00Z",
    updated_at: "2025-07-02T20:00:00Z"
  },
  {
    id: "375",
    title: "Complex Topic — Progress Slow (3)",
    content: "Trying to understand distributed consensus algorithms. Progress is slow. It clicks, then un-clicks.",
    tags: ["learning"],
    sentiment_score: 0.06,
    summary: "Struggling with distributed consensus algorithms, progress inconsistent.",
    created_at: "2025-07-03T16:00:00Z",
    updated_at: "2025-07-03T17:00:00Z"
  },
  {
    id: "376",
    title: "Missed Two Weeks — Starting Over (3)",
    content: "Travel broke the training routine. Back to basics. The first run back is always the hardest.",
    tags: ["fitness"],
    sentiment_score: 0.07,
    summary: "Resumed training after travel break — restarting base-building phase.",
    created_at: "2025-07-04T13:00:00Z",
    updated_at: "2025-07-04T14:00:00Z"
  },
  {
    id: "377",
    title: "Distracted Day — Nothing Shipped (3)",
    content: "Constant interruptions today. Context switching destroyed focus. Need to protect deep work time.",
    tags: ["productivity"],
    sentiment_score: -0.27,
    summary: "Interruption-heavy day with context switching preventing meaningful progress.",
    created_at: "2025-07-04T14:00:00Z",
    updated_at: "2025-07-04T15:00:00Z"
  },
  {
    id: "378",
    title: "Panic Attack at Work (3)",
    content: "Had a panic attack during a presentation. Embarrassing and scary. Need to address this properly.",
    tags: ["wellbeing"],
    sentiment_score: -0.78,
    summary: "Experienced panic attack during work presentation — needs professional support.",
    created_at: "2025-07-06T12:00:00Z",
    updated_at: "2025-07-06T13:00:00Z"
  },
  {
    id: "379",
    title: "Project Cancelled After 3 Months (3)",
    content: "The project I've been working on for 3 months was cancelled. Feels like wasted effort.",
    tags: ["reflection"],
    sentiment_score: -0.79,
    summary: "Major project cancelled after 3 months, leaving work feeling purposeless.",
    created_at: "2025-07-06T13:00:00Z",
    updated_at: "2025-07-06T14:00:00Z"
  },
  {
    id: "380",
    title: "Comparison Spiral — Dark Thoughts (3)",
    content: "Fell into a comparison spiral on social media. Everyone looks more successful. I know it's not real but it stings.",
    tags: ["journaling"],
    sentiment_score: -0.68,
    summary: "Social media comparison spiral triggering feelings of inadequacy.",
    created_at: "2025-07-09T15:00:00Z",
    updated_at: "2025-07-09T16:00:00Z"
  },
  {
    id: "381",
    title: "Overwhelmed by Everything (3)",
    content: "Too many things at once. Work, health, relationships, side projects. Can't prioritize. Paralyzed.",
    tags: ["wellbeing"],
    sentiment_score: -0.86,
    summary: "Overwhelmed by competing demands across work, health, and personal life.",
    created_at: "2025-07-13T18:00:00Z",
    updated_at: "2025-07-13T19:00:00Z"
  },
  {
    id: "382",
    title: "Production Outage — My Fault (3)",
    content: "I caused a production outage. 45 minutes of downtime. Worst feeling. Need better deployment checks.",
    tags: ["engineering"],
    sentiment_score: -0.93,
    summary: "Caused 45-minute production outage, triggering deployment process review.",
    created_at: "2025-07-13T19:00:00Z",
    updated_at: "2025-07-13T20:00:00Z"
  },
  {
    id: "383",
    title: "Received Harsh Criticism (3)",
    content: "Got harsh feedback on my work in front of the team. Some valid, delivery was brutal. Need to process this.",
    tags: ["reflection"],
    sentiment_score: -0.72,
    summary: "Received harsh public criticism — processing validity vs delivery style.",
    created_at: "2025-07-13T20:00:00Z",
    updated_at: "2025-07-13T21:00:00Z"
  },
  {
    id: "384",
    title: "Loneliness After Moving Cities (3)",
    content: "Six months in the new city. Work is good but haven't built real friendships yet. Quietly lonely.",
    tags: ["wellbeing"],
    sentiment_score: -0.64,
    summary: "Experiencing quiet loneliness six months after relocating to new city.",
    created_at: "2025-07-18T13:00:00Z",
    updated_at: "2025-07-18T14:00:00Z"
  },
  {
    id: "385",
    title: "Rejected from Dream Job (3)",
    content: "Didn't get the job I really wanted. Made it to final round then no. Hard to accept.",
    tags: ["journaling"],
    sentiment_score: -0.92,
    summary: "Final round rejection from dream job opportunity, processing disappointment.",
    created_at: "2025-07-18T20:00:00Z",
    updated_at: "2025-07-18T21:00:00Z"
  },
  {
    id: "386",
    title: "Injury — Forced to Stop Training (3)",
    content: "Knee injury means no running for 6 weeks. Devastating after building momentum for months.",
    tags: ["fitness"],
    sentiment_score: -0.8,
    summary: "Knee injury forcing 6-week running break at height of training momentum.",
    created_at: "2025-07-18T22:00:00Z",
    updated_at: "2025-07-18T23:00:00Z"
  },
  {
    id: "387",
    title: "Unexpected Expense — Budget Blown (3)",
    content: "Car repair wiped out the savings buffer. Back to square one on the emergency fund.",
    tags: ["finance"],
    sentiment_score: -0.61,
    summary: "Unexpected car repair expenses depleted savings buffer completely.",
    created_at: "2025-07-20T11:00:00Z",
    updated_at: "2025-07-20T12:00:00Z"
  },
  {
    id: "388",
    title: "Exhausted — Running on Empty (3)",
    content: "Physically and mentally exhausted. Can't remember the last time I felt truly rested.",
    tags: ["wellbeing"],
    sentiment_score: -0.78,
    summary: "Deep exhaustion with no memory of feeling genuinely rested.",
    created_at: "2025-07-24T16:00:00Z",
    updated_at: "2025-07-24T17:00:00Z"
  },
  {
    id: "389",
    title: "Legacy Codebase Despair (3)",
    content: "Inheriting this legacy codebase is demoralising. No tests, no docs, spaghetti everywhere.",
    tags: ["engineering"],
    sentiment_score: -0.76,
    summary: "Inheriting undocumented, untested legacy codebase causing significant morale drop.",
    created_at: "2025-07-24T16:00:00Z",
    updated_at: "2025-07-24T17:00:00Z"
  },
  {
    id: "390",
    title: "Arrived in Lisbon (3)",
    content: "First day in Lisbon. Warm, beautiful, pastéis de nata for breakfast. Already love it.",
    tags: ["travel"],
    sentiment_score: 0.88,
    summary: "Arrived in Lisbon to perfect weather and iconic pastéis de nata.",
    created_at: "2025-07-26T17:00:00Z",
    updated_at: "2025-07-26T18:00:00Z"
  },
  {
    id: "391",
    title: "Dinner Party — Everyone Loved It (3)",
    content: "Hosted a dinner party for 8. The risotto was the highlight. Happy guests, great conversations.",
    tags: ["cooking"],
    sentiment_score: 0.91,
    summary: "Successful dinner party of 8 with standout risotto and great conversation.",
    created_at: "2025-07-26T22:00:00Z",
    updated_at: "2025-07-26T23:00:00Z"
  },
  {
    id: "392",
    title: "Photo Accepted by Magazine (3)",
    content: "A photo I submitted got accepted for publication. First time being published. Incredible feeling.",
    tags: ["photography"],
    sentiment_score: 0.89,
    summary: "First photography publication acceptance — photo selected for magazine.",
    created_at: "2025-07-27T19:00:00Z",
    updated_at: "2025-07-27T20:00:00Z"
  },
  {
    id: "393",
    title: "Concept Finally Clicked (3)",
    content: "Monads. Three months of confusion and today it just clicked. That moment is addictive.",
    tags: ["learning"],
    sentiment_score: 0.85,
    summary: "Monadic programming concept finally clicked after three months of confusion.",
    created_at: "2025-07-27T22:00:00Z",
    updated_at: "2025-07-27T23:00:00Z"
  },
  {
    id: "394",
    title: "Visualization Featured on Hacker News (3)",
    content: "Posted the D3 graph visualization on HN. Made the front page for 2 hours. 500 upvotes.",
    tags: ["d3"],
    sentiment_score: 0.84,
    summary: "D3 visualization reached Hacker News front page with 500 upvotes.",
    created_at: "2025-07-27T23:00:00Z",
    updated_at: "2025-07-28T00:00:00Z"
  },
  {
    id: "395",
    title: "Therapy Is Working (3)",
    content: "Noticing real changes from therapy. Catching negative thought patterns before they spiral.",
    tags: ["wellbeing"],
    sentiment_score: 0.74,
    summary: "Therapy producing measurable results in negative thought pattern recognition.",
    created_at: "2025-07-31T12:00:00Z",
    updated_at: "2025-07-31T13:00:00Z"
  },
  {
    id: "396",
    title: "Open Source PR Merged (3)",
    content: "First open source contribution merged into a popular library. Small fix but meaningful.",
    tags: ["engineering"],
    sentiment_score: 0.8,
    summary: "First open source contribution merged into widely-used library.",
    created_at: "2025-07-31T15:00:00Z",
    updated_at: "2025-07-31T16:00:00Z"
  },
  {
    id: "397",
    title: "Energy Levels Transformed (3)",
    content: "Three weeks of better nutrition and my energy levels are unrecognisable. No afternoon crash.",
    tags: ["nutrition"],
    sentiment_score: 0.77,
    summary: "Three weeks of improved nutrition eliminated afternoon energy crashes.",
    created_at: "2025-07-31T17:00:00Z",
    updated_at: "2025-07-31T18:00:00Z"
  },
  {
    id: "398",
    title: "Gratitude Practice — 90 Days (3)",
    content: "90 days of daily gratitude journaling. Genuine shift in how I default-interpret events.",
    tags: ["reflection"],
    sentiment_score: 0.84,
    summary: "90-day gratitude practice has shifted default interpretations to positive.",
    created_at: "2025-07-31T19:00:00Z",
    updated_at: "2025-07-31T20:00:00Z"
  },
  {
    id: "399",
    title: "App Performance 3x Faster (3)",
    content: "Lazy loading, code splitting, and virtual scrolling. App feels completely different now.",
    tags: ["vue"],
    sentiment_score: 0.81,
    summary: "Three performance optimizations delivered 3x app speed improvement.",
    created_at: "2025-07-31T20:00:00Z",
    updated_at: "2025-07-31T21:00:00Z"
  },
  {
    id: "400",
    title: "Zero-Downtime Deployment Working (3)",
    content: "Blue-green deployment configured and tested. Deployments are now invisible to users.",
    tags: ["docker"],
    sentiment_score: 0.65,
    summary: "Blue-green deployment enables zero-downtime releases invisible to users.",
    created_at: "2025-08-02T12:00:00Z",
    updated_at: "2025-08-02T13:00:00Z"
  },
  {
    id: "401",
    title: "First Full Week of Good Sleep (3)",
    content: "Seven consecutive nights of quality sleep. Mood, focus, and patience are dramatically better.",
    tags: ["sleep"],
    sentiment_score: 0.72,
    summary: "First week of consistent quality sleep producing dramatic mood and focus improvements.",
    created_at: "2025-08-02T13:00:00Z",
    updated_at: "2025-08-02T14:00:00Z"
  },
  {
    id: "402",
    title: "Marathon Training — Long Run PB (4)",
    content: "Longest run yet — 28km. Felt strong the whole way. Marathon is within reach.",
    tags: ["fitness"],
    sentiment_score: 0.88,
    summary: "Achieved 28km long run PB, marathon goal now feels realistic.",
    created_at: "2025-08-02T18:00:00Z",
    updated_at: "2025-08-02T19:00:00Z"
  },
  {
    id: "403",
    title: "Feature Shipped to Production (4)",
    content: "Big feature finally in production. Zero issues. The testing paid off.",
    tags: ["engineering"],
    sentiment_score: 0.83,
    summary: "Major feature shipped cleanly to production after thorough testing.",
    created_at: "2025-08-04T12:00:00Z",
    updated_at: "2025-08-04T13:00:00Z"
  },
  {
    id: "404",
    title: "Article Hit 1000 Views (4)",
    content: "The technical article crossed 1000 views. Community feedback is overwhelmingly positive.",
    tags: ["writing"],
    sentiment_score: 0.91,
    summary: "Technical article reached 1000 views with strong community reception.",
    created_at: "2025-08-04T15:00:00Z",
    updated_at: "2025-08-04T16:00:00Z"
  },
  {
    id: "405",
    title: "Sourdough Finally Perfect (4)",
    content: "After 12 attempts, the sourdough is perfect. Open crumb, crispy crust. Worth every failure.",
    tags: ["cooking"],
    sentiment_score: 0.98,
    summary: "Achieved perfect sourdough after 12 iterations — open crumb and crispy crust.",
    created_at: "2025-08-04T17:00:00Z",
    updated_at: "2025-08-04T18:00:00Z"
  },
  {
    id: "406",
    title: "Certification Passed (4)",
    content: "Passed the AWS Solutions Architect exam on first attempt. Months of studying paid off.",
    tags: ["learning"],
    sentiment_score: 0.96,
    summary: "Passed AWS Solutions Architect certification on first attempt.",
    created_at: "2025-08-04T17:00:00Z",
    updated_at: "2025-08-04T18:00:00Z"
  },
  {
    id: "407",
    title: "Best Week in a Long Time (4)",
    content: "Everything clicked this week. Work, health, relationships. Rare alignment.",
    tags: ["journaling"],
    sentiment_score: 0.89,
    summary: "Exceptional week with work, health, and relationships all aligned positively.",
    created_at: "2025-08-04T23:00:00Z",
    updated_at: "2025-08-05T00:00:00Z"
  },
  {
    id: "408",
    title: "Played First Open Mic Night (4)",
    content: "Performed at an open mic for the first time. Nervous but pulled it off. People clapped.",
    tags: ["music"],
    sentiment_score: 0.82,
    summary: "Successfully completed first open mic performance despite nerves.",
    created_at: "2025-08-09T19:00:00Z",
    updated_at: "2025-08-09T20:00:00Z"
  },
  {
    id: "409",
    title: "Got the Promotion (4)",
    content: "Officially promoted to senior. A year of hard work recognized. Feeling proud.",
    tags: ["reflection"],
    sentiment_score: 0.96,
    summary: "Received senior promotion after a year of consistent effort and results.",
    created_at: "2025-08-09T19:00:00Z",
    updated_at: "2025-08-09T20:00:00Z"
  },
  {
    id: "410",
    title: "Refactor Complete — Code Quality Up (4)",
    content: "Finished the component refactor. Test coverage went from 40% to 78%. Feels much better.",
    tags: ["engineering","vue"],
    sentiment_score: 0.63,
    summary: "Component refactor improved test coverage from 40% to 78%.",
    created_at: "2025-08-10T23:00:00Z",
    updated_at: "2025-08-11T00:00:00Z"
  },
  {
    id: "411",
    title: "Finished Atomic Habits (4)",
    content: "Completed Atomic Habits. The 1% better every day concept is deceptively simple but powerful.",
    tags: ["reading"],
    sentiment_score: 0.72,
    summary: "Atomic Habits reinforced compound improvement through 1% daily gains.",
    created_at: "2025-08-11T18:00:00Z",
    updated_at: "2025-08-11T19:00:00Z"
  },
  {
    id: "412",
    title: "Sunrise Hike — Worth the 4am Alarm (4)",
    content: "Woke at 4am for a sunrise hike. The view at the top in golden light was surreal.",
    tags: ["fitness","hiking"],
    sentiment_score: 0.79,
    summary: "Early morning sunrise hike delivered breathtaking light views.",
    created_at: "2025-08-13T21:00:00Z",
    updated_at: "2025-08-13T22:00:00Z"
  },
  {
    id: "413",
    title: "Inbox Zero Achieved (4)",
    content: "Cleared my inbox for the first time in 8 months. Took 3 hours. Feels like a fresh start.",
    tags: ["productivity"],
    sentiment_score: 0.63,
    summary: "Achieved inbox zero after 8 months, creating mental clarity.",
    created_at: "2025-08-15T19:00:00Z",
    updated_at: "2025-08-15T20:00:00Z"
  },
  {
    id: "414",
    title: "API Response Time Improved 60% (4)",
    content: "Query optimization and caching cut API response from 800ms to 320ms. Significant win.",
    tags: ["nodejs"],
    sentiment_score: 0.65,
    summary: "API optimization reduced response time by 60% through caching and query tuning.",
    created_at: "2025-08-16T11:00:00Z",
    updated_at: "2025-08-16T12:00:00Z"
  },
  {
    id: "415",
    title: "60-Day Meditation Streak (4)",
    content: "Hit 60 days consecutive meditation. The practice is now automatic — like brushing teeth.",
    tags: ["meditation"],
    sentiment_score: 0.74,
    summary: "60-day meditation streak reached, practice now deeply habitual.",
    created_at: "2025-08-16T13:00:00Z",
    updated_at: "2025-08-16T14:00:00Z"
  },
  {
    id: "416",
    title: "Design System v2 Launched (4)",
    content: "New design system adopted by all three product teams. Consistency across products finally.",
    tags: ["design"],
    sentiment_score: 0.74,
    summary: "Design system v2 successfully adopted across all three product teams.",
    created_at: "2025-08-16T14:00:00Z",
    updated_at: "2025-08-16T15:00:00Z"
  },
  {
    id: "417",
    title: "Investments Up 18% YTD (4)",
    content: "Portfolio review: 18% year-to-date return. Index funds boring but effective.",
    tags: ["finance"],
    sentiment_score: 0.63,
    summary: "Portfolio achieved 18% YTD return through consistent index fund strategy.",
    created_at: "2025-08-16T17:00:00Z",
    updated_at: "2025-08-16T18:00:00Z"
  },
  {
    id: "418",
    title: "Long Bug Hunt — Finally Found It (4)",
    content: "Spent 6 hours on a bug that turned out to be a timezone issue. Frustrating but resolved.",
    tags: ["engineering"],
    sentiment_score: 0.12,
    summary: "6-hour debugging session resolved timezone-related bug.",
    created_at: "2025-08-16T18:00:00Z",
    updated_at: "2025-08-16T19:00:00Z"
  },
  {
    id: "419",
    title: "Feeling Stuck Professionally (4)",
    content: "Not sure where to go next in my career. Multiple paths, none feel clearly right.",
    tags: ["reflection"],
    sentiment_score: -0.05,
    summary: "Experiencing career direction uncertainty with multiple viable but unclear paths.",
    created_at: "2025-08-22T17:00:00Z",
    updated_at: "2025-08-22T18:00:00Z"
  },
  {
    id: "420",
    title: "Rainy Sunday — Low Energy (4)",
    content: "Low energy day. Not productive but not terrible either. Sometimes rest looks like this.",
    tags: ["journaling"],
    sentiment_score: 0.1,
    summary: "Low energy rest day — unproductive but necessary recovery.",
    created_at: "2025-08-23T17:00:00Z",
    updated_at: "2025-08-23T18:00:00Z"
  },
  {
    id: "421",
    title: "Sleep Quality Declining (4)",
    content: "Bad sleep for the third night. Affecting mood and focus. Need to fix the root cause.",
    tags: ["wellbeing"],
    sentiment_score: -0.18,
    summary: "Three nights of poor sleep beginning to impact mood and concentration.",
    created_at: "2025-08-29T15:00:00Z",
    updated_at: "2025-08-29T16:00:00Z"
  },
  {
    id: "422",
    title: "Complex Topic — Progress Slow (4)",
    content: "Trying to understand distributed consensus algorithms. Progress is slow. It clicks, then un-clicks.",
    tags: ["learning"],
    sentiment_score: 0.13,
    summary: "Struggling with distributed consensus algorithms, progress inconsistent.",
    created_at: "2025-08-29T15:00:00Z",
    updated_at: "2025-08-29T16:00:00Z"
  },
  {
    id: "423",
    title: "Missed Two Weeks — Starting Over (4)",
    content: "Travel broke the training routine. Back to basics. The first run back is always the hardest.",
    tags: ["fitness"],
    sentiment_score: 0.02,
    summary: "Resumed training after travel break — restarting base-building phase.",
    created_at: "2025-08-29T16:00:00Z",
    updated_at: "2025-08-29T17:00:00Z"
  },
  {
    id: "424",
    title: "Distracted Day — Nothing Shipped (4)",
    content: "Constant interruptions today. Context switching destroyed focus. Need to protect deep work time.",
    tags: ["productivity"],
    sentiment_score: -0.13,
    summary: "Interruption-heavy day with context switching preventing meaningful progress.",
    created_at: "2025-08-29T21:00:00Z",
    updated_at: "2025-08-29T22:00:00Z"
  },
  {
    id: "425",
    title: "Panic Attack at Work (4)",
    content: "Had a panic attack during a presentation. Embarrassing and scary. Need to address this properly.",
    tags: ["wellbeing"],
    sentiment_score: -0.82,
    summary: "Experienced panic attack during work presentation — needs professional support.",
    created_at: "2025-09-02T16:00:00Z",
    updated_at: "2025-09-02T17:00:00Z"
  },
  {
    id: "426",
    title: "Project Cancelled After 3 Months (4)",
    content: "The project I've been working on for 3 months was cancelled. Feels like wasted effort.",
    tags: ["reflection"],
    sentiment_score: -0.83,
    summary: "Major project cancelled after 3 months, leaving work feeling purposeless.",
    created_at: "2025-09-02T20:00:00Z",
    updated_at: "2025-09-02T21:00:00Z"
  },
  {
    id: "427",
    title: "Comparison Spiral — Dark Thoughts (4)",
    content: "Fell into a comparison spiral on social media. Everyone looks more successful. I know it's not real but it stings.",
    tags: ["journaling"],
    sentiment_score: -0.75,
    summary: "Social media comparison spiral triggering feelings of inadequacy.",
    created_at: "2025-09-02T20:00:00Z",
    updated_at: "2025-09-02T21:00:00Z"
  },
  {
    id: "428",
    title: "Overwhelmed by Everything (4)",
    content: "Too many things at once. Work, health, relationships, side projects. Can't prioritize. Paralyzed.",
    tags: ["wellbeing"],
    sentiment_score: -0.73,
    summary: "Overwhelmed by competing demands across work, health, and personal life.",
    created_at: "2025-09-02T21:00:00Z",
    updated_at: "2025-09-02T22:00:00Z"
  },
  {
    id: "429",
    title: "Production Outage — My Fault (4)",
    content: "I caused a production outage. 45 minutes of downtime. Worst feeling. Need better deployment checks.",
    tags: ["engineering"],
    sentiment_score: -0.97,
    summary: "Caused 45-minute production outage, triggering deployment process review.",
    created_at: "2025-09-02T23:00:00Z",
    updated_at: "2025-09-03T00:00:00Z"
  },
  {
    id: "430",
    title: "Received Harsh Criticism (4)",
    content: "Got harsh feedback on my work in front of the team. Some valid, delivery was brutal. Need to process this.",
    tags: ["reflection"],
    sentiment_score: -0.75,
    summary: "Received harsh public criticism — processing validity vs delivery style.",
    created_at: "2025-09-03T11:00:00Z",
    updated_at: "2025-09-03T12:00:00Z"
  },
  {
    id: "431",
    title: "Loneliness After Moving Cities (4)",
    content: "Six months in the new city. Work is good but haven't built real friendships yet. Quietly lonely.",
    tags: ["wellbeing"],
    sentiment_score: -0.72,
    summary: "Experiencing quiet loneliness six months after relocating to new city.",
    created_at: "2025-09-03T12:00:00Z",
    updated_at: "2025-09-03T13:00:00Z"
  },
  {
    id: "432",
    title: "Rejected from Dream Job (4)",
    content: "Didn't get the job I really wanted. Made it to final round then no. Hard to accept.",
    tags: ["journaling"],
    sentiment_score: -0.87,
    summary: "Final round rejection from dream job opportunity, processing disappointment.",
    created_at: "2025-09-03T16:00:00Z",
    updated_at: "2025-09-03T17:00:00Z"
  },
  {
    id: "433",
    title: "Injury — Forced to Stop Training (4)",
    content: "Knee injury means no running for 6 weeks. Devastating after building momentum for months.",
    tags: ["fitness"],
    sentiment_score: -0.73,
    summary: "Knee injury forcing 6-week running break at height of training momentum.",
    created_at: "2025-09-03T21:00:00Z",
    updated_at: "2025-09-03T22:00:00Z"
  },
  {
    id: "434",
    title: "Unexpected Expense — Budget Blown (4)",
    content: "Car repair wiped out the savings buffer. Back to square one on the emergency fund.",
    tags: ["finance"],
    sentiment_score: -0.56,
    summary: "Unexpected car repair expenses depleted savings buffer completely.",
    created_at: "2025-09-03T23:00:00Z",
    updated_at: "2025-09-04T00:00:00Z"
  },
  {
    id: "435",
    title: "Exhausted — Running on Empty (4)",
    content: "Physically and mentally exhausted. Can't remember the last time I felt truly rested.",
    tags: ["wellbeing"],
    sentiment_score: -0.73,
    summary: "Deep exhaustion with no memory of feeling genuinely rested.",
    created_at: "2025-09-08T13:00:00Z",
    updated_at: "2025-09-08T14:00:00Z"
  },
  {
    id: "436",
    title: "Legacy Codebase Despair (4)",
    content: "Inheriting this legacy codebase is demoralising. No tests, no docs, spaghetti everywhere.",
    tags: ["engineering"],
    sentiment_score: -0.68,
    summary: "Inheriting undocumented, untested legacy codebase causing significant morale drop.",
    created_at: "2025-09-08T15:00:00Z",
    updated_at: "2025-09-08T16:00:00Z"
  },
  {
    id: "437",
    title: "Arrived in Lisbon (4)",
    content: "First day in Lisbon. Warm, beautiful, pastéis de nata for breakfast. Already love it.",
    tags: ["travel"],
    sentiment_score: 0.92,
    summary: "Arrived in Lisbon to perfect weather and iconic pastéis de nata.",
    created_at: "2025-09-08T16:00:00Z",
    updated_at: "2025-09-08T17:00:00Z"
  },
  {
    id: "438",
    title: "Dinner Party — Everyone Loved It (4)",
    content: "Hosted a dinner party for 8. The risotto was the highlight. Happy guests, great conversations.",
    tags: ["cooking"],
    sentiment_score: 0.82,
    summary: "Successful dinner party of 8 with standout risotto and great conversation.",
    created_at: "2025-09-08T18:00:00Z",
    updated_at: "2025-09-08T19:00:00Z"
  },
  {
    id: "439",
    title: "Photo Accepted by Magazine (4)",
    content: "A photo I submitted got accepted for publication. First time being published. Incredible feeling.",
    tags: ["photography"],
    sentiment_score: 0.84,
    summary: "First photography publication acceptance — photo selected for magazine.",
    created_at: "2025-09-08T19:00:00Z",
    updated_at: "2025-09-08T20:00:00Z"
  },
  {
    id: "440",
    title: "Concept Finally Clicked (4)",
    content: "Monads. Three months of confusion and today it just clicked. That moment is addictive.",
    tags: ["learning"],
    sentiment_score: 0.86,
    summary: "Monadic programming concept finally clicked after three months of confusion.",
    created_at: "2025-09-10T23:00:00Z",
    updated_at: "2025-09-11T00:00:00Z"
  },
  {
    id: "441",
    title: "Visualization Featured on Hacker News (4)",
    content: "Posted the D3 graph visualization on HN. Made the front page for 2 hours. 500 upvotes.",
    tags: ["d3"],
    sentiment_score: 0.9,
    summary: "D3 visualization reached Hacker News front page with 500 upvotes.",
    created_at: "2025-09-18T14:00:00Z",
    updated_at: "2025-09-18T15:00:00Z"
  },
  {
    id: "442",
    title: "Therapy Is Working (4)",
    content: "Noticing real changes from therapy. Catching negative thought patterns before they spiral.",
    tags: ["wellbeing"],
    sentiment_score: 0.64,
    summary: "Therapy producing measurable results in negative thought pattern recognition.",
    created_at: "2025-09-20T20:00:00Z",
    updated_at: "2025-09-20T21:00:00Z"
  },
  {
    id: "443",
    title: "Open Source PR Merged (4)",
    content: "First open source contribution merged into a popular library. Small fix but meaningful.",
    tags: ["engineering"],
    sentiment_score: 0.81,
    summary: "First open source contribution merged into widely-used library.",
    created_at: "2025-09-22T18:00:00Z",
    updated_at: "2025-09-22T19:00:00Z"
  },
  {
    id: "444",
    title: "Energy Levels Transformed (4)",
    content: "Three weeks of better nutrition and my energy levels are unrecognisable. No afternoon crash.",
    tags: ["nutrition"],
    sentiment_score: 0.79,
    summary: "Three weeks of improved nutrition eliminated afternoon energy crashes.",
    created_at: "2025-09-24T11:00:00Z",
    updated_at: "2025-09-24T12:00:00Z"
  },
  {
    id: "445",
    title: "Gratitude Practice — 90 Days (4)",
    content: "90 days of daily gratitude journaling. Genuine shift in how I default-interpret events.",
    tags: ["reflection"],
    sentiment_score: 0.83,
    summary: "90-day gratitude practice has shifted default interpretations to positive.",
    created_at: "2025-09-24T13:00:00Z",
    updated_at: "2025-09-24T14:00:00Z"
  },
  {
    id: "446",
    title: "App Performance 3x Faster (4)",
    content: "Lazy loading, code splitting, and virtual scrolling. App feels completely different now.",
    tags: ["vue"],
    sentiment_score: 0.75,
    summary: "Three performance optimizations delivered 3x app speed improvement.",
    created_at: "2025-09-24T18:00:00Z",
    updated_at: "2025-09-24T19:00:00Z"
  },
  {
    id: "447",
    title: "Zero-Downtime Deployment Working (4)",
    content: "Blue-green deployment configured and tested. Deployments are now invisible to users.",
    tags: ["docker"],
    sentiment_score: 0.7,
    summary: "Blue-green deployment enables zero-downtime releases invisible to users.",
    created_at: "2025-09-24T23:00:00Z",
    updated_at: "2025-09-25T00:00:00Z"
  },
  {
    id: "448",
    title: "First Full Week of Good Sleep (4)",
    content: "Seven consecutive nights of quality sleep. Mood, focus, and patience are dramatically better.",
    tags: ["sleep"],
    sentiment_score: 0.81,
    summary: "First week of consistent quality sleep producing dramatic mood and focus improvements.",
    created_at: "2025-09-27T15:00:00Z",
    updated_at: "2025-09-27T16:00:00Z"
  },
  {
    id: "449",
    title: "Marathon Training — Long Run PB (5)",
    content: "Longest run yet — 28km. Felt strong the whole way. Marathon is within reach.",
    tags: ["fitness"],
    sentiment_score: 0.88,
    summary: "Achieved 28km long run PB, marathon goal now feels realistic.",
    created_at: "2025-09-27T18:00:00Z",
    updated_at: "2025-09-27T19:00:00Z"
  },
  {
    id: "450",
    title: "Feature Shipped to Production (5)",
    content: "Big feature finally in production. Zero issues. The testing paid off.",
    tags: ["engineering"],
    sentiment_score: 0.86,
    summary: "Major feature shipped cleanly to production after thorough testing.",
    created_at: "2025-09-29T12:00:00Z",
    updated_at: "2025-09-29T13:00:00Z"
  },
  {
    id: "451",
    title: "Article Hit 1000 Views (5)",
    content: "The technical article crossed 1000 views. Community feedback is overwhelmingly positive.",
    tags: ["writing"],
    sentiment_score: 0.89,
    summary: "Technical article reached 1000 views with strong community reception.",
    created_at: "2025-09-29T23:00:00Z",
    updated_at: "2025-09-30T00:00:00Z"
  },
  {
    id: "452",
    title: "Sourdough Finally Perfect (5)",
    content: "After 12 attempts, the sourdough is perfect. Open crumb, crispy crust. Worth every failure.",
    tags: ["cooking"],
    sentiment_score: 0.89,
    summary: "Achieved perfect sourdough after 12 iterations — open crumb and crispy crust.",
    created_at: "2025-10-08T16:00:00Z",
    updated_at: "2025-10-08T17:00:00Z"
  },
  {
    id: "453",
    title: "Certification Passed (5)",
    content: "Passed the AWS Solutions Architect exam on first attempt. Months of studying paid off.",
    tags: ["learning"],
    sentiment_score: 0.94,
    summary: "Passed AWS Solutions Architect certification on first attempt.",
    created_at: "2025-10-09T18:00:00Z",
    updated_at: "2025-10-09T19:00:00Z"
  },
  {
    id: "454",
    title: "Best Week in a Long Time (5)",
    content: "Everything clicked this week. Work, health, relationships. Rare alignment.",
    tags: ["journaling"],
    sentiment_score: 0.88,
    summary: "Exceptional week with work, health, and relationships all aligned positively.",
    created_at: "2025-10-12T13:00:00Z",
    updated_at: "2025-10-12T14:00:00Z"
  },
  {
    id: "455",
    title: "Played First Open Mic Night (5)",
    content: "Performed at an open mic for the first time. Nervous but pulled it off. People clapped.",
    tags: ["music"],
    sentiment_score: 0.85,
    summary: "Successfully completed first open mic performance despite nerves.",
    created_at: "2025-10-12T14:00:00Z",
    updated_at: "2025-10-12T15:00:00Z"
  },
  {
    id: "456",
    title: "Got the Promotion (5)",
    content: "Officially promoted to senior. A year of hard work recognized. Feeling proud.",
    tags: ["reflection"],
    sentiment_score: 0.96,
    summary: "Received senior promotion after a year of consistent effort and results.",
    created_at: "2025-10-12T16:00:00Z",
    updated_at: "2025-10-12T17:00:00Z"
  },
  {
    id: "457",
    title: "Refactor Complete — Code Quality Up (5)",
    content: "Finished the component refactor. Test coverage went from 40% to 78%. Feels much better.",
    tags: ["engineering","vue"],
    sentiment_score: 0.59,
    summary: "Component refactor improved test coverage from 40% to 78%.",
    created_at: "2025-10-12T20:00:00Z",
    updated_at: "2025-10-12T21:00:00Z"
  },
  {
    id: "458",
    title: "Finished Atomic Habits (5)",
    content: "Completed Atomic Habits. The 1% better every day concept is deceptively simple but powerful.",
    tags: ["reading"],
    sentiment_score: 0.65,
    summary: "Atomic Habits reinforced compound improvement through 1% daily gains.",
    created_at: "2025-10-12T22:00:00Z",
    updated_at: "2025-10-12T23:00:00Z"
  },
  {
    id: "459",
    title: "Sunrise Hike — Worth the 4am Alarm (5)",
    content: "Woke at 4am for a sunrise hike. The view at the top in golden light was surreal.",
    tags: ["fitness","hiking"],
    sentiment_score: 0.81,
    summary: "Early morning sunrise hike delivered breathtaking light views.",
    created_at: "2025-10-13T11:00:00Z",
    updated_at: "2025-10-13T12:00:00Z"
  },
  {
    id: "460",
    title: "Inbox Zero Achieved (5)",
    content: "Cleared my inbox for the first time in 8 months. Took 3 hours. Feels like a fresh start.",
    tags: ["productivity"],
    sentiment_score: 0.65,
    summary: "Achieved inbox zero after 8 months, creating mental clarity.",
    created_at: "2025-10-13T19:00:00Z",
    updated_at: "2025-10-13T20:00:00Z"
  },
  {
    id: "461",
    title: "API Response Time Improved 60% (5)",
    content: "Query optimization and caching cut API response from 800ms to 320ms. Significant win.",
    tags: ["nodejs"],
    sentiment_score: 0.77,
    summary: "API optimization reduced response time by 60% through caching and query tuning.",
    created_at: "2025-10-15T12:00:00Z",
    updated_at: "2025-10-15T13:00:00Z"
  },
  {
    id: "462",
    title: "60-Day Meditation Streak (5)",
    content: "Hit 60 days consecutive meditation. The practice is now automatic — like brushing teeth.",
    tags: ["meditation"],
    sentiment_score: 0.66,
    summary: "60-day meditation streak reached, practice now deeply habitual.",
    created_at: "2025-10-17T13:00:00Z",
    updated_at: "2025-10-17T14:00:00Z"
  },
  {
    id: "463",
    title: "Design System v2 Launched (5)",
    content: "New design system adopted by all three product teams. Consistency across products finally.",
    tags: ["design"],
    sentiment_score: 0.75,
    summary: "Design system v2 successfully adopted across all three product teams.",
    created_at: "2025-10-21T22:00:00Z",
    updated_at: "2025-10-21T23:00:00Z"
  },
  {
    id: "464",
    title: "Investments Up 18% YTD (5)",
    content: "Portfolio review: 18% year-to-date return. Index funds boring but effective.",
    tags: ["finance"],
    sentiment_score: 0.65,
    summary: "Portfolio achieved 18% YTD return through consistent index fund strategy.",
    created_at: "2025-10-25T11:00:00Z",
    updated_at: "2025-10-25T12:00:00Z"
  },
  {
    id: "465",
    title: "Long Bug Hunt — Finally Found It (5)",
    content: "Spent 6 hours on a bug that turned out to be a timezone issue. Frustrating but resolved.",
    tags: ["engineering"],
    sentiment_score: 0.03,
    summary: "6-hour debugging session resolved timezone-related bug.",
    created_at: "2025-10-26T16:00:00Z",
    updated_at: "2025-10-26T17:00:00Z"
  },
  {
    id: "466",
    title: "Feeling Stuck Professionally (5)",
    content: "Not sure where to go next in my career. Multiple paths, none feel clearly right.",
    tags: ["reflection"],
    sentiment_score: -0.1,
    summary: "Experiencing career direction uncertainty with multiple viable but unclear paths.",
    created_at: "2025-10-27T16:00:00Z",
    updated_at: "2025-10-27T17:00:00Z"
  },
  {
    id: "467",
    title: "Rainy Sunday — Low Energy (5)",
    content: "Low energy day. Not productive but not terrible either. Sometimes rest looks like this.",
    tags: ["journaling"],
    sentiment_score: 0.03,
    summary: "Low energy rest day — unproductive but necessary recovery.",
    created_at: "2025-10-27T19:00:00Z",
    updated_at: "2025-10-27T20:00:00Z"
  },
  {
    id: "468",
    title: "Sleep Quality Declining (5)",
    content: "Bad sleep for the third night. Affecting mood and focus. Need to fix the root cause.",
    tags: ["wellbeing"],
    sentiment_score: -0.22,
    summary: "Three nights of poor sleep beginning to impact mood and concentration.",
    created_at: "2025-10-29T17:00:00Z",
    updated_at: "2025-10-29T18:00:00Z"
  },
  {
    id: "469",
    title: "Complex Topic — Progress Slow (5)",
    content: "Trying to understand distributed consensus algorithms. Progress is slow. It clicks, then un-clicks.",
    tags: ["learning"],
    sentiment_score: 0.06,
    summary: "Struggling with distributed consensus algorithms, progress inconsistent.",
    created_at: "2025-11-01T12:00:00Z",
    updated_at: "2025-11-01T13:00:00Z"
  },
  {
    id: "470",
    title: "Missed Two Weeks — Starting Over (5)",
    content: "Travel broke the training routine. Back to basics. The first run back is always the hardest.",
    tags: ["fitness"],
    sentiment_score: 0.06,
    summary: "Resumed training after travel break — restarting base-building phase.",
    created_at: "2025-11-01T16:00:00Z",
    updated_at: "2025-11-01T17:00:00Z"
  },
  {
    id: "471",
    title: "Distracted Day — Nothing Shipped (5)",
    content: "Constant interruptions today. Context switching destroyed focus. Need to protect deep work time.",
    tags: ["productivity"],
    sentiment_score: -0.25,
    summary: "Interruption-heavy day with context switching preventing meaningful progress.",
    created_at: "2025-11-04T13:00:00Z",
    updated_at: "2025-11-04T14:00:00Z"
  },
  {
    id: "472",
    title: "Panic Attack at Work (5)",
    content: "Had a panic attack during a presentation. Embarrassing and scary. Need to address this properly.",
    tags: ["wellbeing"],
    sentiment_score: -0.91,
    summary: "Experienced panic attack during work presentation — needs professional support.",
    created_at: "2025-11-04T21:00:00Z",
    updated_at: "2025-11-04T22:00:00Z"
  },
  {
    id: "473",
    title: "Project Cancelled After 3 Months (5)",
    content: "The project I've been working on for 3 months was cancelled. Feels like wasted effort.",
    tags: ["reflection"],
    sentiment_score: -0.75,
    summary: "Major project cancelled after 3 months, leaving work feeling purposeless.",
    created_at: "2025-11-05T20:00:00Z",
    updated_at: "2025-11-05T21:00:00Z"
  },
  {
    id: "474",
    title: "Comparison Spiral — Dark Thoughts (5)",
    content: "Fell into a comparison spiral on social media. Everyone looks more successful. I know it's not real but it stings.",
    tags: ["journaling"],
    sentiment_score: -0.68,
    summary: "Social media comparison spiral triggering feelings of inadequacy.",
    created_at: "2025-11-06T00:00:00Z",
    updated_at: "2025-11-06T01:00:00Z"
  },
  {
    id: "475",
    title: "Overwhelmed by Everything (5)",
    content: "Too many things at once. Work, health, relationships, side projects. Can't prioritize. Paralyzed.",
    tags: ["wellbeing"],
    sentiment_score: -0.8,
    summary: "Overwhelmed by competing demands across work, health, and personal life.",
    created_at: "2025-11-07T15:00:00Z",
    updated_at: "2025-11-07T16:00:00Z"
  },
  {
    id: "476",
    title: "Production Outage — My Fault (5)",
    content: "I caused a production outage. 45 minutes of downtime. Worst feeling. Need better deployment checks.",
    tags: ["engineering"],
    sentiment_score: -0.86,
    summary: "Caused 45-minute production outage, triggering deployment process review.",
    created_at: "2025-11-07T18:00:00Z",
    updated_at: "2025-11-07T19:00:00Z"
  },
  {
    id: "477",
    title: "Received Harsh Criticism (5)",
    content: "Got harsh feedback on my work in front of the team. Some valid, delivery was brutal. Need to process this.",
    tags: ["reflection"],
    sentiment_score: -0.75,
    summary: "Received harsh public criticism — processing validity vs delivery style.",
    created_at: "2025-11-07T22:00:00Z",
    updated_at: "2025-11-07T23:00:00Z"
  },
  {
    id: "478",
    title: "Loneliness After Moving Cities (5)",
    content: "Six months in the new city. Work is good but haven't built real friendships yet. Quietly lonely.",
    tags: ["wellbeing"],
    sentiment_score: -0.7,
    summary: "Experiencing quiet loneliness six months after relocating to new city.",
    created_at: "2025-11-07T22:00:00Z",
    updated_at: "2025-11-07T23:00:00Z"
  },
  {
    id: "479",
    title: "Rejected from Dream Job (5)",
    content: "Didn't get the job I really wanted. Made it to final round then no. Hard to accept.",
    tags: ["journaling"],
    sentiment_score: -0.88,
    summary: "Final round rejection from dream job opportunity, processing disappointment.",
    created_at: "2025-11-08T00:00:00Z",
    updated_at: "2025-11-08T01:00:00Z"
  },
  {
    id: "480",
    title: "Injury — Forced to Stop Training (5)",
    content: "Knee injury means no running for 6 weeks. Devastating after building momentum for months.",
    tags: ["fitness"],
    sentiment_score: -0.74,
    summary: "Knee injury forcing 6-week running break at height of training momentum.",
    created_at: "2025-11-10T16:00:00Z",
    updated_at: "2025-11-10T17:00:00Z"
  },
  {
    id: "481",
    title: "Unexpected Expense — Budget Blown (5)",
    content: "Car repair wiped out the savings buffer. Back to square one on the emergency fund.",
    tags: ["finance"],
    sentiment_score: -0.57,
    summary: "Unexpected car repair expenses depleted savings buffer completely.",
    created_at: "2025-11-10T16:00:00Z",
    updated_at: "2025-11-10T17:00:00Z"
  },
  {
    id: "482",
    title: "Exhausted — Running on Empty (5)",
    content: "Physically and mentally exhausted. Can't remember the last time I felt truly rested.",
    tags: ["wellbeing"],
    sentiment_score: -0.83,
    summary: "Deep exhaustion with no memory of feeling genuinely rested.",
    created_at: "2025-11-13T13:00:00Z",
    updated_at: "2025-11-13T14:00:00Z"
  },
  {
    id: "483",
    title: "Legacy Codebase Despair (5)",
    content: "Inheriting this legacy codebase is demoralising. No tests, no docs, spaghetti everywhere.",
    tags: ["engineering"],
    sentiment_score: -0.75,
    summary: "Inheriting undocumented, untested legacy codebase causing significant morale drop.",
    created_at: "2025-11-15T14:00:00Z",
    updated_at: "2025-11-15T15:00:00Z"
  },
  {
    id: "484",
    title: "Arrived in Lisbon (5)",
    content: "First day in Lisbon. Warm, beautiful, pastéis de nata for breakfast. Already love it.",
    tags: ["travel"],
    sentiment_score: 0.9,
    summary: "Arrived in Lisbon to perfect weather and iconic pastéis de nata.",
    created_at: "2025-11-15T15:00:00Z",
    updated_at: "2025-11-15T16:00:00Z"
  },
  {
    id: "485",
    title: "Dinner Party — Everyone Loved It (5)",
    content: "Hosted a dinner party for 8. The risotto was the highlight. Happy guests, great conversations.",
    tags: ["cooking"],
    sentiment_score: 0.87,
    summary: "Successful dinner party of 8 with standout risotto and great conversation.",
    created_at: "2025-11-15T16:00:00Z",
    updated_at: "2025-11-15T17:00:00Z"
  },
  {
    id: "486",
    title: "Photo Accepted by Magazine (5)",
    content: "A photo I submitted got accepted for publication. First time being published. Incredible feeling.",
    tags: ["photography"],
    sentiment_score: 0.88,
    summary: "First photography publication acceptance — photo selected for magazine.",
    created_at: "2025-11-16T00:00:00Z",
    updated_at: "2025-11-16T01:00:00Z"
  },
  {
    id: "487",
    title: "Concept Finally Clicked (5)",
    content: "Monads. Three months of confusion and today it just clicked. That moment is addictive.",
    tags: ["learning"],
    sentiment_score: 0.85,
    summary: "Monadic programming concept finally clicked after three months of confusion.",
    created_at: "2025-11-17T21:00:00Z",
    updated_at: "2025-11-17T22:00:00Z"
  },
  {
    id: "488",
    title: "Visualization Featured on Hacker News (5)",
    content: "Posted the D3 graph visualization on HN. Made the front page for 2 hours. 500 upvotes.",
    tags: ["d3"],
    sentiment_score: 0.84,
    summary: "D3 visualization reached Hacker News front page with 500 upvotes.",
    created_at: "2025-11-20T21:00:00Z",
    updated_at: "2025-11-20T22:00:00Z"
  },
  {
    id: "489",
    title: "Therapy Is Working (5)",
    content: "Noticing real changes from therapy. Catching negative thought patterns before they spiral.",
    tags: ["wellbeing"],
    sentiment_score: 0.72,
    summary: "Therapy producing measurable results in negative thought pattern recognition.",
    created_at: "2025-12-01T23:00:00Z",
    updated_at: "2025-12-02T00:00:00Z"
  },
  {
    id: "490",
    title: "Open Source PR Merged (5)",
    content: "First open source contribution merged into a popular library. Small fix but meaningful.",
    tags: ["engineering"],
    sentiment_score: 0.85,
    summary: "First open source contribution merged into widely-used library.",
    created_at: "2025-12-06T15:00:00Z",
    updated_at: "2025-12-06T16:00:00Z"
  },
  {
    id: "491",
    title: "Energy Levels Transformed (5)",
    content: "Three weeks of better nutrition and my energy levels are unrecognisable. No afternoon crash.",
    tags: ["nutrition"],
    sentiment_score: 0.71,
    summary: "Three weeks of improved nutrition eliminated afternoon energy crashes.",
    created_at: "2025-12-06T18:00:00Z",
    updated_at: "2025-12-06T19:00:00Z"
  },
  {
    id: "492",
    title: "Gratitude Practice — 90 Days (5)",
    content: "90 days of daily gratitude journaling. Genuine shift in how I default-interpret events.",
    tags: ["reflection"],
    sentiment_score: 0.75,
    summary: "90-day gratitude practice has shifted default interpretations to positive.",
    created_at: "2025-12-07T12:00:00Z",
    updated_at: "2025-12-07T13:00:00Z"
  },
  {
    id: "493",
    title: "App Performance 3x Faster (5)",
    content: "Lazy loading, code splitting, and virtual scrolling. App feels completely different now.",
    tags: ["vue"],
    sentiment_score: 0.73,
    summary: "Three performance optimizations delivered 3x app speed improvement.",
    created_at: "2025-12-11T21:00:00Z",
    updated_at: "2025-12-11T22:00:00Z"
  },
  {
    id: "494",
    title: "Zero-Downtime Deployment Working (5)",
    content: "Blue-green deployment configured and tested. Deployments are now invisible to users.",
    tags: ["docker"],
    sentiment_score: 0.74,
    summary: "Blue-green deployment enables zero-downtime releases invisible to users.",
    created_at: "2025-12-12T16:00:00Z",
    updated_at: "2025-12-12T17:00:00Z"
  },
  {
    id: "495",
    title: "First Full Week of Good Sleep (5)",
    content: "Seven consecutive nights of quality sleep. Mood, focus, and patience are dramatically better.",
    tags: ["sleep"],
    sentiment_score: 0.76,
    summary: "First week of consistent quality sleep producing dramatic mood and focus improvements.",
    created_at: "2025-12-12T22:00:00Z",
    updated_at: "2025-12-12T23:00:00Z"
  },
  {
    id: "496",
    title: "Marathon Training — Long Run PB (6)",
    content: "Longest run yet — 28km. Felt strong the whole way. Marathon is within reach.",
    tags: ["fitness"],
    sentiment_score: 0.9,
    summary: "Achieved 28km long run PB, marathon goal now feels realistic.",
    created_at: "2025-12-15T17:00:00Z",
    updated_at: "2025-12-15T18:00:00Z"
  },
  {
    id: "497",
    title: "Feature Shipped to Production (6)",
    content: "Big feature finally in production. Zero issues. The testing paid off.",
    tags: ["engineering"],
    sentiment_score: 0.94,
    summary: "Major feature shipped cleanly to production after thorough testing.",
    created_at: "2025-12-16T00:00:00Z",
    updated_at: "2025-12-16T01:00:00Z"
  },
  {
    id: "498",
    title: "Article Hit 1000 Views (6)",
    content: "The technical article crossed 1000 views. Community feedback is overwhelmingly positive.",
    tags: ["writing"],
    sentiment_score: 0.88,
    summary: "Technical article reached 1000 views with strong community reception.",
    created_at: "2025-12-19T14:00:00Z",
    updated_at: "2025-12-19T15:00:00Z"
  },
  {
    id: "499",
    title: "Sourdough Finally Perfect (6)",
    content: "After 12 attempts, the sourdough is perfect. Open crumb, crispy crust. Worth every failure.",
    tags: ["cooking"],
    sentiment_score: 0.88,
    summary: "Achieved perfect sourdough after 12 iterations — open crumb and crispy crust.",
    created_at: "2025-12-23T15:00:00Z",
    updated_at: "2025-12-23T16:00:00Z"
  },
  {
    id: "500",
    title: "Certification Passed (6)",
    content: "Passed the AWS Solutions Architect exam on first attempt. Months of studying paid off.",
    tags: ["learning"],
    sentiment_score: 0.88,
    summary: "Passed AWS Solutions Architect certification on first attempt.",
    created_at: "2025-12-23T22:00:00Z",
    updated_at: "2025-12-23T23:00:00Z"
  },
  {
    id: "501",
    title: "Best Week in a Long Time (6)",
    content: "Everything clicked this week. Work, health, relationships. Rare alignment.",
    tags: ["journaling"],
    sentiment_score: 0.92,
    summary: "Exceptional week with work, health, and relationships all aligned positively.",
    created_at: "2025-12-26T22:00:00Z",
    updated_at: "2025-12-26T23:00:00Z"
  },
  {
    id: "502",
    title: "Played First Open Mic Night (6)",
    content: "Performed at an open mic for the first time. Nervous but pulled it off. People clapped.",
    tags: ["music"],
    sentiment_score: 0.9,
    summary: "Successfully completed first open mic performance despite nerves.",
    created_at: "2025-12-28T15:00:00Z",
    updated_at: "2025-12-28T16:00:00Z"
  },
  {
    id: "503",
    title: "Got the Promotion (6)",
    content: "Officially promoted to senior. A year of hard work recognized. Feeling proud.",
    tags: ["reflection"],
    sentiment_score: 0.99,
    summary: "Received senior promotion after a year of consistent effort and results.",
    created_at: "2025-12-29T16:00:00Z",
    updated_at: "2025-12-29T17:00:00Z"
  },
  {
    id: "504",
    title: "Refactor Complete — Code Quality Up (6)",
    content: "Finished the component refactor. Test coverage went from 40% to 78%. Feels much better.",
    tags: ["engineering","vue"],
    sentiment_score: 0.67,
    summary: "Component refactor improved test coverage from 40% to 78%.",
    created_at: "2025-12-30T00:00:00Z",
    updated_at: "2025-12-30T01:00:00Z"
  },
  {
    id: "505",
    title: "Finished Atomic Habits (6)",
    content: "Completed Atomic Habits. The 1% better every day concept is deceptively simple but powerful.",
    tags: ["reading"],
    sentiment_score: 0.71,
    summary: "Atomic Habits reinforced compound improvement through 1% daily gains.",
    created_at: "2026-01-01T15:00:00Z",
    updated_at: "2026-01-01T16:00:00Z"
  },
  {
    id: "506",
    title: "Sunrise Hike — Worth the 4am Alarm (6)",
    content: "Woke at 4am for a sunrise hike. The view at the top in golden light was surreal.",
    tags: ["fitness","hiking"],
    sentiment_score: 0.71,
    summary: "Early morning sunrise hike delivered breathtaking light views.",
    created_at: "2026-01-05T19:00:00Z",
    updated_at: "2026-01-05T20:00:00Z"
  },
  {
    id: "507",
    title: "Inbox Zero Achieved (6)",
    content: "Cleared my inbox for the first time in 8 months. Took 3 hours. Feels like a fresh start.",
    tags: ["productivity"],
    sentiment_score: 0.56,
    summary: "Achieved inbox zero after 8 months, creating mental clarity.",
    created_at: "2026-01-09T13:00:00Z",
    updated_at: "2026-01-09T14:00:00Z"
  },
  {
    id: "508",
    title: "API Response Time Improved 60% (6)",
    content: "Query optimization and caching cut API response from 800ms to 320ms. Significant win.",
    tags: ["nodejs"],
    sentiment_score: 0.73,
    summary: "API optimization reduced response time by 60% through caching and query tuning.",
    created_at: "2026-01-09T15:00:00Z",
    updated_at: "2026-01-09T16:00:00Z"
  },
  {
    id: "509",
    title: "60-Day Meditation Streak (6)",
    content: "Hit 60 days consecutive meditation. The practice is now automatic — like brushing teeth.",
    tags: ["meditation"],
    sentiment_score: 0.66,
    summary: "60-day meditation streak reached, practice now deeply habitual.",
    created_at: "2026-01-09T19:00:00Z",
    updated_at: "2026-01-09T20:00:00Z"
  },
  {
    id: "510",
    title: "Design System v2 Launched (6)",
    content: "New design system adopted by all three product teams. Consistency across products finally.",
    tags: ["design"],
    sentiment_score: 0.66,
    summary: "Design system v2 successfully adopted across all three product teams.",
    created_at: "2026-01-10T00:00:00Z",
    updated_at: "2026-01-10T01:00:00Z"
  },
  {
    id: "511",
    title: "Investments Up 18% YTD (6)",
    content: "Portfolio review: 18% year-to-date return. Index funds boring but effective.",
    tags: ["finance"],
    sentiment_score: 0.75,
    summary: "Portfolio achieved 18% YTD return through consistent index fund strategy.",
    created_at: "2026-01-16T19:00:00Z",
    updated_at: "2026-01-16T20:00:00Z"
  },
  {
    id: "512",
    title: "Long Bug Hunt — Finally Found It (6)",
    content: "Spent 6 hours on a bug that turned out to be a timezone issue. Frustrating but resolved.",
    tags: ["engineering"],
    sentiment_score: 0.08,
    summary: "6-hour debugging session resolved timezone-related bug.",
    created_at: "2026-01-18T21:00:00Z",
    updated_at: "2026-01-18T22:00:00Z"
  },
  {
    id: "513",
    title: "Feeling Stuck Professionally (6)",
    content: "Not sure where to go next in my career. Multiple paths, none feel clearly right.",
    tags: ["reflection"],
    sentiment_score: -0.09,
    summary: "Experiencing career direction uncertainty with multiple viable but unclear paths.",
    created_at: "2026-01-20T13:00:00Z",
    updated_at: "2026-01-20T14:00:00Z"
  },
  {
    id: "514",
    title: "Rainy Sunday — Low Energy (6)",
    content: "Low energy day. Not productive but not terrible either. Sometimes rest looks like this.",
    tags: ["journaling"],
    sentiment_score: 0.06,
    summary: "Low energy rest day — unproductive but necessary recovery.",
    created_at: "2026-01-26T13:00:00Z",
    updated_at: "2026-01-26T14:00:00Z"
  },
  {
    id: "515",
    title: "Sleep Quality Declining (6)",
    content: "Bad sleep for the third night. Affecting mood and focus. Need to fix the root cause.",
    tags: ["wellbeing"],
    sentiment_score: -0.13,
    summary: "Three nights of poor sleep beginning to impact mood and concentration.",
    created_at: "2026-01-26T17:00:00Z",
    updated_at: "2026-01-26T18:00:00Z"
  },
  {
    id: "516",
    title: "Complex Topic — Progress Slow (6)",
    content: "Trying to understand distributed consensus algorithms. Progress is slow. It clicks, then un-clicks.",
    tags: ["learning"],
    sentiment_score: 0.12,
    summary: "Struggling with distributed consensus algorithms, progress inconsistent.",
    created_at: "2026-01-27T00:00:00Z",
    updated_at: "2026-01-27T01:00:00Z"
  },
  {
    id: "517",
    title: "Missed Two Weeks — Starting Over (6)",
    content: "Travel broke the training routine. Back to basics. The first run back is always the hardest.",
    tags: ["fitness"],
    sentiment_score: -0.03,
    summary: "Resumed training after travel break — restarting base-building phase.",
    created_at: "2026-01-30T15:00:00Z",
    updated_at: "2026-01-30T16:00:00Z"
  },
  {
    id: "518",
    title: "Distracted Day — Nothing Shipped (6)",
    content: "Constant interruptions today. Context switching destroyed focus. Need to protect deep work time.",
    tags: ["productivity"],
    sentiment_score: -0.26,
    summary: "Interruption-heavy day with context switching preventing meaningful progress.",
    created_at: "2026-02-02T12:00:00Z",
    updated_at: "2026-02-02T13:00:00Z"
  },
  {
    id: "519",
    title: "Panic Attack at Work (6)",
    content: "Had a panic attack during a presentation. Embarrassing and scary. Need to address this properly.",
    tags: ["wellbeing"],
    sentiment_score: -0.81,
    summary: "Experienced panic attack during work presentation — needs professional support.",
    created_at: "2026-02-06T13:00:00Z",
    updated_at: "2026-02-06T14:00:00Z"
  },
  {
    id: "520",
    title: "Project Cancelled After 3 Months (6)",
    content: "The project I've been working on for 3 months was cancelled. Feels like wasted effort.",
    tags: ["reflection"],
    sentiment_score: -0.77,
    summary: "Major project cancelled after 3 months, leaving work feeling purposeless.",
    created_at: "2026-02-06T16:00:00Z",
    updated_at: "2026-02-06T17:00:00Z"
  },
  {
    id: "521",
    title: "Comparison Spiral — Dark Thoughts (6)",
    content: "Fell into a comparison spiral on social media. Everyone looks more successful. I know it's not real but it stings.",
    tags: ["journaling"],
    sentiment_score: -0.69,
    summary: "Social media comparison spiral triggering feelings of inadequacy.",
    created_at: "2026-02-10T22:00:00Z",
    updated_at: "2026-02-10T23:00:00Z"
  },
  {
    id: "522",
    title: "Overwhelmed by Everything (6)",
    content: "Too many things at once. Work, health, relationships, side projects. Can't prioritize. Paralyzed.",
    tags: ["wellbeing"],
    sentiment_score: -0.85,
    summary: "Overwhelmed by competing demands across work, health, and personal life.",
    created_at: "2026-02-12T21:00:00Z",
    updated_at: "2026-02-12T22:00:00Z"
  },
  {
    id: "523",
    title: "Production Outage — My Fault (6)",
    content: "I caused a production outage. 45 minutes of downtime. Worst feeling. Need better deployment checks.",
    tags: ["engineering"],
    sentiment_score: -0.91,
    summary: "Caused 45-minute production outage, triggering deployment process review.",
    created_at: "2026-02-12T23:00:00Z",
    updated_at: "2026-02-13T00:00:00Z"
  },
  {
    id: "524",
    title: "Received Harsh Criticism (6)",
    content: "Got harsh feedback on my work in front of the team. Some valid, delivery was brutal. Need to process this.",
    tags: ["reflection"],
    sentiment_score: -0.64,
    summary: "Received harsh public criticism — processing validity vs delivery style.",
    created_at: "2026-02-13T13:00:00Z",
    updated_at: "2026-02-13T14:00:00Z"
  },
  {
    id: "525",
    title: "Loneliness After Moving Cities (6)",
    content: "Six months in the new city. Work is good but haven't built real friendships yet. Quietly lonely.",
    tags: ["wellbeing"],
    sentiment_score: -0.61,
    summary: "Experiencing quiet loneliness six months after relocating to new city.",
    created_at: "2026-02-13T14:00:00Z",
    updated_at: "2026-02-13T15:00:00Z"
  },
  {
    id: "526",
    title: "Rejected from Dream Job (6)",
    content: "Didn't get the job I really wanted. Made it to final round then no. Hard to accept.",
    tags: ["journaling"],
    sentiment_score: -0.8,
    summary: "Final round rejection from dream job opportunity, processing disappointment.",
    created_at: "2026-02-13T15:00:00Z",
    updated_at: "2026-02-13T16:00:00Z"
  },
  {
    id: "527",
    title: "Injury — Forced to Stop Training (6)",
    content: "Knee injury means no running for 6 weeks. Devastating after building momentum for months.",
    tags: ["fitness"],
    sentiment_score: -0.72,
    summary: "Knee injury forcing 6-week running break at height of training momentum.",
    created_at: "2026-02-14T15:00:00Z",
    updated_at: "2026-02-14T16:00:00Z"
  },
  {
    id: "528",
    title: "Unexpected Expense — Budget Blown (6)",
    content: "Car repair wiped out the savings buffer. Back to square one on the emergency fund.",
    tags: ["finance"],
    sentiment_score: -0.54,
    summary: "Unexpected car repair expenses depleted savings buffer completely.",
    created_at: "2026-02-14T22:00:00Z",
    updated_at: "2026-02-14T23:00:00Z"
  },
  {
    id: "529",
    title: "Exhausted — Running on Empty (6)",
    content: "Physically and mentally exhausted. Can't remember the last time I felt truly rested.",
    tags: ["wellbeing"],
    sentiment_score: -0.83,
    summary: "Deep exhaustion with no memory of feeling genuinely rested.",
    created_at: "2026-02-15T00:00:00Z",
    updated_at: "2026-02-15T01:00:00Z"
  },
  {
    id: "530",
    title: "Legacy Codebase Despair (6)",
    content: "Inheriting this legacy codebase is demoralising. No tests, no docs, spaghetti everywhere.",
    tags: ["engineering"],
    sentiment_score: -0.66,
    summary: "Inheriting undocumented, untested legacy codebase causing significant morale drop.",
    created_at: "2026-02-17T00:00:00Z",
    updated_at: "2026-02-17T01:00:00Z"
  },
  {
    id: "531",
    title: "Arrived in Lisbon (6)",
    content: "First day in Lisbon. Warm, beautiful, pastéis de nata for breakfast. Already love it.",
    tags: ["travel"],
    sentiment_score: 0.83,
    summary: "Arrived in Lisbon to perfect weather and iconic pastéis de nata.",
    created_at: "2026-02-17T20:00:00Z",
    updated_at: "2026-02-17T21:00:00Z"
  },
  {
    id: "532",
    title: "Dinner Party — Everyone Loved It (6)",
    content: "Hosted a dinner party for 8. The risotto was the highlight. Happy guests, great conversations.",
    tags: ["cooking"],
    sentiment_score: 0.85,
    summary: "Successful dinner party of 8 with standout risotto and great conversation.",
    created_at: "2026-02-18T15:00:00Z",
    updated_at: "2026-02-18T16:00:00Z"
  },
  {
    id: "533",
    title: "Photo Accepted by Magazine (6)",
    content: "A photo I submitted got accepted for publication. First time being published. Incredible feeling.",
    tags: ["photography"],
    sentiment_score: 0.9,
    summary: "First photography publication acceptance — photo selected for magazine.",
    created_at: "2026-02-18T18:00:00Z",
    updated_at: "2026-02-18T19:00:00Z"
  },
  {
    id: "534",
    title: "Concept Finally Clicked (6)",
    content: "Monads. Three months of confusion and today it just clicked. That moment is addictive.",
    tags: ["learning"],
    sentiment_score: 0.89,
    summary: "Monadic programming concept finally clicked after three months of confusion.",
    created_at: "2026-02-18T18:00:00Z",
    updated_at: "2026-02-18T19:00:00Z"
  },
  {
    id: "535",
    title: "Visualization Featured on Hacker News (6)",
    content: "Posted the D3 graph visualization on HN. Made the front page for 2 hours. 500 upvotes.",
    tags: ["d3"],
    sentiment_score: 0.84,
    summary: "D3 visualization reached Hacker News front page with 500 upvotes.",
    created_at: "2026-02-18T19:00:00Z",
    updated_at: "2026-02-18T20:00:00Z"
  },
  {
    id: "536",
    title: "Therapy Is Working (6)",
    content: "Noticing real changes from therapy. Catching negative thought patterns before they spiral.",
    tags: ["wellbeing"],
    sentiment_score: 0.74,
    summary: "Therapy producing measurable results in negative thought pattern recognition.",
    created_at: "2026-02-18T21:00:00Z",
    updated_at: "2026-02-18T22:00:00Z"
  },
  {
    id: "537",
    title: "Open Source PR Merged (6)",
    content: "First open source contribution merged into a popular library. Small fix but meaningful.",
    tags: ["engineering"],
    sentiment_score: 0.85,
    summary: "First open source contribution merged into widely-used library.",
    created_at: "2026-02-20T23:00:00Z",
    updated_at: "2026-02-21T00:00:00Z"
  },
  {
    id: "538",
    title: "Energy Levels Transformed (6)",
    content: "Three weeks of better nutrition and my energy levels are unrecognisable. No afternoon crash.",
    tags: ["nutrition"],
    sentiment_score: 0.74,
    summary: "Three weeks of improved nutrition eliminated afternoon energy crashes.",
    created_at: "2026-03-03T13:00:00Z",
    updated_at: "2026-03-03T14:00:00Z"
  },
  {
    id: "539",
    title: "Gratitude Practice — 90 Days (6)",
    content: "90 days of daily gratitude journaling. Genuine shift in how I default-interpret events.",
    tags: ["reflection"],
    sentiment_score: 0.82,
    summary: "90-day gratitude practice has shifted default interpretations to positive.",
    created_at: "2026-03-03T13:00:00Z",
    updated_at: "2026-03-03T14:00:00Z"
  },
  {
    id: "540",
    title: "App Performance 3x Faster (6)",
    content: "Lazy loading, code splitting, and virtual scrolling. App feels completely different now.",
    tags: ["vue"],
    sentiment_score: 0.77,
    summary: "Three performance optimizations delivered 3x app speed improvement.",
    created_at: "2026-03-03T19:00:00Z",
    updated_at: "2026-03-03T20:00:00Z"
  },
  {
    id: "541",
    title: "Zero-Downtime Deployment Working (6)",
    content: "Blue-green deployment configured and tested. Deployments are now invisible to users.",
    tags: ["docker"],
    sentiment_score: 0.68,
    summary: "Blue-green deployment enables zero-downtime releases invisible to users.",
    created_at: "2026-03-05T23:00:00Z",
    updated_at: "2026-03-06T00:00:00Z"
  },
  {
    id: "542",
    title: "First Full Week of Good Sleep (6)",
    content: "Seven consecutive nights of quality sleep. Mood, focus, and patience are dramatically better.",
    tags: ["sleep"],
    sentiment_score: 0.8,
    summary: "First week of consistent quality sleep producing dramatic mood and focus improvements.",
    created_at: "2026-03-09T15:00:00Z",
    updated_at: "2026-03-09T16:00:00Z"
  },
  {
    id: "543",
    title: "Marathon Training — Long Run PB (7)",
    content: "Longest run yet — 28km. Felt strong the whole way. Marathon is within reach.",
    tags: ["fitness"],
    sentiment_score: 0.9,
    summary: "Achieved 28km long run PB, marathon goal now feels realistic.",
    created_at: "2026-03-09T16:00:00Z",
    updated_at: "2026-03-09T17:00:00Z"
  },
  {
    id: "544",
    title: "Feature Shipped to Production (7)",
    content: "Big feature finally in production. Zero issues. The testing paid off.",
    tags: ["engineering"],
    sentiment_score: 0.9,
    summary: "Major feature shipped cleanly to production after thorough testing.",
    created_at: "2026-03-09T18:00:00Z",
    updated_at: "2026-03-09T19:00:00Z"
  },
  {
    id: "545",
    title: "Article Hit 1000 Views (7)",
    content: "The technical article crossed 1000 views. Community feedback is overwhelmingly positive.",
    tags: ["writing"],
    sentiment_score: 0.99,
    summary: "Technical article reached 1000 views with strong community reception.",
    created_at: "2026-03-09T18:00:00Z",
    updated_at: "2026-03-09T19:00:00Z"
  },
  {
    id: "546",
    title: "Sourdough Finally Perfect (7)",
    content: "After 12 attempts, the sourdough is perfect. Open crumb, crispy crust. Worth every failure.",
    tags: ["cooking"],
    sentiment_score: 0.97,
    summary: "Achieved perfect sourdough after 12 iterations — open crumb and crispy crust.",
    created_at: "2026-03-09T23:00:00Z",
    updated_at: "2026-03-10T00:00:00Z"
  },
  {
    id: "547",
    title: "Certification Passed (7)",
    content: "Passed the AWS Solutions Architect exam on first attempt. Months of studying paid off.",
    tags: ["learning"],
    sentiment_score: 0.9,
    summary: "Passed AWS Solutions Architect certification on first attempt.",
    created_at: "2026-03-13T15:00:00Z",
    updated_at: "2026-03-13T16:00:00Z"
  },
  {
    id: "548",
    title: "Best Week in a Long Time (7)",
    content: "Everything clicked this week. Work, health, relationships. Rare alignment.",
    tags: ["journaling"],
    sentiment_score: 0.83,
    summary: "Exceptional week with work, health, and relationships all aligned positively.",
    created_at: "2026-03-13T16:00:00Z",
    updated_at: "2026-03-13T17:00:00Z"
  },
  {
    id: "549",
    title: "Played First Open Mic Night (7)",
    content: "Performed at an open mic for the first time. Nervous but pulled it off. People clapped.",
    tags: ["music"],
    sentiment_score: 0.94,
    summary: "Successfully completed first open mic performance despite nerves.",
    created_at: "2026-03-13T18:00:00Z",
    updated_at: "2026-03-13T19:00:00Z"
  },
  {
    id: "550",
    title: "Got the Promotion (7)",
    content: "Officially promoted to senior. A year of hard work recognized. Feeling proud.",
    tags: ["reflection"],
    sentiment_score: 0.9,
    summary: "Received senior promotion after a year of consistent effort and results.",
    created_at: "2026-03-18T11:00:00Z",
    updated_at: "2026-03-18T12:00:00Z"
  },
  {
    id: "551",
    title: "Refactor Complete — Code Quality Up (7)",
    content: "Finished the component refactor. Test coverage went from 40% to 78%. Feels much better.",
    tags: ["engineering","vue"],
    sentiment_score: 0.58,
    summary: "Component refactor improved test coverage from 40% to 78%.",
    created_at: "2026-03-18T14:00:00Z",
    updated_at: "2026-03-18T15:00:00Z"
  },
  {
    id: "552",
    title: "Finished Atomic Habits (7)",
    content: "Completed Atomic Habits. The 1% better every day concept is deceptively simple but powerful.",
    tags: ["reading"],
    sentiment_score: 0.67,
    summary: "Atomic Habits reinforced compound improvement through 1% daily gains.",
    created_at: "2026-03-19T16:00:00Z",
    updated_at: "2026-03-19T17:00:00Z"
  },
  {
    id: "553",
    title: "Sunrise Hike — Worth the 4am Alarm (7)",
    content: "Woke at 4am for a sunrise hike. The view at the top in golden light was surreal.",
    tags: ["fitness","hiking"],
    sentiment_score: 0.7,
    summary: "Early morning sunrise hike delivered breathtaking light views.",
    created_at: "2026-03-25T18:00:00Z",
    updated_at: "2026-03-25T19:00:00Z"
  }
]