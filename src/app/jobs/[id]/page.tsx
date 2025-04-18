import { fetchJobById } from "@/services/job-services";
import { relativeTime } from "@/utils/utils";
import { File, MapIcon, Timer } from "lucide-react";

export default async function Home({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const job = await fetchJobById({ id });

  if (!job) return;

  return (
    <div className="w-full rounded-xl shadow p-8">
      <div className="mb-4">
        <h5 className="text-lg text-muted-foreground">{job.company_name}</h5>
        <h1 className="text-2xl font-medium">{job.title}</h1>
      </div>
      <div className="flex flex-col gap-1 mb-8">
        <p className="flex gap-1 text-muted-foreground">
          <MapIcon className="w-4" />
          <span>{job.location}</span>
        </p>
        <p className="flex gap-1 text-muted-foreground">
          <File className="w-4" />
          <span>{job.job_types_name}</span>
        </p>
        <p className="flex gap-1 text-muted-foreground">
          <Timer className="w-4" />
          <span>{relativeTime(job.created_at)}</span>
        </p>
      </div>

      <div>
        <h3 className="text-xl font-medium">Job Description</h3>
        {job.description}
      </div>
    </div>
  );
}
