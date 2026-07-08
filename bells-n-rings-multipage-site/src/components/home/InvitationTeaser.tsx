import Reveal from "../shared/Reveal";
import Button from "../ui/Button";
import GoldDivider from "../ui/GoldDivider";
import FloralAccent from "../ui/FloralAccent";

export default function InvitationTeaser() {
  return (
    <section className="relative overflow-hidden bg-blush py-24">
      <FloralAccent className="pointer-events-none absolute -left-6 -top-6 h-40 w-40 text-rose-gold-deep/50 sm:h-56 sm:w-56" />
      <FloralAccent
        flip
        className="pointer-events-none absolute -bottom-6 -right-6 h-40 w-40 text-rose-gold-deep/50 sm:h-56 sm:w-56"
      />

      <Reveal className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 text-center">
        <span className="font-script text-4xl text-rose-text sm:text-5xl">
          You&rsquo;re Invited
        </span>
        <h2 className="font-display text-3xl text-charcoal sm:text-4xl">
          Let&rsquo;s Start Planning Something Beautiful
        </h2>
        <p className="prose-measure font-sans text-base text-charcoal-soft sm:text-lg">
          Share your event date and vision with us, and we&rsquo;ll be in
          touch to begin crafting a celebration that feels entirely yours.
        </p>
        <GoldDivider />
        <Button href="/contact">Send an Enquiry</Button>
      </Reveal>
    </section>
  );
}
