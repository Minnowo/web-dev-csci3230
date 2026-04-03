import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const filePath = path.join(__dirname, 'mockData.js')

// Tag pool matching the project's distribution
const tagPool = {
  engineering:  ["engineering"],
  wellbeing:    ["wellbeing"],
  reading:      ["reading"],
  vue:          ["vue"],
  fitness:      ["fitness"],
  design:       ["design"],
  journaling:   ["journaling"],
  nodejs:       ["nodejs"],
  d3:           ["d3"],
  travel:       ["travel"],
  cooking:      ["cooking"],
  finance:      ["finance"],
  writing:      ["writing"],
  leadership:   ["leadership"],
  learning:     ["learning"],
  productivity: ["productivity"],
  meditation:   ["meditation"],
  photography:  ["photography"],
  music:        ["music"],
  typescript:   ["typescript"],
  docker:       ["docker"],
  nutrition:    ["nutrition"],
  hiking:       ["hiking"],
  budgeting:    ["budgeting"],
  testing:      ["testing"],
  sleep:        ["sleep"],
  reflection:   ["reflection"],
}

// Note templates per tag group (title, content, summary)
const templates = [
  // Engineering
  { tags: ["engineering", "learning"],  title: "Exploring Microservices Architecture", content: "Deep dive into microservices today. The separation of concerns is powerful but adds complexity. Need to understand service discovery and load balancing better.", summary: "Researched microservices benefits and challenges including service discovery.", sentiment_score: 0.5 },
  { tags: ["engineering", "nodejs"],    title: "Node.js Event Loop Deep Dive", content: "Finally understood the Node.js event loop properly. The libuv thread pool is separate from the main event loop. This changes how I think about async operations.", summary: "Gained clarity on Node.js event loop and libuv thread pool mechanics.", sentiment_score: 0.7 },
  { tags: ["engineering", "typescript"],title: "TypeScript Generics Practice", content: "Spent time practicing TypeScript generics. They're complex but make code much more reusable. Conditional types are particularly mind-bending.", summary: "Practiced TypeScript generics and conditional types for reusable code.", sentiment_score: 0.6 },
  { tags: ["engineering", "testing"],   title: "Unit Testing Strategy", content: "Revisiting our unit testing approach. We have too many integration tests and not enough unit tests. Need to shift the testing pyramid.", summary: "Evaluated testing strategy, identified need to increase unit test coverage.", sentiment_score: 0.4 },
  { tags: ["engineering", "docker"],    title: "Docker Multi-Stage Builds", content: "Learned about multi-stage Docker builds today. Production images are now 60% smaller. The build cache optimization is a game changer.", summary: "Implemented multi-stage Docker builds reducing image size by 60%.", sentiment_score: 0.8 },
  { tags: ["engineering"],              title: "API Rate Limiting Implementation", content: "Implemented rate limiting on our API endpoints. Used a token bucket algorithm. Testing edge cases with concurrent requests was tricky.", summary: "Implemented token bucket rate limiting for API endpoints.", sentiment_score: 0.6 },
  { tags: ["engineering", "design"],    title: "REST vs GraphQL Decision", content: "Team discussion about switching parts of our API to GraphQL. REST is simpler but GraphQL solves our over-fetching problem. Still undecided.", summary: "Team debated REST vs GraphQL trade-offs for API architecture.", sentiment_score: 0.3 },
  { tags: ["engineering", "vue"],       title: "Vue 3 Composition API Refactor", content: "Refactoring old Options API code to Composition API. The code is much cleaner. Composables are like React hooks but feel more natural to me.", summary: "Refactored Vue components from Options to Composition API using composables.", sentiment_score: 0.7 },

  // Wellbeing
  { tags: ["wellbeing"],               title: "Burnout Warning Signs", content: "Noticing early burnout signs. Irritable, tired, losing interest in things I usually enjoy. Need to slow down and recover before it gets worse.", summary: "Identified early burnout signs and need to prioritize recovery.", sentiment_score: -0.6 },
  { tags: ["wellbeing", "reflection"], title: "Work-Life Balance Check-In", content: "Took stock of my work-life balance this week. I've been putting in too many late nights. Making a rule to stop working at 7pm.", summary: "Assessed work-life balance and set boundaries around evening work hours.", sentiment_score: -0.2 },
  { tags: ["wellbeing", "meditation"], title: "Starting Meditation Practice", content: "Day 5 of daily meditation. Noticing a real difference in how I respond to stressful situations. 10 minutes in the morning is all it takes.", summary: "Five days into meditation practice, noticing improved stress responses.", sentiment_score: 0.7 },
  { tags: ["wellbeing", "fitness"],    title: "Mental Health and Exercise Link", content: "The research is clear - exercise directly improves mental health. Had a bad day, went for a run, felt completely different after. Need to make this a non-negotiable.", summary: "Experienced firsthand how exercise transformed a difficult mental health day.", sentiment_score: 0.5 },
  { tags: ["wellbeing"],               title: "Difficult Conversation at Work", content: "Had a hard conversation with my manager about workload. It went better than expected. Being direct was the right call. Feeling lighter now.", summary: "Had productive direct conversation with manager about workload concerns.", sentiment_score: 0.4 },
  { tags: ["wellbeing", "journaling"], title: "Year in Review — Gratitude", content: "Looking back at everything this year. Despite the hard patches, there's so much to be grateful for. Growth, friendships, skills learned. A good year overall.", summary: "Reflected on the year with gratitude, noting significant personal growth.", sentiment_score: 0.8 },

  // Reading
  { tags: ["reading"],                 title: "Thinking Fast and Slow — Notes", content: "Kahneman's System 1 vs System 2 thinking is reshaping how I make decisions. I catch myself defaulting to fast thinking when I should slow down.", summary: "Applied Kahneman's dual-process theory to improve decision-making awareness.", sentiment_score: 0.7 },
  { tags: ["reading", "learning"],     title: "The Pragmatic Programmer Notes", content: "Re-reading The Pragmatic Programmer. The orthogonality principle is something I've been violating. Components should be independent and have a single responsibility.", summary: "Revisited orthogonality principle from The Pragmatic Programmer.", sentiment_score: 0.6 },
  { tags: ["reading"],                 title: "Essentialism Book Summary", content: "Essentialism is about doing less but better. The key question: what is the most important thing I can do right now? Learning to say no more deliberately.", summary: "Essentialism taught the importance of selective focus and deliberate 'no'.", sentiment_score: 0.6 },
  { tags: ["reading", "productivity"], title: "Deep Work — Key Takeaways", content: "Cal Newport's Deep Work is exactly what I needed. Scheduling deep work blocks in the morning before checking email. Already seeing a difference.", summary: "Implementing deep work blocks in the morning based on Cal Newport's principles.", sentiment_score: 0.8 },
  { tags: ["reading"],                 title: "Articles: Distributed Systems", content: "Read several articles on distributed systems consistency models. CAP theorem is less a theorem and more a design trade-off. Choosing between availability and consistency.", summary: "Researched distributed systems consistency models and CAP theorem implications.", sentiment_score: 0.5 },

  // Vue
  { tags: ["vue", "engineering"],      title: "Pinia vs Vuex Comparison", content: "Migrating from Vuex to Pinia. Pinia is so much simpler — no mutations, just actions. The DevTools integration is also better.", summary: "Migrated state management from Vuex to Pinia, finding it significantly simpler.", sentiment_score: 0.7 },
  { tags: ["vue"],                     title: "Vue Router Guards Research", content: "Implementing auth guards in Vue Router. The beforeEach hook is powerful but easy to mess up. Need to handle async checks correctly to avoid race conditions.", summary: "Researched Vue Router navigation guards for authentication flow.", sentiment_score: 0.4 },
  { tags: ["vue", "design"],           title: "Component Library Planning", content: "Planning our internal component library. Deciding between building from scratch vs extending Shadcn/Vue. Building is slower but gives more control.", summary: "Evaluated component library approach: custom build vs extending existing library.", sentiment_score: 0.5 },

  // Fitness
  { tags: ["fitness"],                 title: "New Running Program Started", content: "Started a structured 10K training program. First week is easy — just building the habit. Running 3x per week feels manageable alongside everything else.", summary: "Began structured 10K training program with 3x weekly runs.", sentiment_score: 0.7 },
  { tags: ["fitness", "wellbeing"],    title: "Rest Day Is Important Too", content: "Learning that rest days are as important as training days. Overtraining is a real risk. My body needs time to adapt and recover.", summary: "Recognized importance of rest days in training cycle to prevent overtraining.", sentiment_score: 0.5 },
  { tags: ["fitness", "nutrition"],    title: "Pre-Workout Nutrition Experiment", content: "Trying different pre-workout meals. Banana + peanut butter 1 hour before is working well. Energy is consistent without the crash.", summary: "Found banana and peanut butter optimal for pre-workout energy.", sentiment_score: 0.6 },
  { tags: ["fitness"],                 title: "Personal Best — 5K Time", content: "New 5K personal best today! 24:32. Months of consistent training paying off. The key was building base mileage slowly before adding speed work.", summary: "Achieved new 5K personal best of 24:32 through consistent base training.", sentiment_score: 0.9 },
  { tags: ["fitness", "hiking"],       title: "Trail Running Discovery", content: "Tried trail running for the first time. Much harder than road running but infinitely more enjoyable. The connection to nature makes it feel less like exercise.", summary: "Discovered trail running as more enjoyable and connected to nature.", sentiment_score: 0.8 },

  // Design
  { tags: ["design"],                  title: "Design Tokens System", content: "Implemented a design tokens system for our app. Colors, spacing, and typography are all tokenized now. Theme switching is trivial.", summary: "Implemented design tokens system enabling easy theme switching.", sentiment_score: 0.7 },
  { tags: ["design", "vue"],           title: "Responsive Layout Patterns", content: "Revisiting responsive design patterns. CSS Grid with named areas is so clean. The old float-based layouts feel prehistoric now.", summary: "Modernized responsive layout approach using CSS Grid named areas.", sentiment_score: 0.6 },
  { tags: ["design"],                  title: "User Testing Session Notes", content: "Ran user testing on our onboarding flow. Three out of five users struggled with step 3. The copy is confusing. Need to redesign.", summary: "User testing revealed step 3 of onboarding confuses 60% of users.", sentiment_score: -0.3 },
  { tags: ["design", "learning"],      title: "Typography Fundamentals", content: "Deep dive into typography. Line height, letter spacing, and font pairing make such a huge difference. Going through Practical Typography by Matthew Butterick.", summary: "Studied typography fundamentals including line height, spacing, and font pairing.", sentiment_score: 0.6 },

  // Journaling
  { tags: ["journaling"],              title: "Morning Pages — Week 3", content: "Three weeks of morning pages. The mental clarity it brings is incredible. I process a lot of background anxiety by just writing it out.", summary: "Three weeks of morning pages delivering mental clarity and anxiety processing.", sentiment_score: 0.7 },
  { tags: ["journaling", "reflection"],title: "Quarterly Review — Q2", content: "Q2 review done. Hit most goals, missed two. The fitness goal slipped because I wasn't tracking consistently. Q3 needs a better tracking system.", summary: "Q2 review: achieved most goals, fitness goal missed due to inconsistent tracking.", sentiment_score: 0.3 },
  { tags: ["journaling"],              title: "What Am I Avoiding?", content: "Honest journaling question today: what am I avoiding? Turns out — a difficult code review feedback I haven't fully processed and a conversation I keep putting off.", summary: "Identified avoided tasks: unprocessed code review feedback and delayed conversation.", sentiment_score: -0.4 },
  { tags: ["journaling", "wellbeing"], title: "Celebrating Small Wins", content: "Trying to be better at celebrating small wins. Shipped a feature today, got positive feedback, and immediately moved to the next thing. Paused to acknowledge it.", summary: "Practiced acknowledging small wins rather than immediately moving to next tasks.", sentiment_score: 0.7 },

  // Node.js
  { tags: ["nodejs"],                  title: "Express Middleware Deep Dive", content: "Understanding the Express middleware stack better. Error handling middleware must have 4 parameters. Request lifecycle is clearer now.", summary: "Deepened understanding of Express middleware stack and error handling patterns.", sentiment_score: 0.5 },
  { tags: ["nodejs", "engineering"],   title: "Database Connection Pooling", content: "Implemented connection pooling for PostgreSQL. Was creating a new connection per request — rookie mistake. Pool of 10 connections handles our load fine.", summary: "Fixed connection pooling implementation reducing database connection overhead.", sentiment_score: 0.6 },
  { tags: ["nodejs"],                  title: "WebSockets First Attempt", content: "First time using WebSockets in Node. The real-time updates feel like magic after years of polling. Socket.io abstracts away the complexity nicely.", summary: "Implemented real-time WebSocket communication using Socket.io.", sentiment_score: 0.8 },

  // D3
  { tags: ["d3"],                      title: "D3 Scales and Axes", content: "Getting more comfortable with D3 scales. Linear, log, and ordinal scales each have their place. Axes are built from scales — that was the mental model I was missing.", summary: "Developed clearer mental model of D3 scales and their relationship to axes.", sentiment_score: 0.6 },
  { tags: ["d3", "engineering"],       title: "Interactive D3 Brushing", content: "Implemented D3 brushing for range selection. The event system is low level but gives total control. Users can now select date ranges directly on the chart.", summary: "Implemented D3 brush interaction for interactive date range selection.", sentiment_score: 0.7 },
  { tags: ["d3"],                      title: "SVG vs Canvas for Data Viz", content: "Research on SVG vs Canvas rendering. SVG is DOM-based and interactive but slow at scale. Canvas is fast but requires manual hit testing. Going with SVG for now.", summary: "Evaluated SVG vs Canvas trade-offs, choosing SVG for interactive graph visualization.", sentiment_score: 0.5 },

  // Travel
  { tags: ["travel"],                  title: "Portugal Trip Planning", content: "Starting to plan a trip to Portugal. Lisbon and Porto both look incredible. Late September seems like the ideal time — crowds thin out but weather is still great.", summary: "Began planning Portugal trip targeting late September for Lisbon and Porto.", sentiment_score: 0.7 },
  { tags: ["travel", "cooking"],       title: "Food Research: Lisbon", content: "Researching food in Lisbon. Pastéis de nata, bacalhau, and bifanas are non-negotiable. Found a food tour that hits all the traditional spots.", summary: "Researched Lisbon food scene and booked a traditional food tour.", sentiment_score: 0.8 },
  { tags: ["travel"],                  title: "Solo Travel Reflections", content: "Thinking about why solo travel appeals to me. Full control of the itinerary, no compromises. The unexpected conversations with strangers are often the highlight.", summary: "Reflected on appeal of solo travel: autonomy and unexpected human connections.", sentiment_score: 0.7 },

  // Cooking
  { tags: ["cooking"],                 title: "Sourdough Starter — Day 7", content: "Sourdough starter finally active after a week. It's bubbling and has that sour smell. First bake tomorrow. Expecting a dense disaster but excited to try.", summary: "Sourdough starter became active after 7 days, ready for first bake.", sentiment_score: 0.6 },
  { tags: ["cooking", "nutrition"],    title: "Meal Prep Sunday System", content: "Perfected my Sunday meal prep routine. 2 hours, 5 meals for the week. Grains, proteins, and vegetables prepped separately for flexibility.", summary: "Established efficient 2-hour Sunday meal prep system for the week.", sentiment_score: 0.8 },
  { tags: ["cooking"],                 title: "Learning Knife Skills", content: "Watching knife skills videos and actually practicing. The difference between a sharp and dull knife is enormous. Julienne cuts are coming along.", summary: "Actively practicing knife skills, noting major difference with properly sharpened knife.", sentiment_score: 0.6 },
  { tags: ["cooking"],                 title: "First Attempt: Homemade Pasta", content: "Made pasta from scratch today. Just flour and eggs. The kneading is meditative. Fresh pasta taste is incomparable to dried — worth the effort.", summary: "Made fresh pasta from scratch, finding kneading meditative and result superior.", sentiment_score: 0.8 },

  // Finance
  { tags: ["finance"],                 title: "Annual Budget Review", content: "Reviewing this year's budget against actual spending. Biggest overspend: eating out (2x budget). Biggest underspend: entertainment. Need better food habit tracking.", summary: "Annual budget review revealed 2x overspend on eating out vs entertainment savings.", sentiment_score: -0.2 },
  { tags: ["finance", "budgeting"],    title: "Emergency Fund Goal Hit", content: "Hit my 6-month emergency fund target today. Took 18 months of consistent saving. The peace of mind it brings is worth every sacrifice.", summary: "Achieved 6-month emergency fund goal after 18 months of consistent saving.", sentiment_score: 0.9 },
  { tags: ["finance"],                 title: "Investment Portfolio Review", content: "Quarterly portfolio check. Index funds are performing as expected — boring but consistent. Resisting the urge to tinker. Staying the course.", summary: "Quarterly portfolio review confirmed index fund strategy on track, avoiding tinkering.", sentiment_score: 0.5 },

  // Writing
  { tags: ["writing"],                 title: "First Draft Complete", content: "Finished the first draft of the technical article I've been working on for two weeks. It's rough but it exists. Editing is easier than creating from nothing.", summary: "Completed first draft of technical article, ready for revision phase.", sentiment_score: 0.7 },
  { tags: ["writing", "learning"],     title: "Writing Process Reflection", content: "Thinking about my writing process. I write best in the morning before other tasks fill my head. Need to protect that time more jealously.", summary: "Identified morning as optimal writing time and need to protect it.", sentiment_score: 0.5 },
  { tags: ["writing"],                 title: "Published First Blog Post", content: "Published the technical article. Posted on dev.to and LinkedIn. Better reception than expected — 200 views on day one. The feedback is encouraging.", summary: "Published first technical article, received 200 views and positive feedback on day one.", sentiment_score: 0.9 },

  // Leadership
  { tags: ["leadership"],              title: "First Time Leading a Sprint", content: "Led my first full sprint as unofficial team lead. Keeping everyone unblocked is a different skill than writing code. Enjoyed it more than expected.", summary: "Led first sprint as team lead, discovering enjoyment of the facilitation role.", sentiment_score: 0.7 },
  { tags: ["leadership", "wellbeing"], title: "Giving Constructive Feedback", content: "Had to give difficult feedback to a colleague today. Used the SBI model (Situation-Behavior-Impact). It was uncomfortable but the conversation was productive.", summary: "Delivered constructive feedback using SBI model, resulting in productive dialogue.", sentiment_score: 0.4 },

  // Learning
  { tags: ["learning"],                title: "Spaced Repetition System Setup", content: "Set up Anki for spaced repetition. Adding cards for programming concepts, vocabulary, and ideas from books. The forgetting curve is real.", summary: "Configured Anki spaced repetition system for programming concepts and book insights.", sentiment_score: 0.6 },
  { tags: ["learning", "engineering"], title: "System Design Interview Prep", content: "Practicing system design. Designing a URL shortener end-to-end. Database choices, caching strategies, and scaling decisions feel more natural with practice.", summary: "Practiced system design with URL shortener exercise, improving scaling intuition.", sentiment_score: 0.6 },
  { tags: ["learning"],                title: "Learning in Public Benefits", content: "Reflecting on the benefits of learning in public. Writing about what I learn forces me to understand it deeply. The audience is almost secondary.", summary: "Recognized that writing publicly about learning deepens personal understanding.", sentiment_score: 0.7 },

  // Productivity
  { tags: ["productivity"],            title: "Time Blocking Trial — Week 1", content: "First week of strict time blocking. More got done but felt rigid. Needs refinement — some blocks should be protected, others flexible.", summary: "Time blocking increased output but needs adjustment for flexibility vs focus balance.", sentiment_score: 0.4 },
  { tags: ["productivity", "reading"], title: "GTD System Review", content: "Revisiting Getting Things Done methodology. The capture and process steps are the most valuable. Inbox zero isn't the goal — decision clarity is.", summary: "Revisited GTD methodology, identifying capture and decision clarity as core values.", sentiment_score: 0.5 },
  { tags: ["productivity"],            title: "Single-Tasking Experiment", content: "Tried single-tasking for a full week. Phone in another room, one browser tab, no Slack. Deepest focus I've had in years. Will continue.", summary: "Single-tasking experiment produced deepest focus in years, committing to continue.", sentiment_score: 0.8 },

  // Meditation
  { tags: ["meditation"],              title: "30-Day Meditation Streak", content: "30 consecutive days of meditation. The biggest change is noticing when I'm reactive. I create a small gap between stimulus and response now.", summary: "30-day meditation streak developed improved stimulus-response awareness.", sentiment_score: 0.8 },
  { tags: ["meditation", "wellbeing"], title: "Meditation and Anxiety", content: "Meditation has noticeably reduced my baseline anxiety. Not dramatic but consistent. Like the volume on background noise has been turned down.", summary: "Regular meditation noticeably reduced baseline anxiety levels over time.", sentiment_score: 0.6 },

  // Photography
  { tags: ["photography"],             title: "Learning Manual Mode", content: "Finally committed to shooting in manual mode only. Frustrating at first but understanding the exposure triangle is changing how I see light.", summary: "Committed to manual mode photography, developing new awareness of light and exposure.", sentiment_score: 0.5 },
  { tags: ["photography"],             title: "Street Photography Walk", content: "Morning street photography in the old town. Got 3 shots I'm genuinely happy with out of 200. That ratio is apparently normal. Patience is the skill.", summary: "Street photography session yielded 3 strong shots, learning patience is key.", sentiment_score: 0.6 },

  // Music
  { tags: ["music"],                   title: "Guitar — Chord Transitions Improving", content: "Guitar practice is finally clicking. Chord transitions between G and C are smooth now. Muscle memory is forming. Two months in and I can play a real song.", summary: "Guitar chord transitions becoming smooth after two months of consistent practice.", sentiment_score: 0.8 },
  { tags: ["music"],                   title: "Music Theory Basics", content: "Learning music theory basics. Understanding scales and intervals makes the fretboard make sense. Everything connects — it's like learning the grammar of music.", summary: "Music theory knowledge making fretboard patterns finally logical and connected.", sentiment_score: 0.7 },

  // Sleep
  { tags: ["sleep", "wellbeing"],      title: "Sleep Hygiene Overhaul", content: "Overhauling sleep habits. No screens 1 hour before bed, consistent wake time, room temperature at 18°C. First week results are promising.", summary: "Implemented comprehensive sleep hygiene changes with promising first-week results.", sentiment_score: 0.5 },
  { tags: ["sleep"],                   title: "Sleep Tracking 30-Day Report", content: "30 days of sleep tracking complete. Average 7.2 hours. Deep sleep percentage is low — need more exercise and less evening alcohol.", summary: "30-day sleep tracking revealed 7.2 hour average with low deep sleep percentage.", sentiment_score: 0.3 },

  // Nutrition
  { tags: ["nutrition"],               title: "Plant-Based Month Experiment", content: "Trying a plant-based month. Day 10 — energy is surprisingly good. Missing cheese more than meat. Need to learn more plant protein sources.", summary: "Ten days into plant-based experiment with good energy, focusing on protein sources.", sentiment_score: 0.5 },

  // Hiking
  { tags: ["hiking"],                  title: "First Mountain Summit", content: "First proper mountain summit today. 6 hours round trip, 900m elevation gain. The view at the top erased all the suffering. Will absolutely do again.", summary: "Completed first mountain summit (900m gain), found the view worth every step.", sentiment_score: 0.9 },
  { tags: ["hiking", "fitness"],       title: "Trail Preparation Notes", content: "Researching proper trail preparation. Blister prevention, layering system, emergency kit. The ten essentials are non-negotiable for longer hikes.", summary: "Researched trail preparation essentials including first aid and layering systems.", sentiment_score: 0.5 },

  // Reflection
  { tags: ["reflection"],              title: "One Year at the Company", content: "One year at the company today. Technically much stronger. The team culture is better than I expected. The work is meaningful. A year well spent.", summary: "One-year company anniversary reflection: strong technical growth and positive culture.", sentiment_score: 0.8 },
  { tags: ["reflection", "journaling"],title: "Values Clarification Exercise", content: "Did a values clarification exercise. Top three: autonomy, mastery, connection. Interesting that security didn't make the top three. Need to think about that.", summary: "Values clarification revealed top three: autonomy, mastery, connection.", sentiment_score: 0.6 },
  { tags: ["reflection"],              title: "Mid-Year Check-In", content: "Halfway through the year. More growth than expected in technical skills, less than expected in health. The imbalance is something to correct in H2.", summary: "Mid-year review revealed technical over-achievement and health under-achievement.", sentiment_score: 0.3 },

  // Extra engineering/learning/mixed
  { tags: ["engineering", "docker"],   title: "Kubernetes First Steps", content: "Started learning Kubernetes basics. The mental model of pods, services, and deployments took a while to click. Kind is great for local development.", summary: "Began Kubernetes learning with local Kind cluster for pod and service concepts.", sentiment_score: 0.5 },
  { tags: ["learning", "reading"],     title: "Feynman Technique Application", content: "Applied the Feynman Technique to truly understand OAuth 2.0. Explaining it like I would to someone with no background exposed all the gaps in my understanding.", summary: "Used Feynman Technique on OAuth 2.0, identifying and filling knowledge gaps.", sentiment_score: 0.6 },
  { tags: ["engineering"],             title: "Code Review Mindset Shift", content: "Shifted my code review mindset from 'finding mistakes' to 'knowledge sharing'. Reviews are now faster, less defensive, and more educational.", summary: "Reframed code review as knowledge sharing, making process more productive.", sentiment_score: 0.7 },
  { tags: ["wellbeing", "reflection"], title: "Comparing Myself to Others", content: "Caught myself comparing my progress to colleagues. Comparison is a trap — everyone's journey is different. Refocused on my own metrics.", sentiment_score: -0.3, summary: "Recognized comparison trap with colleagues, refocused on personal growth metrics." },
  { tags: ["productivity", "journaling"], title: "Weekly Review System Update", content: "Updated my weekly review system. Added a 'What drained me?' section alongside 'What went well?'. Identifying energy drains is as important as celebrating wins.", summary: "Updated weekly review to include energy drain identification alongside wins.", sentiment_score: 0.5 },
  { tags: ["engineering", "nodejs"],   title: "Caching Strategy Deep Dive", content: "Deep dive into caching strategies. Redis for session data, CDN for static assets, and in-memory for frequently computed values. Each layer serves a different purpose.", summary: "Researched multi-layer caching strategy using Redis, CDN, and in-memory cache.", sentiment_score: 0.6 },
  { tags: ["cooking", "reflection"],   title: "Cooking as Mindfulness", content: "Started to see cooking as a mindfulness practice. Chopping vegetables, watching a reduction happen — present moment stuff. The food is just the outcome.", summary: "Discovered cooking as a present-moment mindfulness practice beyond just making food.", sentiment_score: 0.8 },
  { tags: ["finance", "reflection"],   title: "Money and Happiness Research", content: "Read about money and happiness research. Beyond $75k baseline, more money has diminishing returns on happiness. Experiences beat things consistently.", summary: "Research confirmed diminishing happiness returns above income baseline; experiences beat possessions.", sentiment_score: 0.5 },
  { tags: ["writing", "engineering"],  title: "Technical Documentation Is Underrated", content: "Spent time improving our project docs. Future me and colleagues will thank present me. Good documentation is a force multiplier for the whole team.", summary: "Improved project documentation recognizing it as force multiplier for team productivity.", sentiment_score: 0.7 },
  { tags: ["vue", "d3"],               title: "Vue and D3 Integration Patterns", content: "Found the right pattern for integrating D3 with Vue. D3 handles SVG manipulation, Vue handles reactivity and data. Don't fight the frameworks.", summary: "Established clear Vue+D3 integration pattern: D3 for SVG, Vue for reactivity.", sentiment_score: 0.7 },
  { tags: ["wellbeing"],               title: "Social Battery Awareness", content: "Recognizing I'm an introvert who can act extroverted. Social events are energising in the moment but I need recovery time after. Planning accordingly.", summary: "Recognized ambivert tendencies and started planning social recovery time.", sentiment_score: 0.4 },
  { tags: ["learning", "productivity"],title: "Input vs Output Learning", content: "Shifting from input-heavy (reading, watching) to output-heavy (building, writing) learning. The knowledge sticks better. The projects don't have to be polished.", summary: "Shifted learning strategy from input-heavy to output-heavy for better retention.", sentiment_score: 0.6 },
  { tags: ["nodejs", "engineering"],   title: "Authentication Best Practices", content: "Reviewing authentication best practices. JWTs for stateless auth, refresh tokens with rotation, httpOnly cookies to prevent XSS. Security in layers.", summary: "Reviewed auth security: JWTs, refresh token rotation, and httpOnly cookie defense.", sentiment_score: 0.5 },
  { tags: ["fitness", "reflection"],   title: "Fitness as Identity Shift", content: "Reframing fitness from 'something I do' to 'who I am'. Identity-based habits are stickier. I'm not trying to get fit — I'm a person who takes care of their body.", summary: "Adopted identity-based fitness mindset: being someone who takes care of their body.", sentiment_score: 0.8 },
  { tags: ["reflection", "journaling"],title: "Fear Setting Exercise", content: "Did Tim Ferriss's fear setting exercise for a big decision. Defining the worst case made the risk seem manageable. Deciding not to decide is also a decision.", summary: "Fear setting exercise made big decision's worst case manageable and clarified choice.", sentiment_score: 0.5 },
  { tags: ["design"],                  title: "Dark Mode Design Principles", content: "Deep dive into dark mode design. Not just inverting colors — shadows become highlights, saturation drops, and elevation uses lighter surfaces.", summary: "Learned dark mode requires rethinking shadows, elevation, and color saturation.", sentiment_score: 0.6 },
  { tags: ["engineering", "testing"],  title: "TDD Experiment — Two Weeks", content: "Two weeks of strict TDD. Tests first, code second. Initial friction was high but the code quality improvement is undeniable. Debugging time dropped significantly.", summary: "Two-week TDD experiment showed significant code quality and debugging improvements.", sentiment_score: 0.7 },
]

// Generate dates spread across all 12 months of 2025
function makeDate(year, month, day, hour) {
  return `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}T${String(hour).padStart(2,'0')}:00:00Z`
}

// Spread 150 notes across 2025: ~12-13 per month
const datesFor2025 = []
for (let month = 1; month <= 12; month++) {
  const daysInMonth = new Date(2025, month, 0).getDate()
  // 12-13 notes per month, spread across the month
  const count = month <= 6 ? 12 : 13
  const dayStep = Math.floor(daysInMonth / count)
  for (let i = 0; i < count; i++) {
    const day = Math.min(1 + i * dayStep + Math.floor(Math.random() * dayStep), daysInMonth)
    const hour = 8 + Math.floor(Math.random() * 12)
    datesFor2025.push(makeDate(2025, month, day, hour))
  }
}
datesFor2025.sort()

// Build 150 note entries by cycling through templates
const newNotes = []
for (let i = 0; i < 150; i++) {
  const template = templates[i % templates.length]
  const createdAt = datesFor2025[i]
  const updatedDate = new Date(createdAt)
  updatedDate.setHours(updatedDate.getHours() + 1)
  const updatedAt = updatedDate.toISOString().slice(0,19) + 'Z'
  newNotes.push({
    id: String(111 + i),
    title: i < templates.length ? template.title : `${template.title} (${Math.floor(i/templates.length) + 1})`,
    content: template.content,
    tags: template.tags,
    sentiment_score: template.sentiment_score + (Math.random() * 0.2 - 0.1), // slight variation
    summary: template.summary,
    created_at: createdAt,
    updated_at: updatedAt
  })
}

// Read mockData.js and append before the closing ]
const content = readFileSync(filePath, 'utf8')
const insertPoint = content.lastIndexOf(']')

const newEntries = newNotes.map(n => `  {
    id: "${n.id}",
    title: "${n.title.replace(/"/g, '\\"')}",
    content: "${n.content.replace(/"/g, '\\"')}",
    tags: ${JSON.stringify(n.tags)},
    sentiment_score: ${parseFloat(n.sentiment_score.toFixed(2))},
    summary: "${n.summary.replace(/"/g, '\\"')}",
    created_at: "${n.created_at}",
    updated_at: "${n.updated_at}"
  }`).join(',\n')

const newContent = content.slice(0, insertPoint) + ',\n' + newEntries + '\n]'
writeFileSync(filePath, newContent)
console.log(`✓ Added 150 notes (IDs 111-260) spanning all 12 months of 2025`)
console.log(`First: ${datesFor2025[0]}`)
console.log(`Last: ${datesFor2025[149]}`)
