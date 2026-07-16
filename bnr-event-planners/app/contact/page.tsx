import type { Metadata } from "next";
import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import AnimatedSection from "@/components/AnimatedSection";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | BNR Event Planners",
  description:
    "Get in touch with BNR Event Planners to start planning your wedding, ceremony, or corporate event across Chennai and South India.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-maroon-gradient pb-16 pt-40">
        <AnimatedSection className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-gold">
            Get in Touch
          </p>
          <h1 className="font-display text-4xl font-bold text-cream sm:text-5xl">
            Let&rsquo;s Start Planning
          </h1>
          <p className="mt-6 font-body text-cream/80">
            Share a few details about your event and our team will reach out within
            24 hours with next steps.
          </p>
        </AnimatedSection>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-5 lg:px-12">
          <AnimatedSection variant="slideInLeft" className="lg:col-span-3">
            <div className="rounded-2xl bg-white p-8 shadow-lg shadow-charcoal/5 sm:p-10">
              <h2 className="font-display text-2xl font-bold text-charcoal">
                Tell Us About Your Event
              </h2>
              <p className="mt-2 font-body text-sm text-charcoal/60">
                Fields marked are required — the more detail you share, the faster
                we can put together a proposal.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection variant="slideInRight" className="lg:col-span-2">
            <div className="space-y-6">
              <div className="rounded-2xl bg-charcoal p-8 text-cream">
                <h3 className="font-display text-xl font-bold">Reach Us Directly</h3>
                <ul className="mt-6 space-y-5 font-body text-sm">
                  <li className="flex items-start gap-3">
                    <FiMapPin className="mt-0.5 shrink-0 text-gold" />
                    <span>No. 24, Kutchery Road, Mylapore, Chennai, Tamil Nadu 600004</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FiPhone className="mt-0.5 shrink-0 text-gold" />
                    <a href="tel:+919876543210" className="hover:text-gold">
                      +91 98765 43210
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <FiMail className="mt-0.5 shrink-0 text-gold" />
                    <a href="mailto:hello@bnreventplanners.com" className="hover:text-gold">
                      hello@bnreventplanners.com
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <FiClock className="mt-0.5 shrink-0 text-gold" />
                    <span>Mon &ndash; Sat: 9:00 AM &ndash; 7:00 PM</span>
                  </li>
                </ul>
              </div>

              <div className="overflow-hidden rounded-2xl shadow-lg shadow-charcoal/5">
                <iframe
                  title="BNR Event Planners location map"
                  src="https://www.google.com/maps?q=Mylapore,Chennai,Tamil+Nadu&output=embed"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
