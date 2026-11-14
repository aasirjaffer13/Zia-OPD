import { Info, MapPin, MessageCircle, Phone } from 'lucide-react';
import { clinic, defaultWhatsAppLink } from '../data/clinic';
import { Reveal } from './Reveal';

export function Contact() {
  return (
    <section id="contact" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Contact</p>
          <h2 className="mt-5 text-[2rem] leading-[1.12] font-semibold tracking-tight text-navy sm:text-[2.5rem]">
            Get in Touch
          </h2>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-ink">{clinic.notice}</p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {/* ------------------------------------------------------ Call card */}
          <Reveal>
            <div className="flex h-full flex-col border border-line bg-ivory p-6 sm:p-8">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-md bg-forest/10 text-forest"
              >
                <Phone size={23} strokeWidth={1.9} />
              </span>
              <h3 className="mt-5 font-serif text-xl font-semibold text-navy">Call the clinic</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink">
                Speak to us directly to check consultation availability for the day you plan to
                visit.
              </p>
              <a
                href={clinic.phone.tel}
                className="mt-4 block font-serif text-[1.7rem] leading-none font-semibold text-navy underline-offset-4 hover:text-forest hover:underline"
              >
                {clinic.phone.display}
              </a>
              <div className="mt-auto pt-6">
                <a href={clinic.phone.tel} className="btn btn-primary w-full">
                  <Phone size={17} strokeWidth={2.2} aria-hidden="true" />
                  Call Now
                </a>
              </div>
            </div>
          </Reveal>

          {/* --------------------------------------------------- WhatsApp card */}
          <Reveal delay={80}>
            <div className="flex h-full flex-col border border-line bg-ivory p-6 sm:p-8">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-md bg-forest/10 text-forest"
              >
                <MessageCircle size={23} strokeWidth={1.9} />
              </span>
              <h3 className="mt-5 font-serif text-xl font-semibold text-navy">
                Message on WhatsApp
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink">
                Send your enquiry as a message — the chat opens with a note already written for
                you.
              </p>
              <a
                href={defaultWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block font-serif text-[1.35rem] leading-none font-semibold text-navy underline-offset-4 hover:text-forest hover:underline"
              >
                Chat with the clinic
              </a>
              <div className="mt-auto pt-6">
                <a
                  href={defaultWhatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full"
                >
                  <MessageCircle size={17} strokeWidth={2} aria-hidden="true" />
                  Open WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* --------------------------------------------------- Address strip */}
        <Reveal delay={120} className="mt-5">
          <div className="flex flex-col gap-5 border border-line bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-ivory text-forest"
              >
                <MapPin size={18} strokeWidth={2.1} />
              </span>
              <div>
                <h3 className="font-serif text-lg font-semibold text-navy">Visit the clinic</h3>
                <address className="mt-1 text-[0.97rem] leading-relaxed text-ink not-italic">
                  {clinic.address.full}
                </address>
              </div>
            </div>
            <a href="#location" className="btn btn-outline shrink-0">
              Get directions
            </a>
          </div>
        </Reveal>

        <Reveal delay={160} className="mt-6">
          <p className="flex items-start gap-2.5 text-[0.86rem] leading-relaxed text-ink/75">
            <Info size={15} className="mt-0.5 shrink-0 text-ink/50" aria-hidden="true" />
            {clinic.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
