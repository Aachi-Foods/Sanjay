/**
 * BNR Event Planners — global config
 *
 * Paste your Supabase project URL and anon (public) key below.
 * Find them in your Supabase dashboard: Project Settings > API.
 * The anon key is safe to expose in client-side code as long as
 * Row Level Security (RLS) policies are configured correctly — see SETUP.md.
 */
window.BNR_CONFIG = {
  SUPABASE_URL: "YOUR_SUPABASE_PROJECT_URL", // e.g. https://xxxxxxxxxxxx.supabase.co
  SUPABASE_ANON_KEY: "YOUR_SUPABASE_ANON_KEY",

  // MVP-only admin gate. This is NOT secure — anyone who reads this file
  // can see the password. Do not use for real access control. See SETUP.md
  // for notes on hardening this before handling sensitive data.
  ADMIN_PASSWORD: "bnr-admin-2026",
};
