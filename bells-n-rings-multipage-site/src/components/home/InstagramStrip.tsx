import Image from "next/image";
import { INSTAGRAM_STRIP_IMAGES } from "@/lib/content";
import { CONTACT } from "@/lib/constants";
import Reveal from "../shared/Reveal";
import { InstagramIcon } from "../ui/SocialIcons";

export default function InstagramStrip() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
      <Reveal className="mb-10 flex flex-col items-center gap-3 text-center">
        <InstagramIcon className="h-6 w-6 text-rose-text" />
        <h2 className="font-display text-3xl text-charcoal sm:text-4xl">
          Follow the Celebration
        </h2>
        <a
          href={CONTACT.instagram}
          target="_blank"
          rel="noreferrer noopener"
          className="font-sans text-sm tracking-wide text-rose-text uppercase hover:underline"
        >
          {CONTACT.instagramHandle}
        </a>
      </Reveal>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
        {INSTAGRAM_STRIP_IMAGES.map((src) => (
          <a
            key={src}
            href={CONTACT.instagram}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="View on Instagram"
            className="group relative aspect-square overflow-hidden rounded-lg"
          >
            <Image
              src={src}
              alt="Placeholder — BnR Instagram gallery highlight"
              fill
              loading="lazy"
              sizes="(min-width: 640px) 16vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/20" />
          </a>
        ))}
      </div>
    </section>
  );
}
