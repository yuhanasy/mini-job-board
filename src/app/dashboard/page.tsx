import { fetchJobList } from "@/services/job-services";
import { BriefcaseBusinessIcon, MoveRightIcon } from "lucide-react";
import Link from "next/link";

const Dashboard = async () => {
  const jobs = await fetchJobList({ own_jobs: true });

  return (
    <div>
      <h1 className="text-xl font-medium mb-8">Welcome back!</h1>

      <div className="grid grid-cols-2 gap-4 ">
        <div className="bg-neutral-100 rounded-xl h-40 p-6">
          <BriefcaseBusinessIcon className="text-muted-foreground" />
          <h3 className="flex items-end gap-2 mt-2 mb-4 text-4xl font-semibold">
            {jobs?.length}
            <span className="text-sm font-normal text-muted-foreground">
              Jobs posted
            </span>
          </h3>

          <Link
            href="/dashboard/jobs"
            className="flex items-center gap-4 text-muted-foreground hover:text-neutral-700 hover:gap-6 transition-all ease-in"
          >
            Manage your jobs
            <MoveRightIcon size={16} absoluteStrokeWidth />
          </Link>
        </div>

        <Link href="/dashboard/jobs/create">
          <div className="bg-neutral-100 rounded-xl h-40 p-8 text-2xl flex group">
            <span>Post a New Job, Right Now!</span>
            <span className="self-end group-hover:translate-x-2 transition-all ease-in-out">
              <MoveRightIcon size={24} absoluteStrokeWidth />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
