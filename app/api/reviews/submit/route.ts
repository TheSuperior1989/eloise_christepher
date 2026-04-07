import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const submitSchema = z.object({
  token: z.string().min(1),
  overallRating: z.number().int().min(1).max(5),
  npsScore: z.number().int().min(0).max(10),
  venueRating: z.number().int().min(1).max(5).optional(),
  cateringRating: z.number().int().min(1).max(5).optional(),
  photographyRating: z.number().int().min(1).max(5).optional(),
  musicRating: z.number().int().min(1).max(5).optional(),
  ceremonyRating: z.number().int().min(1).max(5).optional(),
  highlights: z.string().optional(),
  improvements: z.string().optional(),
  comments: z.string().optional(),
  wouldRecommend: z.boolean().default(true),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = submitSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { token, ...reviewData } = parsed.data

    const reviewToken = await prisma.reviewToken.findUnique({
      where: { token },
      include: { review: true },
    })

    if (!reviewToken) {
      return NextResponse.json(
        { error: "Invalid or expired review token" },
        { status: 404 }
      )
    }

    if (reviewToken.usedAt || reviewToken.review) {
      return NextResponse.json(
        { error: "This review link has already been used" },
        { status: 409 }
      )
    }

    await prisma.$transaction([
      prisma.reviewToken.update({
        where: { token },
        data: { usedAt: new Date() },
      }),
      prisma.weddingReview.create({
        data: {
          tokenId: reviewToken.id,
          guestName: reviewToken.guestName,
          guestEmail: reviewToken.guestEmail,
          overallRating: reviewData.overallRating,
          npsScore: reviewData.npsScore,
          venueRating: reviewData.venueRating,
          cateringRating: reviewData.cateringRating,
          photographyRating: reviewData.photographyRating,
          musicRating: reviewData.musicRating,
          ceremonyRating: reviewData.ceremonyRating,
          highlights: reviewData.highlights,
          improvements: reviewData.improvements,
          comments: reviewData.comments,
          wouldRecommend: reviewData.wouldRecommend,
        },
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[reviews/submit] Error:", error)
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    )
  }
}
