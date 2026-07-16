import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase";

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  city: string;
  guestCount: string | number;
  message: string;
}

const REQUIRED_FIELDS: (keyof ContactPayload)[] = [
  "name",
  "email",
  "phone",
  "eventType",
  "eventDate",
  "city",
  "guestCount",
  "message",
];

// POST /api/contact — public endpoint used by the contact form. Validates the
// payload, then writes a new row into Supabase via the service-role client so
// it works even if `inquiries` has no anon-insert RLS policy.
export async function POST(request: NextRequest) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const missing = REQUIRED_FIELDS.filter((field) => {
    const value = body[field];
    return value === undefined || value === null || value === "";
  });
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  const guestCount = Number(body.guestCount);
  if (!Number.isFinite(guestCount) || guestCount <= 0) {
    return NextResponse.json({ error: "Guest count must be a positive number" }, { status: 400 });
  }

  const supabaseAdmin = createSupabaseAdmin();
  const { error } = await supabaseAdmin.from("inquiries").insert({
    name: body.name,
    email: body.email,
    phone: body.phone,
    event_type: body.eventType,
    event_date: body.eventDate,
    city: body.city,
    guest_count: guestCount,
    message: body.message,
    status: "new",
  });

  if (error) {
    console.error("Supabase insert error:", error.message);
    return NextResponse.json(
      { error: "Unable to save your enquiry right now. Please try again shortly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}

function isAuthorized(request: NextRequest): boolean {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) return false;

  const decoded = Buffer.from(auth.slice(6), "base64").toString("utf-8");
  const [user, pass] = decoded.split(":");

  return (
    user === (process.env.ADMIN_USERNAME ?? "admin") &&
    pass === (process.env.ADMIN_PASSWORD ?? "bnr2024")
  );
}

// GET /api/contact — admin-only, lists all inquiries newest first.
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseAdmin = createSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase select error:", error.message);
    return NextResponse.json({ error: "Unable to load inquiries" }, { status: 500 });
  }

  return NextResponse.json({ inquiries: data });
}

// PATCH /api/contact — admin-only, updates an inquiry's status (e.g. to "reviewed").
export async function PATCH(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status } = await request.json();
  if (!id || !status) {
    return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
  }

  const supabaseAdmin = createSupabaseAdmin();
  const { error } = await supabaseAdmin.from("inquiries").update({ status }).eq("id", id);

  if (error) {
    console.error("Supabase update error:", error.message);
    return NextResponse.json({ error: "Unable to update inquiry" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
