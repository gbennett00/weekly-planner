import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Check if the user is authenticated
  if (!!user) {
    const { data } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    const { data: factors } = await supabase.auth.mfa.listFactors();

    const hasMFA = factors != null && factors.totp.length > 0;

    // Redirect users to MFA page if: 
      // MFA is enabled but not verified
      // User is not on the MFA page
      // Request is not for signing out
    if (
      hasMFA &&
      data?.currentLevel != "aal2" &&
      !request.nextUrl.pathname.startsWith("/mfa") &&
      !request.nextUrl.pathname.startsWith("/sign-out")
    ) {
      const url = new URL("/mfa-verification", request.url);
      return NextResponse.redirect(url);
    }
  }

  // Continue to the requested page if no issues
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
