import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const filePath = decodeURIComponent(path.join(__dirname, 'mockData.js'))

// Find current highest ID
const existing = readFileSync(filePath, 'utf8')
const ids = [...existing.matchAll(/id:\s*"(\d+)"/g)].map(m => parseInt(m[1]))
const startId = Math.max(...ids) + 1
console.log(`Starting from ID: ${startId}`)

// Templates with varied sentiment — more negative/neutral for variety
const templates = [
  // Very positive
  { tags: ["fitness"],       title: "Marathon Training — Long Run PB",    content: "Longest run yet — 28km. Felt strong the whole way. Marathon is within reach.", sentiment: 0.95, summary: "Achieved 28km long run PB, marathon goal now feels realistic." },
  { tags: ["engineering"],   title: "Feature Shipped to Production",       content: "Big feature finally in production. Zero issues. The testing paid off.", sentiment: 0.9, summary: "Major feature shipped cleanly to production after thorough testing." },
  { tags: ["writing"],       title: "Article Hit 1000 Views",              content: "The technical article crossed 1000 views. Community feedback is overwhelmingly positive.", sentiment: 0.92, summary: "Technical article reached 1000 views with strong community reception." },
  { tags: ["cooking"],       title: "Sourdough Finally Perfect",            content: "After 12 attempts, the sourdough is perfect. Open crumb, crispy crust. Worth every failure.", sentiment: 0.95, summary: "Achieved perfect sourdough after 12 iterations — open crumb and crispy crust.", },
  { tags: ["learning"],      title: "Certification Passed",                content: "Passed the AWS Solutions Architect exam on first attempt. Months of studying paid off.", sentiment: 0.93, summary: "Passed AWS Solutions Architect certification on first attempt." },
  { tags: ["journaling"],    title: "Best Week in a Long Time",            content: "Everything clicked this week. Work, health, relationships. Rare alignment.", sentiment: 0.9, summary: "Exceptional week with work, health, and relationships all aligned positively." },
  { tags: ["music"],         title: "Played First Open Mic Night",         content: "Performed at an open mic for the first time. Nervous but pulled it off. People clapped.", sentiment: 0.88, summary: "Successfully completed first open mic performance despite nerves." },
  { tags: ["reflection"],    title: "Got the Promotion",                   content: "Officially promoted to senior. A year of hard work recognized. Feeling proud.", sentiment: 0.95, summary: "Received senior promotion after a year of consistent effort and results." },

  // Moderately positive
  { tags: ["engineering", "vue"],   title: "Refactor Complete — Code Quality Up",  content: "Finished the component refactor. Test coverage went from 40% to 78%. Feels much better.", sentiment: 0.65, summary: "Component refactor improved test coverage from 40% to 78%." },
  { tags: ["reading"],              title: "Finished Atomic Habits",               content: "Completed Atomic Habits. The 1% better every day concept is deceptively simple but powerful.", sentiment: 0.65, summary: "Atomic Habits reinforced compound improvement through 1% daily gains." },
  { tags: ["fitness", "hiking"],    title: "Sunrise Hike — Worth the 4am Alarm",   content: "Woke at 4am for a sunrise hike. The view at the top in golden light was surreal.", sentiment: 0.75, summary: "Early morning sunrise hike delivered breathtaking light views." },
  { tags: ["productivity"],         title: "Inbox Zero Achieved",                  content: "Cleared my inbox for the first time in 8 months. Took 3 hours. Feels like a fresh start.", sentiment: 0.6, summary: "Achieved inbox zero after 8 months, creating mental clarity." },
  { tags: ["nodejs"],               title: "API Response Time Improved 60%",       content: "Query optimization and caching cut API response from 800ms to 320ms. Significant win.", sentiment: 0.7, summary: "API optimization reduced response time by 60% through caching and query tuning." },
  { tags: ["meditation"],           title: "60-Day Meditation Streak",             content: "Hit 60 days consecutive meditation. The practice is now automatic — like brushing teeth.", sentiment: 0.72, summary: "60-day meditation streak reached, practice now deeply habitual." },
  { tags: ["design"],               title: "Design System v2 Launched",            content: "New design system adopted by all three product teams. Consistency across products finally.", sentiment: 0.7, summary: "Design system v2 successfully adopted across all three product teams." },
  { tags: ["finance"],              title: "Investments Up 18% YTD",               content: "Portfolio review: 18% year-to-date return. Index funds boring but effective.", sentiment: 0.68, summary: "Portfolio achieved 18% YTD return through consistent index fund strategy." },

  // Neutral / mixed
  { tags: ["engineering"],  title: "Long Bug Hunt — Finally Found It",   content: "Spent 6 hours on a bug that turned out to be a timezone issue. Frustrating but resolved.", sentiment: 0.1, summary: "6-hour debugging session resolved timezone-related bug." },
  { tags: ["reflection"],   title: "Feeling Stuck Professionally",       content: "Not sure where to go next in my career. Multiple paths, none feel clearly right.", sentiment: -0.1, summary: "Experiencing career direction uncertainty with multiple viable but unclear paths." },
  { tags: ["journaling"],   title: "Rainy Sunday — Low Energy",          content: "Low energy day. Not productive but not terrible either. Sometimes rest looks like this.", sentiment: 0.05, summary: "Low energy rest day — unproductive but necessary recovery.", },
  { tags: ["wellbeing"],    title: "Sleep Quality Declining",            content: "Bad sleep for the third night. Affecting mood and focus. Need to fix the root cause.", sentiment: -0.15, summary: "Three nights of poor sleep beginning to impact mood and concentration." },
  { tags: ["learning"],     title: "Complex Topic — Progress Slow",      content: "Trying to understand distributed consensus algorithms. Progress is slow. It clicks, then un-clicks.", sentiment: 0.1, summary: "Struggling with distributed consensus algorithms, progress inconsistent." },
  { tags: ["fitness"],      title: "Missed Two Weeks — Starting Over",   content: "Travel broke the training routine. Back to basics. The first run back is always the hardest.", sentiment: 0.0, summary: "Resumed training after travel break — restarting base-building phase." },
  { tags: ["productivity"], title: "Distracted Day — Nothing Shipped",   content: "Constant interruptions today. Context switching destroyed focus. Need to protect deep work time.", sentiment: -0.2, summary: "Interruption-heavy day with context switching preventing meaningful progress." },

  // Negative / difficult
  { tags: ["wellbeing"],    title: "Panic Attack at Work",               content: "Had a panic attack during a presentation. Embarrassing and scary. Need to address this properly.", sentiment: -0.85, summary: "Experienced panic attack during work presentation — needs professional support." },
  { tags: ["reflection"],   title: "Project Cancelled After 3 Months",   content: "The project I've been working on for 3 months was cancelled. Feels like wasted effort.", sentiment: -0.8, summary: "Major project cancelled after 3 months, leaving work feeling purposeless." },
  { tags: ["journaling"],   title: "Comparison Spiral — Dark Thoughts",  content: "Fell into a comparison spiral on social media. Everyone looks more successful. I know it's not real but it stings.", sentiment: -0.75, summary: "Social media comparison spiral triggering feelings of inadequacy." },
  { tags: ["wellbeing"],    title: "Overwhelmed by Everything",          content: "Too many things at once. Work, health, relationships, side projects. Can't prioritize. Paralyzed.", sentiment: -0.8, summary: "Overwhelmed by competing demands across work, health, and personal life." },
  { tags: ["engineering"],  title: "Production Outage — My Fault",       content: "I caused a production outage. 45 minutes of downtime. Worst feeling. Need better deployment checks.", sentiment: -0.9, summary: "Caused 45-minute production outage, triggering deployment process review." },
  { tags: ["reflection"],   title: "Received Harsh Criticism",           content: "Got harsh feedback on my work in front of the team. Some valid, delivery was brutal. Need to process this.", sentiment: -0.7, summary: "Received harsh public criticism — processing validity vs delivery style." },
  { tags: ["wellbeing"],    title: "Loneliness After Moving Cities",     content: "Six months in the new city. Work is good but haven't built real friendships yet. Quietly lonely.", sentiment: -0.65, summary: "Experiencing quiet loneliness six months after relocating to new city." },
  { tags: ["journaling"],   title: "Rejected from Dream Job",            content: "Didn't get the job I really wanted. Made it to final round then no. Hard to accept.", sentiment: -0.85, summary: "Final round rejection from dream job opportunity, processing disappointment." },
  { tags: ["fitness"],      title: "Injury — Forced to Stop Training",   content: "Knee injury means no running for 6 weeks. Devastating after building momentum for months.", sentiment: -0.75, summary: "Knee injury forcing 6-week running break at height of training momentum." },
  { tags: ["finance"],      title: "Unexpected Expense — Budget Blown",  content: "Car repair wiped out the savings buffer. Back to square one on the emergency fund.", sentiment: -0.6, summary: "Unexpected car repair expenses depleted savings buffer completely." },
  { tags: ["wellbeing"],    title: "Exhausted — Running on Empty",       content: "Physically and mentally exhausted. Can't remember the last time I felt truly rested.", sentiment: -0.8, summary: "Deep exhaustion with no memory of feeling genuinely rested." },
  { tags: ["engineering"],  title: "Legacy Codebase Despair",            content: "Inheriting this legacy codebase is demoralising. No tests, no docs, spaghetti everywhere.", sentiment: -0.7, summary: "Inheriting undocumented, untested legacy codebase causing significant morale drop." },

  // More positive variety
  { tags: ["travel"],       title: "Arrived in Lisbon",                  content: "First day in Lisbon. Warm, beautiful, pastéis de nata for breakfast. Already love it.", sentiment: 0.88, summary: "Arrived in Lisbon to perfect weather and iconic pastéis de nata." },
  { tags: ["cooking"],      title: "Dinner Party — Everyone Loved It",   content: "Hosted a dinner party for 8. The risotto was the highlight. Happy guests, great conversations.", sentiment: 0.85, summary: "Successful dinner party of 8 with standout risotto and great conversation." },
  { tags: ["photography"],  title: "Photo Accepted by Magazine",         content: "A photo I submitted got accepted for publication. First time being published. Incredible feeling.", sentiment: 0.9, summary: "First photography publication acceptance — photo selected for magazine." },
  { tags: ["learning"],     title: "Concept Finally Clicked",            content: "Monads. Three months of confusion and today it just clicked. That moment is addictive.", sentiment: 0.82, summary: "Monadic programming concept finally clicked after three months of confusion." },
  { tags: ["d3"],           title: "Visualization Featured on Hacker News", content: "Posted the D3 graph visualization on HN. Made the front page for 2 hours. 500 upvotes.", sentiment: 0.88, summary: "D3 visualization reached Hacker News front page with 500 upvotes." },
  { tags: ["wellbeing"],    title: "Therapy Is Working",                 content: "Noticing real changes from therapy. Catching negative thought patterns before they spiral.", sentiment: 0.7, summary: "Therapy producing measurable results in negative thought pattern recognition." },
  { tags: ["engineering"],  title: "Open Source PR Merged",              content: "First open source contribution merged into a popular library. Small fix but meaningful.", sentiment: 0.8, summary: "First open source contribution merged into widely-used library." },
  { tags: ["nutrition"],    title: "Energy Levels Transformed",          content: "Three weeks of better nutrition and my energy levels are unrecognisable. No afternoon crash.", sentiment: 0.75, summary: "Three weeks of improved nutrition eliminated afternoon energy crashes." },
  { tags: ["reflection"],   title: "Gratitude Practice — 90 Days",      content: "90 days of daily gratitude journaling. Genuine shift in how I default-interpret events.", sentiment: 0.78, summary: "90-day gratitude practice has shifted default interpretations to positive." },
  { tags: ["vue"],          title: "App Performance 3x Faster",          content: "Lazy loading, code splitting, and virtual scrolling. App feels completely different now.", sentiment: 0.75, summary: "Three performance optimizations delivered 3x app speed improvement." },
  { tags: ["docker"],       title: "Zero-Downtime Deployment Working",   content: "Blue-green deployment configured and tested. Deployments are now invisible to users.", sentiment: 0.72, summary: "Blue-green deployment enables zero-downtime releases invisible to users." },
  { tags: ["sleep"],        title: "First Full Week of Good Sleep",      content: "Seven consecutive nights of quality sleep. Mood, focus, and patience are dramatically better.", sentiment: 0.75, summary: "First week of consistent quality sleep producing dramatic mood and focus improvements." },
]

// Generate dates: cluster some days with multiple notes for activity variation
// Strategy: 60% of days have 1 note, 25% have 2, 10% have 3, 5% have 4-5
function generateClusteredDates(count) {
  const dates = []
  // Generate pool of "active days" across 2025 + 2026 Jan-Mar
  const activeDays = []

  // 2025: pick ~100 active days spread across the year
  for (let month = 0; month < 12; month++) {
    const daysInMonth = new Date(2025, month + 1, 0).getDate()
    const daysToActivate = 8 + Math.floor(Math.random() * 5) // 8-12 active days per month
    const usedDays = new Set()
    for (let i = 0; i < daysToActivate; i++) {
      let day
      do { day = 1 + Math.floor(Math.random() * daysInMonth) } while (usedDays.has(day))
      usedDays.add(day)
      activeDays.push(new Date(2025, month, day))
    }
  }

  // 2026 Jan-Mar: pick ~25 active days
  for (let month = 0; month < 3; month++) {
    const daysInMonth = new Date(2026, month + 1, 0).getDate()
    const daysToActivate = 7 + Math.floor(Math.random() * 4)
    const usedDays = new Set()
    for (let i = 0; i < daysToActivate; i++) {
      let day
      do { day = 1 + Math.floor(Math.random() * daysInMonth) } while (usedDays.has(day))
      usedDays.add(day)
      activeDays.push(new Date(2026, month, day))
    }
  }

  // For each active day, assign a note count with varied distribution
  for (const day of activeDays) {
    if (dates.length >= count) break
    const r = Math.random()
    let notesOnDay
    if (r < 0.5) notesOnDay = 1
    else if (r < 0.75) notesOnDay = 2
    else if (r < 0.90) notesOnDay = 3
    else notesOnDay = 4 + Math.floor(Math.random() * 2) // 4 or 5

    for (let n = 0; n < notesOnDay && dates.length < count; n++) {
      const hour = 7 + Math.floor(Math.random() * 13)
      const d = new Date(day)
      d.setHours(hour, 0, 0, 0)
      dates.push(d.toISOString().slice(0, 19) + 'Z')
    }
  }

  return dates.slice(0, count).sort()
}

const dates = generateClusteredDates(300)
console.log(`Generated ${dates.length} dates`)

// Count notes per day for verification
const dayCount = {}
dates.forEach(d => { const k = d.slice(0,10); dayCount[k] = (dayCount[k]||0)+1 })
const distribution = {}
Object.values(dayCount).forEach(c => distribution[c] = (distribution[c]||0)+1)
console.log('Notes per day distribution:', distribution)

// Build note entries
const newNotes = dates.map((date, i) => {
  const t = templates[i % templates.length]
  const suffix = i >= templates.length ? ` (${Math.floor(i/templates.length)+1})` : ''
  const updatedDate = new Date(date)
  updatedDate.setHours(updatedDate.getHours() + 1)
  const sentiment = Math.min(1, Math.max(-1, t.sentiment + (Math.random() * 0.15 - 0.075)))
  return `  {
    id: "${startId + i}",
    title: "${(t.title + suffix).replace(/"/g, '\\"')}",
    content: "${t.content.replace(/"/g, '\\"')}",
    tags: ${JSON.stringify(t.tags)},
    sentiment_score: ${parseFloat(sentiment.toFixed(2))},
    summary: "${t.summary.replace(/"/g, '\\"')}",
    created_at: "${date}",
    updated_at: "${updatedDate.toISOString().slice(0,19)}Z"
  }`
})

// Append to mockData.js
const content = readFileSync(filePath, 'utf8')
const insertPoint = content.lastIndexOf(']')
const newContent = content.slice(0, insertPoint) + ',\n' + newNotes.join(',\n') + '\n]'
writeFileSync(filePath, newContent)
console.log(`✓ Added 300 notes (IDs ${startId}–${startId+299})`)
console.log(`Date range: ${dates[0].slice(0,10)} → ${dates[dates.length-1].slice(0,10)}`)
