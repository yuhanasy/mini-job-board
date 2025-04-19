import { JobInputType } from "@/entity/job";
import { JobListItem } from "@/types/job";
import { createClient } from "@/utils/supabase/server";

export async function fetchJobList(filter?: {
  location?: string[];
  job_type?: string[];
  own_jobs?: boolean;
}): Promise<JobListItem[] | undefined> {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  const { location, job_type, own_jobs } = filter || {};

  let query = supabase
    .from("jobs")
    .select(
      `
        id,
        title,
        company_name,
        location,
        created_at,
        job_types (name)
      `
    )
    .order("created_at", { ascending: false });

  if (own_jobs && user.user) {
    query = query.eq("user_id", user.user.id);
  }

  if (location?.length) {
    query = query.in("location", location);
  }

  if (job_type?.length) {
    query = query.in("job_type_id", job_type);
  }

  const { data } = await query;

  return data?.map((item) => ({
    ...item,
    job_types_name: item.job_types.name,
  }));
}

export async function fetchJobTypeList() {
  const supabase = await createClient();

  const { data } = await supabase.from("job_types").select(
    `
      id,
      name
    `
  );

  return data;
}

export async function fetchJobLocationList() {
  const supabase = await createClient();

  const { data } = await supabase.from("locations").select("location");

  return data;
}

export async function fetchJobById({ id }: { id: string }) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("jobs")
    .select(
      `
        id,
        title,
        company_name,
        location,
        description,
        job_type_id,
        created_at,
        job_types (name)
      `
    )
    .eq("id", id)
    .limit(1)
    .single();

  if (!data) return;

  return { ...data, job_types_name: data.job_types.name };
}

export async function createJob(user_id: string, data: JobInputType) {
  const supabase = await createClient();

  const res = await supabase
    .from("jobs")
    .insert({
      user_id,
      ...data,
    })
    .select()
    .single();

  return {
    data: res.data,
    error: res.error,
  };
}

export async function editJob(
  user_id: string,
  job_id: string,
  data: JobInputType
) {
  const supabase = await createClient();

  const res = await supabase
    .from("jobs")
    .update({
      user_id,
      ...data,
    })
    .eq("id", job_id)
    .select()
    .single();

  return {
    data: res.data,
    error: res.error,
  };
}

export async function deleteJob(user_id: string, job_id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .eq("user_id", user_id);

  if (error) {
    console.log({ error });
    return {
      success: false,
      message: "Failed when deleting job",
    };
  }

  return {
    success: true,
    message: "Successfully deleting job",
  };
}
