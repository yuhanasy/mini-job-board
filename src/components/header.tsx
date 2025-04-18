import Link from "next/link";
import PostJobDialog from "./post-job-dialog";
import { fetchUser } from "@/services/auth-services";
import { Button } from "./ui/button";
import { signOutAction } from "@/server/auth-actions";
import { SubmitButton } from "./submit-button";

const Header = async () => {
  const { user } = await fetchUser();

  return (
    <div className="w-full flex justify-between max-w-5xl px-5 py-4">
      <Link href="/">
        <div className="text-2xl font-bold hover:opacity-75">
          Mini Job Board
        </div>
      </Link>

      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-sm">Hey, {user.email}!</span>
          <form>
            <SubmitButton
              variant="outline"
              formAction={signOutAction}
              pendingText="Signing out..."
            >
              Sign out
            </SubmitButton>
          </form>
          <Button asChild>
            <Link href="/dashboard">Post a job</Link>
          </Button>
        </div>
      ) : (
        <PostJobDialog />
      )}
    </div>
  );
};

export default Header;
