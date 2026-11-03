import { supabase } from "../lib/supabaseClient";

const COLLEGE_DOMAIN = "gecskp.ac.in";

// STUDENT / COMPANY REGISTRATION
export async function registerUser({
  fullName,
  email,
  password,
  role,
}) {
  const normalizedEmail = email.trim().toLowerCase();

  if (!["student", "company"].includes(role)) {
    throw new Error("Invalid registration role.");
  }

  if (
    role === "student" &&
    normalizedEmail.split("@")[1] !== COLLEGE_DOMAIN
  ) {
    throw new Error(
      "Students must use their @gecskp.ac.in college email."
    );
  }

  const { data, error } = await supabase.auth.signUp({
    email: normalizedEmail,
    password,
    options: {
      data: {
        full_name: fullName.trim(),
        role,
      },
      emailRedirectTo: `${window.location.origin}/welcome`,
    },
  });

  if (error) throw error;

  return data;
}

// LOGIN FOR STUDENT, COMPANY OR ADMIN
export async function loginUser({ email, password, expectedRole }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (error) throw error;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, account_status")
    .eq("id", data.user.id)
    .single();

  if (profileError || !profile) {
    await supabase.auth.signOut();
    throw new Error("Your CampusOS profile could not be found.");
  }

  if (profile.role !== expectedRole) {
    await supabase.auth.signOut();
    throw new Error(
      `This account is registered as ${profile.role}, not ${expectedRole}.`
    );
  }

  if (profile.account_status === "rejected") {
    await supabase.auth.signOut();
    throw new Error("Your account has been rejected. Contact the administrator.");
  }

  return { user: data.user, profile };
}

// LOGOUT
export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}