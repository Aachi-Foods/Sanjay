import { Quote } from "lucide-react";
import type { Testimonial } from "@/lib/content";
import Reveal from "../shared/Reveal";

export default function TestimonialCard({
  testimonial,
  delay = 0,
}: {
  testimonial: Testimonial;
  delay?: number;
}) {
  return (
    <Reveal
      delay={delay}
      className="flex h-full flex-col gap-4 rounded-2xl border border-gold-soft/40 bg-ivory p-8 shadow-sm"
    >
      <Quote className="h-7 w-7 text-rose-gold" strokeWidth={1.25} aria-hidden="true" />
      <p className="flex-1 font-display text-lg leading-relaxed text-charcoal italic">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <footer className="font-sans text-sm text-charcoal-soft">
        <span className="font-medium text-rose-text">{testimonial.name}</span>
        {" — "}
        {testimonial.eventType}, {testimonial.location}
      </footer>
    </Reveal>
  );
}
