'use client'

import { createClient } from "@/utils/supabase/client";
import { Factor } from "@supabase/auth-js";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function MFAVerification({ totpFactors }: { totpFactors: Factor[] }) {
  const supabase = createClient();
  
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error: mfaError } = await supabase.auth.mfa.challengeAndVerify({
      factorId: totpFactors[0].id,
      code: code,
    });

    if (mfaError) {
      setError("Invalid code. Please try again.");
      return;
    }

    data.access_token

    // Redirect to homepage upon successful verification
    redirect("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white border border-gray-300 rounded-lg shadow"
      >
        <h1 className="text-2xl font-bold text-center mb-4">MFA Verification</h1>

        <div className="mb-4">
          <label
            htmlFor="mfa-code"
            className="block text-sm font-medium text-gray-700"
          >
            Enter your MFA code
          </label>
          <input
            id="mfa-code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter code"
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-500">{error}</div>
        )}

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Verify
        </button>
      </form>
    </div>
  );
}