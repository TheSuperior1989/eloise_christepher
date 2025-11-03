import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Lightweight middleware - auth check happens on the server side in pages
export function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")
  const isLoginPage = request.nextUrl.pathname === "/admin/login"

  // Only protect admin routes (except login page)
  // Actual auth verification happens in the page components
  if (isAdminRoute && !isLoginPage) {
    // Let the page handle auth - this just ensures the route exists
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

