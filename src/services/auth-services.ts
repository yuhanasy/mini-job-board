import { createClient } from "@/utils/supabase/server";

export async function signUpUser({
  email,
  password,
  emailRedirectTo,
}: {
  email: string;
  password: string;
  emailRedirectTo: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo,
    },
  });

  if (error) {
    return {
      success: false,
      error,
    };
  }

  return {
    success: true,
  };
}

export async function signInUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      error,
    };
  }

  return {
    success: true,
  };
}

export async function signoutUser() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      success: false,
      error,
    };
  }

  return {
    success: true,
  };
}

export async function fetchUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    user,
  };
}
