import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if ((pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) || pathname.startsWith("/api/admin/guides") || pathname.startsWith("/api/admin/upload") || pathname.startsWith("/api/admin/upload-signed") || pathname.startsWith("/api/admin/s3-config")) {
    const hasCookie = request.cookies.get("admin")?.value === "1"
    if (!hasCookie) {
      if (pathname.startsWith("/api")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/guides", "/api/admin/upload", "/api/admin/upload-signed", "/api/admin/s3-config"],
}
