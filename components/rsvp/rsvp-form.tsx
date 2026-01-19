"use client"

import { useState } from "react"
import { Guest, RsvpStatus, AttendanceDay } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { submitRsvp } from "@/app/rsvp/actions"
import { toast } from "sonner"
import { Check, X, HelpCircle, Calendar, ExternalLink } from "lucide-react"
import Link from "next/link"

interface RsvpFormProps {
  guest: Guest
}

export function RsvpForm({ guest }: RsvpFormProps) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(!!guest.rsvpSubmittedAt)
  const [rsvpStatus, setRsvpStatus] = useState<RsvpStatus>(
    guest.rsvpStatus || "PENDING"
  )
  const [plusOneName, setPlusOneName] = useState(guest.plusOneName || "")
  const [attendanceDay, setAttendanceDay] = useState<AttendanceDay | undefined>(
    guest.attendanceDay || undefined
  )
  const [dietaryRestrictions, setDietaryRestrictions] = useState(
    guest.dietaryRestrictions || ""
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rsvpStatus === "PENDING") {
      toast.error("Please select your attendance status")
      return
    }

    if (rsvpStatus === "ATTENDING" && !attendanceDay) {
      toast.error("Please select which day(s) you will be attending")
      return
    }

    setLoading(true)

    try {
      await submitRsvp({
        guestId: guest.id,
        rsvpStatus,
        plusOneName: guest.plusOne ? plusOneName : undefined,
        attendanceDay: rsvpStatus === "ATTENDING" ? attendanceDay : undefined,
        dietaryRestrictions: rsvpStatus === "ATTENDING" && dietaryRestrictions ? dietaryRestrictions : undefined,
      })

      setSubmitted(true)
      toast.success("Thank you for your RSVP!")
    } catch (error) {
      toast.error("Failed to submit RSVP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-serif text-[#3D3630] mb-4">
          Thank You!
        </h2>
        <p className="text-lg text-[#7A6F5D] mb-2">
          Your RSVP has been received.
        </p>
        {rsvpStatus === "ATTENDING" && (
          <p className="text-lg text-[#7A6F5D]">
            We can't wait to celebrate with you!
          </p>
        )}
        {rsvpStatus === "NOT_ATTENDING" && (
          <p className="text-lg text-[#7A6F5D]">
            You will be missed on our special day.
          </p>
        )}
        <div className="mt-8 p-6 bg-[#FAF8F5] rounded-lg">
          <p className="text-sm text-[#7A6F5D] mb-2">
            <strong>Your Response:</strong>
          </p>
          <p className="text-base text-[#3D3630]">
            {rsvpStatus === "ATTENDING" && "Joyfully Accepting"}
            {rsvpStatus === "NOT_ATTENDING" && "Regretfully Declining"}
            {rsvpStatus === "MAYBE" && "Tentatively Accepting"}
          </p>
          {rsvpStatus === "ATTENDING" && attendanceDay && (
            <p className="text-sm text-[#7A6F5D] mt-4">
              <strong>Attending:</strong>{" "}
              {attendanceDay === "FRIDAY" && "Friday"}
              {attendanceDay === "SATURDAY" && "Saturday"}
              {attendanceDay === "BOTH" && "Both Friday & Saturday"}
              {attendanceDay === "NOT_SLEEPING_OVER" && "Not Sleeping Over (Ceremony Only)"}
            </p>
          )}
          {guest.plusOne && plusOneName && (
            <p className="text-sm text-[#7A6F5D] mt-4">
              <strong>Plus One:</strong> {plusOneName}
            </p>
          )}
          {rsvpStatus === "ATTENDING" && dietaryRestrictions && (
            <p className="text-sm text-[#7A6F5D] mt-4">
              <strong>Dietary Requirements:</strong> {dietaryRestrictions}
            </p>
          )}
        </div>

        {/* Prominent Website Button */}
        <div className="mt-8 pt-8 border-t-2 border-[#C4A57B]/20">
          <div className="bg-gradient-to-br from-[#F5F2ED] to-[#FAF8F5] p-8 rounded-lg border-2 border-[#C4A57B]/30 shadow-lg">
            <h3 className="text-2xl font-serif text-[#3D3630] mb-3">
              📱 Next Step: Visit Our Wedding Website
            </h3>
            <p className="text-[#7A6F5D] mb-6 leading-relaxed">
              Find all the details about our special day including venue information, schedule, accommodation options, registry, and more!
            </p>
            <Link href="/" target="_blank">
              <Button
                size="lg"
                className="bg-[#3D3630] hover:bg-[#2D2620] text-white px-12 py-6 text-lg font-serif rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 gap-3"
              >
                <ExternalLink className="w-5 h-5" />
                Visit Wedding Website
              </Button>
            </Link>
            <p className="text-sm text-[#7A6F5D] mt-4 italic">
              Bookmark it for easy access to all wedding information
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* RSVP Status */}
      <div className="space-y-4">
        <Label className="text-lg font-medium text-[#3D3630]">
          Will you be attending?
        </Label>
        <RadioGroup value={rsvpStatus} onValueChange={(value) => setRsvpStatus(value as RsvpStatus)}>
          <div className="flex items-center space-x-3 p-4 border-2 border-[#E8E3DB] rounded-lg hover:border-[#C4A57B] transition-colors cursor-pointer">
            <RadioGroupItem value="ATTENDING" id="attending" />
            <Label
              htmlFor="attending"
              className="flex items-center gap-2 cursor-pointer flex-1"
            >
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-base">Joyfully Accepting</span>
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-4 border-2 border-[#E8E3DB] rounded-lg hover:border-[#C4A57B] transition-colors cursor-pointer">
            <RadioGroupItem value="NOT_ATTENDING" id="not-attending" />
            <Label
              htmlFor="not-attending"
              className="flex items-center gap-2 cursor-pointer flex-1"
            >
              <X className="w-5 h-5 text-red-600" />
              <span className="text-base">Regretfully Declining</span>
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-4 border-2 border-[#E8E3DB] rounded-lg hover:border-[#C4A57B] transition-colors cursor-pointer">
            <RadioGroupItem value="MAYBE" id="maybe" />
            <Label
              htmlFor="maybe"
              className="flex items-center gap-2 cursor-pointer flex-1"
            >
              <HelpCircle className="w-5 h-5 text-orange-600" />
              <span className="text-base">Tentatively Accepting</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Attendance Day Selection */}
      {rsvpStatus === "ATTENDING" && (
        <div className="space-y-4">
          <Label className="text-lg font-medium text-[#3D3630]">
            Which day(s) will you be joining us? *
          </Label>
          <p className="text-sm text-[#7A6F5D] -mt-2">
            This helps us plan catering and accommodations
          </p>
          <RadioGroup
            value={attendanceDay || ""}
            onValueChange={(value) => setAttendanceDay(value as AttendanceDay)}
          >
            <div className="flex items-center space-x-3 p-4 border-2 border-[#E8E3DB] rounded-lg hover:border-[#C4A57B] transition-colors cursor-pointer">
              <RadioGroupItem value="FRIDAY" id="friday" />
              <Label
                htmlFor="friday"
                className="flex items-center gap-2 cursor-pointer flex-1"
              >
                <Calendar className="w-5 h-5 text-[#C4A57B]" />
                <span className="text-base">Friday</span>
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-4 border-2 border-[#E8E3DB] rounded-lg hover:border-[#C4A57B] transition-colors cursor-pointer">
              <RadioGroupItem value="SATURDAY" id="saturday" />
              <Label
                htmlFor="saturday"
                className="flex items-center gap-2 cursor-pointer flex-1"
              >
                <Calendar className="w-5 h-5 text-[#C4A57B]" />
                <span className="text-base">Saturday</span>
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-4 border-2 border-[#E8E3DB] rounded-lg hover:border-[#C4A57B] transition-colors cursor-pointer">
              <RadioGroupItem value="BOTH" id="both" />
              <Label
                htmlFor="both"
                className="flex items-center gap-2 cursor-pointer flex-1"
              >
                <Calendar className="w-5 h-5 text-[#C4A57B]" />
                <span className="text-base">Both Friday & Saturday</span>
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-4 border-2 border-[#E8E3DB] rounded-lg hover:border-[#C4A57B] transition-colors cursor-pointer">
              <RadioGroupItem value="NOT_SLEEPING_OVER" id="not-sleeping" />
              <Label
                htmlFor="not-sleeping"
                className="flex items-center gap-2 cursor-pointer flex-1"
              >
                <Calendar className="w-5 h-5 text-[#C4A57B]" />
                <div className="flex-1">
                  <span className="text-base block">Not Sleeping Over</span>
                  <span className="text-xs text-[#7A6F5D]">Attending ceremony only, not staying overnight</span>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>
      )}

      {/* Plus One */}
      {guest.plusOne && rsvpStatus === "ATTENDING" && (
        <div className="space-y-2">
          <Label htmlFor="plusOneName" className="text-base font-medium text-[#3D3630]">
            Plus One Name (Optional)
          </Label>
          <Input
            id="plusOneName"
            value={plusOneName}
            onChange={(e) => setPlusOneName(e.target.value)}
            placeholder="Enter your guest's name"
            disabled={loading}
          />
        </div>
      )}

      {/* Dietary Restrictions */}
      {rsvpStatus === "ATTENDING" && (
        <div className="space-y-2">
          <Label htmlFor="dietaryRestrictions" className="text-base font-medium text-[#3D3630]">
            Dietary Restrictions or Special Food Requirements
          </Label>
          <p className="text-sm text-[#7A6F5D] -mt-1">
            Please let us know about any allergies, dietary preferences, or special requirements
          </p>
          <Textarea
            id="dietaryRestrictions"
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
            placeholder="E.g., vegetarian, vegan, gluten-free, nut allergy, halal, kosher..."
            disabled={loading}
            rows={3}
          />
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          className="w-full bg-[#C4A57B] hover:bg-[#B39568] text-white text-lg py-6"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit RSVP"}
        </Button>
      </div>

      {/* Deadline Notice */}
      <p className="text-center text-sm text-[#7A6F5D] italic">
        Please respond by March 1, 2026
      </p>
    </form>
  )
}

