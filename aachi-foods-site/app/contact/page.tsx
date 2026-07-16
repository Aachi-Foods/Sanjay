import type { Metadata } from "next";
import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import AnimatedSection from "@/components/AnimatedSection";
import { contactInfo } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Us | Aachi Foods",
  description:
    "Get in touch with Aachi Foods — find a stockist, become a distributor, or reach our team directly.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-chili-gradient pb-16 pt-40">
        <AnimatedSection className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-turmeric">
            Get in Touch
          </p>
          <h1 className="font-display text-4xl font-bold text-cream sm:text-5xl">
            We&rsquo;d Love to Hear From You
          </h1>
          <p className="mt-6 font-body text-cream/80">
            Questions about our products, stockist enquiries, or distributor
            partnerships — reach us directly below.
          </p>
        </AnimatedSection>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:px-12">
          <AnimatedSection variant="slideInLeft">
            <div className="rounded-2xl bg-charcoal p-8 text-cream sm:p-10">
              <h2 className="font-display text-2xl font-bold">Reach Us Directly</h2>
              <ul className="mt-8 space-y-6 font-body text-sm">
                <li className="flex items-start gap-3">
                  <FiMapPin className="mt-0.5 shrink-0 text-turmeric" />
                  <span>{contactInfo.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <FiPhone className="mt-0.5 shrink-0 text-turmeric" />
                  <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="hover:text-turmeric">
                    {contactInfo.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <FiMail className="mt-0.5 shrink-0 text-turmeric" />
                  <a href={`mailto:${contactInfo.email}`} className="hover:text-turmeric">
                    {contactInfo.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <FiClock className="mt-0.5 shrink-0 text-turmeric" />
                  <span>{contactInfo.hours}</span>
                </li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection variant="slideInRight">
            <div className="overflow-hidden rounded-2xl shadow-lg shadow-charcoal/5">
              <iframe
                title="Aachi Foods location map"
                src="https://www.google.com/maps?q=Poonamallee+High+Road,Chennai,Tamil+Nadu&output=embed"
                width="100%"
                height="420"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
