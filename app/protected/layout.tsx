import useUser from "@/hooks/useUser";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await useUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      {children}
    </>
  );
}

