/**
 * Hand-drawn line-art leaf sprig used to frame invitation-style sections
 * (Wedding Chakra reference). Pure stroke, no fill, so it stays subtle
 * against the blush/ivory palette.
 */
export default function FloralAccent({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      aria-hidden="true"
      className={`${flip ? "-scale-x-100" : ""} ${className}`}
    >
      <path
        d="M10 190C40 150 30 90 60 60C80 40 110 30 150 20"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {[
        { x: 45, y: 150, r: -35 },
        { x: 58, y: 118, r: -20 },
        { x: 72, y: 90, r: -10 },
        { x: 95, y: 62, r: 10 },
        { x: 122, y: 40, r: 25 },
      ].map((leaf, i) => (
        <g key={i} transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r})`}>
          <path
            d="M0 0C6 -8 6 -18 0 -26C-6 -18 -6 -8 0 0Z"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path d="M0 -2V-24" stroke="currentColor" strokeWidth="0.75" />
        </g>
      ))}
      <circle cx="150" cy="20" r="3" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
