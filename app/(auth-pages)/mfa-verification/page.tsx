import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import MFAVerification from "./mfa-verification";
import useUser from "@/hooks/useUser";

const MfaPage = async () => {
  const { user } = await useUser();

  if (!user) {
    return redirect("/sign-in"); // Redirect unauthenticated users
  }

  const supabase = await createClient();
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
