import { useState } from 'react';
import { ChevronDown, Phone } from 'lucide-react';
import { clinic, faqs } from '../data/clinic';
import { Reveal } from './Reveal';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-ivory py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">FAQs</p>
          <h2 className="mt-5 text-[2rem] leading-[1.12] font-semibold tracking-tight text-navy sm:text-[2.5rem]">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-ink">
            Quick answers about location, timings and how to reach the clinic.
          </p>
        </Reveal>

        <Reveal delay={90} className="mx-auto mt-10 max-w-3xl">
          <div className="divide-y divide-line border border-line bg-white">
            {faqs.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={item.question}>
                  <h3>
                    <button
                      type="button"
                      id={`faq-btn-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-ivory sm:px-6 sm:py-5"
                    >
                      <span className="font-serif text-[1.02rem] leading-snug font-semibold text-navy sm:text-[1.08rem]">
                        {item.question}
                      </span>
                      <ChevronDown
                        size={19}
                        strokeWidth={2.1}
                        aria-hidden="true"
                        className={`shrink-0 text-forest transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    hidden={!isOpen}
                    className="px-5 pb-5 sm:px-6"
                  >
                    <p className="text-[0.96rem] leading-relaxed text-ink">{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-8 max-w-3xl">
          <div className="flex flex-col items-center gap-4 border border-line bg-white px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-[0.97rem] leading-relaxed text-ink">
              Still have a question? Call the clinic and ask — we&rsquo;re happy to help.
            </p>
            <a href={clinic.phone.tel} className="btn btn-primary shrink-0">
              <Phone size={17} strokeWidth={2.2} aria-hidden="true" />
              {clinic.phone.display}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
