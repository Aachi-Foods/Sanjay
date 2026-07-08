import Image from "next/image";
import Link from "next/link";

export default function Card({
  image,
  imageAlt,
  eyebrow,
  title,
  description,
  href,
  className = "",
}: {
  image: string;
  imageAlt: string;
  eyebrow?: string;
  title: string;
  description: string;
  href?: string;
  className?: string;
}) {
  const content = (
    <>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-2xl bg-blush">
        <Image
          src={image}
          alt={imageAlt}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-2 p-6">
        {eyebrow && (
          <span className="font-sans text-xs tracking-[0.2em] text-rose-text uppercase">
            {eyebrow}
          </span>
        )}
        <h3 className="font-display text-2xl text-charcoal">{title}</h3>
        <p className="font-sans text-sm text-charcoal-soft">{description}</p>
      </div>
    </>
  );

  const classes = `group flex flex-col rounded-2xl border border-gold-soft/40 bg-ivory shadow-sm transition-shadow duration-300 hover:shadow-lg ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return <div className={classes}>{content}</div>;
}
