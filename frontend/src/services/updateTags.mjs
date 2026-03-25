/**
 * Rewrites mock note tags with a natural power-law distribution.
 * Run: node src/services/updateTags.mjs
 *
 * Tag frequency targets (creates varied connection ranges):
 *   Hub    12-14 notes : engineering, wellbeing, journaling
 *   Common  7-10 notes : reading, fitness, vue, nodejs, design, d3, travel, writing
 *   Medium  4-6 notes  : cooking, finance, learning, leadership, productivity
 *   Rare    2-3 notes  : music, meditation, photography, typescript, docker, nutrition,
 *                        hiking, budgeting, testing, sleep, creativity, habits, databases
 */
const tagMap = {
  "1":   ["engineering",  "leadership"],
  "2":   ["engineering",  "design"],
  "3":   ["wellbeing",    "reflection"],
  "4":   ["d3",           "learning"],
  "5":   ["vue",          "design"],
  "6":   ["leadership",   "writing"],
  "7":   ["wellbeing",    "sleep"],
  "8":   ["nodejs",       "databases"],
  "9":   ["fitness",      "wellbeing"],
  "10":  ["nodejs",       "performance"],
  "11":  ["wellbeing",    "journaling"],
  "12":  ["wellbeing",    "journaling"],
  "13":  ["d3",           "engineering"],
  "14":  ["writing",      "journaling"],
  "15":  ["d3",           "creativity"],
  "16":  ["vue",          "d3"],
  "17":  ["design",       "leadership"],
  "18":  ["finance",      "budgeting"],
  "19":  ["reading",      "engineering"],
  "20":  ["nodejs",       "databases"],
  "21":  ["fitness",      "nutrition"],
  "22":  ["engineering",  "learning"],
  "23":  ["nodejs",       "databases"],
  "24":  ["nodejs",       "performance"],
  "25":  ["d3",           "engineering"],
  "26":  ["fitness",      "habits"],
  "27":  ["engineering",  "leadership"],
  "28":  ["fitness",      "wellbeing"],
  "29":  ["engineering",  "testing"],
  "30":  ["vue",          "design"],
  "31":  ["vue",          "typescript"],
  "32":  ["travel",       "journaling"],
  "33":  ["vue",          "design"],
  "34":  ["design",       "leadership"],
  "35":  ["wellbeing",    "reflection"],
  "36":  ["reading",      "learning"],
  "37":  ["wellbeing",    "meditation"],
  "38":  ["journaling",   "reflection"],
  "39":  ["cooking",      "creativity"],
  "40":  ["design",       "leadership"],
  "41":  ["d3",           "creativity"],
  "42":  ["journaling",   "leadership"],
  "43":  ["journaling",   "engineering"],
  "44":  ["cooking",      "nutrition"],
  "45":  ["engineering",  "typescript"],
  "46":  ["nodejs",       "engineering"],
  "47":  ["writing",      "engineering"],
  "48":  ["fitness",      "wellbeing"],
  "49":  ["vue",          "design"],
  "50":  ["d3",           "creativity"],
  "51":  ["journaling",   "learning"],
  "52":  ["reading",      "productivity"],
  "53":  ["design",       "leadership"],
  "54":  ["wellbeing",    "journaling"],
  "55":  ["travel",       "finance"],
  "56":  ["journaling",   "wellbeing"],
  "57":  ["reading",      "productivity"],
  "58":  ["sleep",        "wellbeing"],
  "59":  ["reading",      "productivity"],
  "60":  ["cooking",      "wellbeing"],
  "61":  ["fitness",      "wellbeing"],
  "62":  ["journaling",   "writing"],
  "63":  ["travel",       "hiking"],
  "64":  ["journaling",   "meditation"],
  "65":  ["vue",          "design"],
  "66":  ["reading",      "learning"],
  "67":  ["finance",      "budgeting"],
  "68":  ["finance",      "travel"],
  "69":  ["fitness",      "habits"],
  "70":  ["engineering",  "databases"],
  "71":  ["wellbeing",    "journaling"],
  "72":  ["design",       "creativity"],
  "73":  ["travel",       "cooking"],
  "74":  ["fitness",      "nutrition"],
  "75":  ["wellbeing",    "leadership"],
  "76":  ["journaling",   "reading"],
  "77":  ["nodejs",       "databases"],
  "78":  ["fitness",      "hiking"],
  "79":  ["finance",      "meditation"],
  "80":  ["engineering",  "design"],
  "81":  ["journaling",   "habits"],
  "82":  ["reading",      "habits"],
  "83":  ["nodejs",       "performance"],
  "84":  ["vue",          "typescript"],
  "85":  ["cooking",      "nutrition"],
  "86":  ["travel",       "learning"],
  "87":  ["wellbeing",    "reflection"],
  "88":  ["d3",           "engineering"],
  "89":  ["design",       "creativity"],
  "90":  ["fitness",      "hiking"],
  "91":  ["vue",          "design"],
  "92":  ["design",       "writing"],
  "93":  ["travel",       "writing"],
  "94":  ["reading",      "habits"],
  "95":  ["reading",      "writing"],
  "96":  ["writing",      "creativity"],
  "97":  ["engineering",  "learning"],
  "98":  ["cooking",      "nutrition"],
  "99":  ["nodejs",       "engineering"],
  "100": ["journaling",   "engineering"],
}

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))
const filePath = join(__dir, 'mockData.js')
let content = readFileSync(filePath, 'utf8')

let updated = 0
for (const [id, tags] of Object.entries(tagMap)) {
  const pattern = new RegExp(
    `(\\{[^}]{0,300}id:\\s*"${id}"[\\s\\S]{0,500}?tags:\\s*)\\[[^\\]]*\\]`
  )
  const prev = content
  content = content.replace(pattern, `$1${JSON.stringify(tags)}`)
  if (content !== prev) updated++
  else console.warn(`⚠️  Could not update note id="${id}"`)
}

writeFileSync(filePath, content, 'utf8')
console.log(`\n✅ Updated ${updated} / ${Object.keys(tagMap).length} notes\n`)

// Frequency report
const freq = {}
for (const tags of Object.values(tagMap)) {
  for (const t of tags) freq[t] = (freq[t] || 0) + 1
}
const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1])
console.log('Tag frequency:')
sorted.forEach(([t, n]) => {
  const bar = '█'.repeat(n)
  console.log(`  ${t.padEnd(16)} ${String(n).padStart(2)}  ${bar}`)
})
