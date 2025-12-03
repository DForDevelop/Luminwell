import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/user/:path",
    "/ambassador/:path",
    "/sign-in",
    "/sign-up",
    "/ambassador-sign-up",
    "/",
  ],
};

interface CustomToken extends Record<string, unknown> {
  role?: "user" | "ambassador";
}

export async function middleware(request: NextRequest) {
  const token = (await getToken({ req: request })) as CustomToken | null;
  const url = request.nextUrl; // ------------------------------------------------------------------------- // 1. DEFINE PROTECTED PATHS (THE CRITICAL FIX IS HERE) // ------------------------------------------------------------------------- // These paths require a token, but exclude the public sign-up/in pages.
  const userId = token?._id;
  const isProtectedPath =
    url.pathname.startsWith("/user") || // Ambassador paths are protected, EXCEPT for the specific sign-up page
    (url.pathname.startsWith("/ambassador") &&
      url.pathname !== "/ambassador-sign-up"); // Paths that are publicly accessible for initial authentication

  const isPublicAuthPath =
    url.pathname.startsWith("/sign-in") ||
    url.pathname.startsWith("/sign-up") ||
    url.pathname === "/ambassador-sign-up"; // Use strict equality for the sign-up page // ========================================================================= // 2. UNAUTHENTICATED ACCESS TO PROTECTED ROUTES (Protection) // ========================================================================= // If user has NO token AND they are trying to reach a protected route, redirect.

  if (!token && isProtectedPath) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  } // ========================================================================= // 3. AUTHENTICATED ACCESS TO PUBLIC/AUTH ROUTES (Redirection Loop Prevention) // =========================================================================

  if (token) {
    const dashboardUrl =
      token.role === "ambassador"
        ? `/ambassador/${userId}/scheduler`
        : `/user/${userId}/appointments`; // If authenticated, redirect away from sign-in/sign-up pages

    if (isPublicAuthPath) {
      return NextResponse.redirect(new URL(dashboardUrl, request.url));
    } // Redirect authenticated users away from the home page

    if (url.pathname === "/") {
      return NextResponse.redirect(new URL(dashboardUrl, request.url));
    }
  } // ========================================================================= // 4. ROLE-BASED ACCESS CONTROL (RBAC) - Prevents Crossover // =========================================================================

  if (token) {
    // Regular user trying to access ambassador dashboard
    if (token.role === "user" && url.pathname.startsWith("/ambassador")) {
      return NextResponse.redirect(
        new URL(`/user/${userId}/appointments`, request.url)
      );
    } // Ambassador trying to access regular user dashboard

    if (token.role === "ambassador" && url.pathname.startsWith("/user")) {
      return NextResponse.redirect(
        new URL(`/ambassador/${userId}/scheduler`, request.url)
      );
    }
  } // default case (Allow access)

  return NextResponse.next();
}
[];
