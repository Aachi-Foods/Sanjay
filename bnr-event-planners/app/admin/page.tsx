"use client";

import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import AdminTable from "@/components/AdminTable";

// MVP-only auth: credentials are checked against the /api/contact route's
// Basic Auth check (which reads ADMIN_USERNAME / ADMIN_PASSWORD server-side).
// This form just verifies the same credentials work before revealing the table.
export default function AdminPage() {
  const [authHeader, setAuthHeader] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setChecking(true);
    setError("");

    const encoded = typeof window !== "undefined" ? window.btoa(`${username}:${password}`) : "";

    try {
      const res = await fetch("/api/contact", {
        headers: { Authorization: `Basic ${encoded}` },
      });
      if (!res.ok) {
        throw new Error("Invalid username or password");
      }
      setAuthHeader(encoded);
      toast.success("Welcome back!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setChecking(false);
    }
  }

  if (!authHeader) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-charcoal px-6 pt-24">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl bg-cream p-8 shadow-xl"
        >
          <h1 className="font-display text-2xl font-bold text-charcoal">Admin Login</h1>
          <p className="mt-1 font-body text-sm text-charcoal/60">
            BNR Event Planners inquiry dashboard
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="username" className="mb-1.5 block font-body text-sm font-medium text-charcoal/80">
                Username
              </label>
              <input
                id="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-charcoal/15 bg-white px-4 py-3 font-body focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                autoComplete="username"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block font-body text-sm font-medium text-charcoal/80">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-charcoal/15 bg-white px-4 py-3 font-body focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && <p className="mt-4 font-body text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={checking}
            className="mt-6 w-full rounded-full bg-maroon px-6 py-3 font-body text-sm font-semibold uppercase tracking-wide text-cream transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {checking ? "Checking..." : "Log In"}
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-cream px-6 pb-20 pt-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-charcoal">Inquiry Dashboard</h1>
            <p className="mt-1 font-body text-sm text-charcoal/60">
              All contact form submissions, newest first.
            </p>
          </div>
          <button
            onClick={() => setAuthHeader(null)}
            className="rounded-full border border-charcoal/20 px-5 py-2 font-body text-sm font-medium text-charcoal/70 hover:bg-charcoal/5"
          >
            Log Out
          </button>
        </div>

        <AdminTable authHeader={authHeader} />
      </div>
    </section>
  );
}
