import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";

const PostJobDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Post a job</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-3xl">
        <div className="mb-4">
          <DialogTitle className="text-2xl font-medium text-center">
            Hire your dream team
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-center">
            Sign in to post a job
          </DialogDescription>
        </div>

        <DialogClose asChild>
          <Link
            href="/sign-up"
            className="px-5 py-3 rounded-xl shadow hover:shadow-lg transition-shadow ease-in border border-neutral-100"
          >
            <p className="text-lg font-medium">Sign up</p>
            <p className="text-sm text-muted-foreground">
              Create an account to start hiring today
            </p>
          </Link>
        </DialogClose>

        <DialogClose asChild>
          <Link
            href="/sign-in"
            className="px-5 py-3 rounded-xl shadow hover:shadow-lg transition-shadow ease-in border border-neutral-100"
          >
            <p className="text-lg font-medium">Sign in</p>
            <p className="text-sm text-muted-foreground">
              Create and maintain your jobs
            </p>
          </Link>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default PostJobDialog;
