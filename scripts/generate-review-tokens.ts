/**
 * generate-review-tokens.ts
 *
 * Reads a CSV of wedding guests, calls POST /api/reviews/generate-token for
 * each, and writes a new CSV with the resulting review URLs.
 *
 * Usage:
 *   npx tsx scripts/generate-review-tokens.ts guests.csv
 *
 * Input CSV columns : guest_name, guest_email  (header row required)
 * Output CSV        : review-invites.csv  (guest_name, guest_email, review_url, token)
 */

import fs from "fs"
import path from "path"
import readline from "readline"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
const API_URL = `${SITE_URL}/api/reviews/generate-token`

interface GuestRow {
  guest_name: string
  guest_email: string
}

interface ResultRow extends GuestRow {
  review_url: string
  token: string
}

function parseCsv(filePath: string): Promise<GuestRow[]> {
  return new Promise((resolve, reject) => {
    const rows: GuestRow[] = []
    const stream = fs.createReadStream(filePath)
    const rl = readline.createInterface({ input: stream, crlfDelay: Infinity })

    let headerParsed = false
    let guestNameIdx = -1
    let guestEmailIdx = -1

    rl.on("line", (line) => {
      const cols = line.split(",").map((c) => c.trim().replace(/^"|"$/g, ""))

      if (!headerParsed) {
        guestNameIdx = cols.findIndex((c) => c.toLowerCase() === "guest_name")
        guestEmailIdx = cols.findIndex((c) => c.toLowerCase() === "guest_email")
        if (guestNameIdx === -1 || guestEmailIdx === -1) {
          reject(
            new Error(
              "CSV must have columns: guest_name, guest_email"
            )
          )
          return
        }
        headerParsed = true
        return
      }

      const name = cols[guestNameIdx]
      const email = cols[guestEmailIdx]
      if (name && email) {
        rows.push({ guest_name: name, guest_email: email })
      }
    })

    rl.on("close", () => resolve(rows))
    rl.on("error", reject)
  })
}

async function generateToken(guest: GuestRow): Promise<ResultRow> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(guest),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`API error for ${guest.guest_email}: ${text}`)
  }

  const data = (await res.json()) as { token: string; review_url: string }
  return {
    guest_name: guest.guest_name,
    guest_email: guest.guest_email,
    review_url: data.review_url,
    token: data.token,
  }
}

function toCsvLine(row: ResultRow): string {
  return [row.guest_name, row.guest_email, row.review_url, row.token]
    .map((v) => `"${v}"`)
    .join(",")
}

async function main() {
  const inputFile = process.argv[2]

  if (!inputFile) {
    console.error("Usage: npx tsx scripts/generate-review-tokens.ts <guests.csv>")
    process.exit(1)
  }

  const resolvedPath = path.resolve(inputFile)

  if (!fs.existsSync(resolvedPath)) {
    console.error(`File not found: ${resolvedPath}`)
    process.exit(1)
  }

  console.log(`Reading guests from: ${resolvedPath}`)
  const guests = await parseCsv(resolvedPath)
  console.log(`Found ${guests.length} guest(s). Generating tokens via ${API_URL} …\n`)

  const results: ResultRow[] = []

  for (let i = 0; i < guests.length; i++) {
    const guest = guests[i]
    try {
      const result = await generateToken(guest)
      results.push(result)
      console.log(`[${i + 1}/${guests.length}] ✓ ${guest.guest_name} — ${result.review_url}`)
    } catch (err) {
      console.error(`[${i + 1}/${guests.length}] ✗ ${guest.guest_name} — ${(err as Error).message}`)
    }
  }

  const outputPath = path.resolve("review-invites.csv")
  const lines = [
    "guest_name,guest_email,review_url,token",
    ...results.map(toCsvLine),
  ]
  fs.writeFileSync(outputPath, lines.join("\n") + "\n", "utf8")

  console.log(`\nDone. ${results.length}/${guests.length} tokens generated.`)
  console.log(`Output written to: ${outputPath}`)
}

main().catch((err) => {
  console.error("Fatal error:", err)
  process.exit(1)
})
