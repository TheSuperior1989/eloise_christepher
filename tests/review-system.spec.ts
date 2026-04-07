/**
 * review-system.spec.ts
 *
 * Playwright spec for the post-wedding review system.
 * Requires Playwright to be installed:  npm install -D @playwright/test
 *
 * Run with:  npx playwright test tests/review-system.spec.ts
 *
 * Note: tests that call the submit API require a valid token to exist in the
 * database first. In CI, seed a token via POST /api/reviews/generate-token
 * before running this suite.
 */

import { test, expect } from "@playwright/test"

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000"
const ADMIN_SECRET = process.env.REVIEW_ADMIN_SECRET || ""

// ── 1. Invalid token page ──────────────────────────────────────────────────
test("GET /review/invalid-token-abc shows invalid token message", async ({ page }) => {
  await page.goto(`${BASE_URL}/review/invalid-token-abc`)
  await expect(page.getByText(/invalid review link/i)).toBeVisible()
})

// ── 2. Submit with a valid token ───────────────────────────────────────────
test("POST /api/reviews/submit with valid token returns { success: true }", async ({ request }) => {
  // Step 1: generate a token
  const tokenRes = await request.post(`${BASE_URL}/api/reviews/generate-token`, {
    data: {
      guest_name: "Test Guest",
      guest_email: `playwright-${Date.now()}@test.com`,
    },
  })
  expect(tokenRes.ok()).toBeTruthy()
  const { token } = await tokenRes.json()

  // Step 2: submit a review with it
  const submitRes = await request.post(`${BASE_URL}/api/reviews/submit`, {
    data: {
      token,
      overallRating: 5,
      npsScore: 9,
      venueRating: 5,
      cateringRating: 4,
      ceremonyRating: 5,
      highlights: "Playwright test highlight",
      wouldRecommend: true,
    },
  })
  expect(submitRes.ok()).toBeTruthy()
  const body = await submitRes.json()
  expect(body.success).toBe(true)
})

// ── 3. Submit same token twice returns 409 ─────────────────────────────────
test("POST /api/reviews/submit with already-used token returns 409", async ({ request }) => {
  const tokenRes = await request.post(`${BASE_URL}/api/reviews/generate-token`, {
    data: {
      guest_name: "Duplicate Guest",
      guest_email: `duplicate-${Date.now()}@test.com`,
    },
  })
  const { token } = await tokenRes.json()

  const payload = {
    token,
    overallRating: 3,
    npsScore: 6,
    wouldRecommend: false,
  }

  const first = await request.post(`${BASE_URL}/api/reviews/submit`, { data: payload })
  expect(first.ok()).toBeTruthy()

  const second = await request.post(`${BASE_URL}/api/reviews/submit`, { data: payload })
  expect(second.status()).toBe(409)
})

// ── 4. Admin endpoint without secret returns 401 ───────────────────────────
test("GET /api/reviews/admin without ADMIN_SECRET returns 401", async ({ request }) => {
  const res = await request.get(`${BASE_URL}/api/reviews/admin`)
  expect(res.status()).toBe(401)
})

// ── 5. Admin endpoint with correct secret returns data array ───────────────
test("GET /api/reviews/admin with correct ADMIN_SECRET returns data", async ({ request }) => {
  const res = await request.get(`${BASE_URL}/api/reviews/admin`, {
    headers: { "x-admin-secret": ADMIN_SECRET },
  })
  expect(res.ok()).toBeTruthy()
  const body = await res.json()
  expect(body).toHaveProperty("reviews")
  expect(body).toHaveProperty("tokens")
  expect(body).toHaveProperty("summary")
  expect(Array.isArray(body.reviews)).toBe(true)
})
