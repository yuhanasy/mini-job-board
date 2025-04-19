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

export async function postJob(user_id: string, data: JobInputType) {
  const supabase = await createClient();

  const sb = await supabase
    .from("jobs")
    .insert({
      user_id,
      ...data,
    })
    .select()
    .single();

  return {
    data: sb.data,
    error: sb.error,
  };
}
