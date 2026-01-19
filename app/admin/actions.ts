"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { InvitationStatus, RsvpStatus } from "@prisma/client"
import crypto from "crypto"
import { Resend } from "resend"
import WeddingInvitationEmail from "@/emails/wedding-invitation"

// Lazy-load Resend client to avoid initialization during build
function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY)
}

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
  try {
    const session = await auth()
    if (!session) {
      throw new Error("Unauthorized - Please log in again")
    }

    const guest = await prisma.guest.create({
      data: {
        ...data,
        invitationToken: crypto.randomBytes(32).toString("hex"),
      },
    })

    revalidatePath("/admin/dashboard")
    return guest
  } catch (error: any) {
    console.error("Error in createGuest:", error)

    // Handle Prisma unique constraint violations
    if (error.code === "P2002") {
      const field = error.meta?.target?.[0] || "field"
      if (field === "email") {
        throw new Error("This email address is already assigned to another guest. Please use a different email.")
      }
      if (field === "phone") {
        throw new Error("This phone number is already assigned to another guest. Please use a different phone number.")
      }
      throw new Error(`A guest with this ${field} already exists. Please use a different value.`)
    }

    // Handle other Prisma errors
    if (error.code?.startsWith("P")) {
      throw new Error(`Database error: Unable to create guest. Please try again.`)
    }

    // Re-throw with a user-friendly message
    throw new Error(error.message || "Failed to create guest. Please try again.")
  }
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
    attendanceDay?: AttendanceDay | null
  }
) {
  try {
    const session = await auth()
    if (!session) {
      throw new Error("Unauthorized - Please log in again")
    }

    console.log("Updating guest:", id, "with data:", data)

    const guest = await prisma.guest.update({
      where: { id },
      data,
    })

    console.log("Guest updated successfully:", guest.id)

    revalidatePath("/admin/dashboard")
    return guest
  } catch (error: any) {
    console.error("Error in updateGuest:", error)

    // Handle Prisma unique constraint violations
    if (error.code === "P2002") {
      const field = error.meta?.target?.[0] || "field"
      if (field === "email") {
        throw new Error("This email address is already assigned to another guest. Please use a different email.")
      }
      if (field === "phone") {
        throw new Error("This phone number is already assigned to another guest. Please use a different phone number.")
      }
      throw new Error(`A guest with this ${field} already exists. Please use a different value.`)
    }

    // Handle record not found
    if (error.code === "P2025") {
      throw new Error("Guest not found. They may have been deleted.")
    }

    // Handle other Prisma errors
    if (error.code?.startsWith("P")) {
      throw new Error(`Database error: Unable to update guest. Please try again.`)
    }

    // Re-throw with a user-friendly message
    throw new Error(error.message || "Failed to update guest. Please try again.")
  }
}

export async function deleteGuest(id: string) {
  try {
    const session = await auth()
    if (!session) {
      throw new Error("Unauthorized - Please log in again")
    }

    await prisma.guest.delete({
      where: { id },
    })

    revalidatePath("/admin/dashboard")
  } catch (error: any) {
    console.error("Error in deleteGuest:", error)

    // Handle record not found
    if (error.code === "P2025") {
      throw new Error("Guest not found. They may have already been deleted.")
    }

    // Handle foreign key constraint violations
    if (error.code === "P2003") {
      throw new Error("Cannot delete guest because they have related records. Please contact support.")
    }

    // Handle other Prisma errors
    if (error.code?.startsWith("P")) {
      throw new Error(`Database error: Unable to delete guest. Please try again.`)
    }

    // Re-throw with a user-friendly message
    throw new Error(error.message || "Failed to delete guest. Please try again.")
  }
}

export async function bulkResetRsvp(guestIds: string[]) {
  const session = await auth()
  if (!session) {
    throw new Error("Unauthorized")
  }

  await prisma.guest.updateMany({
    where: {
      id: {
        in: guestIds,
      },
    },
    data: {
      rsvpStatus: "PENDING",
      attendanceDay: null,
      dietaryRestrictions: null,
      rsvpSubmittedAt: null,
    },
  })

  revalidatePath("/admin/dashboard")
  return { success: true, count: guestIds.length }
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

  // Generate URLs
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000"
  const invitationUrl = `${baseUrl}/invitation/${guest.invitationToken}`
  const rsvpUrl = `${baseUrl}/rsvp/${guest.invitationToken}`

  try {
    // Validate environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set in environment variables")
      throw new Error("Email service not configured. Please contact administrator.")
    }

    if (!process.env.RESEND_FROM_EMAIL) {
      console.error("RESEND_FROM_EMAIL is not set in environment variables")
      throw new Error("Email sender not configured. Please contact administrator.")
    }

    console.log(`Sending invitation to ${guest.email} (${guest.firstName} ${guest.lastName})`)
    console.log(`Invitation URL: ${invitationUrl}`)
    console.log(`RSVP URL: ${rsvpUrl}`)
    console.log(`From email: ${process.env.RESEND_FROM_EMAIL}`)

    // Send email using Resend
    const resend = getResendClient()
    const emailResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: guest.email,
      subject: "You're Invited to Eloise & Christepher's Wedding",
      react: WeddingInvitationEmail({
        guestName: `${guest.firstName} ${guest.lastName}`,
        rsvpUrl,
        invitationUrl,
      }),
    })

    console.log("Email sent successfully:", emailResult)

    // Update invitation status
    await prisma.guest.update({
      where: { id: guestId },
      data: {
        invitationStatus: "SENT",
        invitationSentAt: new Date(),
      },
    })

    revalidatePath("/admin/dashboard")
    return { success: true, emailId: emailResult.data?.id }
  } catch (error) {
    console.error("Failed to send invitation:", error)
    console.error("Error details:", {
      guestId,
      guestEmail: guest.email,
      errorMessage: error instanceof Error ? error.message : "Unknown error",
      errorStack: error instanceof Error ? error.stack : undefined,
    })

    // Update status to FAILED
    await prisma.guest.update({
      where: { id: guestId },
      data: {
        invitationStatus: "FAILED",
      },
    })

    // Provide more specific error message
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    throw new Error(`Failed to send invitation email: ${errorMessage}`)
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

