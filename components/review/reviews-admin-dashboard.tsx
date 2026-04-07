"use client"

import { useState } from "react"
import { Star, Users, CheckCircle, Clock } from "lucide-react"

interface Review {
  id: string
  guestName: string
  guestEmail: string
  overallRating: number
  npsScore: number
  venueRating: number | null
  cateringRating: number | null
  photographyRating: number | null
  musicRating: number | null
  ceremonyRating: number | null
  highlights: string | null
  improvements: string | null
  comments: string | null
  wouldRecommend: boolean
  submittedAt: Date
  token: { token: string; createdAt: Date }
}

interface TokenRow {
  id: string
  guestName: string
  guestEmail: string
  token: string
  usedAt: Date | null
  createdAt: Date
}

interface Props {
  reviews: Review[]
  tokens: TokenRow[]
  averageOverall: number
  averageNps: number
}

function StarDisplay({ value }: { value: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-4 h-4 ${s <= value ? "fill-[#C4A57B] text-[#C4A57B]" : "text-gray-200"}`}
        />
      ))}
    </span>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ElementType
  label: string
  value: string | number
  sub?: string
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-[#EDE8DF] flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-[#C4A57B]" />
      </div>
      <div>
        <p className="text-sm text-[#7A6F5D]">{label}</p>
        <p className="text-3xl font-serif text-[#3D3630] mt-0.5">{value}</p>
        {sub && <p className="text-xs text-[#7A6F5D] mt-1">{sub}</p>}
      </div>
    </div>
  )
}

export function ReviewsAdminDashboard({ reviews, tokens, averageOverall, averageNps }: Props) {
  const [tab, setTab] = useState<"reviews" | "tokens">("reviews")
  const [expanded, setExpanded] = useState<string | null>(null)

  const siteUrl = typeof window !== "undefined" ? window.location.origin : ""

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-[#3D3630]">Wedding Reviews</h1>
        <p className="text-[#7A6F5D] mt-1">
          Post-wedding guest feedback — Eloise & Christepher, April 4, 2026
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={Users}
          label="Tokens issued"
          value={tokens.length}
        />
        <StatCard
          icon={CheckCircle}
          label="Reviews submitted"
          value={reviews.length}
          sub={tokens.length > 0 ? `${Math.round((reviews.length / tokens.length) * 100)}% response rate` : undefined}
        />
        <StatCard
          icon={Star}
          label="Avg overall rating"
          value={averageOverall > 0 ? `${averageOverall} / 5` : "—"}
        />
        <StatCard
          icon={Clock}
          label="Avg NPS score"
          value={averageNps > 0 ? `${averageNps} / 10` : "—"}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-[#DDD8CF]">
        {(["reviews", "tokens"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
              tab === t
                ? "border-b-2 border-[#C4A57B] text-[#3D3630]"
                : "text-[#7A6F5D] hover:text-[#3D3630]"
            }`}
          >
            {t === "reviews" ? `Reviews (${reviews.length})` : `Tokens (${tokens.length})`}
          </button>
        ))}
      </div>

      {/* Reviews Tab */}
      {tab === "reviews" && (
        <div className="space-y-4">
          {reviews.length === 0 && (
            <p className="text-[#7A6F5D] text-center py-12">
              No reviews submitted yet.
            </p>
          )}
          {reviews.map((r) => (
            <div key={r.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#FAF8F5] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium text-[#3D3630]">{r.guestName}</p>
                    <p className="text-sm text-[#7A6F5D]">{r.guestEmail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <StarDisplay value={r.overallRating} />
                  <span className="text-sm text-[#7A6F5D] hidden md:block">
                    NPS: {r.npsScore}
                  </span>
                  <span className="text-xs text-[#7A6F5D]">
                    {new Date(r.submittedAt).toLocaleDateString()}
                  </span>
                </div>
              </button>

              {expanded === r.id && (
                <div className="px-6 pb-6 border-t border-[#EDE8DF] pt-4 space-y-4">
                  {/* Category ratings */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[
                      { label: "Ceremony", value: r.ceremonyRating },
                      { label: "Venue", value: r.venueRating },
                      { label: "Food & drinks", value: r.cateringRating },
                      { label: "Music", value: r.musicRating },
                      { label: "Photography", value: r.photographyRating },
                    ].map(({ label, value }) =>
                      value ? (
                        <div key={label} className="text-center">
                          <p className="text-xs text-[#7A6F5D] mb-1">{label}</p>
                          <StarDisplay value={value} />
                        </div>
                      ) : null
                    )}
                  </div>

                  {r.highlights && (
                    <div>
                      <p className="text-xs font-medium text-[#7A6F5D] uppercase tracking-wide mb-1">Highlights</p>
                      <p className="text-[#3D3630]">{r.highlights}</p>
                    </div>
                  )}
                  {r.improvements && (
                    <div>
                      <p className="text-xs font-medium text-[#7A6F5D] uppercase tracking-wide mb-1">Improvements</p>
                      <p className="text-[#3D3630]">{r.improvements}</p>
                    </div>
                  )}
                  {r.comments && (
                    <div>
                      <p className="text-xs font-medium text-[#7A6F5D] uppercase tracking-wide mb-1">Comments</p>
                      <p className="text-[#3D3630]">{r.comments}</p>
                    </div>
                  )}

                  <p className="text-xs text-[#7A6F5D]">
                    Would recommend venue: {r.wouldRecommend ? "Yes" : "No"}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tokens Tab */}
      {tab === "tokens" && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#FAF8F5] border-b border-[#EDE8DF]">
              <tr>
                <th className="text-left px-4 py-3 text-[#7A6F5D] font-medium">Guest</th>
                <th className="text-left px-4 py-3 text-[#7A6F5D] font-medium hidden md:table-cell">Email</th>
                <th className="text-left px-4 py-3 text-[#7A6F5D] font-medium">Status</th>
                <th className="text-left px-4 py-3 text-[#7A6F5D] font-medium hidden md:table-cell">Review URL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE8DF]">
              {tokens.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-[#7A6F5D]">
                    No tokens generated yet.
                  </td>
                </tr>
              )}
              {tokens.map((t) => (
                <tr key={t.id} className="hover:bg-[#FAF8F5]">
                  <td className="px-4 py-3 text-[#3D3630]">{t.guestName}</td>
                  <td className="px-4 py-3 text-[#7A6F5D] hidden md:table-cell">{t.guestEmail}</td>
                  <td className="px-4 py-3">
                    {t.usedAt ? (
                      <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 rounded-full px-2 py-0.5 text-xs">
                        <CheckCircle className="w-3 h-3" /> Submitted
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 rounded-full px-2 py-0.5 text-xs">
                        <Clock className="w-3 h-3" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <a
                      href={`${siteUrl}/review/${t.token}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#C4A57B] hover:underline text-xs truncate max-w-xs block"
                    >
                      /review/{t.token.slice(0, 12)}…
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
