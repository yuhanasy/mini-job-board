import JobList from "@/components/job-list";
import { fetchJobList } from "@/services/job-services";

export default async function Home() {
  const jobs = await fetchJobList();

  if (!jobs) return;

  return <JobList jobs={jobs} />;
}
