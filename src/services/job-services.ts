import { JobListItem } from "@/types/job";
import { createClient } from "@/utils/supabase/server";

export async function fetchJobList(filter?: {
  location?: string[];
  job_type?: string[];
}): Promise<JobListItem[] | undefined> {
  const supabase = await createClient();

  const { location, job_type } = filter || {};

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
