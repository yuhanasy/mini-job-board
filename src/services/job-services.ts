import { JobListItem } from "@/types/job";
import { createClient } from "@/utils/supabase/server";

export async function fetchJobList(): Promise<JobListItem[] | undefined> {
  const supabase = await createClient();
  const { data } = await supabase.from("jobs").select(
    `
      id,
      title,
      company_name,
      location,
      created_at,
      job_types (name)
    `
  );

  return data?.map((item) => ({
    ...item,
    job_types_name: item.job_types.name,
  }));
}
