import JobFilter from "@/components/job-filter";
import JobList from "@/components/job-list";
import {
  fetchJobList,
  fetchJobLocationList,
  fetchJobTypeList,
} from "@/services/job-services";

export default async function Home({
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const filter = await searchParams;
  const location =
    typeof filter.location === "string" ? [filter.location] : filter.location;
  const job_type =
    typeof filter.type === "string" ? [filter.type] : filter.type;

  const jobs = await fetchJobList({ location, job_type });
  const jobTypes = await fetchJobTypeList();
  const locations = await fetchJobLocationList();

  if (!jobs || !jobTypes || !locations) return;

  return (
    <div>
      <h1 className="text-3xl mb-8">
        Your Next Opportunity is Just a Click Away
        <br />
        Anywhere in the World
      </h1>

      <JobFilter locations={locations} jobTypes={jobTypes} />
      <JobList jobs={jobs} />
    </div>
  );
}
