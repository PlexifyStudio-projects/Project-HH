import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Phone,
  MapPin,
  Heart,
  Plus,
} from '../Hero/icons.jsx';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FOOTER_COLUMNS = [
  {
    label: 'Services',
    links: [
      { label: 'Skilled Nursing',        href: '#services' },
      { label: 'Physical Therapy',       href: '#services' },
      { label: 'Occupational Therapy',   href: '#services' },
      { label: 'Speech Therapy',         href: '#services' },
      { label: 'Medical Social Work',    href: '#services' },
      { label: 'Home Health Aide',       href: '#services' },
    ],
  },
  {
    label: 'Company',
    links: [
      { label: 'About Haven',   href: '#about' },
      { label: 'Our Care Team', href: '#care-team' },
      { label: 'Careers',       href: '#careers' },
      { label: 'Partner with us', href: '#partners' },
      { label: 'Press',         href: '#press' },
      { label: 'Contact',       href: '#contact' },
    ],
  },
  {
    label: 'Resources',
    links: [
      { label: 'How It Works',     href: '#how-it-works' },
      { label: 'Family Stories',   href: '#stories' },
      { label: 'Insurance & Coverage', href: '#coverage' },
      { label: 'Medicare FAQ',     href: '#medicare' },
      { label: 'Blog & Care Tips', href: '#blog' },
      { label: 'Care glossary',    href: '#glossary' },
    ],
  },
  {
    label: 'Support',
    links: [
      { label: 'Patient Portal',    href: '#portal' },
      { label: 'Family Dashboard',  href: '#family' },
      { label: 'Provider Login',    href: '#providers' },
      { label: 'Billing & Payments', href: '#billing' },
      { label: 'Help Center',       href: '#help' },
      { label: 'Español',           href: '#es' },
    ],
  },
];

const ACCREDITATIONS = [
  'Medicare Certified',
  'CHAP Accredited',
  'Joint Commission',
  'HIPAA Compliant',
  'BBB A+ Rated',
  'CMS 5-Star',
];

const LEGAL = [
  { label: 'Privacy Policy',        href: '#privacy' },
  { label: 'Terms of Service',      href: '#terms' },
  { label: 'HIPAA Notice',          href: '#hipaa' },
  { label: 'Non-discrimination',    href: '#non-discrimination' },
  { label: 'Accessibility',         href: '#accessibility' },
  { label: 'Cookie Preferences',    href: '#cookies' },
];

const SOCIALS = [
  { label: 'Instagram', href: '#ig', icon: 'ig' },
  { label: 'Facebook',  href: '#fb', icon: 'fb' },
  { label: 'YouTube',   href: '#yt', icon: 'yt' },
  { label: 'LinkedIn',  href: '#li', icon: 'li' },
];

function SocialIcon({ name }) {
  const common = { width: 16, height: 16, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'ig':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'fb':
      return (
        <svg {...common}>
          <path d="M14 9h3V5h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1Z" />
        </svg>
      );
    case 'yt':
      return (
        <svg {...common}>
          <path d="M3 7c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
          <path d="m10 9 5 3-5 3V9Z" fill="currentColor" />
        </svg>
      );
    case 'li':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 10v8M8 7v.01M12 18v-5a3 3 0 0 1 6 0v5" />
        </svg>
      );
    default: return null;
  }
}

function Footer() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;

      gsap.from('.hv-ft__hero-line, .hv-ft__hero-sub, .hv-ft__hero-ctas > *, .hv-ft__hero-aside > *', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.hv-ft__hero', start: 'top 80%' },
      });

      gsap.fromTo(
        '.hv-ft__col, .hv-ft__brand-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          immediateRender: false,
          scrollTrigger: { trigger: '.hv-ft__body', start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
    },
    { scope: ref }
  );

  return (
    <footer ref={ref} className="hv-ft" id="footer">
      {/* ============================================================
         PRE-FOOTER HERO — Big editorial call to action
         ============================================================ */}
      <div className="hv-ft__hero">
        <div className="hv-ft__hero-wrap">
          <div className="hv-ft__hero-main">
            <span className="hv-ft__hero-eyebrow">
              <span className="hv-ft__hero-eyebrow-dot" aria-hidden="true" />
              <Plus width={13} height={13} />
              Ready when you are
            </span>
            <h2 className="hv-ft__hero-title">
              <span className="hv-ft__hero-line">Ready to feel at</span>
              <span className="hv-ft__hero-line">
                home <em>again</em>?
              </span>
            </h2>
            <p className="hv-ft__hero-sub">
              One call starts everything. A Haven care advisor will walk your
              family through coverage, options, and timing — no scripts, no
              commitment, no surprise bills.
            </p>

            <div className="hv-ft__hero-ctas">
              <a href="#contact" className="hv-ft__hero-cta hv-ft__hero-cta--primary">
                <span>Schedule a free assessment</span>
                <ArrowRight width={15} height={15} />
              </a>
              <a href="tel:18005551234" className="hv-ft__hero-cta hv-ft__hero-cta--ghost">
                <Phone width={15} height={15} />
                <span>1-800-555-1234</span>
              </a>
            </div>
          </div>

          <aside className="hv-ft__hero-aside">
            <div className="hv-ft__hero-stat">
              <dt>&lt; 1 h</dt>
              <dd>Callback time</dd>
            </div>
            <div className="hv-ft__hero-stat">
              <dt>Free</dt>
              <dd>First assessment</dd>
            </div>
            <div className="hv-ft__hero-stat">
              <dt>24 / 7</dt>
              <dd>Care-advisor line</dd>
            </div>
          </aside>
        </div>
      </div>

      {/* ============================================================
         MAIN FOOTER BODY
         ============================================================ */}
      <div className="hv-ft__body">
        <div className="hv-ft__body-wrap">
          {/* Brand card */}
          <div className="hv-ft__brand-card">
            <a href="#hero" className="hv-ft__brand">
              <span className="hv-ft__brand-mark" aria-hidden="true">
                <svg viewBox="0 0 44 44" fill="none">
                  <rect x="1" y="1" width="42" height="42" rx="10" fill="#1C5AA6" />
                  <path
                    d="M22 12 C 18.5 12, 15.5 14.8, 15.5 18.5 C 15.5 23, 22 28.5, 22 28.5 C 22 28.5, 28.5 23, 28.5 18.5 C 28.5 14.8, 25.5 12, 22 12 Z"
                    fill="#ffffff"
                  />
                  <path d="M22 16 L22 23 M18.5 19.5 L25.5 19.5" stroke="#1C5AA6" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
              <span className="hv-ft__brand-text">
                <span className="hv-ft__brand-name">Haven Home Health</span>
                <span className="hv-ft__brand-tagline">Skilled in-home care, since 2014</span>
              </span>
            </a>

            <p className="hv-ft__brand-body">
              Haven is a clinician-owned home-health network serving 38 U.S.
              states. We are Medicare-certified, CHAP-accredited, and built
              around one idea: the right person at your door, every visit.
            </p>

            <div className="hv-ft__brand-contact">
              <a href="tel:18005551234" className="hv-ft__brand-contact-item">
                <Phone width={14} height={14} />
                <span>
                  <span className="hv-ft__brand-contact-label">Phone</span>
                  1-800-555-1234
                </span>
              </a>
              <a href="mailto:care@haven.us" className="hv-ft__brand-contact-item">
                <Heart width={14} height={14} />
                <span>
                  <span className="hv-ft__brand-contact-label">Email</span>
                  care@haven.us
                </span>
              </a>
              <div className="hv-ft__brand-contact-item hv-ft__brand-contact-item--static">
                <MapPin width={14} height={14} />
                <span>
                  <span className="hv-ft__brand-contact-label">HQ</span>
                  2200 Market St · San Diego, CA
                </span>
              </div>
            </div>

            <ul className="hv-ft__socials" role="list">
              {SOCIALS.map(({ label, href, icon }) => (
                <li key={label}>
                  <a href={href} className="hv-ft__social" aria-label={label}>
                    <SocialIcon name={icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          <nav className="hv-ft__cols" aria-label="Footer">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.label} className="hv-ft__col">
                <h3 className="hv-ft__col-title">{col.label}</h3>
                <ul className="hv-ft__col-list">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* ============================================================
         ACCREDITATIONS STRIP
         ============================================================ */}
      <div className="hv-ft__creds">
        <div className="hv-ft__creds-wrap">
          <span className="hv-ft__creds-label">
            <ShieldCheck width={14} height={14} />
            Credentialed & accredited
          </span>
          <ul className="hv-ft__creds-list" role="list">
            {ACCREDITATIONS.map((a) => (
              <li key={a} className="hv-ft__cred">
                <span className="hv-ft__cred-check" aria-hidden="true">
                  <ShieldCheck width={11} height={11} />
                </span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ============================================================
         BOTTOM BAR — legal
         ============================================================ */}
      <div className="hv-ft__bottom">
        <div className="hv-ft__bottom-wrap">
          <div className="hv-ft__bottom-left">
            <span className="hv-ft__copyright">
              © {new Date().getFullYear()} Haven Home Health, Inc.
            </span>
            <span className="hv-ft__bottom-sep" aria-hidden="true">·</span>
            <span className="hv-ft__bottom-note">
              All rights reserved. Licensed in 38 U.S. states.
            </span>
          </div>
          <ul className="hv-ft__legal" role="list">
            {LEGAL.map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
