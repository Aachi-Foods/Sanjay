"use client";

import { useState } from "react";
import { useForm, type FieldError, type UseFormRegisterReturn } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { AlertCircle, Check } from "lucide-react";
import FloralAccent from "../ui/FloralAccent";
import { CONTACT } from "@/lib/constants";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  message: string;
};

const EVENT_TYPES = [
  "Wedding",
  "Reception",
  "Traditional Ceremony",
  "Corporate Event",
  "Other",
];

// Set these in .env.local (see README.md) to enable live email delivery via
// EmailJS. Until then, submissions surface a friendly error asking the
// visitor to reach out directly — nothing silently fails.
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export default function InvitationContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function onSubmit(data: FormValues) {
    setStatus("idle");
    try {
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        throw new Error("EmailJS environment variables are not configured.");
      }
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          event_date: data.eventDate,
          event_type: data.eventType,
          message: data.message,
        },
        { publicKey: PUBLIC_KEY },
      );
      setStatus("success");
      reset();
    } catch (err) {
      console.error("Contact form submission failed:", err);
      setStatus("error");
    }
  }

  if (status === "success") {
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

        {status === "error" && (
          <div
            role="alert"
            className="mt-6 flex items-start gap-3 rounded-xl border border-red-700/30 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            <span>
              We couldn&apos;t send your enquiry right now. Please try again, or
              reach us directly at{" "}
              <a href={CONTACT.phoneHref} className="underline">
                {CONTACT.phone}
              </a>{" "}
              or{" "}
              <a href={`mailto:${CONTACT.email}`} className="underline">
                {CONTACT.email}
              </a>
              .
            </span>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-10 flex flex-col gap-6"
        >
          <Field
            label="Name"
            type="text"
            autoComplete="name"
            registration={register("name", { required: "Please share your name." })}
            error={errors.name}
          />
          <Field
            label="Email"
            type="email"
            autoComplete="email"
            registration={register("email", {
              required: "Please share your email.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address.",
              },
            })}
            error={errors.email}
          />
          <Field
            label="Phone"
            type="tel"
            autoComplete="tel"
            registration={register("phone", {
              required: "Please share your phone number.",
            })}
            error={errors.phone}
          />
          <Field
            label="Event Date"
            type="date"
            autoComplete="off"
            registration={register("eventDate", {
              required: "Please select your event date.",
            })}
            error={errors.eventDate}
          />

          <div className="flex flex-col gap-2">
            <label
              htmlFor="eventType"
              className="font-sans text-xs tracking-[0.2em] text-rose-text uppercase"
            >
              Event Type
            </label>
            <select
              id="eventType"
              defaultValue=""
              aria-invalid={!!errors.eventType}
              aria-describedby={errors.eventType ? "eventType-error" : undefined}
              className="min-h-11 border-b border-gold-soft bg-transparent font-sans text-base text-charcoal focus:border-rose-gold-deep focus:outline-none"
              {...register("eventType", { required: "Please choose an event type." })}
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
              <p id="eventType-error" className="font-sans text-xs text-red-700">
                {errors.eventType.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="font-sans text-xs tracking-[0.2em] text-rose-text uppercase"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className="resize-none border-b border-gold-soft bg-transparent font-sans text-base text-charcoal focus:border-rose-gold-deep focus:outline-none"
              placeholder="Tell us about your dream celebration..."
              {...register("message", { required: "Tell us a little about your vision." })}
            />
            {errors.message && (
              <p id="message-error" className="font-sans text-xs text-red-700">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 inline-flex min-h-11 items-center justify-center rounded-full bg-rose-gold-button px-8 py-3 font-sans text-sm tracking-wide text-ivory uppercase transition-colors hover:bg-charcoal disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? "Sending..." : "Send Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  autoComplete,
  registration,
  error,
}: {
  label: string;
  type: string;
  autoComplete: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
}) {
  const id = registration.name;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-sans text-xs tracking-[0.2em] text-rose-text uppercase">
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="min-h-11 border-b border-gold-soft bg-transparent font-sans text-base text-charcoal focus:border-rose-gold-deep focus:outline-none"
        {...registration}
      />
      {error && (
        <p id={`${id}-error`} className="font-sans text-xs text-red-700">
          {error.message}
        </p>
      )}
    </div>
  );
}
