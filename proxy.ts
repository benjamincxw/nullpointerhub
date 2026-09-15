import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/mail/session";

const PUBLIC_PATHS = new Set(["/mail/login", "/api/mail/login", "/api/mail/webhook"]);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (PUBLIC_PATHS.has(pathname)) return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const authenticated = token ? await verifySessionToken(token) : false;

  if (authenticated) return NextResponse.next();

  if (pathname.startsWith("/api/mail")) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/mail/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/mail/:path*", "/api/mail/:path*"],
};
