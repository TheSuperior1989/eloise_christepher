import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const secret = request.headers.get("x-admin-secret")

  if (!secret || secret !== process.env.REVIEW_ADMIN_SECRET?.trim()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const reviews = await prisma.weddingReview.findMany({
      orderBy: { submittedAt: "desc" },
      include: {
        token: {
          select: { token: true, createdAt: true },
        },
      },
    })

    const tokens = await prisma.reviewToken.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        guestName: true,
        guestEmail: true,
        createdAt: true,
        usedAt: true,
        token: true,
      },
    })

    const totalTokens = tokens.length
    const submittedCount = reviews.length
    const averageOverall =
      submittedCount > 0
        ? reviews.reduce((sum, r) => sum + r.overallRating, 0) / submittedCount
        : 0
    const averageNps =
      submittedCount > 0
        ? reviews.reduce((sum, r) => sum + r.npsScore, 0) / submittedCount
        : 0

    return NextResponse.json({
      summary: {
        totalTokens,
        submittedCount,
        pendingCount: totalTokens - submittedCount,
        averageOverallRating: Math.round(averageOverall * 10) / 10,
        averageNpsScore: Math.round(averageNps * 10) / 10,
      },
      reviews,
      tokens,
    })
  } catch (error) {
    console.error("[reviews/admin] Error:", error)
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    )
  }
}
