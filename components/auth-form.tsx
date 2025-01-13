import { signInAction, signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import Or from "@/components/form-or";
import GoogleSignIn from "@/components/google-sign-in";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function AuthForm(props: { isLogin: boolean, searchParams: Message }) {
  const authAction = props.isLogin ? signInAction : signUpAction;
  const description = props.isLogin ? "Sign in" : "Sign up";

  return (
    <div className="flex-1 flex flex-col min-w-64">
      <form >
        <h1 className="text-2xl font-medium">{description}</h1>
        <p className="text-sm text-foreground">
          {props.isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link className="text-foreground font-medium underline" href={props.isLogin ? "/sign-up" : "/sign-in"}>
            {props.isLogin ? "Sign up" : "Sign in"}
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            {props.isLogin && <Link
              className="text-xs text-foreground underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>}
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            {...(props.isLogin ? {} : { minLength: 6 })} // Only add minLength in sign up form
            required
          />
          <SubmitButton pendingText={props.isLogin ? "Signing In..." : "Signing up..."} formAction={authAction}>
            {description}
          </SubmitButton>
          <FormMessage message={props.searchParams} />
        </div>
      </form>
      <Or />
      <GoogleSignIn description={`${props.isLogin ? "Sign in" : "Sign up"} with Google`}/>
    </div>
  )
}