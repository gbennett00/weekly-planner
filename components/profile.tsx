"use client";

import { Button } from "./ui/button";
import * as Popover from "@radix-ui/react-popover";
import * as Avatar from "@radix-ui/react-avatar"
import { User } from "@/utils/types";
import { redirect } from "next/navigation";

export default function Profile({ user } : { user: User }) {
  const handleSignOut = async () => {
    redirect("/sign-out");
  };

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
                : "User"
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
