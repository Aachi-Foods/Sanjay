"use client";

import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { eventTypes } from "@/lib/content";

const initialState = {
  name: "",
  email: "",
  phone: "",
  eventType: eventTypes[0],
  eventDate: "",
  city: "",
  guestCount: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof typeof initialState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      toast.success("Thank you! Your enquiry has been received — we'll be in touch soon.");
      setForm(initialState);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unable to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-charcoal/15 bg-white px-4 py-3 font-body text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";
  const labelClass = "mb-1.5 block font-body text-sm font-medium text-charcoal/80";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full Name
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass}
            placeholder="Lakshmi Narayanan"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass}
            placeholder="+91 98765 43210"
          />
        </div>
        <div>
          <label htmlFor="eventType" className={labelClass}>
            Event Type
          </label>
          <select
            id="eventType"
            value={form.eventType}
            onChange={(e) => update("eventType", e.target.value)}
            className={inputClass}
          >
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="eventDate" className={labelClass}>
            Event Date
          </label>
          <input
            id="eventDate"
            type="date"
            required
            value={form.eventDate}
            onChange={(e) => update("eventDate", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="city" className={labelClass}>
            Venue City
          </label>
          <input
            id="city"
            required
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            className={inputClass}
            placeholder="Chennai"
          />
        </div>
        <div>
          <label htmlFor="guestCount" className={labelClass}>
            Estimated Guest Count
          </label>
          <input
            id="guestCount"
            type="number"
            min={1}
            required
            value={form.guestCount}
            onChange={(e) => update("guestCount", e.target.value)}
            className={inputClass}
            placeholder="250"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message / Requirements
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={inputClass}
          placeholder="Tell us about your event, rituals to include, décor preferences, budget range..."
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-maroon px-8 py-4 font-body text-sm font-semibold uppercase tracking-wide text-cream transition-transform hover:scale-[1.02] hover:bg-gold hover:text-charcoal disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}
