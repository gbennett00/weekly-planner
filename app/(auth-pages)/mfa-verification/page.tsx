import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import MFAVerification from "./mfa-verification";

const MfaPage = async () => {
  const supabase = await createClient();

  // Check if the user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in"); // Redirect unauthenticated users
  }

  const { data: factors } = await supabase.auth.mfa.listFactors();

  // Redirect users without MFA enabled
  if (factors == null || factors.totp.length === 0) {
    return redirect("/protected");
  }

  return (
    <>
      <MFAVerification totpFactors={factors.totp} />
    </>
  );
};

export default MfaPage;
