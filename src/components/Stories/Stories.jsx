import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Star,
  ArrowUpRight,
  MessageQuote,
  Plus,
  Heart,
  MapPin,
  Clock247,
  ShieldCheck,
  Heartbeat,
  PlayCircle,
  Calendar,
  HomeHealth,
} from '../Hero/icons.jsx';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Featured story — the full emotional arc, with measurable outcomes
const FEATURED = {
  id: 'maria-c',
  quote:
    'After Mom\'s stroke we thought she would never climb her own stairs again. Fourteen months later, she is up there watering her orchids. The same Haven nurse came every Tuesday. My mother learned her name before she learned mine again.',
  author: 'Maria C.',
  initials: 'MC',
  relation: 'Daughter, primary caregiver',
  location: 'San Diego, CA',
  patient: 'Mom, 82',
  condition: 'Post-stroke recovery',
  startDate: 'March 2023',
  endDate: 'May 2024',
  duration: '14 months',
  services: ['Skilled Nursing', 'Physical Therapy', 'Speech Therapy'],
  outcomes: [
    { value: '3 days', label: 'First call → first nurse visit' },
    { value: '0', label: 'Hospital readmissions in 14 months' },
    { value: '100%', label: 'Covered by Medicare Part A + B' },
  ],
  rating: 5,
  image:
    'https://images.unsplash.com/photo-1659353886618-d0b221f71fa3?w=1400&q=88&auto=format&fit=crop',
  imageAlt: 'Maria with her mother at home after recovery',
  videoLength: '2:48',
  verified: 'Verified Haven family · Care ended May 2024',
};

// 12 supporting stories — diverse conditions, family shapes, outcomes
const AVATAR_URLS = [
  'https://images.unsplash.com/photo-1659353886618-d0b221f71fa3?w=200&q=80&auto=format&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1631815590016-ebce183022ce?w=200&q=80&auto=format&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1631815590058-860e4f83c1e8?w=200&q=80&auto=format&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1666886573553-6548db92db79?w=200&q=80&auto=format&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1765896387387-0538bc9f997e?w=200&q=80&auto=format&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80&auto=format&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&q=80&auto=format&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80&auto=format&fit=crop&crop=faces',
];

const STORIES = [
  {
    id: 'david-r',
    quote:
      'Dad wanted to stay home, and Haven made that possible with real dignity. Sarah walked us through every Medicare form step by step, so there were no surprises — just clear answers and steady care.',
    author: 'David R.',
    relation: 'Son · power of attorney',
    location: 'Austin, TX',
    patient: 'Dad, 79',
    condition: 'Congestive heart failure',
    duration: '8 months · ongoing',
    startDate: 'Aug 2024',
    services: ['Skilled Nursing', 'Social Work'],
    outcome: { value: '2', label: 'ER visits avoided' },
    rating: 5,
    tone: 'sage',
    avatar: AVATAR_URLS[2],
  },
  {
    id: 'priya-s',
    quote:
      'My grandmother feels most at ease in Hindi, so finding a caregiver who spoke her language mattered to us. Haven matched her with someone kind and fluent within two days — and you could see the comfort on her face from the very first visit.',
    author: 'Priya S.',
    relation: 'Granddaughter · coordinator',
    location: 'Jersey City, NJ',
    patient: 'Grandmother, 88',
    condition: 'Type-2 diabetes',
    duration: '6 months',
    startDate: 'Nov 2024',
    services: ['Home Health Aide', 'Skilled Nursing'],
    outcome: { value: '48 h', label: 'Language match secured' },
    rating: 5,
    tone: 'teal',
    avatar: AVATAR_URLS[5],
  },
  {
    id: 'angela-w',
    quote:
      'The occupational therapist walked through every room with us and made thoughtful recommendations — a shower bench, grab bars, and a safer rug for the hallway. Michael feels steady on his feet again, and he is walking without his cane.',
    author: 'Angela W.',
    relation: 'Wife · primary caregiver',
    location: 'Phoenix, AZ',
    patient: 'Husband, 71',
    condition: 'Hip replacement',
    duration: '4 months post-op',
    startDate: 'Jan 2025',
    services: ['Occupational Therapy', 'Physical Therapy'],
    outcome: { value: '0', label: 'Falls during recovery' },
    rating: 5,
    tone: 'accent',
    avatar: AVATAR_URLS[1],
  },
  {
    id: 'james-t',
    quote:
      'They send a thoughtful daily note through the app — what Mom ate, how she slept, what meds she took. I live three states away, and that little update every morning gives me such peace of mind. I finally feel connected to her day again.',
    author: 'James T.',
    relation: 'Son · long-distance caregiver',
    location: 'Seattle, WA',
    patient: 'Mom, 84',
    condition: 'Early-stage dementia',
    duration: '11 months · ongoing',
    startDate: 'May 2024',
    services: ['Home Health Aide', 'Social Work'],
    outcome: { value: 'Daily', label: 'Visit notes to family' },
    rating: 5,
    tone: 'rose',
    avatar: AVATAR_URLS[7],
  },
  {
    id: 'rosa-m',
    quote:
      'The wound on Dad\'s foot healed beautifully in just six weeks. Our Haven nurse was patient and generous with her knowledge — she taught me the right techniques and made me feel confident caring for him between visits.',
    author: 'Rosa M.',
    relation: 'Daughter · caregiver',
    location: 'Miami, FL',
    patient: 'Dad, 76',
    condition: 'Diabetic wound care',
    duration: '6 weeks',
    startDate: 'Feb 2025',
    services: ['Skilled Nursing'],
    outcome: { value: '6 wks', label: 'Wound fully closed' },
    rating: 5,
    tone: 'plum',
    avatar: AVATAR_URLS[0],
  },
  {
    id: 'tom-b',
    quote:
      'My wife can climb the stairs again without stopping — a small thing that feels like a miracle. The respiratory therapist visits twice a week, brought us a portable pulse oximeter, and gently walked us through the numbers so we feel in control at home.',
    author: 'Tom B.',
    relation: 'Husband · caregiver',
    location: 'Pittsburgh, PA',
    patient: 'Wife, 68',
    condition: 'COPD',
    duration: '5 months',
    startDate: 'Dec 2024',
    services: ['Skilled Nursing', 'Physical Therapy'],
    outcome: { value: '2×/wk', label: 'Respiratory therapy at home' },
    rating: 5,
    tone: 'indigo',
    avatar: AVATAR_URLS[4],
  },
  {
    id: 'linda-o',
    quote:
      'Haven cared for my father with so much tenderness in his final weeks — in his own bed, comfortable, with his grandchildren close by. They honored his wishes every step of the way, and I will always be grateful for the peace they gave our family.',
    author: 'Linda O.',
    relation: 'Daughter',
    location: 'Denver, CO',
    patient: 'Father, 81',
    condition: 'Hospice & palliative',
    duration: 'Final 3 months',
    startDate: 'Sep 2024',
    services: ['Skilled Nursing', 'Social Work', 'Home Health Aide'],
    outcome: { value: 'At home', label: 'End-of-life, with dignity' },
    rating: 5,
    tone: 'rose',
    avatar: AVATAR_URLS[6],
  },
  {
    id: 'kevin-j',
    quote:
      'Six weeks after my valve replacement I was walking a mile a day. My PT scaled everything up gradually — steady heart rate, no setbacks, and she celebrated every milestone with me. Recovering at home felt calm, supported, and deeply reassuring.',
    author: 'Kevin J.',
    relation: 'Patient',
    location: 'Chicago, IL',
    patient: 'Self, 64',
    condition: 'Cardiac rehabilitation',
    duration: '10 weeks',
    startDate: 'Oct 2024',
    services: ['Physical Therapy', 'Skilled Nursing'],
    outcome: { value: '6 wks', label: 'Walking 1 mile per day' },
    rating: 5,
    tone: 'teal',
    avatar: AVATAR_URLS[3],
  },
  {
    id: 'nancy-w',
    quote:
      'The tremor is still there, but Mom feels steady on her feet again — and that is everything. At 79 she is still happily in her own home, with the right routine, the right medications, and a Haven team that truly cares about her.',
    author: 'Nancy W.',
    relation: 'Daughter',
    location: 'Boston, MA',
    patient: 'Mom, 79',
    condition: 'Parkinson\'s disease',
    duration: '9 months · ongoing',
    startDate: 'Jul 2024',
    services: ['Occupational Therapy', 'Skilled Nursing'],
    outcome: { value: '0', label: 'Falls in 9 months' },
    rating: 5,
    tone: 'sage',
    avatar: AVATAR_URLS[1],
  },
  {
    id: 'isabella-r',
    quote:
      'Between chemo cycles, the Haven nurse kept a careful eye on Mom\'s counts and stayed in close touch with her oncologist whenever something needed attention. Their communication was seamless, and Mom felt cared for through every step of her treatment.',
    author: 'Isabella R.',
    relation: 'Daughter',
    location: 'Albuquerque, NM',
    patient: 'Mom, 67',
    condition: 'Oncology support',
    duration: '7 months',
    startDate: 'Jun 2024',
    services: ['Skilled Nursing', 'Social Work'],
    outcome: { value: '0', label: 'ER visits during chemo' },
    rating: 5,
    tone: 'amber',
    avatar: AVATAR_URLS[0],
  },
  {
    id: 'patricia-k',
    quote:
      'Three weeks after surgery I was climbing stairs on my own. My PT arrived like clockwork, the same days every week — dependable, encouraging, and genuinely invested in my progress. Recovering at home was everything I hoped it would be.',
    author: 'Patricia K.',
    relation: 'Patient',
    location: 'Portland, OR',
    patient: 'Self, 68',
    condition: 'Knee replacement',
    duration: '8 weeks',
    startDate: 'Mar 2025',
    services: ['Physical Therapy', 'Occupational Therapy'],
    outcome: { value: '3 wks', label: 'Stairs unassisted' },
    rating: 5,
    tone: 'mint',
    avatar: AVATAR_URLS[5],
  },
  {
    id: 'robert-c',
    quote:
      'For eighteen months, even simple daily tasks felt out of reach. My OT met me exactly where I was and helped me rebuild my routines one small, encouraging step at a time. I am working part-time again — and I feel like myself once more.',
    author: 'Robert C.',
    relation: 'Patient',
    location: 'Nashville, TN',
    patient: 'Self, 54',
    condition: 'Long COVID recovery',
    duration: '9 months',
    startDate: 'Apr 2024',
    services: ['Occupational Therapy', 'Speech Therapy'],
    outcome: { value: 'Back to', label: 'part-time work' },
    rating: 5,
    tone: 'indigo',
    avatar: AVATAR_URLS[2],
  },
];

// Outcomes averaged across the Haven population — the "why you should trust us" numbers
const OUTCOMES = [
  {
    value: '43%',
    label: 'Fewer hospital readmissions',
    detail: 'vs. national home-health average (CMS, 2024)',
    Icon: Heartbeat,
  },
  {
    value: '2.4×',
    label: 'Faster return to daily activities',
    detail: 'measured against CMS OASIS functional scores',
    Icon: HomeHealth,
  },
  {
    value: '96%',
    label: 'Kept the same clinician',
    detail: 'across their entire episode of care',
    Icon: ShieldCheck,
  },
  {
    value: '4.9/5',
    label: 'Family satisfaction',
    detail: 'across 2,400+ verified reviews in 2024',
    Icon: Star,
  },
];

// Conditions we commonly treat — a reassuring "we\'ve seen this" signal
const CONDITIONS = [
  'Post-surgical recovery',
  'Stroke rehabilitation',
  'Congestive heart failure',
  'COPD & respiratory care',
  'Diabetes management',
  'Wound care',
  'Early-stage dementia',
  'Parkinson\'s disease',
  'Hospice & palliative',
  'Orthopedic rehab',
  'Cardiac recovery',
  'Oncology support',
];

const REVIEW_SOURCES = [
  { name: 'Google Reviews',         rating: '4.9', count: '1,840+ reviews' },
  { name: 'Caring.com',             rating: '4.8', count: '620+ reviews' },
  { name: 'Medicare Compare',       rating: '5★',  count: 'Top-tier rating' },
  { name: 'Better Business Bureau', rating: 'A+',  count: 'Accredited since 2015' },
];

function Stories() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;

      gsap.from('.hv-stories__eyebrow, .hv-stories__title-line, .hv-stories__sub, .hv-stories__rating', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.hv-stories__head', start: 'top 80%' },
      });

      gsap.fromTo(
        '.hv-stories__featured',
        { y: 60, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: { trigger: '.hv-stories__featured', start: 'top 85%', toggleActions: 'play none none none' },
        }
      );

      gsap.fromTo(
        '.hv-stories__outcome',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.1,
          immediateRender: false,
          scrollTrigger: { trigger: '.hv-stories__outcomes', start: 'top 85%', toggleActions: 'play none none none' },
        }
      );

      gsap.fromTo(
        '.hv-stories__card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          immediateRender: false,
          scrollTrigger: { trigger: '.hv-stories__grid', start: 'top 85%', toggleActions: 'play none none none' },
        }
      );

      gsap.fromTo(
        '.hv-stories__source',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.08,
          immediateRender: false,
          scrollTrigger: { trigger: '.hv-stories__sources', start: 'top 90%', toggleActions: 'play none none none' },
        }
      );

      if (window.matchMedia('(min-width: 900px)').matches) {
        gsap.to('.hv-stories__featured-img', {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hv-stories__featured',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="hv-stories"
      id="stories"
      aria-labelledby="hv-stories-title"
    >
      <div className="hv-stories__wrap">
        {/* HEAD */}
        <div className="hv-stories__head">
          <div className="hv-stories__head-left">
            <span className="hv-stories__eyebrow">
              <span className="hv-stories__eyebrow-dot" aria-hidden="true" />
              <Plus width={13} height={13} />
              Family Stories
            </span>

            <h2 id="hv-stories-title" className="hv-stories__title">
              <span className="hv-stories__title-line">The proof isn't paperwork.</span>
              <span className="hv-stories__title-line">
                It's in what <em>families</em> remember.
              </span>
            </h2>

            <p className="hv-stories__sub">
              Every Haven family writes their own story. Here are five — in
              their own words, unedited, with the outcomes and dates that
              actually mattered to them.
            </p>
          </div>

          <aside className="hv-stories__rating">
            <div className="hv-stories__rating-value">
              <span className="hv-stories__rating-num">4.9</span>
              <span className="hv-stories__rating-of">/ 5</span>
            </div>
            <div className="hv-stories__rating-stars" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Star key={i} width={14} height={14} />
              ))}
            </div>
            <span className="hv-stories__rating-label">
              Across 2,400+ verified family reviews
            </span>
            <span className="hv-stories__rating-verify">
              <ShieldCheck width={11} height={11} />
              HIPAA-verified testimonials
            </span>
          </aside>
        </div>

        {/* FEATURED STORY */}
        <article className="hv-stories__featured">
          <div className="hv-stories__featured-media">
            <img
              className="hv-stories__featured-img"
              src={FEATURED.image}
              alt={FEATURED.imageAlt}
              loading="lazy"
              decoding="async"
            />
            <div className="hv-stories__featured-overlay" aria-hidden="true" />

            <span className="hv-stories__featured-label">
              <Heart width={13} height={13} />
              Featured family story
            </span>

            <button type="button" className="hv-stories__featured-play" aria-label="Watch Maria's full story">
              <span className="hv-stories__featured-play-icon">
                <PlayCircle width={28} height={28} />
              </span>
              <span className="hv-stories__featured-play-meta">
                <span className="hv-stories__featured-play-label">Watch the story</span>
                <span className="hv-stories__featured-play-length">{FEATURED.videoLength}</span>
              </span>
            </button>

            <span className="hv-stories__featured-watermark" aria-hidden="true">
              &ldquo;
            </span>
          </div>

          <div className="hv-stories__featured-content">
            <div className="hv-stories__featured-top">
              <div className="hv-stories__featured-stars" aria-hidden="true">
                {[...Array(FEATURED.rating)].map((_, i) => (
                  <Star key={i} width={15} height={15} />
                ))}
              </div>
              <span className="hv-stories__featured-verify">
                <ShieldCheck width={11} height={11} />
                {FEATURED.verified}
              </span>
            </div>

            <blockquote className="hv-stories__featured-quote">
              {FEATURED.quote}
            </blockquote>

            {/* CONDITION BADGE */}
            <div className="hv-stories__featured-condition">
              <span className="hv-stories__featured-condition-label">Condition</span>
              <span className="hv-stories__featured-condition-name">{FEATURED.condition}</span>
            </div>

            {/* OUTCOMES — the numbers that built trust */}
            <div className="hv-stories__featured-outcomes">
              <span className="hv-stories__featured-outcomes-label">
                <Heartbeat width={12} height={12} />
                Outcomes
              </span>
              <dl>
                {FEATURED.outcomes.map((o) => (
                  <div key={o.label}>
                    <dt>{o.value}</dt>
                    <dd>{o.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="hv-stories__featured-meta">
              <div className="hv-stories__featured-author">
                <span className="hv-stories__featured-avatar" data-tone="warm" aria-hidden="true">
                  {FEATURED.initials}
                </span>
                <div className="hv-stories__featured-author-text">
                  <span className="hv-stories__featured-name">{FEATURED.author}</span>
                  <span className="hv-stories__featured-relation">
                    {FEATURED.relation}
                    <span className="hv-stories__featured-dot" aria-hidden="true"> · </span>
                    <MapPin width={11} height={11} />
                    {FEATURED.location}
                  </span>
                </div>
              </div>

              <div className="hv-stories__featured-dates">
                <div>
                  <dt><Calendar width={11} height={11} /> Care window</dt>
                  <dd>{FEATURED.startDate} – {FEATURED.endDate}</dd>
                </div>
                <div>
                  <dt><Clock247 width={11} height={11} /> Duration</dt>
                  <dd>{FEATURED.duration}</dd>
                </div>
              </div>

              <ul className="hv-stories__featured-tags" role="list">
                {FEATURED.services.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>

        {/* OUTCOMES STRIP — aggregated metrics */}
        <div className="hv-stories__outcomes-wrap">
          <div className="hv-stories__outcomes-head">
            <span className="hv-stories__outcomes-eyebrow">Our patients, in numbers</span>
            <h3 className="hv-stories__outcomes-title">
              What a year of Haven care <em>actually</em> produces.
            </h3>
          </div>

          <ul className="hv-stories__outcomes" role="list">
            {OUTCOMES.map(({ value, label, detail, Icon }) => (
              <li key={label} className="hv-stories__outcome">
                <span className="hv-stories__outcome-icon" aria-hidden="true">
                  <Icon width={18} height={18} />
                </span>
                <span className="hv-stories__outcome-value">{value}</span>
                <span className="hv-stories__outcome-label">{label}</span>
                <span className="hv-stories__outcome-detail">{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CARDS GRID */}
        <ul className="hv-stories__grid" role="list">
          {STORIES.map((s) => (
            <li key={s.id} className="hv-stories__card" data-tone={s.tone}>
              {/* header row: avatar + stars + date */}
              <header className="hv-stories__card-header">
                <span className="hv-stories__card-avatar" aria-hidden="true">
                  <img src={s.avatar} alt="" loading="lazy" decoding="async" />
                </span>
                <div className="hv-stories__card-header-meta">
                  <div className="hv-stories__card-stars" aria-hidden="true">
                    {[...Array(s.rating)].map((_, si) => (
                      <Star key={si} width={11} height={11} />
                    ))}
                  </div>
                  <span className="hv-stories__card-date">
                    <Calendar width={10} height={10} />
                    Since {s.startDate}
                  </span>
                </div>
              </header>

              {/* condition badge */}
              <span className="hv-stories__card-condition">
                <Heartbeat width={12} height={12} />
                {s.condition}
              </span>

              <blockquote className="hv-stories__card-quote">
                <span className="hv-stories__card-quote-mark" aria-hidden="true">“</span>
                {s.quote}
              </blockquote>

              {/* outcome callout — one tangible result */}
              <div className="hv-stories__card-outcome">
                <span className="hv-stories__card-outcome-value">{s.outcome.value}</span>
                <span className="hv-stories__card-outcome-label">{s.outcome.label}</span>
              </div>

              <ul className="hv-stories__card-tags" role="list">
                {s.services.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>

              {/* footer */}
              <footer className="hv-stories__card-foot">
                <div className="hv-stories__card-author">
                  <span className="hv-stories__card-name">{s.author}</span>
                  <span className="hv-stories__card-relation">{s.relation}</span>
                </div>
                <div className="hv-stories__card-location">
                  <MapPin width={10} height={10} />
                  {s.location}
                </div>
              </footer>

              <div className="hv-stories__card-patient">
                {s.patient}
                <span className="hv-stories__card-dot" aria-hidden="true"> · </span>
                {s.duration}
              </div>
            </li>
          ))}
        </ul>

        {/* CONDITIONS STRIP — reassuring range */}
        <div className="hv-stories__conditions">
          <span className="hv-stories__conditions-label">
            <ShieldCheck width={13} height={13} />
            Conditions we treat every day
          </span>
          <ul className="hv-stories__conditions-list" role="list">
            {CONDITIONS.map((c) => (
              <li key={c} className="hv-stories__conditions-item">
                <span className="hv-stories__conditions-dot" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* REVIEW SOURCES */}
        <div className="hv-stories__sources-wrap">
          <span className="hv-stories__sources-label">
            <ShieldCheck width={13} height={13} />
            Verified on
          </span>
          <ul className="hv-stories__sources" role="list">
            {REVIEW_SOURCES.map((src) => (
              <li key={src.name} className="hv-stories__source">
                <span className="hv-stories__source-rating">{src.rating}</span>
                <div className="hv-stories__source-meta">
                  <span className="hv-stories__source-name">{src.name}</span>
                  <span className="hv-stories__source-count">{src.count}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* FOOT */}
        <div className="hv-stories__foot">
          <p className="hv-stories__foot-text">
            Every story here comes from a real Haven family, published with
            their consent. Want to hear more?
          </p>
          <a href="#all-stories" className="hv-stories__foot-cta">
            <span>Read all 2,400+ family stories</span>
            <ArrowUpRight width={14} height={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Stories;
