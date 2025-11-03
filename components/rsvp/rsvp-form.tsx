"use client"

import { useState } from "react"
import { Guest, RsvpStatus } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { submitRsvp } from "@/app/rsvp/actions"
import { toast } from "sonner"
import { Check, X, HelpCircle } from "lucide-react"

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
  const [dietaryRestrictions, setDietaryRestrictions] = useState(
    guest.dietaryRestrictions || ""
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rsvpStatus === "PENDING") {
      toast.error("Please select your attendance status")
      return
    }

    setLoading(true)

    try {
      await submitRsvp({
        guestId: guest.id,
        rsvpStatus,
        plusOneName: guest.plusOne ? plusOneName : undefined,
        dietaryRestrictions,
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
          {guest.plusOne && plusOneName && (
            <p className="text-sm text-[#7A6F5D] mt-4">
              <strong>Plus One:</strong> {plusOneName}
            </p>
          )}
          {dietaryRestrictions && (
            <p className="text-sm text-[#7A6F5D] mt-2">
              <strong>Dietary Restrictions:</strong> {dietaryRestrictions}
            </p>
          )}
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
            Dietary Restrictions (Optional)
          </Label>
          <Textarea
            id="dietaryRestrictions"
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
            placeholder="Please let us know of any dietary restrictions or allergies..."
            rows={3}
            disabled={loading}
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

