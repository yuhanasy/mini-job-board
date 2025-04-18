import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full flex justify-between max-w-5xl px-5 py-4">
      <Link href="/">
        <div className="text-2xl font-bold hover:opacity-75">
          Mini Job Board
        </div>
      </Link>

      <div className="flex gap-2">
        <Button asChild size="sm" variant={"outline"}>
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button asChild size="sm" variant={"default"}>
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>
    </div>
  );
};

export default Header;
