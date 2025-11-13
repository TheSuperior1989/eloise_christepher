import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"

interface GuestData {
  firstName: string
  lastName: string
  email?: string
  phone?: string
  relationToBride?: string
  relationToGroom?: string
  dietaryRestrictions?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { guests } = body as { guests: GuestData[] }

    if (!guests || !Array.isArray(guests) || guests.length === 0) {
      return NextResponse.json(
        { error: "No guests provided" },
        { status: 400 }
      )
    }

    // Validate that at least the first guest has required fields
    if (!guests[0].firstName || !guests[0].lastName) {
      return NextResponse.json(
        { error: "First and last name are required for the primary guest" },
        { status: 400 }
      )
    }

    // Create all guests in the database
    const createdGuests = await Promise.all(
      guests.map(async (guest) => {
        // Skip empty guests (in case user added but didn't fill)
        if (!guest.firstName && !guest.lastName) {
          return null
        }

        return await prisma.guest.create({
          data: {
            firstName: guest.firstName,
            lastName: guest.lastName,
            email: guest.email && guest.email.trim() !== "" ? guest.email : undefined,
            phone: guest.phone && guest.phone.trim() !== "" ? guest.phone : undefined,
            relationToBride: guest.relationToBride && guest.relationToBride.trim() !== "" ? guest.relationToBride : undefined,
            relationToGroom: guest.relationToGroom && guest.relationToGroom.trim() !== "" ? guest.relationToGroom : undefined,
            dietaryRestrictions: guest.dietaryRestrictions && guest.dietaryRestrictions.trim() !== "" ? guest.dietaryRestrictions : undefined,
            invitationToken: crypto.randomBytes(32).toString("hex"),
            // Set plusOne to true if this is not the first guest
            plusOne: false,
            invitationStatus: "NOT_SENT",
            rsvpStatus: "PENDING",
          },
        })
      })
    )

    // Filter out null values
    const validGuests = createdGuests.filter((g) => g !== null)

    return NextResponse.json({
      success: true,
      count: validGuests.length,
      guests: validGuests,
    })
  } catch (error) {
    console.error("Error registering guests:", error)

    // Check if it's a Prisma unique constraint error
    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === 'P2002') {
        // Unique constraint violation
        const target = (error as any).meta?.target
        if (target && target.includes('email')) {
          return NextResponse.json(
            { error: "This email address is already registered. Please use a different email or contact us if you need assistance." },
            { status: 409 }
          )
        }
      }
    }

    return NextResponse.json(
      { error: "Failed to register guests. Please try again or contact us for assistance." },
      { status: 500 }
    )
  }
}

