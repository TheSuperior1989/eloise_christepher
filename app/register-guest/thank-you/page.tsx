"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, CheckCircle2 } from "lucide-react"

function ThankYouContent() {
  const searchParams = useSearchParams()
  const guestCount = searchParams.get("count") || "1"

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F1E8] to-white flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Heart className="w-20 h-20 text-[#C4A57B]" fill="#C4A57B" />
              <CheckCircle2 className="w-10 h-10 text-green-600 absolute -bottom-2 -right-2 bg-white rounded-full" />
            </div>
          </div>
        </div>

        <Card className="border-[#C4A57B]/20 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-serif text-[#3D3630] mb-2">
              Thank You for Registering!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="space-y-2">
              <p className="text-lg text-[#6B6560]">
                We&apos;ve successfully registered{" "}
                <span className="font-semibold text-[#C4A57B]">
                  {guestCount} guest{parseInt(guestCount) > 1 ? "s" : ""}
                </span>{" "}
                for our wedding.
              </p>
              <p className="text-[#6B6560]">
                You&apos;ll receive your formal invitation via email soon with all the details about our special day.
              </p>
            </div>

            <div className="bg-[#F5F1E8] p-6 rounded-lg">
              <p className="text-sm text-[#6B6560] mb-2">
                What happens next?
              </p>
              <ul className="text-left text-sm text-[#6B6560] space-y-2 max-w-md mx-auto">
                <li className="flex items-start">
                  <span className="text-[#C4A57B] mr-2">•</span>
                  <span>You&apos;ll receive a formal invitation email with RSVP link</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#C4A57B] mr-2">•</span>
                  <span>Use the RSVP link to confirm your attendance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#C4A57B] mr-2">•</span>
                  <span>We&apos;ll send you venue details and schedule closer to the date</span>
                </li>
              </ul>
            </div>



            <div className="pt-6 border-t border-[#C4A57B]/20">
              <p className="text-xs text-[#6B6560]">
                If you have any questions, please contact us at{" "}
                <a
                  href="mailto:christiaanvonstade@gmail.com"
                  className="text-[#C4A57B] hover:underline"
                >
                  christiaanvonstade@gmail.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-[#6B6560] font-serif italic">
            We can&apos;t wait to celebrate with you!
          </p>
          <p className="text-lg font-serif text-[#3D3630] mt-2">
            Eloise & Christepher
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-[#F5F1E8] to-white flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-[#C4A57B] mx-auto mb-4" fill="#C4A57B" />
          <p className="text-[#6B6560]">Loading...</p>
        </div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  )
}

