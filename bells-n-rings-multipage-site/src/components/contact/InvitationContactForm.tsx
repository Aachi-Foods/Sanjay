"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { motion, useReducedMotion } from "framer-motion";
import { AlertCircle, Calendar, Check, Mail, MapPin, MessageSquare, PartyPopper, Phone, User } from "lucide-react";
import FloralAccent from "../ui/FloralAccent";
import { AnimatedInput, AnimatedSelect, AnimatedTextarea } from "../ui/AnimatedField";
import { CONTACT } from "@/lib/constants";
import { identifyToHubSpot } from "@/lib/hubspot";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  city: string;
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
  const reduceMotion = useReducedMotion();

  async function onSubmit(data: FormValues) {
    setStatus("idle");
    // Pushed to HubSpot unconditionally, before the EmailJS attempt below —
    // capturing the lead shouldn't depend on the internal email notification
    // succeeding; those are two separate concerns.
    const [firstname, ...rest] = data.name.trim().split(/\s+/);
    identifyToHubSpot({
      email: data.email,
      firstname,
      lastname: rest.join(" ") || undefined,
      phone: data.phone,
      city: data.city,
      event_date: data.eventDate,
      event_type: data.eventType,
      message: data.message,
    });
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
          city: data.city,
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
      <div className="relative overflow-hidden rounded-3xl border border-gold-soft/50 bg-ivory px-8 py-16 text-center shadow-gold-sm sm:px-14">
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
    // The card itself stays flat/unrotated — rotating a tall, near-full-width
    // form (any axis, even a small rotateZ) either bleeds past the viewport
    // on mobile or, via rotateX/rotateY+perspective, makes some mobile GPUs
    // rasterize body text at an angle and blur it. The depth cue instead
    // comes from the static peek-behind card, shadow, and drifting corners.
    <div className="relative">
      <div
        aria-hidden="true"
        style={{ transform: "rotateZ(-3deg) translate(-8px, 10px)" }}
        className="pointer-events-none absolute inset-3 rounded-3xl border border-gold-soft/30 bg-blush-soft/80"
      />
      <div className="relative overflow-hidden rounded-3xl border border-gold-soft/50 bg-ivory px-6 py-12 shadow-[0_30px_70px_-25px_rgba(26,46,26,0.4)] sm:px-12 sm:py-14">
        {/* Decorative only (pointer-events-none) — safe to keep drifting continuously without disturbing the interactive form */}
        <motion.div
          animate={reduceMotion ? undefined : { x: [0, 6, 0], y: [0, -6, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -left-4 -top-4"
        >
          <FloralAccent className="h-28 w-28 text-rose-gold-deep/40 sm:h-36 sm:w-36" />
        </motion.div>
        <motion.div
          animate={reduceMotion ? undefined : { x: [0, -6, 0], y: [0, 6, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -bottom-4 -right-4"
        >
          <FloralAccent flip className="h-28 w-28 text-rose-gold-deep/40 sm:h-36 sm:w-36" />
        </motion.div>

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
          <AnimatedInput
            label="Name"
            type="text"
            autoComplete="name"
            icon={<User className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />}
            error={errors.name}
            {...register("name", { required: "Please share your name." })}
          />
          <AnimatedInput
            label="Email"
            type="email"
            autoComplete="email"
            icon={<Mail className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />}
            error={errors.email}
            {...register("email", {
              required: "Please share your email.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address.",
              },
            })}
          />
          <AnimatedInput
            label="Phone"
            type="tel"
            autoComplete="tel"
            icon={<Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />}
            error={errors.phone}
            {...register("phone", { required: "Please share your phone number." })}
          />
          <AnimatedInput
            label="City"
            type="text"
            autoComplete="address-level2"
            icon={<MapPin className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />}
            error={errors.city}
            {...register("city", { required: "Please share your city." })}
          />
          <AnimatedInput
            label="Event Date"
            type="date"
            autoComplete="off"
            icon={<Calendar className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />}
            error={errors.eventDate}
            {...register("eventDate", { required: "Please select your event date." })}
          />

          <AnimatedSelect
            label="Event Type"
            defaultValue=""
            icon={<PartyPopper className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />}
            error={errors.eventType}
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
          </AnimatedSelect>

          <AnimatedTextarea
            label="Message"
            rows={4}
            icon={<MessageSquare className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />}
            error={errors.message}
            {...register("message", { required: "Tell us a little about your vision." })}
          />

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
    </div>
  );
}
