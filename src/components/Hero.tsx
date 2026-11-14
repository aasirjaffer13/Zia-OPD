import { Clock, MapPin, Phone } from 'lucide-react';
import { clinic } from '../data/clinic';
import { Portrait } from './Portrait';
import { Reveal } from './Reveal';

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-ivory pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Subtle decorative arcs */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-40 hidden h-[560px] w-[560px] text-gold/30 lg:block"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="198" stroke="currentColor" strokeWidth="1" />
        <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="1" />
        <circle cx="200" cy="200" r="102" stroke="currentColor" strokeWidth="1" />
      </svg>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-line to-transparent"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* ---------------------------------------------------------- Copy */}
        <div>
          <Reveal>
            <p className="eyebrow">{clinic.tagline}</p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-5 text-[2.3rem] leading-[1.09] font-semibold tracking-tight text-navy sm:text-5xl lg:text-[3.35rem]">
              Trusted Medical Care,{' '}
              <em className="font-serif text-forest italic">Close to Home.</em>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-ink">
              {clinic.hero.supporting}
            </p>
          </Reveal>

          <Reveal delay={220}>
            <ul
              className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.82rem] font-semibold tracking-wide text-navy"
              aria-label="Qualifications"
            >
              {clinic.doctor.qualifications.map((qual, i) => (
                <li key={qual} className="flex items-center gap-3">
                  {i > 0 && (
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />
                  )}
                  <span className="rounded-full border border-line bg-white px-3.5 py-1.5">
                    {qual}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href={clinic.phone.tel} className="btn btn-primary">
                <Phone size={17} strokeWidth={2.2} aria-hidden="true" />
                Call for Appointment
              </a>
              <a href="#timings" className="btn btn-outline">
                <Clock size={17} strokeWidth={2} aria-hidden="true" />
                Explore OPD Timings
              </a>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <p className="mt-8 flex items-center gap-2.5 text-[0.925rem] font-medium text-ink">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-forest"
              >
                <MapPin size={15} strokeWidth={2.2} />
              </span>
              {clinic.hero.locationLabel}
              <span aria-hidden="true" className="mx-1 hidden h-4 w-px bg-line sm:block" />
              <a
                href={clinic.phone.tel}
                className="hidden text-navy underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-forest sm:inline"
              >
                {clinic.phone.display}
              </a>
            </p>
          </Reveal>
        </div>

        {/* --------------------------------------------------------- Photo */}
        <Reveal delay={200} className="relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Gold offset frame */}
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -left-3 h-full w-full rounded-sm border border-gold/70"
            />
            <div className="relative overflow-hidden bg-navy shadow-[0_30px_60px_-40px_rgba(20,43,69,0.55)]">
              <Portrait
                src="images/doctor.jpg"
                alt={`Portrait of ${clinic.doctor.name} at ${clinic.name}`}
                className="aspect-[4/5] w-full"
              />
            </div>

            {/* Name plate */}
            <div className="relative -mt-6 ml-auto mr-4 w-fit max-w-[92%] border border-line bg-white px-5 py-3.5 shadow-[0_18px_40px_-30px_rgba(20,43,69,0.55)] sm:mr-6">
              <p className="font-serif text-lg leading-tight font-semibold text-navy">
                {clinic.doctor.name}
              </p>
              <p className="mt-1 text-[0.72rem] font-semibold tracking-[0.14em] text-forest uppercase">
                {clinic.doctor.qualificationsLine}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
