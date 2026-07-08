import GoldDivider from "./GoldDivider";

type Align = "center" | "left";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dividerAbove = false,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: Align;
  dividerAbove?: boolean;
  className?: string;
}) {
  const alignClasses = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-4 ${alignClasses} ${className}`}>
      {dividerAbove && <GoldDivider />}
      {eyebrow && (
        <span className="font-script text-2xl text-rose-text sm:text-3xl">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl leading-tight text-charcoal sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={`prose-measure font-sans text-base text-charcoal-soft sm:text-lg ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
