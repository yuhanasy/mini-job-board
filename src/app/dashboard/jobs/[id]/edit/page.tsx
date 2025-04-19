import {
  fetchJobById,
  fetchJobLocationList,
  fetchJobTypeList,
} from "@/services/job-services";
import JobFormField from "@/components/job-form-field";
import { editJobAction } from "@/server/job-actions";

const JobsCreate = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const job = await fetchJobById({ id });
  const jobTypes = await fetchJobTypeList();
  const locations = await fetchJobLocationList();

  if (!job) return;

  return (
    <JobFormField
      defaultValue={{ ...job }}
      jobTypes={jobTypes}
      locations={locations}
      action={editJobAction}
    />
  );
};

export default JobsCreate;
