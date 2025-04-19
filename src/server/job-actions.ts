"use server";

import { jobSchema } from "@/entity/job";
import { fetchUser } from "@/services/auth-services";
import { deleteJob, postJob } from "@/services/job-services";
import { redirect } from "next/navigation";

type CreateJobActionState = {
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

export const createJobAction = async (
  prevState: CreateJobActionState,
  formData: FormData
): Promise<CreateJobActionState> => {
  const validatedFields = jobSchema.safeParse({
    title: formData.get("title"),
    company_name: formData.get("company_name"),
    job_type_id: formData.get("job_type_id"),
    location: formData.get("location"),
    description: formData.get("descriptionxxx"),
  });

  if (!validatedFields.success) {
    return {
      message: "Please check again the input",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { user } = await fetchUser();
  if (!user) {
    redirect("/");
  }

  const { data, error } = await postJob(user.id, validatedFields.data);
  console.log(error);
  if (error || !data) {
    return {
      message: "Failed to save job",
    };
  }

  redirect(`/dashboard/jobs/${data.id}`);
};

export const deleteJobAction = async (id: string) => {
  console.log({ id });
  if (!id) return;

  const { user } = await fetchUser();
  if (!user) {
    redirect("/");
  }

  const { success, message } = await deleteJob(user.id, id);

  console.log(message);
  if (!success) {
    return;
  }

  redirect("/dashboard/jobs");
};
