import { Geist } from 'next/font/google';
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground flex flex-col min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col flex-grow bg-gray-100">
            <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">WeeklyPlanner</h1>
                {user ? (
                  <div className="flex space-x-8">
                    <Link href="/dashboard">
                     <Button>Go to Dashboard</Button>
                    </Link>
                    <Link href="/sign-out">
                      <Button>Sign Out</Button>
                    </Link>
                  </div>
                ) : (
                  <Link href="/sign-in">
                    <Button>Sign In</Button>
                  </Link>
                )}
              </div>
            </header>

            <main className="flex flex-col justify-center items-center flex-grow">
              {children}
            </main>

            <footer className="bg-white shadow">
              <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
                © 2023 WeeklyPlanner. All rights reserved.
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

