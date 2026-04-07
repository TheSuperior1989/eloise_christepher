import { prisma } from "@/lib/prisma"
import { ReviewForm } from "@/components/review/review-form"

interface ReviewPageProps {
  params: Promise<{ token: string }>
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { token } = await params

  const reviewToken = await prisma.reviewToken.findUnique({
    where: { token },
    include: { review: true },
  })

  const isInvalid = !reviewToken
  const isUsed = reviewToken?.review != null

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF8F5] to-[#F5F2ED] py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-serif text-[#3D3630] mb-4">
              Eloise & Christepher
            </h1>
            <div className="w-24 h-1 bg-[#C4A57B] mx-auto mb-6" />
            <p className="text-xl text-[#7A6F5D] mb-2">April 4, 2026</p>
            <p className="text-lg text-[#7A6F5D]">
              Kwalata Game Lodge, Dinokeng Game Reserve
            </p>
          </div>

          {isInvalid && (
            <div className="text-center py-8">
              <p className="text-2xl text-[#3D3630] mb-4">
                Invalid review link
              </p>
              <p className="text-[#7A6F5D]">
                This review link is not valid. Please check the link in your
                email and try again.
              </p>
            </div>
          )}

          {!isInvalid && isUsed && (
            <div className="text-center py-8">
              <p className="text-2xl text-[#3D3630] mb-4">
                Review already submitted
              </p>
              <p className="text-[#7A6F5D]">
                Thank you, {reviewToken.guestName}! We already have your
                review. We truly appreciate you taking the time to share your
                experience.
              </p>
            </div>
          )}

          {!isInvalid && !isUsed && (
            <>
              <div className="text-center mb-8 p-6 bg-[#FAF8F5] rounded-lg">
                <p className="text-2xl text-[#3D3630] mb-2">
                  Dear {reviewToken.guestName},
                </p>
                <p className="text-lg text-[#7A6F5D]">
                  Thank you so much for celebrating with us. We would love to
                  hear about your experience — it means the world to us.
                </p>
              </div>
              <ReviewForm token={token} />
            </>
          )}
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-[#C4A57B] hover:text-[#B39568] font-medium">
            Back to our wedding website
          </a>
        </div>
      </div>
    </div>
  )
}
