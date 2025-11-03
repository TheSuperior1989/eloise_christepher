"use server"

import { prisma } from "@/lib/prisma"
import { RsvpStatus } from "@prisma/client"

export async function submitRsvp(data: {
  guestId: string
  rsvpStatus: RsvpStatus
  plusOneName?: string
  dietaryRestrictions?: string
}) {
  const guest = await prisma.guest.update({
    where: { id: data.guestId },
    data: {
      rsvpStatus: data.rsvpStatus,
      plusOneName: data.plusOneName || null,
      dietaryRestrictions: data.dietaryRestrictions || null,
      rsvpSubmittedAt: new Date(),
    },
  })

  return guest
}

