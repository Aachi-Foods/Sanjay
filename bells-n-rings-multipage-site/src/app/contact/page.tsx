import type { Metadata } from "next";
import GoldDivider from "@/components/ui/GoldDivider";
import FloralAccent from "@/components/ui/FloralAccent";
import InvitationContactForm from "@/components/contact/InvitationContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import Reveal from "@/components/shared/Reveal";
import StoryStage from "@/components/shared/StoryStage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Enquire with BNR Event Planners about your wedding, traditional ceremony, reception, or corporate event.",
};

export default function ContactPage() {
  return (
    <>
      <StoryStage depth={20}>
        <section className="relative overflow-hidden bg-blush pt-36 pb-16 sm:pt-44">
          <FloralAccent className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 text-rose-gold-deep/40 sm:h-64 sm:w-64" />
          <FloralAccent
            flip
            className="pointer-events-none absolute -right-10 top-1/2 h-48 w-48 -translate-y-1/2 text-rose-gold-deep/30 sm:h-64 sm:w-64"
          />
          <Reveal className="relative mx-auto flex max-w-2xl flex-col items-center gap-4 px-6 text-center">
            <span className="font-script text-4xl text-rose-text sm:text-5xl">
              You&rsquo;re Invited
            </span>
            <h1 className="font-display text-3xl text-charcoal sm:text-4xl">
              Let&rsquo;s Start Planning Your Celebration
            </h1>
            <p className="prose-measure font-sans text-base text-charcoal-soft sm:text-lg">
              Share your event date and vision below, or reach us directly —
              we&rsquo;d love to hear from you.
            </p>
            <GoldDivider />
          </Reveal>
        </section>
      </StoryStage>

      <StoryStage depth={34}>
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <Reveal className="min-w-0">
            <InvitationContactForm />
          </Reveal>
          <Reveal delay={0.1} className="min-w-0">
            <ContactInfo />
          </Reveal>
        </section>
      </StoryStage>
    </>
  );
}
