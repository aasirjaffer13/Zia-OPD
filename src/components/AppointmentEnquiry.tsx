import { useState, type FormEvent } from 'react';
import {
  CircleCheckBig,
  LoaderCircle,
  MessageCircle,
  Phone,
  TriangleExclamationPoint,
} from 'lucide-react';
import { clinic, waLink, weeklySchedule, type DaySchedule, type SessionPeriod } from '../data/clinic';
import { Reveal } from './Reveal';

const periodLabel: Record<SessionPeriod, string> = {
  morning: 'Morning',
  evening: 'Evening',
  day: 'Full day',
};

interface FormValues {
  name: string;
  mobile: string;
  day: string;
  session: string;
  notes: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const emptyValues: FormValues = { name: '', mobile: '', day: '', session: '', notes: '' };

/** Strip spaces, brackets and an optional +91 / 91 / 0 prefix. */
function normalizeMobile(raw: string): string {
  let value = raw.replace(/[\s\-().]/g, '');
  if (value.startsWith('+91')) value = value.slice(3);
  else if (value.startsWith('91') && value.length === 12) value = value.slice(2);
  else if (value.startsWith('0') && value.length === 11) value = value.slice(1);
  return value;
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) errors.name = 'Please enter your name.';
  else if (values.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.';

  if (!values.mobile.trim()) errors.mobile = 'Please enter your mobile number.';
  else if (!/^[6-9]\d{9}$/.test(normalizeMobile(values.mobile)))
    errors.mobile = 'Enter a valid 10-digit Indian mobile number (starts with 6–9).';

  if (!values.day) errors.day = 'Please choose a day.';
  if (!values.session) errors.session = 'Please choose a preferred session.';

  return errors;
}

function buildMessage(
  values: FormValues,
  day: DaySchedule | undefined,
  options: { value: string; label: string }[],
  mobile: string,
): string {
  const lines = [
    "Hello, I would like to enquire about a consultation at Dr. Zia's OPD Clinic.",
    '',
    `Name: ${values.name.trim()}`,
    `Mobile: +91 ${mobile}`,
    `Preferred day: ${day ? day.day : ''}`,
    `Preferred session: ${options.find((o) => o.value === values.session)?.label ?? ''}`,
  ];

  if (values.notes.trim()) lines.push(`Notes: ${values.notes.trim()}`);

  lines.push(
    '',
    'Please confirm whether a consultation is available. I understand that the appointment is not confirmed until the clinic replies.',
  );

  return lines.join('\n');
}

const fieldId: Record<keyof FormValues, string> = {
  name: 'enq-name',
  mobile: 'enq-mobile',
  day: 'enq-day',
  session: 'enq-session',
  notes: 'enq-notes',
};

export function AppointmentEnquiry() {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent'>('idle');
  const [sentMessage, setSentMessage] = useState('');
  const [blocked, setBlocked] = useState(false);

  const selectedDay = weeklySchedule.find((d) => String(d.index) === values.day);

  const sessionOptions: { value: string; label: string }[] = !selectedDay
    ? []
    : selectedDay.sessions.length > 0
      ? [
          ...selectedDay.sessions.map((s) => ({
            value: s.period,
            label: `${periodLabel[s.period]} · ${s.time}`,
          })),
          {
            value: 'flexible',
            label: 'Flexible — any suitable session or time',
          },
        ]
      : [
          {
            value: 'flexible',
            label: 'Flexible — please suggest a suitable timing',
          },
        ];

  function update(key: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function onDayChange(value: string) {
    setValues((prev) => ({ ...prev, day: value, session: '' }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.day;
      delete next.session;
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    const firstInvalid = (Object.keys(fieldId) as (keyof FormValues)[]).find(
      (key) => validationErrors[key],
    );
    if (firstInvalid) {
      document.getElementById(fieldId[firstInvalid])?.focus();
      return;
    }

    const mobile = normalizeMobile(values.mobile);
    const message = buildMessage(values, selectedDay, sessionOptions, mobile);
    setSentMessage(message);
    setStatus('loading');

    // Open the tab synchronously (inside the click gesture) so popup
    // blockers allow it, then point it at WhatsApp a moment later.
    const popup = window.open('about:blank', '_blank');
    window.setTimeout(() => {
      if (popup) {
        try {
          popup.opener = null;
          popup.location.href = waLink(message);
        } catch {
          // Tab was closed early — the fallback button still works.
        }
      }
      setBlocked(!popup);
      setStatus('sent');
    }, 550);
  }

  function reset() {
    setValues(emptyValues);
    setErrors({});
    setSentMessage('');
    setBlocked(false);
    setStatus('idle');
  }

  return (
    <section id="enquiry" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Appointment Enquiry</p>
          <h2 className="mt-5 text-[2rem] leading-[1.12] font-semibold tracking-tight text-navy sm:text-[2.5rem]">
            Plan Your Visit
          </h2>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-ink">
            Share your preferred day and session — your details are sent to the clinic on WhatsApp
            so they can confirm availability with you.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          {/* ------------------------------------------------------ Form card */}
          <Reveal>
            <div className="border border-line bg-ivory p-6 sm:p-8">
              {status === 'sent' ? (
                /* ------------------------------------- Confirmation panel */
                <div className="text-center" role="status">
                  <span
                    aria-hidden="true"
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest/10 text-forest"
                  >
                    {blocked ? (
                      <TriangleExclamationPoint size={26} strokeWidth={2} />
                    ) : (
                      <CircleCheckBig size={26} strokeWidth={2} />
                    )}
                  </span>
                  <h3 className="mt-5 font-serif text-2xl font-semibold text-navy">
                    {blocked ? 'WhatsApp tab was blocked' : 'Your enquiry is ready'}
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-[0.97rem] leading-relaxed text-ink">
                    {blocked
                      ? 'Your browser stopped the new tab from opening. Use the button below to open WhatsApp with your details already filled in. '
                      : 'WhatsApp should have opened in a new tab with your details filled in. '}
                    <strong className="font-semibold text-navy">
                      Your appointment is not booked yet
                    </strong>{' '}
                    — the clinic must confirm the timing with you before you visit.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <a
                      href={waLink(sentMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      <MessageCircle size={17} strokeWidth={2} aria-hidden="true" />
                      Open WhatsApp
                    </a>
                    <button type="button" onClick={reset} className="btn btn-outline">
                      Send another enquiry
                    </button>
                  </div>
                  <p className="mt-5 text-sm text-ink">
                    Prefer to talk?{' '}
                    <a
                      href={clinic.phone.tel}
                      className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-forest"
                    >
                      Call {clinic.phone.display}
                    </a>
                  </p>
                </div>
              ) : (
                /* --------------------------------------------- The form */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <label htmlFor={fieldId.name} className="field-label">
                      Patient Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id={fieldId.name}
                      name="name"
                      type="text"
                      autoComplete="name"
                      className="field-input"
                      placeholder="e.g. Rahat Ahmad"
                      value={values.name}
                      onChange={(e) => update('name', e.target.value)}
                      aria-invalid={errors.name ? true : undefined}
                      aria-describedby={errors.name ? 'err-name' : undefined}
                    />
                    {errors.name && (
                      <span id="err-name" className="field-error" role="alert">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div>
                    <label htmlFor={fieldId.mobile} className="field-label">
                      Phone Number <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id={fieldId.mobile}
                      name="mobile"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      maxLength={16}
                      className="field-input"
                      placeholder="e.g. 9876543210"
                      value={values.mobile}
                      onChange={(e) => update('mobile', e.target.value)}
                      aria-invalid={errors.mobile ? true : undefined}
                      aria-describedby={errors.mobile ? 'err-mobile' : 'hint-mobile'}
                    />
                    {errors.mobile ? (
                      <span id="err-mobile" className="field-error" role="alert">
                        {errors.mobile}
                      </span>
                    ) : (
                      <span id="hint-mobile" className="mt-1 block text-[0.8rem] text-ink/60">
                        10-digit Indian mobile number — a +91 prefix is optional.
                      </span>
                    )}
                  </div>

                  <div>
                    <label htmlFor={fieldId.day} className="field-label">
                      Preferred Consultation Day <span aria-hidden="true">*</span>
                    </label>
                    <select
                      id={fieldId.day}
                      name="day"
                      className="field-input"
                      value={values.day}
                      onChange={(e) => onDayChange(e.target.value)}
                      aria-invalid={errors.day ? true : undefined}
                      aria-describedby={errors.day ? 'err-day' : undefined}
                    >
                      <option value="">Select a day…</option>
                      {weeklySchedule.map((day) => (
                        <option key={day.index} value={String(day.index)}>
                          {day.day}
                        </option>
                      ))}
                    </select>
                    {errors.day && (
                      <span id="err-day" className="field-error" role="alert">
                        {errors.day}
                      </span>
                    )}
                  </div>

                  <fieldset aria-describedby={errors.session ? 'err-session' : undefined}>
                    <legend className="field-label">
                      Preferred session <span aria-hidden="true">*</span>
                    </legend>
                    {sessionOptions.length === 0 ? (
                      <p className="text-[0.9rem] text-ink/70">
                        Choose a day first to see the available sessions.
                      </p>
                    ) : (
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {sessionOptions.map((option, i) => (
                          <label
                            key={option.value}
                            className={`flex cursor-pointer items-start gap-3 rounded-md border p-3.5 text-sm transition-colors ${
                              values.session === option.value
                                ? 'border-forest bg-forest/5'
                                : 'border-line bg-white hover:border-forest/40'
                            }`}
                          >
                            <input
                              type="radio"
                              name="session"
                              value={option.value}
                              checked={values.session === option.value}
                              onChange={(e) => update('session', e.target.value)}
                              className="mt-0.5 h-4 w-4 shrink-0 accent-forest"
                              {...(i === 0 ? { id: fieldId.session } : {})}
                            />
                            <span className="font-medium leading-snug text-navy">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                    {errors.session && (
                      <span id="err-session" className="field-error" role="alert">
                        {errors.session}
                      </span>
                    )}
                  </fieldset>

                  <div>
                    <label htmlFor={fieldId.notes} className="field-label">
                      Brief Enquiry <span className="font-normal text-ink/60">(optional)</span>
                    </label>
                    <textarea
                      id={fieldId.notes}
                      name="notes"
                      maxLength={500}
                      className="field-input"
                      placeholder="e.g. first visit, reports available, medicines you take…"
                      value={values.notes}
                      onChange={(e) => update('notes', e.target.value)}
                    />
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === 'loading' ? (
                        <>
                          <LoaderCircle size={17} className="animate-spin" aria-hidden="true" />
                          Preparing your message…
                        </>
                      ) : (
                        <>
                          <MessageCircle size={17} strokeWidth={2} aria-hidden="true" />
                          Send enquiry on WhatsApp
                        </>
                      )}
                    </button>
                    <p className="mt-3 text-center text-[0.8rem] leading-relaxed text-ink/70">
                      This opens WhatsApp with your details filled in. Sending an enquiry does{' '}
                      <strong className="font-semibold text-navy">not</strong> book an appointment.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>

          {/* ---------------------------------------------------- Side panel */}
          <Reveal delay={100} className="lg:sticky lg:top-24 lg:self-start">
            <aside className="bg-navy p-6 text-white sm:p-8">
              <h3 className="font-serif text-xl font-semibold text-white">Prefer to call?</h3>
              <a
                href={clinic.phone.tel}
                className="mt-4 block font-serif text-[1.7rem] leading-none font-semibold text-gold underline-offset-4 hover:underline"
              >
                {clinic.phone.display}
              </a>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-white/70">
                {clinic.notice}
              </p>

              <div aria-hidden="true" className="my-6 h-px bg-white/15" />

              <h4 className="text-[0.7rem] font-semibold tracking-[0.16em] text-gold uppercase">
                How it works
              </h4>
              <ol className="mt-4 space-y-3.5 text-[0.92rem] leading-relaxed text-white/80">
                <li className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[0.7rem] font-bold text-gold">
                    1
                  </span>
                  Fill in your preferred day and session.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[0.7rem] font-bold text-gold">
                    2
                  </span>
                  WhatsApp opens with your details — just press send.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[0.7rem] font-bold text-gold">
                    3
                  </span>
                  The clinic confirms availability with you before you visit.
                </li>
              </ol>

              <p className="mt-6 border-t border-white/15 pt-5 text-[0.85rem] leading-relaxed text-white/70">
                An enquiry is not a booking. Your appointment is confirmed only when the clinic
                replies to you.
              </p>

              <a
                href={clinic.phone.tel}
                className="btn btn-light mt-6 w-full"
              >
                <Phone size={17} strokeWidth={2.2} aria-hidden="true" />
                Call the Clinic
              </a>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
