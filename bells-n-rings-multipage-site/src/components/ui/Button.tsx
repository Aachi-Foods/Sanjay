import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "ghost";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonProps = ButtonAsLink | ButtonAsButton;

const VARIANT_STYLES: Record<Variant, string> = {
  primary:
    "bg-rose-gold-button text-ivory hover:bg-charcoal focus-visible:outline-charcoal",
  outline:
    "border border-rose-gold-deep text-rose-text hover:bg-blush-soft focus-visible:outline-rose-gold-deep",
  ghost:
    "text-charcoal hover:text-rose-text focus-visible:outline-rose-gold-deep",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 min-h-11 font-sans text-sm tracking-wide uppercase transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer";

export default function Button({
  variant = "primary",
  className = "",
  children,
  href,
  ...rest
}: ButtonProps) {
  const classes = `${BASE} ${VARIANT_STYLES[variant]} ${className}`;

  if (href) {
    const { target, rel } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
