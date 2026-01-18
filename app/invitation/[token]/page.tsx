import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { InvitationView } from "@/components/invitation/invitation-view"

interface InvitationPageProps {
  params: Promise<{
    token: string
  }>
}

export default async function InvitationPage({ params }: InvitationPageProps) {
  const { token } = await params

  const guest = await prisma.guest.findUnique({
    where: { invitationToken: token },
  })

  if (!guest) {
    notFound()
  }

  return <InvitationView guest={guest} />
}

