import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-chili-gradient py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(242,169,0,0.25),transparent_60%)]" />
      <AnimatedSection className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-3xl font-bold text-cream sm:text-4xl">
          Bring Aachi Home
        </h2>
        <p className="mt-4 font-body text-cream/80">
          Find your nearest stockist, become a distributor, or just say hello
          — we&rsquo;d love to hear from you.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-full bg-turmeric px-10 py-4 font-body text-sm font-semibold uppercase tracking-wide text-charcoal transition-transform hover:scale-105"
        >
          Get in Touch
        </Link>
      </AnimatedSection>
    </section>
  );
}
