import { JobListItem } from "@/types/job";
import { relativeTime } from "@/utils/utils";

type Props = {
  jobs: JobListItem[];
};

const JobList = ({ jobs }: Props) => {
  return (
    <div className="relative">
      <h2 className="text-xl font-medium mb-3">Latest Jobs</h2>
      <div className="flex flex-col gap-2">
        {jobs?.map((job) => (
          <div
            key={job.id}
            className="w-full bg-neutral-100 hover:bg-neutral-200 transition-colors ease-in px-6 py-4 rounded-3xl cursor-pointer"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-muted-foreground text-sm"></p>
                <h3 className="text-md">
                  {job.company_name} -{" "}
                  <strong className="font-semibold">{job.title}</strong>
                </h3>
                <p className="text-sm text-muted-foreground">
                  {job.job_types_name}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground text-right">
                  {job.location}
                </p>
                <p className="text-sm text-muted-foreground text-right">
                  {relativeTime(job.created_at)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
