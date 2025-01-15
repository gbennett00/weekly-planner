import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin;

  const supabase = await createClient();
  await supabase.auth.signOut();

  // URL to redirect to after sign up process completes
  return NextResponse.redirect(`${origin}/sign-in`);
}
