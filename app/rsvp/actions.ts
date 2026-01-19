"use server"

import { prisma } from "@/lib/prisma"
import { RsvpStatus, AttendanceDay } from "@prisma/client"

export async function submitRsvp(data: {
  guestId: string
  rsvpStatus: RsvpStatus
  plusOneName?: string
  attendanceDay?: AttendanceDay
  dietaryRestrictions?: string
}) {
  const guest = await prisma.guest.update({
    where: { id: data.guestId },
    data: {
      rsvpStatus: data.rsvpStatus,
      plusOneName: data.plusOneName || null,
      attendanceDay: data.attendanceDay || null,
      dietaryRestrictions: data.dietaryRestrictions || null,
      rsvpSubmittedAt: new Date(),
    },
  })

  return guest
}

