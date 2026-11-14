import { useEffect, useRef, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { clinic, navLinks } from '../data/clinic';
import { useActiveSection } from '../hooks/useActiveSection';
import { useScrolled } from '../hooks/useScrolled';
import { Emblem } from './Emblem';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(12);
  const activeSection = useActiveSection(navLinks.map((l) => l.href.slice(1)));
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Close the mobile menu when the viewport grows to desktop size.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Lock background scroll while the menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Escape closes the menu and returns focus to the toggle button.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) firstLinkRef.current?.focus();
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled || open
          ? 'border-b border-line bg-ivory/97 shadow-[0_1px_0_rgba(20,43,69,0.04),0_10px_30px_-24px_rgba(20,43,69,0.45)] backdrop-blur-sm'
          : 'border-b border-transparent bg-ivory/80 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-4 px-5">
        {/* Brand */}
        <a
          href="#home"
          onClick={closeMenu}
          className="flex items-center gap-2.5 rounded-sm"
          aria-label={`${clinic.name} — home`}
        >
          <Emblem size={36} />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-[1.05rem] font-semibold tracking-tight text-navy">
              Dr. Zia&rsquo;s OPD Clinic
            </span>
            <span className="mt-1 text-[0.66rem] font-medium uppercase tracking-[0.16em] text-ink/60">
              Kupwara &middot; J&amp;K
            </span>
          </span>
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative block rounded-sm px-3 py-2 text-[0.925rem] font-medium transition-colors duration-200 ${
                      isActive ? 'text-forest' : 'text-ink hover:text-navy'
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-0.5 h-[2px] origin-left bg-gold transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Desktop CTA */}
          <a
            href={clinic.phone.tel}
            className="btn btn-primary hidden px-5 py-3 text-sm md:inline-flex"
          >
            <Phone size={16} strokeWidth={2.2} aria-hidden="true" />
            Call for Appointment
          </a>

          {/* Mobile menu toggle */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-line bg-white text-navy transition-colors hover:border-forest hover:text-forest md:hidden"
          >
            {open ? (
              <X size={20} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Menu size={20} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line bg-ivory md:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-6xl px-5 pb-6 pt-3">
          <ul className="flex flex-col">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.href} className="menu-in" style={{ animationDelay: `${i * 45}ms` }}>
                  <a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={isActive ? 'location' : undefined}
                    className={`flex items-center justify-between border-b border-line/80 py-3.5 text-[1rem] font-medium transition-colors ${
                      isActive ? 'text-forest' : 'text-navy'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-gold"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
          <a
            href={clinic.phone.tel}
            onClick={closeMenu}
            className="btn btn-primary mt-5 w-full"
          >
            <Phone size={17} strokeWidth={2.2} aria-hidden="true" />
            Call for Appointment
          </a>
        </nav>
      </div>
    </header>
  );
}
