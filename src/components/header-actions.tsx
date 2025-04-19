"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

const HeaderActions = ({ email = "" }) => {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm">Hey, {email}!</span>

      {!pathname.startsWith("/dashboard") ? (
        <>
          <Button asChild variant="link">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/jobs/create">Post a job</Link>
          </Button>
        </>
      ) : null}
    </div>
  );
};

export default HeaderActions;
