import { useState } from 'react';
import { Check, Copy, ExternalLink, MapPin, Navigation } from 'lucide-react';
import { clinic } from '../data/clinic';
import { copyText } from '../utils/clipboard';
import { Reveal } from './Reveal';

const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  clinic.address.singleLine,
)}`;

const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  clinic.address.singleLine,
)}`;

export function Location() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const ok = await copyText(clinic.address.full);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    }
  }

  return (
    <section id="location" className="bg-ivory py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Location</p>
          <h2 className="mt-5 text-[2rem] leading-[1.12] font-semibold tracking-tight text-navy sm:text-[2.5rem]">
            Find Our Clinic
          </h2>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-ink">
            Open the address in Google Maps for the live location, or get turn-by-turn directions
            from wherever you are.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* ------------------------------------------------- Address card */}
          <Reveal>
            <div className="flex h-full flex-col border border-line bg-white p-6 sm:p-8">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-md bg-forest/10 text-forest"
              >
                <MapPin size={23} strokeWidth={1.9} />
              </span>

              <h3 className="mt-5 font-serif text-xl font-semibold text-navy">
                {clinic.name}
              </h3>

              <address className="mt-3 space-y-1 text-[1rem] leading-relaxed text-ink not-italic">
                {clinic.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>

              <p className="mt-4 text-[0.9rem] text-ink/70">
                Looking for timings instead?{' '}
                <a
                  href="#timings"
                  className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-forest"
                >
                  See the weekly OPD schedule
                </a>
                .
              </p>

              <div className="mt-6 flex flex-wrap gap-3 pt-1">
                <a
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <ExternalLink size={17} strokeWidth={2} aria-hidden="true" />
                  Open in Google Maps
                </a>
                <a
                  href={mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <Navigation size={17} strokeWidth={2} aria-hidden="true" />
                  Get directions
                </a>
              </div>

              <div className="mt-auto pt-5">
                <button type="button" onClick={handleCopy} className="btn btn-outline">
                  {copied ? (
                    <Check size={17} strokeWidth={2.4} aria-hidden="true" />
                  ) : (
                    <Copy size={17} strokeWidth={2} aria-hidden="true" />
                  )}
                  {copied ? 'Address copied' : 'Copy address'}
                </button>
                <span aria-live="polite" className="sr-only">
                  {copied ? 'Address copied to clipboard' : ''}
                </span>
              </div>
            </div>
          </Reveal>

          {/* ------------------------------------------------ Decorative panel */}
          <Reveal delay={90}>
            <div className="grid-pattern relative flex h-full min-h-[320px] items-center justify-center overflow-hidden border border-line bg-white p-8 text-center">
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 text-gold/25"
                viewBox="0 0 400 400"
                fill="none"
              >
                <circle cx="200" cy="200" r="198" stroke="currentColor" strokeWidth="1" />
                <circle cx="200" cy="200" r="146" stroke="currentColor" strokeWidth="1" />
              </svg>

              <div className="relative">
                <span
                  aria-hidden="true"
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy text-gold"
                >
                  <MapPin size={30} strokeWidth={2} />
                </span>
                <p className="mt-5 font-serif text-2xl font-semibold text-navy">
                  {clinic.address.street}
                </p>
                <p className="mt-1 text-lg text-ink">
                  {clinic.address.city}, {clinic.address.region}
                </p>
                <p className="mt-0.5 text-[0.9rem] text-ink/70">{clinic.address.country}</p>
                <p className="mx-auto mt-5 max-w-xs text-[0.85rem] leading-relaxed text-ink/70">
                  Tap <span className="font-semibold text-navy">Open in Google Maps</span> to view
                  the exact location on the live map.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
