import { CircleOff } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function NotFound({
  message = "Could not find requested resource",
  redirectTo = "/",
  redirectToText = "Return to Home",
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-2 bg-neutral-50 border border-neutral-100 rounded-md">
        <CircleOff />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Not Found</h2>
      <p>{message}</p>
      <Button asChild variant="link">
        <Link href={redirectTo}>{redirectToText}</Link>
      </Button>
    </div>
  );
}
