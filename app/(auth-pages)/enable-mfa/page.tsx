'use client';

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function EnableMFA() {
  const [qrCode, setQrCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [factorId, setFactorId] = useState("");
  const [message, setMessage] = useState("");
  const supabase = createClient();

  const handleEnableMFA = async () => {
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: "totp", // TOTP for Time-based One-Time Password
    });
  
    if (error) {
      console.error("Error enabling MFA:", error.message);
      return;
    } else {
      console.log("TOTP Enrollment Data:", data);
    }

    if (data) {
      setQrCode(data.totp.qr_code)
      setFactorId(data.id)
    };
  };

  useEffect(() => {
    handleEnableMFA();
  }, [])

  const handleVerifyMFA = async () => {
    const { error } = await supabase.auth.mfa.challengeAndVerify({
      factorId: factorId, // Replace with the actual factor ID
      code: verificationCode, // The TOTP code from the user
    });
  
    if (error) {
      console.error("Error verifying MFA setup:", error.message);
      setMessage("Verification failed.");
    }
  
    console.log("MFA setup successfully verified.");
    alert("MFA setup successfully verified.");
    redirect("/protected");
  };

  return (
    <div>
      <button onClick={handleEnableMFA}>Enable MFA</button>
      {qrCode && (
        <div>
          <img src={qrCode} alt="Scan this QR code with your authenticator app" />
          <input
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button onClick={handleVerifyMFA}>Verify</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}
