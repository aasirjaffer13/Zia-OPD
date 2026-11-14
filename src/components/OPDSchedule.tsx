import { Info, MessageCircle, Phone, Sun, Sunrise, Sunset } from 'lucide-react';
import {
  clinic,
  defaultWhatsAppLink,
  weeklySchedule,
  type SessionPeriod,
} from '../data/clinic';
import { todayIndex } from '../utils/clipboard';
import { Reveal } from './Reveal';

const periodLabel: Record<SessionPeriod, string> = {
  morning: 'Morning',
  evening: 'Evening',
  day: 'Full day',
};

const periodIcon: Record<SessionPeriod, typeof Sunrise> = {
  morning: Sunrise,
  evening: Sunset,
  day: Sun,
};

const chipTone: Record<SessionPeriod, string> = {
  morning: 'bg-forest/15 text-forest',
  evening: 'bg-forest/15 text-forest',
  day: 'bg-forest/15 text-forest',
};

const iconTone: Record<SessionPeriod, string> = {
  morning: 'text-forest',
  evening: 'text-forest',
  day: 'text-forest',
};

const legend: { period: SessionPeriod; label: string }[] = [
  { period: 'morning', label: 'Morning' },
  { period: 'evening', label: 'Evening' },
  { period: 'day', label: 'Full day' },
];

export function OPDSchedule() {
  const today = todayIndex();

  return (
    <section id="timings" className="relative overflow-hidden bg-navy py-16 md:py-24">
      {/* Decorative rings */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 hidden h-[460px] w-[460px] text-gold/15 lg:block"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="198" stroke="currentColor" strokeWidth="1" />
        <circle cx="200" cy="200" r="146" stroke="currentColor" strokeWidth="1" />
        <circle cx="200" cy="200" r="94" stroke="currentColor" strokeWidth="1" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow eyebrow-gold">Consultation Hours</p>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="mt-5 text-[2rem] leading-[1.12] font-semibold tracking-tight text-white sm:text-[2.6rem]">
              Clinic Hours &amp; OPD Schedule
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-white/75">
              Plan your visit according to the regular consultation schedule.
            </p>
          </Reveal>
        </div>

        {/* ------------------------------------------------- Schedule card */}
        <Reveal delay={120} className="mt-10">
          <div className="overflow-hidden rounded-sm bg-ivory text-ink shadow-[0_40px_80px_-50px_rgba(0,0,0,0.75)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-white px-5 py-4">
              <ul className="flex flex-wrap gap-2" aria-hidden="true">
                {legend.map(({ period, label }) => {
                  const Icon = periodIcon[period];
                  return (
                    <li
                      key={period}
                      className="flex items-center gap-1.5 rounded-full border border-line bg-ivory px-3 py-1.5 text-[0.75rem] font-semibold text-navy"
                    >
                      <Icon size={13} className={iconTone[period]} />
                      {label}
                    </li>
                  );
                })}
                <li className="flex items-center gap-1.5 rounded-full border border-line bg-[#e9ebe6] px-3 py-1.5 text-[0.75rem] font-bold tracking-[0.1em] text-ink/55 uppercase">
                  OFF
                </li>
              </ul>
            </div>

            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Weekly OPD consultation schedule for {clinic.name}
              </caption>
              <thead>
                <tr className="border-b border-line bg-white/60">
                  <th
                    scope="col"
                    className="py-3 pr-4 pl-5 text-[0.7rem] font-semibold tracking-[0.15em] text-ink/60 uppercase sm:w-48"
                  >
                    Day
                  </th>
                  <th
                    scope="col"
                    className="py-3 pr-5 pl-1 text-[0.7rem] font-semibold tracking-[0.15em] text-ink/60 uppercase"
                  >
                    Consultation timings
                  </th>
                </tr>
              </thead>
              <tbody>
                {weeklySchedule.map((day) => {
                  const isToday = day.index === today;
                  return (
                    <tr
                      key={day.index}
                      className={`border-b border-line/80 last:border-b-0 ${
                        isToday ? 'bg-gold/15' : day.off ? 'bg-[#eff0ec]' : ''
                      }`}
                    >
                      <th
                        scope="row"
                        className="relative py-4 pr-4 pl-5 align-top text-left"
                      >
                        {isToday && (
                          <span
                            aria-hidden="true"
                            className="absolute inset-y-0 left-0 w-1 bg-gold"
                          />
                        )}
                        <span className="block font-serif text-[1.02rem] font-semibold text-navy">
                          {day.day}
                        </span>
                        {isToday && (
                          <span className="mt-1.5 inline-block rounded-full bg-navy px-2.5 py-0.5 text-[0.62rem] font-semibold tracking-[0.12em] text-gold uppercase">
                            Today
                          </span>
                        )}
                      </th>
                      <td className="py-4 pr-5 pl-1 align-top">
                        {day.off ? (
                          <span className="inline-flex items-center rounded-full border border-line bg-[#e9ebe6] px-4 py-1.5 text-[0.78rem] font-bold tracking-[0.14em] text-ink/55 uppercase">
                            OFF
                          </span>
                        ) : (
                          <ul className="flex flex-wrap gap-2">
                            {day.sessions.map((session) => {
                              const Icon = periodIcon[session.period];
                              return (
                                <li
                                  key={session.period}
                                  className="flex items-center gap-2.5 rounded-full border border-forest/25 bg-forest/[0.07] px-3.5 py-1.5 text-[0.83rem] font-medium text-navy"
                                >
                                  <span
                                    aria-hidden="true"
                                    className={`flex h-6 w-6 items-center justify-center rounded-full ${
                                      chipTone[session.period]
                                    }`}
                                  >
                                    <Icon size={13} strokeWidth={2.2} />
                                  </span>
                                  {periodLabel[session.period]}
                                  <span aria-hidden="true" className="h-3.5 w-px bg-forest/30" />
                                  <span className="font-semibold text-ink">{session.time}</span>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Honest reading notes */}
            <div className="border-t border-line bg-white px-5 py-4 text-[0.83rem] leading-relaxed text-ink">
              <p className="flex gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                />
                <span>
                  <strong className="font-semibold text-navy">Today&rsquo;s row is a reference</strong>{' '}
                  — please call the clinic to confirm today&rsquo;s availability before visiting.
                </span>
              </p>
            </div>
          </div>
        </Reveal>

        {/* ------------------------------------------- Notice + quick actions */}
        <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <Reveal className="flex max-w-2xl items-start gap-3 border border-white/15 bg-white/5 p-4">
            <Info size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
            <p className="text-[0.93rem] leading-relaxed text-white/80">{clinic.notice}</p>
          </Reveal>
          <Reveal delay={80} className="flex flex-wrap gap-3">
            <a href={clinic.phone.tel} className="btn btn-light">
              <Phone size={17} strokeWidth={2.2} aria-hidden="true" />
              Call Now
            </a>
            <a
              href={defaultWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost-light"
            >
              <MessageCircle size={17} strokeWidth={2} aria-hidden="true" />
              WhatsApp
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
