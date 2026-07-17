export default function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${className}`}
      role="presentation"
      aria-hidden="true"
    >
      <span className="h-px w-16 hairline-gold" />
      <span className="h-1.5 w-1.5 rotate-45 border border-gold" />
      <span className="h-px w-16 hairline-gold" />
    </div>
  );
}
