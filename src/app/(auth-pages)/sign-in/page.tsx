import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { signInAction } from "@/server/auth-actions";
import Link from "next/link";

const Signin = async (props: { searchParams: Promise<Message> }) => {
  const searchParams = await props.searchParams;

  return (
    <form className="flex flex-col min-w-80 mx-auto max-w-xs">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text text-foreground">
        Don&apos;t have an account?{" "}
        <Link className="text-primary font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>

      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          minLength={6}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          required
        />
        <SubmitButton formAction={signInAction} pendingText="Signing in...">
          Sign in
        </SubmitButton>

        <FormMessage message={searchParams} />
      </div>
    </form>
  );
};

export default Signin;
