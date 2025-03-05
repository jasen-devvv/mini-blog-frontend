// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get cookies
  const authCookie = request.cookies.get("token");
  
  // Define protected paths
  // Redirect logic
  if (request.nextUrl.pathname === "/" && !authCookie) {
    // Redirect to login if trying to access protected route without auth
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  if (request.nextUrl.pathname === "/login" && authCookie) {
    // Redirect to home if trying to access login page while authenticated
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  return NextResponse.next();
}

// Specify paths middleware will run on
export const config = {
  matcher: ["/login"],
};