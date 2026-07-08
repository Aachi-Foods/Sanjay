"use client";

import { useId, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import FloralAccent from "../ui/FloralAccent";

type Errors = Partial<Record<"name" | "eventDate" | "eventType" | "message", string>>;

const EVENT_TYPES = ["Wedding", "Corporate Event", "Birthday", "Destination Event", "Other"];

export default function InvitationContactForm() {
  const formId = useId();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const eventDate = String(data.get("eventDate") ?? "").trim();
    const eventType = String(data.get("eventType") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Please share your name.";
    if (!eventDate) nextErrors.eventDate = "Please select your event date.";
    if (!eventType) nextErrors.eventType = "Please choose an event type.";
    if (!message) nextErrors.message = "Tell us a little about your vision.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // Static enquiry form for now — swap this block for a Formspree/EmailJS
    // submit handler whenever email delivery is wired up. No data leaves
    // the browser today.
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  }

  if (submitted) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-gold-soft/50 bg-ivory px-8 py-16 text-center shadow-sm sm:px-14">
        <FloralAccent className="pointer-events-none absolute -left-4 -top-4 h-28 w-28 text-rose-gold-deep/40" />
        <FloralAccent flip className="pointer-events-none absolute -bottom-4 -right-4 h-28 w-28 text-rose-gold-deep/40" />
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blush text-rose-text">
          <Check className="h-7 w-7" strokeWidth={2} aria-hidden="true" />
        </span>
        <h2 className="mt-6 font-display text-2xl text-charcoal sm:text-3xl">
          Thank You for the Invitation
        </h2>
        <p className="prose-measure mx-auto mt-3 font-sans text-sm text-charcoal-soft sm:text-base">
          We&apos;ve received your enquiry and will be in touch within 48 hours to
          start planning your celebration.
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-gold-soft/50 bg-ivory px-6 py-12 shadow-sm sm:px-12 sm:py-14">
      <FloralAccent className="pointer-events-none absolute -left-4 -top-4 h-28 w-28 text-rose-gold-deep/40 sm:h-36 sm:w-36" />
      <FloralAccent flip className="pointer-events-none absolute -bottom-4 -right-4 h-28 w-28 text-rose-gold-deep/40 sm:h-36 sm:w-36" />

      <div className="relative mx-auto max-w-md">
        <span className="block text-center font-script text-4xl text-rose-text sm:text-5xl">
          Get in Touch
        </span>
        <p className="mt-3 text-center font-sans text-sm text-charcoal-soft">
          Share a few details and we&apos;ll begin crafting your celebration.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-10 flex flex-col gap-6">
          <Field
            id={`${formId}-name`}
            name="name"
            label="Name"
            type="text"
            autoComplete="name"
            error={errors.name}
          />
          <Field
            id={`${formId}-eventDate`}
            name="eventDate"
            label="Event Date"
            type="date"
            autoComplete="off"
            error={errors.eventDate}
          />
          <div className="flex flex-col gap-2">
            <label
              htmlFor={`${formId}-eventType`}
              className="font-sans text-xs tracking-[0.2em] text-rose-text uppercase"
            >
              Event Type
            </label>
            <select
              id={`${formId}-eventType`}
              name="eventType"
              defaultValue=""
              aria-invalid={!!errors.eventType}
              aria-describedby={errors.eventType ? `${formId}-eventType-error` : undefined}
              className="min-h-11 border-b border-gold-soft bg-transparent font-sans text-base text-charcoal focus:border-rose-gold-deep focus:outline-none"
            >
              <option value="" disabled>
                Select an event type
              </option>
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.eventType && (
              <p id={`${formId}-eventType-error`} className="font-sans text-xs text-red-700">
                {errors.eventType}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor={`${formId}-message`}
              className="font-sans text-xs tracking-[0.2em] text-rose-text uppercase"
            >
              Message
            </label>
            <textarea
              id={`${formId}-message`}
              name="message"
              rows={4}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? `${formId}-message-error` : undefined}
              className="resize-none border-b border-gold-soft bg-transparent font-sans text-base text-charcoal focus:border-rose-gold-deep focus:outline-none"
              placeholder="Tell us about your dream celebration..."
            />
            {errors.message && (
              <p id={`${formId}-message-error`} className="font-sans text-xs text-red-700">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 inline-flex min-h-11 items-center justify-center rounded-full bg-rose-gold-button px-8 py-3 font-sans text-sm tracking-wide text-ivory uppercase transition-colors hover:bg-charcoal disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {submitting ? "Sending..." : "Send Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  id,
  name,
  label,
  type,
  autoComplete,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type: string;
  autoComplete: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-sans text-xs tracking-[0.2em] text-rose-text uppercase">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="min-h-11 border-b border-gold-soft bg-transparent font-sans text-base text-charcoal focus:border-rose-gold-deep focus:outline-none"
      />
      {error && (
        <p id={`${id}-error`} className="font-sans text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
