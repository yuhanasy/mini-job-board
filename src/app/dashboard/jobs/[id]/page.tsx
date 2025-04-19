import DeleteJobDialog from "@/components/delete-job-dialog";
import { Button } from "@/components/ui/button";
import { fetchJobById } from "@/services/job-services";
import { relativeTime } from "@/utils/utils";
import { File, MapIcon, Timer } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

export default async function Home({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const job = await fetchJobById({ id });

  if (!job) return;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 self-end">
        <Button asChild variant="outline" size="sm">
          <Link href={`/dashboard/jobs/${id}/edit`}>Edit</Link>
        </Button>
        <DeleteJobDialog
          jobId={id}
          triggerButton={
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          }
        />
      </div>

      <div className="w-full rounded-3xl shadow p-12 flex flex-col gap-y-12">
        <div className="bg-neutral-100 rounded-xl p-4 -m-4 w-full max-w-xs select-none">
          <div className="mb-4">
            <h5 className="text-lg text-muted-foreground">
              {job.company_name}
            </h5>
            <h1 className="text-2xl font-medium">{job.title}</h1>
          </div>
          <div className="flex flex-col gap-1">
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
        </div>

        <div>
          <h3 className="text-md font-semibold mb-4">Job Description</h3>
          <div className="prose-sm prose-li:list-disc">
            <Markdown>{job.description}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}
