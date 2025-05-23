import {
  fetchJobLocationList,
  fetchJobTypeList,
} from "@/services/job-services";
import JobFormField from "@/components/job-form-field";
import { createJobAction } from "@/server/job-actions";

const JobsCreate = async () => {
  const jobTypes = await fetchJobTypeList();
  const locations = await fetchJobLocationList();

  return (
    <JobFormField
      jobTypes={jobTypes}
      locations={locations}
      action={createJobAction}
    />
  );
};

export default JobsCreate;
