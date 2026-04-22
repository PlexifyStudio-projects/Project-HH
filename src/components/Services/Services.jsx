import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Heartbeat,
  Stethoscope,
  HomeHealth,
  Users,
  MessageQuote,
  Heart,
  ArrowUpRight,
  ShieldCheck,
  Plus,
  Clock247,
  Calendar,
} from '../Hero/icons.jsx';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// 6 home-health care tracks
// Each carries its own color psychology token pair (--tone / --tone-deep / --tone-wash)
// Order: Featured → common therapies → specialty → coordination → featured personal care
const SERVICES = [
  {
    id: 'skilled-nursing',
    index: '01',
    Icon: Stethoscope,
    name: 'Skilled Nursing',
    tagline: 'RN-led clinical care',
    body:
      'Wound care, IV therapy, post-op recovery, and chronic disease management — delivered by licensed nurses matched to your case.',
    outcomes: ['Wound care', 'IV therapy', 'Medication mgmt.', 'Post-surgical'],
    meta: ['45–60 min', '2–3× / week', 'Medicare A'],
    tone: {
      '--tone': '#1C5AA6',
      '--tone-deep': '#0B2B56',
      '--tone-wash': '#EEF4FC',
    },
    featured: true,
  },
  {
    id: 'physical-therapy',
    index: '02',
    Icon: Heartbeat,
    name: 'Physical Therapy',
    tagline: 'Mobility · strength · recovery',
    body:
      'Guided rehabilitation for surgery recovery, fall prevention, and regaining independence after a hospital stay.',
    outcomes: ['Mobility', 'Balance', 'Fall prevention'],
    meta: ['45 min', '3× / week', 'Medicare B'],
    tone: {
      '--tone': '#E07A3C',
      '--tone-deep': '#B85A1E',
      '--tone-wash': '#FDEFE3',
    },
  },
  {
    id: 'occupational-therapy',
    index: '03',
    Icon: HomeHealth,
    name: 'Occupational Therapy',
    tagline: 'Daily living, restored',
    body:
      'Retrain the activities of daily living — dressing, cooking, bathing — with adaptive strategies and home modifications.',
    outcomes: ['Daily living', 'Home safety', 'Adaptive tools'],
    meta: ['45 min', '2× / week', 'Medicare B'],
    tone: {
      '--tone': '#4A8F7C',
      '--tone-deep': '#2F6A5C',
      '--tone-wash': '#E7F2EE',
    },
  },
  {
    id: 'speech-therapy',
    index: '04',
    Icon: MessageQuote,
    name: 'Speech Therapy',
    tagline: 'Communication & swallowing',
    body:
      'Evidence-based therapy for stroke recovery, cognitive support, and dysphagia management at home.',
    outcomes: ['Speech', 'Cognitive', 'Swallowing'],
    meta: ['30–45 min', '1–2× / week', 'Medicare B'],
    tone: {
      '--tone': '#3B8AA8',
      '--tone-deep': '#1F5F78',
      '--tone-wash': '#E4F1F7',
    },
  },
  {
    id: 'medical-social-work',
    index: '05',
    Icon: Users,
    name: 'Medical Social Work',
    tagline: 'Coordination & resources',
    body:
      'A single point of contact to navigate insurance, community resources, and family communication throughout care.',
    outcomes: ['Care plan', 'Insurance', 'Resources'],
    meta: ['60 min', 'As needed', 'Covered'],
    tone: {
      '--tone': '#6C5BA5',
      '--tone-deep': '#453A7A',
      '--tone-wash': '#EEEBF6',
    },
  },
  {
    id: 'home-health-aide',
    index: '06',
    Icon: Heart,
    name: 'Home Health Aide',
    tagline: 'Personal care · companionship',
    body:
      'Compassionate hands-on help with bathing, grooming, meal prep, and light housekeeping — always paired with clinical oversight.',
    outcomes: ['Bathing', 'Meals', 'Companionship'],
    meta: ['2–4 hrs', '3–5× / week', 'Medicare A'],
    tone: {
      '--tone': '#D46B8E',
      '--tone-deep': '#9E4867',
      '--tone-wash': '#FBECF2',
    },
    featured: true,
  },
];

function Services() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;

      gsap.from('.hv-services__eyebrow, .hv-services__title-line, .hv-services__sub', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: '.hv-services__head',
          start: 'top 80%',
        },
      });

      gsap.from('.hv-services__card', {
        y: 40,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: '.hv-services__grid',
          start: 'top 80%',
        },
      });

      gsap.from('.hv-services__foot > *', {
        y: 18,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: '.hv-services__foot',
          start: 'top 90%',
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="hv-services"
      id="services"
      aria-labelledby="hv-services-title"
    >
      <div className="hv-services__wrap">
        {/* HEAD */}
        <div className="hv-services__head">
          <span className="hv-services__eyebrow">
            <span className="hv-services__eyebrow-dot" aria-hidden="true" />
            <Plus width={13} height={13} />
            Our Services
          </span>

          <h2 id="hv-services-title" className="hv-services__title">
            <span className="hv-services__title-line">Six clinical care tracks,</span>
            <span className="hv-services__title-line">
              <em>one</em> coordinated team.
            </span>
          </h2>

          <p className="hv-services__sub">
            Every Haven care plan blends licensed clinicians, therapists and
            aides — covered by Medicare and most insurance, delivered under
            one roof in the comfort of home.
          </p>
        </div>

        {/* GRID */}
        <ul className="hv-services__grid" role="list">
          {SERVICES.map(
            ({ id, index, Icon, name, tagline, body, outcomes, meta, tone, featured }) => (
              <li
                key={id}
                className={`hv-services__card${featured ? ' is-featured' : ''}`}
                style={tone}
              >
                {/* decorative mesh + watermark index */}
                <span className="hv-services__card-mesh" aria-hidden="true" />
                <span className="hv-services__card-watermark" aria-hidden="true">
                  {index}
                </span>

                <div className="hv-services__card-top">
                  <span className="hv-services__card-num">
                    <span className="hv-services__card-num-line" aria-hidden="true" />
                    Track {index}
                  </span>
                  {featured && (
                    <span className="hv-services__card-badge">
                      <span className="hv-services__card-badge-dot" aria-hidden="true" />
                      Most Requested
                    </span>
                  )}
                </div>

                <span className="hv-services__card-icon" aria-hidden="true">
                  <span className="hv-services__card-icon-halo" />
                  <span className="hv-services__card-icon-inner">
                    <Icon width={28} height={28} />
                  </span>
                </span>

                <div className="hv-services__card-title">
                  <h3 className="hv-services__card-name">{name}</h3>
                  <span className="hv-services__card-tag">{tagline}</span>
                </div>

                <p className="hv-services__card-body">{body}</p>

                <ul className="hv-services__card-outcomes" role="list">
                  {outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>

                <dl className="hv-services__card-meta">
                  <div>
                    <dt><Clock247 width={12} height={12} /></dt>
                    <dd>{meta[0]}</dd>
                  </div>
                  <div>
                    <dt><Calendar width={12} height={12} /></dt>
                    <dd>{meta[1]}</dd>
                  </div>
                  <div>
                    <dt><ShieldCheck width={12} height={12} /></dt>
                    <dd>{meta[2]}</dd>
                  </div>
                </dl>

                <a href={`#${id}`} className="hv-services__card-cta">
                  <span>Learn more</span>
                  <ArrowUpRight width={14} height={14} />
                </a>
              </li>
            )
          )}
        </ul>

        {/* FOOT */}
        <div className="hv-services__foot">
          <div className="hv-services__foot-trust">
            <ShieldCheck width={16} height={16} />
            <span>
              All services are <strong>Medicare-certified</strong>, delivered
              by clinicians licensed in your state.
            </span>
          </div>
          <a href="#contact" className="hv-services__foot-cta">
            <span>Start a free assessment</span>
            <ArrowUpRight width={14} height={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Services;
