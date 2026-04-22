import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  ShieldCheck,
  MapPin,
  Plus,
  ArrowRight,
  Clock247,
  Award,
  Heartbeat,
  Calendar,
} from '../Hero/icons.jsx';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Regional color psychology — 5 tones mapped across US geography
const REGIONS = {
  pacific:   { label: 'Pacific',   codes: ['WA','OR','CA','HI','AK'] },
  mountain:  { label: 'Mountain',  codes: ['MT','ID','WY','NV','UT','CO','AZ','NM'] },
  midwest:   { label: 'Midwest',   codes: ['ND','SD','NE','KS','MN','IA','MO','WI','IL','IN','MI','OH'] },
  south:     { label: 'South',     codes: ['OK','AR','LA','TX','MS','AL','TN','KY','GA','FL','SC','NC'] },
  northeast: { label: 'Northeast', codes: ['NY','VT','NH','ME','MA','RI','CT','NJ','PA','DE','MD','VA','WV'] },
};

const regionOf = (code) => {
  for (const [r, { codes }] of Object.entries(REGIONS)) {
    if (codes.includes(code)) return r;
  }
  return 'other';
};

// 50 states · clean integer col/row grid · 38 active / 12 coming
// Geographic approximation on a 13-col × 7-row hex-ish grid
const US_STATES = [
  // Row 1 — northern tier
  ['WA','Washington',     1,1,true],
  ['MT','Montana',        3,1,false],
  ['ND','North Dakota',   4,1,false],
  ['MN','Minnesota',      5,1,true],
  ['WI','Wisconsin',      6,1,true],
  ['MI','Michigan',       7,1,true],
  ['NY','New York',       10,1,true],
  ['VT','Vermont',        11,1,false],
  ['NH','New Hampshire',  12,1,true],
  ['ME','Maine',          13,1,true],

  // Row 2 — upper midwest + northeast
  ['OR','Oregon',         1,2,true],
  ['ID','Idaho',          2,2,false],
  ['WY','Wyoming',        3,2,false],
  ['SD','South Dakota',   4,2,false],
  ['IA','Iowa',           5,2,true],
  ['IL','Illinois',       6,2,true],
  ['IN','Indiana',        7,2,true],
  ['OH','Ohio',           8,2,true],
  ['PA','Pennsylvania',   9,2,true],
  ['NJ','New Jersey',     10,2,true],
  ['CT','Connecticut',    11,2,true],
  ['RI','Rhode Island',   12,2,false],
  ['MA','Massachusetts',  13,2,true],

  // Row 3 — central belt
  ['CA','California',     1,3,true],
  ['NV','Nevada',         2,3,true],
  ['UT','Utah',           3,3,true],
  ['CO','Colorado',       4,3,true],
  ['NE','Nebraska',       5,3,false],
  ['MO','Missouri',       6,3,true],
  ['KY','Kentucky',       7,3,true],
  ['WV','West Virginia',  8,3,false],
  ['VA','Virginia',       9,3,true],
  ['MD','Maryland',       10,3,true],
  ['DE','Delaware',       11,3,true],

  // Row 4 — southwest to southeast
  ['AZ','Arizona',        3,4,true],
  ['NM','New Mexico',     4,4,true],
  ['KS','Kansas',          5,4,true],
  ['AR','Arkansas',       6,4,true],
  ['TN','Tennessee',      7,4,true],
  ['NC','North Carolina', 8,4,true],
  ['SC','South Carolina', 9,4,true],

  // Row 5 — deep south
  ['OK','Oklahoma',       5,5,false],
  ['LA','Louisiana',      6,5,true],
  ['MS','Mississippi',    7,5,false],
  ['AL','Alabama',        8,5,true],
  ['GA','Georgia',        9,5,true],

  // Row 6 — Texas + Florida peninsula (TX spans 2 cols)
  ['TX','Texas',          5,6,true,  { span: 2 }],
  ['FL','Florida',        10,6,true],

  // Row 7 — Alaska + Hawaii inset
  ['AK','Alaska',         1,7,false],
  ['HI','Hawaii',         6,7,true],
];

const ACTIVE_COUNT = US_STATES.filter((s) => s[4]).length;
const TOTAL_COUNT  = US_STATES.length;
const COMING_COUNT = TOTAL_COUNT - ACTIVE_COUNT;

// Mock ZIP lookup — in production this hits an API
const ZIP_DATABASE = {
  '10001': { state: 'New York',    code: 'NY', insurers: 'Medicare Part A & B, Empire BCBS, Aetna HMO', active: true },
  '90001': { state: 'California',  code: 'CA', insurers: 'Medicare Part A & B, Blue Shield CA, Kaiser', active: true },
  '33101': { state: 'Florida',     code: 'FL', insurers: 'Medicare Part A & B, Humana Gold, Aetna',     active: true },
  '73301': { state: 'Texas',       code: 'TX', insurers: 'Medicare Part A & B, BCBS Texas, Humana',     active: true },
  '60601': { state: 'Illinois',    code: 'IL', insurers: 'Medicare Part A & B, BCBS Illinois, Aetna',   active: true },
  '02101': { state: 'Massachusetts', code: 'MA', insurers: 'Medicare Part A & B, Blue Cross, Tufts',    active: true },
};

const INSURERS = [
  { name: 'Medicare',        type: 'Part A + B' },
  { name: 'Medicaid',        type: 'All states' },
  { name: 'Blue Cross',      type: 'BCBS network' },
  { name: 'Aetna',           type: 'All plans' },
  { name: 'UnitedHealth',    type: 'All plans' },
  { name: 'Humana',          type: 'All plans' },
  { name: 'Kaiser',          type: 'Select regions' },
  { name: 'Cigna',           type: 'All plans' },
  { name: 'Anthem',          type: 'All plans' },
  { name: 'Tricare',         type: 'Veterans' },
  { name: 'VA Benefits',     type: 'Full coverage' },
  { name: 'Private Pay',     type: 'Flexible terms' },
];

const ANSWERS = [
  {
    Icon: Clock247,
    question: 'How fast can we verify?',
    answer: 'Within 24 hours. We call your plan directly so your family never has to.',
  },
  {
    Icon: ShieldCheck,
    question: 'What if you\'re not in-network?',
    answer: 'We will tell you in plain English — and often, out-of-network visits are still covered under your home-health benefit.',
  },
  {
    Icon: Heartbeat,
    question: 'Will Medicare really cover everything?',
    answer: 'For clinically eligible patients, yes — nursing, therapy and aide visits at 100%. We walk you through eligibility free.',
  },
  {
    Icon: Award,
    question: 'What about copays or surprise bills?',
    answer: 'None. We bill directly. You see every charge before it happens, and we flag anything your plan may not cover.',
  },
];

function Coverage() {
  const sectionRef = useRef(null);
  const [zip, setZip] = useState('');
  const [result, setResult] = useState(null);
  const [checking, setChecking] = useState(false);
  const inputRef = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;

      gsap.from('.hv-cov__eyebrow, .hv-cov__title-line, .hv-cov__sub, .hv-cov__hero-stat', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.07,
        scrollTrigger: { trigger: '.hv-cov__head', start: 'top 80%' },
      });

      gsap.fromTo(
        '.hv-cov__state',
        { scale: 0.3, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.55,
          ease: 'back.out(1.6)',
          stagger: { each: 0.012, from: 'random' },
          immediateRender: false,
          scrollTrigger: { trigger: '.hv-cov__map', start: 'top 80%', toggleActions: 'play none none none' },
        }
      );

      gsap.fromTo(
        '.hv-cov__check, .hv-cov__insurers-wrap',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          immediateRender: false,
          scrollTrigger: { trigger: '.hv-cov__split', start: 'top 80%', toggleActions: 'play none none none' },
        }
      );

      gsap.fromTo(
        '.hv-cov__answer',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          immediateRender: false,
          scrollTrigger: { trigger: '.hv-cov__answers', start: 'top 85%', toggleActions: 'play none none none' },
        }
      );

      // Subtle 3D tilt reaction on map hover
      const grid = sectionRef.current?.querySelector('.hv-cov__grid');
      if (grid && window.matchMedia('(min-width: 900px)').matches) {
        const handleMove = (e) => {
          const rect = grid.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(grid, {
            rotateX: 12 + y * -6,
            rotateY: x * 10,
            duration: 0.6,
            ease: 'power2.out',
          });
        };
        const handleLeave = () => {
          gsap.to(grid, { rotateX: 12, rotateY: 0, duration: 0.8, ease: 'power2.out' });
        };
        grid.addEventListener('mousemove', handleMove);
        grid.addEventListener('mouseleave', handleLeave);
        return () => {
          grid.removeEventListener('mousemove', handleMove);
          grid.removeEventListener('mouseleave', handleLeave);
        };
      }
    },
    { scope: sectionRef }
  );

  const handleCheck = (e) => {
    e.preventDefault();
    if (!zip.trim() || zip.length !== 5) return;
    setChecking(true);
    // Simulated lookup with tiny delay to feel real
    setTimeout(() => {
      const match = ZIP_DATABASE[zip];
      setResult(
        match ?? {
          ok: false,
          state: 'Your area',
          code: '',
          message: 'We are not fully active in this ZIP yet — but we will email you the day we are. A care advisor can also discuss private-pay options today.',
          active: false,
        }
      );
      setChecking(false);
    }, 420);
  };

  const handleReset = () => {
    setZip('');
    setResult(null);
    setTimeout(() => inputRef.current?.focus(), 60);
  };

  return (
    <section
      ref={sectionRef}
      className="hv-cov"
      id="coverage"
      aria-labelledby="hv-cov-title"
    >
      <div className="hv-cov__wrap">
        {/* HEAD */}
        <div className="hv-cov__head">
          <span className="hv-cov__eyebrow">
            <span className="hv-cov__eyebrow-dot" aria-hidden="true" />
            <Plus width={13} height={13} />
            Coverage
          </span>

          <h2 id="hv-cov-title" className="hv-cov__title">
            <span className="hv-cov__title-line">Covered where you are,</span>
            <span className="hv-cov__title-line">
              by <em>what</em> you already have.
            </span>
          </h2>

          <p className="hv-cov__sub">
            Haven accepts Medicare, Medicaid, and the major private insurers
            in {ACTIVE_COUNT} states — with coverage verified within 24 hours, in plain
            English, before your first visit.
          </p>

          <dl className="hv-cov__hero-stats">
            <div className="hv-cov__hero-stat">
              <dt>{ACTIVE_COUNT}</dt>
              <dd>States active today</dd>
            </div>
            <div className="hv-cov__hero-stat">
              <dt>99%</dt>
              <dd>Of U.S. insurers accepted</dd>
            </div>
            <div className="hv-cov__hero-stat">
              <dt>&lt; 24h</dt>
              <dd>Coverage verified</dd>
            </div>
          </dl>
        </div>

        {/* SPLIT — map left, coverage check right */}
        <div className="hv-cov__split">
          {/* MAP */}
          <div className="hv-cov__map">
            <div className="hv-cov__map-head">
              <div className="hv-cov__map-head-left">
                <span className="hv-cov__map-eyebrow">Service map</span>
                <span className="hv-cov__map-count">
                  <strong>{ACTIVE_COUNT}</strong> active
                  <span className="hv-cov__map-count-sep">·</span>
                  <em>{COMING_COUNT}</em> coming
                </span>
              </div>
              <div className="hv-cov__map-legend">
                <span className="hv-cov__map-legend-item">
                  <span className="hv-cov__map-legend-dot hv-cov__map-legend-dot--on" />
                  Active
                </span>
                <span className="hv-cov__map-legend-item">
                  <span className="hv-cov__map-legend-dot hv-cov__map-legend-dot--off" />
                  Coming 2025
                </span>
              </div>
            </div>

            <div className="hv-cov__grid-wrap">
              {/* Blueprint backdrop */}
              <div className="hv-cov__grid-bg" aria-hidden="true">
                <div className="hv-cov__grid-bg-lines" />
                <span className="hv-cov__grid-bg-wordmark">HAVEN · USA</span>
              </div>

              <div className="hv-cov__grid" role="list">
                {US_STATES.map(([code, name, col, row, covered, meta]) => {
                  const isHighlighted = result && result.code === code;
                  const span = meta?.span ?? 1;
                  return (
                    <span
                      key={code}
                      role="listitem"
                      className={`hv-cov__state${covered ? ' is-active' : ''}${isHighlighted ? ' is-highlighted' : ''}${span > 1 ? ' is-wide' : ''}`}
                      style={{
                        gridColumn: `${col} / span ${span}`,
                        gridRow: row,
                      }}
                      data-state={code}
                      data-region={regionOf(code)}
                    >
                      <span className="hv-cov__state-code">{code}</span>
                      <span className="hv-cov__state-tooltip">
                        {name}
                        <span className="hv-cov__state-status">
                          {covered ? 'Active' : 'Coming 2025'}
                        </span>
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Region legend */}
            <ul className="hv-cov__regions" role="list">
              {Object.entries(REGIONS).map(([key, { label }]) => (
                <li key={key} className="hv-cov__region" data-region={key}>
                  <span className="hv-cov__region-dot" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>

            <div className="hv-cov__map-foot">
              <MapPin width={14} height={14} />
              <span>
                Not seeing your state? <a href="#contact">Join the waitlist</a> — we expand where families ask us to.
              </span>
            </div>
          </div>

          {/* CHECK WIDGET */}
          <aside className="hv-cov__check">
            <div className="hv-cov__check-head">
              <span className="hv-cov__check-eyebrow">
                <ShieldCheck width={13} height={13} />
                Instant coverage check
              </span>
              <h3 className="hv-cov__check-title">
                Are <em>you</em> covered? Let's find out in seconds.
              </h3>
              <p className="hv-cov__check-sub">
                Enter your ZIP. We'll tell you which Haven services and insurers
                are available in your area — before you fill out anything else.
              </p>
            </div>

            {!result && (
              <form className="hv-cov__check-form" onSubmit={handleCheck}>
                <div className="hv-cov__check-field">
                  <label htmlFor="hv-cov-zip" className="hv-cov__check-label">
                    ZIP code
                  </label>
                  <input
                    ref={inputRef}
                    id="hv-cov-zip"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{5}"
                    maxLength="5"
                    placeholder="10001"
                    value={zip}
                    onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
                    className="hv-cov__check-input"
                    aria-describedby="hv-cov-zip-hint"
                    autoComplete="postal-code"
                  />
                  <span id="hv-cov-zip-hint" className="hv-cov__check-hint">
                    5-digit U.S. ZIP · Try 10001, 90001, 33101
                  </span>
                </div>

                <button
                  type="submit"
                  className={`hv-cov__check-btn${checking ? ' is-checking' : ''}`}
                  disabled={zip.length !== 5 || checking}
                >
                  <span>{checking ? 'Checking…' : 'Check my coverage'}</span>
                  {!checking && <ArrowRight width={14} height={14} />}
                </button>
              </form>
            )}

            {result && result.active && (
              <div className="hv-cov__check-result is-active" role="status" aria-live="polite">
                <div className="hv-cov__check-result-head">
                  <span className="hv-cov__check-result-icon">
                    <ShieldCheck width={20} height={20} />
                  </span>
                  <div className="hv-cov__check-result-body">
                    <strong>You're covered in {result.state}.</strong>
                    <span>{result.insurers} accepted in ZIP {zip}.</span>
                  </div>
                </div>

                <div className="hv-cov__check-result-actions">
                  <a href="#contact" className="hv-cov__check-result-cta">
                    Start free intake
                    <ArrowRight width={12} height={12} />
                  </a>
                  <button
                    type="button"
                    className="hv-cov__check-result-reset"
                    onClick={handleReset}
                  >
                    <span aria-hidden="true">↻</span>
                    Search another ZIP
                  </button>
                </div>
              </div>
            )}

            {result && !result.active && (
              <div className="hv-cov__check-result is-waitlist" role="status" aria-live="polite">
                <div className="hv-cov__check-result-head">
                  <span className="hv-cov__check-result-icon hv-cov__check-result-icon--soft">
                    <Calendar width={20} height={20} />
                  </span>
                  <div className="hv-cov__check-result-body">
                    <strong>Not active in ZIP {zip} — yet.</strong>
                    <span>{result.message}</span>
                  </div>
                </div>

                <div className="hv-cov__check-result-actions">
                  <a href="#contact" className="hv-cov__check-result-cta">
                    Join the waitlist
                    <ArrowRight width={12} height={12} />
                  </a>
                  <button
                    type="button"
                    className="hv-cov__check-result-reset"
                    onClick={handleReset}
                  >
                    <span aria-hidden="true">↻</span>
                    Try another ZIP
                  </button>
                </div>
              </div>
            )}

            <div className="hv-cov__check-trust">
              <Clock247 width={13} height={13} />
              <span>
                <strong>24-hour verification.</strong> We call your plan so you don't have to.
              </span>
            </div>
          </aside>
        </div>

        {/* INSURERS STRIP */}
        <div className="hv-cov__insurers-wrap">
          <div className="hv-cov__insurers-head">
            <span className="hv-cov__insurers-eyebrow">
              <ShieldCheck width={13} height={13} />
              Insurers we work with
            </span>
            <span className="hv-cov__insurers-count">
              12 + top-tier plans · All 50 states by 2026
            </span>
          </div>

          <ul className="hv-cov__insurers" role="list">
            {INSURERS.map(({ name, type }) => (
              <li key={name} className="hv-cov__insurer">
                <span className="hv-cov__insurer-check" aria-hidden="true">
                  <ShieldCheck width={13} height={13} />
                </span>
                <span className="hv-cov__insurer-meta">
                  <span className="hv-cov__insurer-name">{name}</span>
                  <span className="hv-cov__insurer-type">{type}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ANSWERS */}
        <div className="hv-cov__answers-wrap">
          <div className="hv-cov__answers-head">
            <span className="hv-cov__answers-eyebrow">Fine-print questions</span>
            <h3 className="hv-cov__answers-title">
              The things families usually ask us <em>right before</em> they sign on.
            </h3>
          </div>

          <ul className="hv-cov__answers" role="list">
            {ANSWERS.map(({ Icon, question, answer }, i) => (
              <li key={question} className="hv-cov__answer">
                <span className="hv-cov__answer-num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="hv-cov__answer-icon" aria-hidden="true">
                  <Icon width={18} height={18} />
                </span>
                <h4 className="hv-cov__answer-question">{question}</h4>
                <p className="hv-cov__answer-body">{answer}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* FOOT */}
        <div className="hv-cov__foot">
          <p className="hv-cov__foot-text">
            Coverage is the easy part. We handle the verification, the
            pre-authorizations, and the billing — your family just shows up.
          </p>
          <a href="#contact" className="hv-cov__foot-cta">
            <span>Verify my coverage — free</span>
            <ArrowRight width={14} height={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Coverage;
