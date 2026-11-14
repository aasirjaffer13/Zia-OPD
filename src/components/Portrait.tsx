import { useState } from 'react';
import { clinic } from '../data/clinic';
import { Emblem } from './Emblem';

interface PortraitProps {
  src: string;
  alt: string;
  className?: string;
  /** object-position utility for the image (defaults to top center) */
  position?: string;
}

/**
 * Doctor's photograph with a graceful fallback: if the image is missing
 * or fails to load, an elegant emblem panel is shown instead of a broken image.
 */
export function Portrait({ src, alt, className = '', position = 'object-top' }: PortraitProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-4 bg-navy px-6 py-14 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Emblem size={64} />
        <div>
          <p className="font-serif text-xl font-semibold text-white">{clinic.doctor.name}</p>
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-gold">
            {clinic.doctor.qualificationsLine}
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover ${position} ${className}`}
    />
  );
}
