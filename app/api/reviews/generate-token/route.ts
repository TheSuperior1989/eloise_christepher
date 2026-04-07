import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { guest_name, guest_email } = body as {
      guest_name: string
      guest_email: string
    }

    if (!guest_name || !guest_email) {
      return NextResponse.json(
        { error: "guest_name and guest_email are required" },
        { status: 400 }
      )
    }

    const reviewToken = await prisma.reviewToken.create({
      data: {
        guestName: guest_name,
        guestEmail: guest_email,
      },
    })

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    const reviewUrl = `${siteUrl}/review/${reviewToken.token}`

    return NextResponse.json({
      token: reviewToken.token,
      review_url: reviewUrl,
      guest_name: reviewToken.guestName,
      guest_email: reviewToken.guestEmail,
    })
  } catch (error) {
    console.error("[generate-token] Error:", error)
    return NextResponse.json(
      { error: "Failed to generate review token" },
      { status: 500 }
    )
  }
}
