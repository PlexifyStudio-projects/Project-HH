import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Heartbeat,
  ShieldCheck,
  Users,
  MessageQuote,
  Award,
  Stethoscope,
  HomeHealth,
  Plus,
  ArrowUpRight,
  Sparkles,
} from '../Hero/icons.jsx';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// 1 featured + 4 supporting. Elena carries the Medical Director profile deeper.
const TEAM = [
  {
    id: 'elena',
    name: 'Dr. Elena Márquez',
    firstName: 'Elena',
    lastName: 'Márquez',
    role: 'Medical Director',
    credentials: 'MD · Board-Certified Internal Medicine',
    tenure: '18 yrs',
    languages: ['English', 'Spanish'],
    specialty: 'Complex chronic care',
    patients: '2,400+',
    trained: 'Johns Hopkins',
    bio:
      'Dr. Márquez leads the Haven clinical council, setting protocol for every care plan that goes out. A decade in hospital internal medicine before choosing home — because that is where most recovery actually lives.',
    quote:
      'Home is where recovery actually happens. My job is to make sure the plan fits the person, not the chart.',
    image:
      'https://images.unsplash.com/photo-1666886573553-6548db92db79?w=1400&q=88&auto=format&fit=crop',
    Icon: Stethoscope,
    featured: true,
  },
  {
    id: 'sarah',
    name: 'Sarah Thompson',
    role: 'Lead Care Manager',
    credentials: 'RN · BSN · CRRN',
    tenure: '14 yrs',
    languages: ['English'],
    specialty: 'Post-surgical recovery',
    quote:
      'Families tell me they feel heard. That is not a feature — that is the entire job.',
    image:
      'https://images.unsplash.com/photo-1631815590016-ebce183022ce?w=900&q=85&auto=format&fit=crop',
    Icon: Heartbeat,
  },
  {
    id: 'michael',
    name: 'Michael Chen',
    role: 'Physical Therapy Director',
    credentials: 'PT · DPT · OCS',
    tenure: '11 yrs',
    languages: ['English', 'Mandarin'],
    specialty: 'Mobility & fall prevention',
    quote:
      'Every step they take at home — that is the real win. We measure success in stairs, not reps.',
    image:
      'https://images.unsplash.com/photo-1631815590058-860e4f83c1e8?w=900&q=85&auto=format&fit=crop',
    Icon: HomeHealth,
  },
  {
    id: 'angela',
    name: 'Angela Okoye',
    role: 'Occupational Therapy Lead',
    credentials: 'OTR/L · CHT',
    tenure: '9 yrs',
    languages: ['English', 'French'],
    specialty: 'Home safety & adaptive living',
    quote:
      'Independence is made of small things — a grab bar, a reachable shelf, the right chair. We find them.',
    image:
      'https://images.unsplash.com/photo-1659353886618-d0b221f71fa3?w=900&q=85&auto=format&fit=crop',
    Icon: Users,
  },
  {
    id: 'james',
    name: 'James Rivera',
    role: 'Senior Home Health Aide',
    credentials: 'CNA · HHA · CPR',
    tenure: '7 yrs',
    languages: ['English', 'Spanish'],
    specialty: 'Daily living & companionship',
    quote:
      'Same face at the door every week. That trust is half the medicine.',
    image:
      'https://images.unsplash.com/photo-1765896387387-0538bc9f997e?w=900&q=85&auto=format&fit=crop',
    Icon: MessageQuote,
  },
];

// Scrolling credential ticker — expresses the depth of the team's licensing stack
const CREDENTIALS = [
  'MD', 'DO', 'RN', 'BSN', 'MSN', 'APRN', 'CRRN', 'PT', 'DPT',
  'OCS', 'OTR/L', 'CHT', 'SLP', 'CCC-SLP', 'LCSW', 'CNA', 'HHA',
  'CPR', 'ACLS', 'BLS', 'CHAP Accredited', 'Joint Commission', 'HIPAA',
];

const PILLARS = [
  {
    id: 'continuity',
    Icon: Users,
    label: 'Continuity',
    title: 'Same faces, every visit',
    body:
      'You are matched with a consistent clinician — not a rotating roster. Trust is built in repetition.',
    stat: '96%',
    statLabel: 'patients keep the same nurse for their entire episode',
  },
  {
    id: 'clinical',
    Icon: Stethoscope,
    label: 'Clinical rigor',
    title: 'RN-led, physician-signed',
    body:
      'Every care plan is authored by a registered nurse and co-signed by your physician of record.',
    stat: '100%',
    statLabel: 'plans reviewed by a board-certified physician',
  },
  {
    id: 'coverage',
    Icon: ShieldCheck,
    label: 'Coverage',
    title: 'Medicare, Medicaid & most insurance',
    body:
      'We verify benefits in real time and handle paperwork on your behalf — no surprises on day 30.',
    stat: '< 24 h',
    statLabel: 'average from first call to coverage confirmation',
  },
  {
    id: 'transparency',
    Icon: MessageQuote,
    label: 'Communication',
    title: 'Live notes, direct access',
    body:
      'Families see visit summaries the day they happen — and have a direct line to the care manager.',
    stat: '4.9 / 5',
    statLabel: 'satisfaction across 2,400+ families in the last year',
  },
];

function CareTeam() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;

      gsap.from('.hv-team__eyebrow, .hv-team__title-line, .hv-team__sub, .hv-team__head-stats', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.hv-team__head', start: 'top 80%' },
      });

      gsap.from('.hv-team__marquee', {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.hv-team__marquee', start: 'top 90%' },
      });

      gsap.fromTo(
        '.hv-team__card',
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          immediateRender: false,
          scrollTrigger: {
            trigger: '.hv-team__bento',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.hv-team__pillar',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.1,
          immediateRender: false,
          scrollTrigger: {
            trigger: '.hv-team__pillars-wrap',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Featured card — floating badge orbit
      gsap.to('.hv-team__featured-seal', {
        rotate: 360,
        duration: 40,
        ease: 'none',
        repeat: -1,
      });
    },
    { scope: sectionRef }
  );

  const featured = TEAM.find((t) => t.featured);
  const supporting = TEAM.filter((t) => !t.featured);

  return (
    <section
      ref={sectionRef}
      className="hv-team"
      id="care-team"
      aria-labelledby="hv-team-title"
    >
      <div className="hv-team__wrap">
        {/* HEAD */}
        <div className="hv-team__head">
          <div className="hv-team__head-left">
            <span className="hv-team__eyebrow">
              <span className="hv-team__eyebrow-dot" aria-hidden="true" />
              <Plus width={13} height={13} />
              Care Team
            </span>

            <h2 id="hv-team-title" className="hv-team__title">
              <span className="hv-team__title-line">Not just a service.</span>
              <span className="hv-team__title-line">
                The same <em>faces</em> at your door.
              </span>
            </h2>
          </div>

          <div className="hv-team__head-right">
            <p className="hv-team__sub">
              Haven is a network of registered nurses, therapists and aides
              licensed in your state — matched to your case and available to
              your family from day one.
            </p>

            <dl className="hv-team__head-stats">
              <div>
                <dt>420+</dt>
                <dd>Licensed clinicians</dd>
              </div>
              <div>
                <dt>12 yrs</dt>
                <dd>Average tenure</dd>
              </div>
              <div>
                <dt>22</dt>
                <dd>Languages spoken</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* CREDENTIAL MARQUEE */}
        <div className="hv-team__marquee" aria-hidden="true">
          <div className="hv-team__marquee-track">
            {[...CREDENTIALS, ...CREDENTIALS].map((c, i) => (
              <span key={i} className="hv-team__marquee-item">
                <span className="hv-team__marquee-dot" />
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* BENTO GRID — 1 featured + 4 supporting */}
        <div className="hv-team__bento">
          {/* FEATURED */}
          {featured && (
            <article className="hv-team__card hv-team__card--featured">
              <div className="hv-team__card-media hv-team__card-media--featured">
                <img
                  className="hv-team__card-img"
                  src={featured.image}
                  alt={`Portrait of ${featured.name}, ${featured.role}`}
                  loading="lazy"
                  decoding="async"
                />
                <div className="hv-team__card-overlay" aria-hidden="true" />

                {/* rotating seal */}
                <span className="hv-team__featured-seal" aria-hidden="true">
                  <svg viewBox="0 0 120 120" width="120" height="120">
                    <defs>
                      <path id="seal-path" d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
                    </defs>
                    <text fontFamily="'JetBrains Mono', monospace" fontSize="8.5" fontWeight="600" letterSpacing="4" fill="currentColor">
                      <textPath href="#seal-path">
                        · MEDICAL DIRECTOR · SINCE 2018 · HAVEN
                      </textPath>
                    </text>
                  </svg>
                  <span className="hv-team__featured-seal-dot">
                    <Sparkles width={16} height={16} />
                  </span>
                </span>

                <div className="hv-team__card-tags">
                  <span className="hv-team__card-role">
                    <featured.Icon width={13} height={13} />
                    {featured.role}
                  </span>
                  <span className="hv-team__card-chip">
                    <Award width={12} height={12} />
                    Trained at {featured.trained}
                  </span>
                </div>

                <div className="hv-team__featured-nameplate">
                  <span className="hv-team__featured-firstname">{featured.firstName}</span>
                  <span className="hv-team__featured-lastname">{featured.lastName}</span>
                </div>
              </div>

              <div className="hv-team__card-info hv-team__card-info--featured">
                <div className="hv-team__card-info-top">
                  <h3 className="hv-team__card-name">{featured.name}</h3>
                  <span className="hv-team__card-tenure">
                    <Award width={12} height={12} />
                    {featured.tenure}
                  </span>
                </div>

                <span className="hv-team__card-creds">{featured.credentials}</span>

                <p className="hv-team__featured-bio">{featured.bio}</p>

                <blockquote className="hv-team__featured-quote">
                  <span className="hv-team__featured-quote-mark" aria-hidden="true">“</span>
                  {featured.quote}
                </blockquote>

                <dl className="hv-team__featured-meta">
                  <div>
                    <dt>Specialty</dt>
                    <dd>{featured.specialty}</dd>
                  </div>
                  <div>
                    <dt>Languages</dt>
                    <dd>{featured.languages.join(' · ')}</dd>
                  </div>
                  <div>
                    <dt>Patients</dt>
                    <dd>{featured.patients}</dd>
                  </div>
                </dl>
              </div>
            </article>
          )}

          {/* SUPPORTING 2x2 */}
          <ul className="hv-team__supporting" role="list">
            {supporting.map(({ id, name, role, credentials, tenure, languages, specialty, quote, image, Icon }) => (
              <li key={id} className="hv-team__card">
                <div className="hv-team__card-media">
                  <img
                    className="hv-team__card-img"
                    src={image}
                    alt={`Portrait of ${name}, ${role}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="hv-team__card-overlay" aria-hidden="true" />

                  <span className="hv-team__card-role">
                    <Icon width={13} height={13} />
                    {role}
                  </span>

                  <div className="hv-team__card-quote">
                    <span className="hv-team__card-quote-mark" aria-hidden="true">“</span>
                    <p>{quote}</p>
                  </div>
                </div>

                <div className="hv-team__card-info">
                  <div className="hv-team__card-info-top">
                    <h3 className="hv-team__card-name">{name}</h3>
                    <span className="hv-team__card-tenure">
                      <Award width={12} height={12} />
                      {tenure}
                    </span>
                  </div>

                  <span className="hv-team__card-creds">{credentials}</span>

                  <dl className="hv-team__card-meta">
                    <div>
                      <dt>Specialty</dt>
                      <dd>{specialty}</dd>
                    </div>
                    <div>
                      <dt>Languages</dt>
                      <dd>{languages.join(' · ')}</dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* WHY HAVEN — PILLARS */}
        <div className="hv-team__pillars-wrap">
          <div className="hv-team__pillars-head">
            <span className="hv-team__pillars-eyebrow">
              Why Haven
            </span>
            <h3 className="hv-team__pillars-title">
              Four things every family tells us they <em>noticed</em>.
            </h3>
          </div>

          <ul className="hv-team__pillars" role="list">
            {PILLARS.map(({ id, Icon, label, title, body, stat, statLabel }, i) => (
              <li key={id} className="hv-team__pillar">
                <span className="hv-team__pillar-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className="hv-team__pillar-icon" aria-hidden="true">
                  <span className="hv-team__pillar-icon-glow" />
                  <Icon width={24} height={24} />
                </span>

                <div className="hv-team__pillar-body-wrap">
                  <span className="hv-team__pillar-label">{label}</span>
                  <h4 className="hv-team__pillar-title">{title}</h4>
                  <p className="hv-team__pillar-body">{body}</p>
                </div>

                <div className="hv-team__pillar-stat">
                  <span className="hv-team__pillar-stat-value">{stat}</span>
                  <span className="hv-team__pillar-stat-label">{statLabel}</span>
                </div>

                <span className="hv-team__pillar-corner" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>

        {/* FOOT */}
        <div className="hv-team__foot">
          <p className="hv-team__foot-quote">
            <span className="hv-team__foot-quote-mark" aria-hidden="true">“</span>
            We interview for empathy before we interview for skill.
            You can train a clinician — you cannot train presence.
            <cite>— Haven Hiring Principle #1</cite>
          </p>
          <a href="#contact" className="hv-team__foot-cta">
            <span>Meet your care team</span>
            <ArrowUpRight width={14} height={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default CareTeam;
