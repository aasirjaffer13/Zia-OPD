import { BadgeCheck, CalendarDays, Check, MapPin, Phone } from 'lucide-react';
import { clinic } from '../data/clinic';
import { Portrait } from './Portrait';
import { Reveal } from './Reveal';

const expectations = [
  'Call before you visit — consultation availability can change from day to day.',
  'Bring any previous prescriptions and test reports you would like reviewed.',
  'Check the OPD Timings section for the day you plan to visit before making the trip.',
] as const;

export function DoctorProfile() {
  return (
    <section id="about" className="bg-white py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* --------------------------------------------------- Photo column */}
        <Reveal className="relative">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -top-3 -left-3 h-20 w-20 border-t-2 border-l-2 border-gold"
            />
            <div className="relative overflow-hidden border border-line bg-ivory">
              <Portrait
                src="images/doctor.jpg"
                alt={`Portrait of ${clinic.doctor.name} at ${clinic.name}`}
                className="aspect-[4/5] w-full"
              />
            </div>
          </div>

          {/* Quick facts */}
          <dl className="mt-7 divide-y divide-line border border-line bg-ivory">
            <div className="flex items-start gap-3.5 p-4">
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-white text-forest"
              >
                <MapPin size={15} strokeWidth={2.2} />
              </span>
              <div>
                <dt className="text-[0.68rem] font-semibold tracking-[0.16em] text-ink/60 uppercase">
                  Location
                </dt>
                <dd className="mt-0.5 text-sm font-medium text-navy">
                  {clinic.address.singleLine}
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3.5 p-4">
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-white text-forest"
              >
                <Phone size={15} strokeWidth={2.2} />
              </span>
              <div>
                <dt className="text-[0.68rem] font-semibold tracking-[0.16em] text-ink/60 uppercase">
                  Phone
                </dt>
                <dd className="mt-0.5 text-sm font-medium">
                  <a
                    href={clinic.phone.tel}
                    className="text-navy underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-forest"
                  >
                    {clinic.phone.display}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3.5 p-4">
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-white text-forest"
              >
                <CalendarDays size={15} strokeWidth={2.2} />
              </span>
              <div>
                <dt className="text-[0.68rem] font-semibold tracking-[0.16em] text-ink/60 uppercase">
                  OPD
                </dt>
                <dd className="mt-0.5 text-sm font-medium">
                  <a
                    href="#timings"
                    className="text-navy underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-forest"
                  >
                    View the weekly schedule
                  </a>
                </dd>
              </div>
            </div>
          </dl>
        </Reveal>

        {/* ----------------------------------------------------- Copy column */}
        <div className="lg:pt-2">
          <Reveal>
            <p className="eyebrow">About the Doctor</p>
          </Reveal>

          <Reveal delay={70}>
            <h2 className="mt-5 text-[2rem] leading-[1.12] font-semibold tracking-tight text-navy sm:text-[2.5rem]">
              Meet Your Doctor
            </h2>
          </Reveal>

          <Reveal delay={110}>
            <p className="mt-5 font-serif text-[1.6rem] leading-tight font-semibold text-forest">
              {clinic.doctor.name}
            </p>
            <p className="mt-2 text-[0.8rem] font-bold tracking-[0.2em] text-navy/75 uppercase">
              {clinic.doctor.designation}
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-4 flex w-fit items-center gap-3 border border-line bg-ivory px-4 py-3">
              <BadgeCheck size={17} className="text-forest" aria-hidden="true" />
              <span className="text-[0.78rem] font-semibold tracking-[0.13em] text-navy uppercase">
                {clinic.doctor.qualificationsPipe}
              </span>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-6 max-w-xl space-y-4 text-[1.02rem] leading-relaxed text-ink">
              <p>
                {clinic.doctor.name} is a physician at {clinic.name}, located at{' '}
                {clinic.address.singleLine}. Patients can visit the clinic for medical
                consultation across a range of common health concerns, according to the
                weekly OPD schedule.
              </p>
              <p>
                Consultation covers a range of common medical concerns — from diabetes and
                hypertension to heart, respiratory, thyroid, digestive and neurological conditions.
                If you are unsure whether your concern is covered, please call the clinic and ask
                before visiting.
              </p>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <h3 className="mt-8 font-serif text-lg font-semibold text-navy">What to expect</h3>
            <ul className="mt-4 space-y-3.5">
              {expectations.map((item) => (
                <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest"
                  >
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={clinic.phone.tel} className="btn btn-primary">
                <Phone size={17} strokeWidth={2.2} aria-hidden="true" />
                Call for Appointment
              </a>
              <a href="#timings" className="btn btn-outline">
                <CalendarDays size={17} strokeWidth={2} aria-hidden="true" />
                View OPD Timings
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
