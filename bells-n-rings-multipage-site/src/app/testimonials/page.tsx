import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import TestimonialCard from "@/components/testimonials/TestimonialCard";
import InvitationTeaser from "@/components/home/InvitationTeaser";
import { TESTIMONIALS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read what couples and clients say about planning their wedding, corporate event, birthday, or destination celebration with Bells n Rings Event Planners.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kind Words"
        title="Stories From Our Clients"
        description="The celebrations we plan are personal — here's what it felt like from the other side."
        image="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1920&q=80"
        imageAlt="Placeholder — guests celebrating at an elegant reception"
      />

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, i) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              delay={(i % 3) * 0.08}
            />
          ))}
        </div>
      </section>

      <InvitationTeaser />
    </>
  );
}
