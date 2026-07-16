import { createClient } from "@supabase/supabase-js";

// Public client — safe for browser use, respects Row Level Security policies.
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-only client — uses the service role key so API routes can bypass RLS
// (e.g. to read all inquiries for the admin dashboard, or insert new ones).
// Never import this file's `supabaseAdmin` export into a client component.
export function createSupabaseAdmin() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  return createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });
}

export type InquiryStatus = "new" | "reviewed";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date: string;
  city: string;
  guest_count: number;
  message: string;
  status: InquiryStatus;
  created_at: string;
}
