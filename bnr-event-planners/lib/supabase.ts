import { createClient } from "@supabase/supabase-js";

// The site is a static export (GitHub Pages has no server), so every
// Supabase call — contact form inserts, admin reads/updates — goes through
// this anon-key client straight from the browser. Row Level Security on the
// `inquiries` table (see README) is what actually enforces access:
//   - anon role: INSERT only (the public contact form)
//   - authenticated role: SELECT + UPDATE (the admin dashboard, gated by
//     supabase.auth.signInWithPassword in app/admin/page.tsx)
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
