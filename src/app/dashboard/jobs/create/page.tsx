import {
  fetchJobLocationList,
  fetchJobTypeList,
} from "@/services/job-services";
import JobFormField from "@/components/job-form-field";

const JobsCreate = async () => {
  const jobTypes = await fetchJobTypeList();
  const locations = await fetchJobLocationList();

  return <JobFormField jobTypes={jobTypes} locations={locations} />;
};

export default JobsCreate;
