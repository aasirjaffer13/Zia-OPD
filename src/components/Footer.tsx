import { MessageCircle, Phone } from 'lucide-react';
import {
  clinic,
  defaultWhatsAppLink,
  navLinks,
  services,
  weeklySchedule,
  type DaySession,
} from '../data/clinic';
import { Emblem } from './Emblem';

/** Group consecutive days that share the same sessions. */
const timingGroups: { days: string[]; signature: string; sessions: DaySession[] }[] = [];
for (const day of weeklySchedule) {
  const signature = day.sessions.map((s) => `${s.period}:${s.time}`).join('|');
  const last = timingGroups[timingGroups.length - 1];
  if (last && last.signature === signature) {
    last.days.push(day.shortDay);
  } else {
    timingGroups.push({ days: [day.shortDay], signature, sessions: day.sessions });
  }
}

const year = new Date().getFullYear();

export function Footer() {

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <Emblem size={40} title={`${clinic.name} emblem`} />
            <span className="flex flex-col leading-none">
              <span className="font-serif text-lg font-semibold text-white">
                Dr. Zia&rsquo;s OPD Clinic
              </span>
              <span className="mt-1.5 text-[0.66rem] font-medium tracking-[0.16em] text-white/60 uppercase">
                Kupwara &middot; J&amp;K
              </span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-[0.95rem] font-semibold leading-relaxed text-white">
            {clinic.doctor.name}
          </p>
          <p className="mt-1.5 text-[0.7rem] font-bold tracking-[0.18em] text-gold uppercase">
            {clinic.doctor.designation}
          </p>
          <p className="mt-1 max-w-xs text-[0.85rem] leading-relaxed text-white/65">
            {clinic.doctor.qualificationsLine}
          </p>
          <address className="mt-3 max-w-xs text-[0.92rem] leading-relaxed text-white/70 not-italic">
            {clinic.address.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <div className="mt-5 flex flex-col gap-2.5 text-[0.95rem]">
            <a
              href={clinic.phone.tel}
              className="flex items-center gap-2.5 font-semibold text-gold underline-offset-4 hover:underline"
            >
              <Phone size={15} strokeWidth={2.2} aria-hidden="true" />
              {clinic.phone.display}
            </a>
            <a
              href={defaultWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-white/80 underline-offset-4 hover:text-white hover:underline"
            >
              <MessageCircle size={15} strokeWidth={2} aria-hidden="true" />
              WhatsApp the clinic
            </a>
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer">
          <h2 className="text-[0.7rem] font-semibold tracking-[0.16em] text-gold uppercase">
            Quick Links
          </h2>
          <ul className="mt-4 space-y-2.5 text-[0.93rem]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <div>
          <h2 className="text-[0.7rem] font-semibold tracking-[0.16em] text-gold uppercase">
            Services
          </h2>
          <ul className="mt-4 space-y-2.5 text-[0.93rem]">
            {services.map((service) => (
              <li key={service.id}>
                <a
                  href="#services"
                  className="text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Timings */}
        <div>
          <h2 className="text-[0.7rem] font-semibold tracking-[0.16em] text-gold uppercase">
            OPD Timings
          </h2>
          <ul className="mt-4 space-y-2.5 text-[0.9rem] leading-relaxed">
            {timingGroups.map((group) => (
              <li key={group.days.join('-')} className="text-white/75">
                <span className="font-semibold text-white">{group.days.join(' · ')}</span>{' '}
                <span aria-hidden="true" className="text-white/40">
                  —
                </span>{' '}
                {group.sessions.length > 0
                  ? group.sessions.map((s) => s.time).join(' & ')
                  : 'OFF'}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Disclaimer + copyright */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 md:flex-row md:items-start md:justify-between">
          <p className="max-w-2xl text-[0.8rem] leading-relaxed text-white/55">
            {clinic.disclaimer}
          </p>
          <p className="shrink-0 text-[0.8rem] text-white/55">
            &copy; {year} {clinic.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
