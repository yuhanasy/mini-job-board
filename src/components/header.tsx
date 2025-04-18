import Link from "next/link";
import PostJobDialog from "./post-job-dialog";
import { fetchUser } from "@/services/auth-services";
import { Button } from "./ui/button";

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
          <Button asChild>
            <Link href="/dashboard/jobs/create">Post a job</Link>
          </Button>
        </div>
      ) : (
        <PostJobDialog />
      )}
    </div>
  );
};

export default Header;
