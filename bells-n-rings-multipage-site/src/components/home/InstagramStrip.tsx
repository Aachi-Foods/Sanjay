"use client";

import { useEffect, useRef } from "react";
import { CONTACT } from "@/lib/constants";
import Reveal from "../shared/Reveal";
import { InstagramIcon } from "../ui/SocialIcons";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

// Real reels from @bnreventplanner, embedded via Instagram's own oEmbed
// widget rather than pulled through the API — this is a static export with
// no backend to hold/refresh the access token the Graph API needs, and
// re-fetching a live feed client-side would need one anyway. Swap/extend
// this list whenever there are newer reels worth featuring.
const REEL_URLS = [
  "https://www.instagram.com/reel/DdeOqPFgRiE/",
  "https://www.instagram.com/reel/DdBzFCjDWfi/",
  "https://www.instagram.com/reel/Dc0gHXzlJ0b/",
  "https://www.instagram.com/reel/Da2mOEtD9hr/",
  "https://www.instagram.com/reel/DaDdNxAjHMN/",
  "https://www.instagram.com/reel/DZWMYvzlP5T/",
  "https://www.instagram.com/reel/DZSRyX8kRyj/",
  "https://www.instagram.com/reel/DYojuX8DLYG/",
];

const EMBED_SCRIPT_SRC = "https://www.instagram.com/embed.js";

export default function InstagramStrip() {
  // Each embed starts as a plain <blockquote> and Instagram's own script
  // rewrites it into the actual rendered card (iframe, thumbnail, caption).
  // That rewrite only happens once per script load, so a mount after the
  // very first one (e.g. returning to this page) has to explicitly ask the
  // already-loaded script to process the new blockquotes — it won't do so
  // on its own a second time.
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${EMBED_SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => window.instgrm?.Embeds.process());
      return;
    }
    const script = document.createElement("script");
    script.src = EMBED_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

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

      {/* Real Instagram embeds resize themselves asynchronously once their
          iframe loads, which fights a continuously-transformed marquee (the
          old version of this section auto-scrolled static placeholder
          photos) — a native horizontal scroll snap sidesteps that instead
          of fighting it. */}
      <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
        <div ref={containerRef} className="flex w-max snap-x snap-mandatory gap-4 pb-2">
          {REEL_URLS.map((url) => (
            <div key={url} className="shrink-0 snap-start">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{
                  background: "#FFF",
                  border: 0,
                  borderRadius: "12px",
                  margin: 0,
                  width: 328,
                  minWidth: 328,
                }}
              >
                {/* Instagram's script replaces this once it loads; it's the
                    fallback for a slow connection or a blocked script. */}
                <a href={url} target="_blank" rel="noreferrer noopener">
                  View this reel on Instagram
                </a>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
