import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { RsvpForm } from "@/components/rsvp/rsvp-form"

interface RsvpPageProps {
  params: Promise<{
    token: string
  }>
}

export default async function RsvpPage({ params }: RsvpPageProps) {
  const { token } = await params

  const guest = await prisma.guest.findUnique({
    where: { invitationToken: token },
  })

  if (!guest) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF8F5] to-[#F5F2ED] py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-serif text-[#3D3630] mb-4">
              Eloise & Christepher
            </h1>
            <div className="w-24 h-1 bg-[#C4A57B] mx-auto mb-6"></div>
            <p className="text-xl text-[#7A6F5D] mb-2">
              Saturday, April 4, 2026
            </p>
            <p className="text-lg text-[#7A6F5D]">
              Kwalata Game Lodge, Dinokeng Game Reserve
            </p>
          </div>

          {/* Personal Greeting */}
          <div className="text-center mb-8 p-6 bg-[#FAF8F5] rounded-lg">
            <p className="text-2xl text-[#3D3630] mb-2">
              Dear {guest.firstName} {guest.lastName},
            </p>
            <p className="text-lg text-[#7A6F5D]">
              We're delighted to invite you to celebrate our special day with us!
            </p>
          </div>

          {/* RSVP Form */}
          <RsvpForm guest={guest} />
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-[#7A6F5D] mb-2">
            For more information about our wedding, visit:
          </p>
          <a
            href="/"
            className="text-[#C4A57B] hover:text-[#B39568] font-medium"
          >
            Our Wedding Website
          </a>
        </div>
      </div>
    </div>
  )
}

