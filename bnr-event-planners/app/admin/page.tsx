"use client";

import { Session } from "@supabase/supabase-js";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminTable from "@/components/AdminTable";
import { supabase } from "@/lib/supabase";

// Admin access is a real Supabase Auth account (create one under
// Authentication > Users in the Supabase dashboard — see README). RLS
// policies on `inquiries` only grant SELECT/UPDATE to the `authenticated`
// role, so this session is what actually protects the data, not this page.
export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCheckingSession(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setLoggingIn(true);
    setError("");

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message);
    } else {
      toast.success("Welcome back!");
    }
    setLoggingIn(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (checkingSession) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-charcoal pt-24">
        <p className="font-body text-cream/60">Loading...</p>
      </section>
    );
  }

  if (!session) {
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
              <label htmlFor="email" className="mb-1.5 block font-body text-sm font-medium text-charcoal/80">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            disabled={loggingIn}
            className="mt-6 w-full rounded-full bg-maroon px-6 py-3 font-body text-sm font-semibold uppercase tracking-wide text-cream transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {loggingIn ? "Checking..." : "Log In"}
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
            onClick={handleLogout}
            className="rounded-full border border-charcoal/20 px-5 py-2 font-body text-sm font-medium text-charcoal/70 hover:bg-charcoal/5"
          >
            Log Out
          </button>
        </div>

        <AdminTable />
      </div>
    </section>
  );
}
