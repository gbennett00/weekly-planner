"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import * as Popover from "@radix-ui/react-popover";
import * as Avatar from "@radix-ui/react-avatar"

type User = {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  mfa_enabled: boolean;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user: supabaseUser },
      } = await supabase.auth.getUser();
      if (supabaseUser) {
        const { id, email } = supabaseUser;
        const full_name: string = supabaseUser.user_metadata?.full_name;
        const avatar_url: string = supabaseUser.user_metadata?.avatar_url;
        const mfa_enabled = !!supabaseUser.factors && supabaseUser.factors.length > 0;
        setUser({
          id,
          email: email || "",
          full_name: full_name || "",
          avatar_url: avatar_url || "",
          mfa_enabled,
        });
      }
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/sign-in"; // Redirect to sign-in page
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const { full_name, avatar_url, mfa_enabled } = user;

  return (
    <>
    <Popover.Root>
      <Popover.Trigger>
          <Avatar.Root>
            <Avatar.Image className="max-w-10 border rounded-lg" src={avatar_url} alt={full_name} />
            <Avatar.Fallback>
              {full_name 
                ? full_name.charAt(0).toUpperCase()
                : user.email.charAt(0).toUpperCase()
              }
            </Avatar.Fallback>
          </Avatar.Root>
      </Popover.Trigger>
      {/* <Popover.Anchor /> */}
      <Popover.Portal>
        <Popover.Content>
          <div className="p-4 border rounded-md shadow-lg max-w-sm mx-auto">
            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div>
                <h2 className="text-lg font-semibold">{full_name || "User"}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <Button onClick={handleSignOut} className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
                Sign Out
              </Button>
              <Button
                onClick={() => (mfa_enabled ? alert("MFA is already enabled") : (window.location.href = "/enable-mfa"))}
                className={`w-full py-2 px-4 rounded-md ${
                  mfa_enabled ? "bg-gray-200 text-gray-700 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                disabled={mfa_enabled}
              >
                {mfa_enabled ? "MFA Enabled" : "Enable MFA"}
              </Button>
            </div>
          </div>
          <Popover.Close />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
    </>
  );
}
