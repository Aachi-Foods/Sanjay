import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "../ui/SocialIcons";
import ContactMap from "./ContactMap";

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-5">
        <InfoRow icon={Phone}>
          <a href={CONTACT.phoneHref} className="hover:text-rose-text">
            {CONTACT.phone}
          </a>
        </InfoRow>
        <InfoRow icon={MessageCircle}>
          <a
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-rose-text"
          >
            Chat on WhatsApp
          </a>
        </InfoRow>
        <InfoRow icon={Mail}>
          <a href={`mailto:${CONTACT.email}`} className="hover:text-rose-text">
            {CONTACT.email}
          </a>
          {CONTACT.emailIsPlaceholder && (
            <span className="ml-2 text-xs text-charcoal-soft/70">(placeholder)</span>
          )}
        </InfoRow>
        <InfoRow icon={MapPin}>
          {CONTACT.address}
          {CONTACT.addressIsPlaceholder && (
            <span className="ml-2 text-xs text-charcoal-soft/70">(placeholder)</span>
          )}
        </InfoRow>
      </div>

      <div className="flex items-center gap-3">
        <a
          href={CONTACT.instagram}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="BnR on Instagram"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-soft/60 text-charcoal transition-colors hover:bg-blush-soft hover:text-rose-text"
        >
          <InstagramIcon className="h-5 w-5" />
        </a>
        <a
          href={CONTACT.facebook}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="BnR on Facebook"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-soft/60 text-charcoal transition-colors hover:bg-blush-soft hover:text-rose-text"
        >
          <FacebookIcon className="h-5 w-5" />
        </a>
        <a
          href={CONTACT.youtube}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="BnR on YouTube"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-soft/60 text-charcoal transition-colors hover:bg-blush-soft hover:text-rose-text"
        >
          <YoutubeIcon className="h-5 w-5" />
        </a>
      </div>

      <ContactMap />
    </div>
  );
}

function InfoRow({
  icon: Icon,
  children,
}: {
  icon: typeof Phone;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 font-sans text-base text-charcoal-soft">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold-soft/60 text-rose-text">
        <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
      </span>
      {children}
    </div>
  );
}
