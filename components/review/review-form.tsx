"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const reviewSchema = z.object({
  overallRating: z.number().int().min(1, "Please rate your overall experience").max(5),
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

type ReviewFormData = z.infer<typeof reviewSchema>

interface StarRatingProps {
  value: number
  onChange: (value: number) => void
  label: string
}

function StarRating({ value, onChange, label }: StarRatingProps) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex gap-1" aria-label={label}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="focus:outline-none"
          aria-label={`${star} star${star !== 1 ? "s" : ""}`}
        >
          <Star
            className={`w-8 h-8 transition-colors ${
              star <= (hovered || value)
                ? "fill-[#C4A57B] text-[#C4A57B]"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  )
}

interface NpsProps {
  value: number
  onChange: (value: number) => void
}

function NpsSelector({ value, onChange }: NpsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
        <button
          key={score}
          type="button"
          onClick={() => onChange(score)}
          className={`w-10 h-10 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#C4A57B] ${
            value === score
              ? "bg-[#C4A57B] text-white"
              : "bg-gray-100 text-[#3D3630] hover:bg-[#EDE8DF]"
          }`}
          aria-label={`NPS score ${score}`}
          aria-pressed={value === score}
        >
          {score}
        </button>
      ))}
    </div>
  )
}

export function ReviewForm({ token }: { token: string }) {
  const [submitted, setSubmitted] = useState(false)

  const { handleSubmit, setValue, watch, register, formState: { errors, isSubmitting } } =
    useForm<ReviewFormData>({
      resolver: zodResolver(reviewSchema),
      defaultValues: {
        overallRating: 0,
        npsScore: 8,
        wouldRecommend: true,
      },
    })

  const overallRating = watch("overallRating")
  const npsScore = watch("npsScore")
  const venueRating = watch("venueRating") ?? 0
  const cateringRating = watch("cateringRating") ?? 0
  const photographyRating = watch("photographyRating") ?? 0
  const musicRating = watch("musicRating") ?? 0
  const ceremonyRating = watch("ceremonyRating") ?? 0

  const onSubmit = async (data: ReviewFormData) => {
    try {
      const res = await fetch("/api/reviews/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, token }),
      })

      const json = await res.json()

      if (!res.ok) {
        toast.error(json.error || "Something went wrong. Please try again.")
        return
      }

      setSubmitted(true)
    } catch {
      toast.error("Network error. Please check your connection and try again.")
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-[#EDE8DF] rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="w-8 h-8 fill-[#C4A57B] text-[#C4A57B]" />
        </div>
        <p className="text-2xl font-serif text-[#3D3630] mb-3">
          Thank you so much!
        </p>
        <p className="text-[#7A6F5D]">
          Your review has been submitted. We are so grateful you shared this
          with us — it means everything.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Overall Rating */}
      <div className="space-y-2">
        <Label className="text-[#3D3630] font-medium text-lg">
          Overall experience <span className="text-red-500">*</span>
        </Label>
        <StarRating
          value={overallRating}
          onChange={(v) => setValue("overallRating", v, { shouldValidate: true })}
          label="Overall rating"
        />
        {errors.overallRating && (
          <p className="text-sm text-red-500">{errors.overallRating.message}</p>
        )}
      </div>

      {/* Category Ratings */}
      <div className="space-y-4">
        <Label className="text-[#3D3630] font-medium text-lg">
          Rate each aspect (optional)
        </Label>
        <div className="grid gap-4">
          {[
            { key: "ceremonyRating" as const, label: "Ceremony" },
            { key: "venueRating" as const, label: "Venue" },
            { key: "cateringRating" as const, label: "Food & drinks" },
            { key: "musicRating" as const, label: "Music & entertainment" },
            { key: "photographyRating" as const, label: "Photography" },
          ].map(({ key, label }) => {
            const values = {
              ceremonyRating,
              venueRating,
              cateringRating,
              musicRating,
              photographyRating,
            }
            return (
              <div key={key} className="flex items-center gap-4">
                <span className="text-[#7A6F5D] w-40 text-sm">{label}</span>
                <StarRating
                  value={values[key]}
                  onChange={(v) => setValue(key, v)}
                  label={label}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* NPS */}
      <div className="space-y-3">
        <Label className="text-[#3D3630] font-medium text-lg">
          How likely are you to recommend a similar wedding experience to friends? <span className="text-red-500">*</span>
        </Label>
        <p className="text-sm text-[#7A6F5D]">0 = Not at all likely · 10 = Extremely likely</p>
        <NpsSelector
          value={npsScore}
          onChange={(v) => setValue("npsScore", v)}
        />
      </div>

      {/* Highlights */}
      <div className="space-y-2">
        <Label htmlFor="highlights" className="text-[#3D3630] font-medium">
          What was your favourite moment or highlight?
        </Label>
        <Textarea
          id="highlights"
          {...register("highlights")}
          placeholder="e.g. The ceremony at sunset was breathtaking..."
          className="border-[#DDD8CF] focus-visible:ring-[#C4A57B] resize-none"
          rows={3}
        />
      </div>

      {/* Improvements */}
      <div className="space-y-2">
        <Label htmlFor="improvements" className="text-[#3D3630] font-medium">
          Is there anything that could have been better?
        </Label>
        <Textarea
          id="improvements"
          {...register("improvements")}
          placeholder="Honest feedback helps us (and other couples) improve..."
          className="border-[#DDD8CF] focus-visible:ring-[#C4A57B] resize-none"
          rows={3}
        />
      </div>

      {/* General comments */}
      <div className="space-y-2">
        <Label htmlFor="comments" className="text-[#3D3630] font-medium">
          Anything else you'd like to share?
        </Label>
        <Textarea
          id="comments"
          {...register("comments")}
          placeholder="A message for the couple, a vendor shoutout, or anything on your mind..."
          className="border-[#DDD8CF] focus-visible:ring-[#C4A57B] resize-none"
          rows={4}
        />
      </div>

      {/* Would recommend */}
      <div className="flex items-center gap-3">
        <input
          id="wouldRecommend"
          type="checkbox"
          {...register("wouldRecommend")}
          defaultChecked
          className="w-4 h-4 accent-[#C4A57B]"
        />
        <Label htmlFor="wouldRecommend" className="text-[#7A6F5D]">
          I would recommend Kwalata Game Lodge to other couples
        </Label>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#C4A57B] hover:bg-[#B39568] text-white py-3 text-lg"
      >
        {isSubmitting ? "Submitting…" : "Submit my review"}
      </Button>
    </form>
  )
}
