import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Phone,
  ArrowRight,
  ShieldCheck,
  Award,
  HomeHealth,
  Heartbeat,
  Users,
  Stethoscope,
  MessageQuote,
  Workflow,
} from '../Hero/icons.jsx';

gsap.registerPlugin(useGSAP);

// Institutional nav — text-forward, clinical
const NAV_LINKS = [
  { label: 'Services',     href: '#services',     Icon: Stethoscope },
  { label: 'How It Works', href: '#how-it-works', Icon: Workflow },
  { label: 'Care Team',    href: '#care-team',    Icon: Users },
  { label: 'Coverage',     href: '#coverage',     Icon: ShieldCheck },
  { label: 'Stories',      href: '#stories',      Icon: MessageQuote },
];

// Utility top links (like real hospital sites)
const UTILITY_LINKS = [
  { label: 'Patient Portal', href: '#portal' },
  { label: 'For Providers',  href: '#providers' },
  { label: 'Careers',        href: '#careers' },
  { label: 'Español',        href: '#es' },
];

// Quiet trust strip — real credentials, not live numbers
const CREDENTIALS = [
  { label: 'Medicare Certified', Icon: ShieldCheck },
  { label: 'CHAP Accredited',    Icon: Award },
  { label: 'Joint Commission',   Icon: ShieldCheck },
  { label: 'HIPAA Compliant',    Icon: ShieldCheck },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef(null);
  const mobileRef = useRef(null);

  useGSAP(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });

    const tl = gsap.timeline({ delay: 0.15, defaults: { ease: 'power3.out' } });
    tl.fromTo('.hh-util a, .hh-util__phone', { y: -6, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.04 });
    tl.fromTo('.hh-brand',    { y: -14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, '-=0.2');
    tl.fromTo('.hh-nav a',    { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.04 }, '-=0.4');
    tl.fromTo('.hh-cta',      { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 }, '-=0.2');
    tl.fromTo('.hh-creds__item', { opacity: 0 }, { opacity: 1, duration: 0.45, stagger: 0.05 }, '-=0.2');

    return () => window.removeEventListener('scroll', onScroll);
  }, { scope: headerRef });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileRef.current) return;
    if (mobileOpen) {
      gsap.fromTo(mobileRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.55, ease: 'power4.inOut' });
      gsap.fromTo('.hh-mob__link',
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.04, delay: 0.15 });
    } else {
      gsap.to(mobileRef.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.35, ease: 'power2.in' });
    }
  }, [mobileOpen]);

  return (
    <header ref={headerRef} className={`hh${scrolled ? ' hh--scrolled' : ''}`}>
      <a className="hh__skip" href="#hero">Skip to content</a>

      {/* UTILITY BAR — soft gray, institutional utility links */}
      <div className="hh-util">
        <div className="hh-util__wrap">
          <nav className="hh-util__left" aria-label="Utility">
            {UTILITY_LINKS.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <div className="hh-util__right">
            <span className="hh-util__hours">
              <span className="hh-util__hours-dot" aria-hidden="true" />
              Open 24 / 7 for new patients
            </span>
            <a href="tel:18005551234" className="hh-util__phone">
              <Phone width={13} height={13} />
              <span>1-800-555-1234</span>
            </a>
          </div>
        </div>
      </div>

      {/* MAIN BAR — clinical white */}
      <div className="hh-main">
        <div className="hh-main__wrap">
          {/* Brand — clean institutional mark */}
          <a href="#hero" className="hh-brand">
            <span className="hh-brand__mark" aria-hidden="true">
              <svg viewBox="0 0 44 44" fill="none">
                <rect x="1" y="1" width="42" height="42" rx="10" fill="#1C5AA6" />
                <path
                  d="M22 12 C 18.5 12, 15.5 14.8, 15.5 18.5 C 15.5 23, 22 28.5, 22 28.5 C 22 28.5, 28.5 23, 28.5 18.5 C 28.5 14.8, 25.5 12, 22 12 Z"
                  fill="#ffffff"
                />
                <path d="M22 16 L22 23 M18.5 19.5 L25.5 19.5" stroke="#1C5AA6" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <span className="hh-brand__text">
              <span className="hh-brand__name">Haven Home Health</span>
              <span className="hh-brand__tagline">Skilled in-home care, since 2014</span>
            </span>
          </a>

          {/* Nav — text + subtle inline icons */}
          <nav className="hh-nav" aria-label="Primary">
            {NAV_LINKS.map(({ label, href, Icon }) => (
              <a key={href} href={href}>
                <Icon width={16} height={16} aria-hidden="true" />
                <span>{label}</span>
              </a>
            ))}
          </nav>

          {/* Primary action — single, clear */}
          <div className="hh-actions">
            <a href="tel:18005551234" className="hh-call" aria-label="Call Haven Home Health">
              <Phone width={14} height={14} />
              <span className="hh-call__label">Talk to a care advisor</span>
              <span className="hh-call__num">1-800-555-1234</span>
            </a>

            <a href="#contact" className="hh-cta">
              <span>Request care</span>
              <ArrowRight width={14} height={14} />
            </a>

            <button
              type="button"
              className="hh-burger"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="hh-mobile"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span className={`hh-burger__bar${mobileOpen ? ' is-open' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* CREDENTIALS STRIP — real accreditations, institutional proof */}
      <div className="hh-creds" aria-label="Accreditations">
        <div className="hh-creds__wrap">
          <span className="hh-creds__prefix">Accredited by</span>
          <ul className="hh-creds__list">
            {CREDENTIALS.map(({ label, Icon }) => (
              <li key={label} className="hh-creds__item">
                <Icon width={13} height={13} />
                <span>{label}</span>
              </li>
            ))}
          </ul>
          <span className="hh-creds__suffix">
            <Heartbeat width={13} height={13} />
            Serving 38 states
          </span>
        </div>
      </div>

      {/* Mobile drawer */}
      <nav
        ref={mobileRef}
        id="hh-mobile"
        className={`hh-mob${mobileOpen ? ' is-open' : ''}`}
        aria-label="Mobile primary"
        aria-hidden={!mobileOpen}
      >
        <div className="hh-mob__head">
          <span>Menu</span>
        </div>

        {NAV_LINKS.map(({ label, href }, i) => (
          <a key={href} href={href} className="hh-mob__link" onClick={() => setMobileOpen(false)}>
            <span className="hh-mob__link-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="hh-mob__link-label">{label}</span>
            <ArrowRight width={18} height={18} className="hh-mob__link-arrow" />
          </a>
        ))}

        <div className="hh-mob__util">
          {UTILITY_LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </div>

        <div className="hh-mob__foot">
          <a href="tel:18005551234" className="hh-mob__call">
            <Phone width={16} height={16} />
            1-800-555-1234
          </a>
          <a href="#contact" className="hh-mob__cta" onClick={() => setMobileOpen(false)}>
            Request care
            <ArrowRight width={15} height={15} />
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
