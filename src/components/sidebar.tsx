import { Button } from "@/components/ui/button";
import {
  BriefcaseBusinessIcon,
  ContactRoundIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  PlusCircleIcon,
} from "lucide-react";
import Link from "next/link";
import { SubmitButton } from "./submit-button";
import { signOutAction } from "@/server/auth-actions";
import { cn } from "@/lib/utils";

const navs = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Jobs",
    url: "/dashboard/jobs",
    icon: BriefcaseBusinessIcon,
  },
  {
    title: "Candidates",
    url: "/dashboard/candidates",
    icon: ContactRoundIcon,
    isDisabled: true,
  },
];

const Sidebar = async () => {
  return (
    <aside className="bg-neutral-100 p-4 rounded-2xl flex flex-col">
      <Button asChild size="sm" className="w-full">
        <Link href="/dashboard/jobs/create">
          <PlusCircleIcon />
          Post a job
        </Link>
      </Button>

      <div className="flex flex-col gap-2 mt-8">
        {navs.map((nav) => (
          <nav
            key={nav.url}
            className={cn(
              "py-1 px-4 rounded-md text-sm text-neutral-600 hover:text-neutral-800 hover:bg-neutral-200 transition-colors ease-in",
              nav.isDisabled ? "pointer-events-none line-through" : ""
            )}
          >
            <Link href={nav.url} className="flex items-center gap-2">
              <nav.icon className="w-4" />
              <span>{nav.title}</span>
            </Link>
          </nav>
        ))}
      </div>

      <div className="flex-1" />

      <div className="flex flex-col gap-2 mt-20">
        <form>
          <SubmitButton
            variant="ghost"
            size="sm"
            formAction={signOutAction}
            pendingText="Signing out..."
            className="w-full text-neutral-700 hover:text-neutral-800 hover:bg-neutral-200"
          >
            <LogOutIcon />
            Sign out
          </SubmitButton>
        </form>
      </div>
    </aside>
  );
};

export default Sidebar;
