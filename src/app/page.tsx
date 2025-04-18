import { createClient } from "@/utils/supabase/server";
import { relativeTime } from "@/utils/utils";

export default async function Home() {
  const supabase = await createClient();

  const { data: jobs, error } = await supabase.from("jobs").select(
    `
      *,
      job_types (name)
    `
  );

  console.log(jobs);
  console.log(error);
  return (
    <div className="flex flex-col gap-2">
      {jobs?.map((job) => (
        <div
          key={job.id}
          className="w-full bg-neutral-100 px-6 py-4 rounded-3xl"
        >
          <div className="flex justify-between">
            <div>
              <p className="text-muted-foreground text-sm"></p>
              <h3 className="text-md">
                {job.company_name} -{" "}
                <strong className="font-semibold">{job.title}</strong>
              </h3>
              <p className="text-sm text-muted-foreground">
                {job.job_types.name}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{job.location}</p>
              <p className="text-sm text-muted-foreground text-right">
                {relativeTime(job.created_at)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
