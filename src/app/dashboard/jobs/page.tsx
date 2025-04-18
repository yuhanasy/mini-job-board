import JobList from "@/components/job-list";
import { fetchJobList } from "@/services/job-services";

const Jobs = async () => {
  const jobs = await fetchJobList({ own_jobs: true });

  if (!jobs) return;

  return (
    <div>
      <JobList jobs={jobs} />
    </div>
  );
};

export default Jobs;
