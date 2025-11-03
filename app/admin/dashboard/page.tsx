import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { GuestListManager } from "@/components/admin/guest-list-manager"
import { getGuests } from "../actions"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect("/admin/login")
  }

  const guests = await getGuests()

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <GuestListManager initialGuests={guests} session={session} />
    </div>
  )
}

