import {
  fetchJobById,
  fetchJobLocationList,
  fetchJobTypeList,
} from "@/services/job-services";
import JobFormField from "@/components/job-form-field";
import { editJobAction } from "@/server/job-actions";
import { notFound } from "next/navigation";

const JobsEdit = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const job = await fetchJobById({ id });
  const jobTypes = await fetchJobTypeList();
  const locations = await fetchJobLocationList();

  if (!job) {
    notFound();
  }

  return (
    <JobFormField
      defaultValue={{ ...job }}
      jobTypes={jobTypes}
      locations={locations}
      action={editJobAction}
    />
  );
};

export default JobsEdit;
