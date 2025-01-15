import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      {user ? (
        <AuthenticatedView />
      ) : (
        <UnauthenticatedView />
      )}
    </>
  );
}

function AuthenticatedView() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welcome back to WeeklyPlanner!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickAccessCard
            title="This Week's Plan"
            description="View and edit your current week's plan"
            link="/dashboard"
          />
          <QuickAccessCard
            title="Create New Plan"
            description="Start planning for next week"
            link="/new-plan"
          />
          <QuickAccessCard
            title="View Progress"
            description="Check your planning history and progress"
            link="/progress"
          />
        </div>
      </div>
    </div>
  )
}

function UnauthenticatedView() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Plan Your Week for Success
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            WeeklyPlanner helps you organize your time, set goals, and achieve more every week.
          </p>
          <div className="mt-8">
            <Link href="/sign-in">
              <Button size="lg">Get Started for Free</Button>
            </Link>
          </div>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Intuitive Planning"
              description="Easy-to-use interface for quick and effective weekly planning."
            />
            <FeatureCard
              title="Goal Tracking"
              description="Set and monitor your weekly goals to stay motivated."
            />
            <FeatureCard
              title="Progress Insights"
              description="Visualize your productivity trends and improve over time."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function QuickAccessCard({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <Link href={link} className="text-sm font-medium text-blue-600 hover:text-blue-500">
          Go to {title} &rarr;
        </Link>
      </div>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}

