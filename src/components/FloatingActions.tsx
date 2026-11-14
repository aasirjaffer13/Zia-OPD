import { ArrowUp, MessageCircle, Phone } from 'lucide-react';
import { clinic, defaultWhatsAppLink } from '../data/clinic';
import { useScrolled } from '../hooks/useScrolled';

export function FloatingActions() {
  const showBackToTop = useScrolled(500);

  function scrollToTop() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }

  return (
    <>
      {/* ------------------------------------------- Desktop floating buttons */}
      <div className="fixed right-5 bottom-5 z-40 hidden flex-col items-end gap-3 md:flex">
        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-navy shadow-[0_14px_30px_-18px_rgba(20,43,69,0.6)] transition-colors hover:border-forest hover:text-forest"
          >
            <ArrowUp size={20} strokeWidth={2.1} aria-hidden="true" />
          </button>
        )}
        <a
          href={defaultWhatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with the clinic on WhatsApp"
          title="Chat on WhatsApp"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-white shadow-[0_16px_34px_-16px_rgba(23,77,58,0.75)] transition-colors hover:bg-forest-deep"
        >
          <MessageCircle size={25} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>

      {/* ------------------------------------------------ Mobile bottom bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-white/97 shadow-[0_-8px_24px_-20px_rgba(20,43,69,0.5)] backdrop-blur-sm md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <a
          href={clinic.phone.tel}
          className="btn btn-primary flex-1 rounded-none border-0 py-4 text-[0.95rem]"
        >
          <Phone size={17} strokeWidth={2.2} aria-hidden="true" />
          Call Clinic
        </a>
        <a
          href={defaultWhatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn flex-1 rounded-none border-0 bg-navy py-4 text-[0.95rem] text-white hover:bg-navy-soft"
        >
          <MessageCircle size={17} strokeWidth={2} aria-hidden="true" />
          WhatsApp
        </a>
      </div>
    </>
  );
}
