import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-maroon-gradient py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,168,76,0.25),transparent_60%)]" />
      <AnimatedSection className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-3xl font-bold text-cream sm:text-4xl">
          Let&rsquo;s Plan Your Next Unforgettable Celebration
        </h2>
        <p className="mt-4 font-body text-cream/80">
          Tell us your date, your city, and your vision — our team will handle the rest.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-full bg-gold px-10 py-4 font-body text-sm font-semibold uppercase tracking-wide text-charcoal transition-transform hover:scale-105"
        >
          Get in Touch
        </Link>
      </AnimatedSection>
    </section>
  );
}
