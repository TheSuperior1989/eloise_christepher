import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ReviewsAdminDashboard } from "@/components/review/reviews-admin-dashboard"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function ReviewsAdminPage() {
  const session = await auth()

  if (!session) {
    redirect("/admin/login")
  }

  const reviews = await prisma.weddingReview.findMany({
    orderBy: { submittedAt: "desc" },
    include: {
      token: { select: { token: true, createdAt: true } },
    },
  })

  const tokens = await prisma.reviewToken.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      guestName: true,
      guestEmail: true,
      token: true,
      usedAt: true,
      createdAt: true,
    },
  })

  const averageOverall =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.overallRating, 0) / reviews.length
      : 0

  const averageNps =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.npsScore, 0) / reviews.length
      : 0

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <ReviewsAdminDashboard
        reviews={reviews}
        tokens={tokens}
        averageOverall={Math.round(averageOverall * 10) / 10}
        averageNps={Math.round(averageNps * 10) / 10}
      />
    </div>
  )
}
