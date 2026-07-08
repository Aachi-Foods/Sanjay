import Image from "next/image";
import { Check } from "lucide-react";
import type { Service } from "@/lib/content";
import Reveal from "../shared/Reveal";
import Button from "../ui/Button";

export default function ServiceDetail({
  service,
  reversed = false,
}: {
  service: Service;
  reversed?: boolean;
}) {
  return (
    <section
      id={service.slug}
      className="mx-auto grid max-w-7xl scroll-mt-24 gap-12 px-6 py-20 sm:px-8 md:grid-cols-2 md:items-center md:gap-16"
    >
      <Reveal
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl ${
          reversed ? "md:order-2" : ""
        }`}
      >
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          loading="lazy"
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-cover"
        />
      </Reveal>

      <Reveal delay={0.1} className={reversed ? "md:order-1" : ""}>
        <span className="font-script text-3xl text-rose-text">
          {service.title}
        </span>
        <span className="mt-3 mb-4 block h-px w-16 hairline-gold" aria-hidden="true" />
        <p className="prose-measure font-sans text-base text-charcoal-soft">
          {service.longDescription}
        </p>
        <ul className="mt-6 flex flex-col gap-3">
          {service.highlights.map((item) => (
            <li key={item} className="flex items-start gap-3 font-sans text-sm text-charcoal">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-rose-text" strokeWidth={2} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button href="/contact">Enquire About {service.title}</Button>
        </div>
      </Reveal>
    </section>
  );
}
