import { Brain, Gauge, Heart, Stethoscope, Utensils, Wind } from 'lucide-react';
import { clinic, services, type ServiceIconKey } from '../data/clinic';
import { Reveal } from './Reveal';

const icons: Record<ServiceIconKey, typeof Gauge> = {
  gauge: Gauge,
  heart: Heart,
  wind: Wind,
  stethoscope: Stethoscope,
  utensils: Utensils,
  brain: Brain,
};

export function Services() {
  return (
    <section id="services" className="bg-ivory py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Consultation Services</p>
          <h2 className="mt-5 text-[2rem] leading-[1.12] font-semibold tracking-tight text-navy sm:text-[2.5rem]">
            Medical Consultation
          </h2>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-ink">
            Medical consultation for a range of common health conditions.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <Reveal key={service.id} delay={i * 70} className="h-full">
                <article className="group h-full border border-line bg-white p-7 transition-[border-color,box-shadow,transform] duration-300 hover:border-gold hover:shadow-[0_26px_46px_-36px_rgba(20,43,69,0.45)] motion-safe:hover:-translate-y-1">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 items-center justify-center rounded-md bg-forest/10 text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-white"
                  >
                    <Icon size={23} strokeWidth={1.9} />
                  </span>
                  <h3 className="mt-5 font-serif text-xl font-semibold text-navy">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-[0.94rem] leading-relaxed text-ink">
                    {service.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={140} className="mt-10 text-center">
          <p className="text-[0.95rem] leading-relaxed text-ink">
            Not sure if your concern is listed? Call{' '}
            <a
              href={clinic.phone.tel}
              className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-forest"
            >
              {clinic.phone.display}
            </a>{' '}
            to check whether it is covered in consultation.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
