import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate environment variables
if (!supabaseUrl || supabaseUrl === "your_supabase_url_here") {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL environment variable. Please add your Supabase project URL to .env.local"
  );
}

if (!supabaseAnonKey || supabaseAnonKey === "your_supabase_anon_key_here") {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable. Please add your Supabase anon key to .env.local"
  );
}

// For normal client-side use (public anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// For server-side admin use (service role key) - only validate when actually used
export const supabaseAdmin = (() => {
  if (!supabaseServiceRoleKey || supabaseServiceRoleKey === "your_supabase_service_role_key_here") {
    console.warn("SUPABASE_SERVICE_ROLE_KEY not configured - admin functions will not work");
    return null;
  }
  return createClient(supabaseUrl, supabaseServiceRoleKey);
})();
