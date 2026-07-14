import Image from "next/image";

// Shared interior-page banner used by About, Services, and Gallery so
// every page opens with the same rhythm.
export default function PageHeader({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="relative flex h-[46vh] min-h-[320px] w-full items-center justify-center overflow-hidden">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/60"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 text-center">
        <span className="font-script text-3xl text-blush sm:text-4xl">
          {eyebrow}
        </span>
        <h1 className="font-display text-4xl text-ivory sm:text-5xl">{title}</h1>
        {description && (
          <p className="prose-measure font-sans text-base text-blush-soft sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
