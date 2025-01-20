import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    const { pathname } = req.nextUrl;

    // Allow requests to next-auth API, static files, and public routes
    if (
      pathname.includes("/api/auth") ||
      pathname.startsWith("/_next") ||
      pathname.startsWith("/static") ||
      pathname === "/login" ||
      PUBLIC_FILE.test(pathname)
    ) {
      return NextResponse.next();
    }

    // Redirect unauthenticated users to the login page
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Allow authenticated users to proceed
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Error:", error);
    return NextResponse.json({ msg: "Middleware Error!" });
  }
}
