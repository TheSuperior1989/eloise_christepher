"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { InvitationStatus, RsvpStatus } from "@prisma/client"
import crypto from "crypto"
import { Resend } from "resend"
import WeddingInvitationEmail from "@/emails/wedding-invitation"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function getGuests() {
  const session = await auth()
  if (!session) {
    throw new Error("Unauthorized")
  }

  const guests = await prisma.guest.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  return guests
}

export async function createGuest(data: {
  firstName: string
  lastName: string
  email?: string
  phone?: string
  relationToBride?: string
  relationToGroom?: string
  plusOne?: boolean
  notes?: string
}) {
  const session = await auth()
  if (!session) {
    throw new Error("Unauthorized")
  }

  const guest = await prisma.guest.create({
    data: {
      ...data,
      invitationToken: crypto.randomBytes(32).toString("hex"),
    },
  })

  revalidatePath("/admin/dashboard")
  return guest
}

export async function updateGuest(
  id: string,
  data: {
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    relationToBride?: string
    relationToGroom?: string
    plusOne?: boolean
    plusOneName?: string
    dietaryRestrictions?: string
    notes?: string
    invitationStatus?: InvitationStatus
    rsvpStatus?: RsvpStatus
  }
) {
  const session = await auth()
  if (!session) {
    throw new Error("Unauthorized")
  }

  const guest = await prisma.guest.update({
    where: { id },
    data,
  })

  revalidatePath("/admin/dashboard")
  return guest
}

export async function deleteGuest(id: string) {
  const session = await auth()
  if (!session) {
    throw new Error("Unauthorized")
  }

  await prisma.guest.delete({
    where: { id },
  })

  revalidatePath("/admin/dashboard")
}

export async function sendInvitation(guestId: string) {
  const session = await auth()
  if (!session) {
    throw new Error("Unauthorized")
  }

  const guest = await prisma.guest.findUnique({
    where: { id: guestId },
  })

  if (!guest || !guest.email) {
    throw new Error("Guest not found or no email address")
  }

  // Generate RSVP URL
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000"
  const rsvpUrl = `${baseUrl}/rsvp/${guest.invitationToken}`

  try {
    // Send email using Resend
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "wedding@example.com",
      to: guest.email,
      subject: "You're Invited to Eloise & Christepher's Wedding",
      react: WeddingInvitationEmail({
        guestName: `${guest.firstName} ${guest.lastName}`,
        rsvpUrl,
      }),
    })

    // Update invitation status
    await prisma.guest.update({
      where: { id: guestId },
      data: {
        invitationStatus: "SENT",
        invitationSentAt: new Date(),
      },
    })

    revalidatePath("/admin/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Failed to send invitation:", error)

    // Update status to FAILED
    await prisma.guest.update({
      where: { id: guestId },
      data: {
        invitationStatus: "FAILED",
      },
    })

    throw new Error("Failed to send invitation email")
  }
}

export async function bulkSendInvitations(guestIds: string[]) {
  const session = await auth()
  if (!session) {
    throw new Error("Unauthorized")
  }

  const results = []
  for (const guestId of guestIds) {
    try {
      await sendInvitation(guestId)
      results.push({ guestId, success: true })
    } catch (error) {
      results.push({ guestId, success: false, error: (error as Error).message })
    }
  }

  revalidatePath("/admin/dashboard")
  return results
}

