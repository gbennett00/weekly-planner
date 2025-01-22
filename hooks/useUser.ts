import { createClient } from "@/utils/supabase/server";
import { User } from "@/utils/types";

export default async function useUser() {
  const supabase = await createClient();

  const {
    data: { user: supabaseUser },
  } = await supabase.auth.getUser();

  if (!supabaseUser) {
    return { user: null };
  }

  const user: User = {
    id: supabaseUser.id,
    email: supabaseUser.email,
    full_name: supabaseUser.user_metadata?.full_name,
    avatar_url: supabaseUser.user_metadata?.avatar_url,
    mfa_enabled: !!supabaseUser.factors && supabaseUser.factors.length > 0,
  }

  return {
    user,
  };
}
