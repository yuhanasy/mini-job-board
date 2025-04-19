"use server";

import { jobSchema } from "@/entity/job";
import { fetchUser } from "@/services/auth-services";
import { deleteJob, createJob, editJob } from "@/services/job-services";
import { redirect } from "next/navigation";

export type CreateJobActionState = {
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
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      message: "Please check the input again",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { user } = await fetchUser();
  if (!user) {
    redirect("/");
  }

  const { data, error } = await createJob(user.id, validatedFields.data);
  console.log(error);
  if (error || !data) {
    return {
      message: "Failed to save job",
    };
  }

  redirect(`/dashboard/jobs/${data.id}`);
};

export const editJobAction = async (
  prevState: CreateJobActionState,
  formData: FormData
): Promise<CreateJobActionState> => {
  const validatedFields = jobSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    company_name: formData.get("company_name"),
    job_type_id: formData.get("job_type_id"),
    location: formData.get("location"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      message: "Please check the input again",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, ...restData } = validatedFields.data;
  if (!id) {
    return {
      message: "No job id has been found",
    };
  }

  const { user } = await fetchUser();
  if (!user) {
    redirect("/");
  }

  const { data, error } = await editJob(user.id, id, restData);
  console.log(error);
  if (error || !data) {
    return {
      message: "Failed to save job",
    };
  }

  redirect(`/dashboard/jobs/${data.id}`);
};

export const deleteJobAction = async (id: string) => {
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
