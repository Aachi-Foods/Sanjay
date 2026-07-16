"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Inquiry, supabase } from "@/lib/supabase";

export default function AdminTable() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function loadInquiries() {
    setLoading(true);
    try {
      // RLS restricts SELECT on `inquiries` to the `authenticated` role, so
      // this only returns rows once the admin has signed in via Supabase Auth.
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setInquiries(data ?? []);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInquiries();
  }, []);

  async function markReviewed(id: string) {
    setUpdatingId(id);
    try {
      const { error } = await supabase
        .from("inquiries")
        .update({ status: "reviewed" })
        .eq("id", id);

      if (error) throw error;
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status: "reviewed" } : inq))
      );
      toast.success("Marked as reviewed");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) {
    return <p className="py-12 text-center font-body text-charcoal/60">Loading inquiries...</p>;
  }

  if (inquiries.length === 0) {
    return <p className="py-12 text-center font-body text-charcoal/60">No inquiries yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-charcoal/10 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-charcoal/10 text-left text-sm">
        <thead className="bg-charcoal text-cream">
          <tr>
            {["ID", "Name", "Email", "Phone", "Event Type", "Date", "City", "Guests", "Message", "Submitted", "Status", ""].map(
              (col) => (
                <th key={col} className="whitespace-nowrap px-4 py-3 font-body font-medium">
                  {col}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-charcoal/5">
          {inquiries.map((inq) => (
            <tr key={inq.id} className="hover:bg-cream/60">
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-charcoal/40" title={inq.id}>
                {inq.id.slice(0, 8)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-medium text-charcoal">{inq.name}</td>
              <td className="whitespace-nowrap px-4 py-3 text-charcoal/70">{inq.email}</td>
              <td className="whitespace-nowrap px-4 py-3 text-charcoal/70">{inq.phone}</td>
              <td className="whitespace-nowrap px-4 py-3 text-charcoal/70">{inq.event_type}</td>
              <td className="whitespace-nowrap px-4 py-3 text-charcoal/70">{inq.event_date}</td>
              <td className="whitespace-nowrap px-4 py-3 text-charcoal/70">{inq.city}</td>
              <td className="whitespace-nowrap px-4 py-3 text-charcoal/70">{inq.guest_count}</td>
              <td className="max-w-xs truncate px-4 py-3 text-charcoal/70" title={inq.message}>
                {inq.message}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-charcoal/50">
                {new Date(inq.created_at).toLocaleString()}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    inq.status === "reviewed"
                      ? "bg-green-100 text-green-700"
                      : "bg-gold/20 text-maroon"
                  }`}
                >
                  {inq.status === "reviewed" ? "Reviewed" : "New"}
                </span>
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                {inq.status !== "reviewed" && (
                  <button
                    onClick={() => markReviewed(inq.id)}
                    disabled={updatingId === inq.id}
                    className="rounded-full border border-maroon px-3 py-1 text-xs font-semibold text-maroon transition-colors hover:bg-maroon hover:text-cream disabled:opacity-50"
                  >
                    {updatingId === inq.id ? "..." : "Mark Reviewed"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
