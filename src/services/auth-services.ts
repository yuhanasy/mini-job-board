import { createClient } from "@/utils/supabase/server";

export async function fetchUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    user,
  };
}
