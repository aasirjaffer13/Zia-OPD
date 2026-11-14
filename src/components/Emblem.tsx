interface EmblemProps {
  size?: number;
  className?: string;
  title?: string;
}

/**
 * Clinic emblem — a simple, clean medical mark recreated in SVG:
 * forest green disc, fine gold ring, white medical cross with a gold pulse line.
 */
export function Emblem({
  size = 38,
  className = '',
  title = 'Dr. Zia’s OPD Clinic emblem',
}: EmblemProps) {
  const ring = '#C5A66A';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={className}
    >
      <circle cx="32" cy="32" r="30" fill="#174D3A" />
      <circle
        cx="32"
        cy="32"
        r="26.5"
        fill="none"
        stroke={ring}
        strokeWidth="1.4"
        opacity="0.85"
      />
      {/* Medical cross */}
      <path
        d="M28.7 13h6.6v8.2H43.5v6.6H35.3V36h-6.6V27.8H20.5v-6.6h8.2V13z"
        fill="#FFFFFF"
      />
      {/* Gold pulse accent */}
      <path
        d="M14 46.5h5.6l2.1-4.4 3.1 8.6 3.4-10.5 3 10.2 2.2-4.6H50"
        fill="none"
        stroke={ring}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
