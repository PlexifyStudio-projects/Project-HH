import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Phone,
  Clipboard,
  Heartbeat,
  HomeHealth,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Plus,
  Clock247,
} from '../Hero/icons.jsx';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// 5-step care journey — horizontal pinned scroll (L → R) on desktop, stacked on mobile
// Images reuse verified clinical posters from the Hero (all load cleanly)
const STEPS = [
  {
    id: 'reach-out',
    index: '01',
    Icon: Phone,
    duration: 'Day 0 · 15 min call',
    title: 'Reach out, no commitment',
    tagline: 'A care advisor picks up — not a bot.',
    body:
      'Call, text or submit a form. A Haven care advisor walks your family through coverage, timing and options. No scripts, no sales pressure — just a real person helping you figure out the next step.',
    checklist: [
      'Confirm Medicare / insurance in real time',
      'Choose a time that works for your family',
      'Receive a welcome packet within the hour',
    ],
    image:
      'https://images.unsplash.com/photo-1659353886618-d0b221f71fa3?w=1400&q=85&auto=format&fit=crop',
    imageAlt: 'Medical professional taking a phone consultation call',
  },
  {
    id: 'assessment',
    index: '02',
    Icon: Clipboard,
    duration: 'Day 1–2 · 60 min visit',
    title: 'Clinical assessment at home',
    tagline: 'A registered nurse meets you where you live.',
    body:
      'An RN visits the home to review medical history, medications and mobility — and to see the space. This is how we build a plan that reflects your real life, not a template.',
    checklist: [
      'Head-to-toe clinical evaluation',
      'Medication reconciliation',
      'Home safety walk-through',
    ],
    image:
      'https://images.unsplash.com/photo-1631815590058-860e4f83c1e8?w=1400&q=85&auto=format&fit=crop',
    imageAlt: 'Clinician checking a patient with a stethoscope during a home assessment',
  },
  {
    id: 'care-plan',
    index: '03',
    Icon: Heartbeat,
    duration: 'Day 3 · 24 hr turnaround',
    title: 'Your personalized care plan',
    tagline: 'Reviewed together — doctor, family, and you.',
    body:
      'Your nurse, your physician and your family review the plan side by side. Services, visit cadence and goals are written down, shared, and adjustable — not locked behind a portal.',
    checklist: [
      'Signed off by your physician',
      'Shared with your family caregivers',
      'Adjustable as your needs evolve',
    ],
    image:
      'https://images.unsplash.com/photo-1666886573553-6548db92db79?w=1400&q=85&auto=format&fit=crop',
    imageAlt: 'Doctor reviewing a personalized care plan on a tablet with the patient',
  },
  {
    id: 'care-team',
    index: '04',
    Icon: HomeHealth,
    duration: 'Day 5 · first visit',
    title: 'Your care team arrives',
    tagline: 'The same clinicians — every single visit.',
    body:
      'You are matched with a consistent nurse, therapist and aide — not a rotating cast. They know your name, your routine and your goals from day one, because continuity is what makes care feel safe.',
    checklist: [
      'Background-checked & state-licensed',
      'Matched for language & personality fit',
      '24/7 on-call escalation line',
    ],
    image:
      'https://images.unsplash.com/photo-1765896387387-0538bc9f997e?w=1400&q=85&auto=format&fit=crop',
    imageAlt: 'Healthcare provider visiting an elderly patient at home',
  },
  {
    id: 'ongoing-support',
    index: '05',
    Icon: Calendar,
    duration: 'Ongoing · as long as needed',
    title: 'Ongoing support & coordination',
    tagline: 'One team. One plan. Clear communication.',
    body:
      'Visit notes, progress and medication changes are shared live with your family and physician. You will never wonder what happened at the last visit — and neither will your doctor.',
    checklist: [
      'Live visit notes to family',
      'Monthly progress reviews',
      'Direct line to your care manager',
    ],
    image:
      'https://images.unsplash.com/photo-1631815590016-ebce183022ce?w=1400&q=85&auto=format&fit=crop',
    imageAlt: 'Clinician with stethoscope listening to a patient during ongoing care',
  },
];

function HowItWorks() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Head reveal (always)
      gsap.from('.hv-steps__eyebrow, .hv-steps__title-line, .hv-steps__sub', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.hv-steps__head', start: 'top 80%' },
      });

      if (reduce) return;

      const mm = gsap.matchMedia();

      // ── DESKTOP — pinned horizontal scroll (L → R) ──
      mm.add('(min-width: 900px)', () => {
        const pin = pinRef.current;
        const track = trackRef.current;
        if (!pin || !track) return;

        const getDistance = () =>
          Math.max(0, track.scrollWidth - pin.offsetWidth);

        // Single tween — driven by the pin ScrollTrigger via `animation`
        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
        });

        const st = ScrollTrigger.create({
          trigger: pin,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          animation: tween,
        });

        // Progress bar — share the same trigger bounds
        gsap.to('.hv-steps__progress-fill', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        // Per-panel reveals using containerAnimation (horizontal triggers)
        gsap.utils.toArray('.hv-steps__panel').forEach((panel, i) => {
          gsap.from(panel.querySelectorAll('.hv-steps__content > *'), {
            y: 30,
            opacity: 0,
            duration: 0.7,
            stagger: 0.07,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'left 75%',
              toggleActions: 'play none none reverse',
            },
          });

          gsap.from(panel.querySelector('.hv-steps__media-img'), {
            scale: 1.14,
            duration: 1.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'left 90%',
            },
          });

          // Highlight the active progress dot
          const dot = document.querySelector(
            `.hv-steps__progress-dot[data-step="${i + 1}"]`
          );
          if (dot) {
            ScrollTrigger.create({
              trigger: panel,
              containerAnimation: tween,
              start: 'left 55%',
              end: 'right 45%',
              onEnter: () => dot.classList.add('is-active'),
              onEnterBack: () => dot.classList.add('is-active'),
              onLeave: () => dot.classList.remove('is-active'),
              onLeaveBack: () => dot.classList.remove('is-active'),
            });
          }
        });

        return () => st.kill();
      });

      // ── MOBILE — no pin, stacked reveals ──
      mm.add('(max-width: 899px)', () => {
        gsap.utils.toArray('.hv-steps__panel').forEach((panel) => {
          gsap.from(panel.querySelectorAll('.hv-steps__content > *, .hv-steps__media'), {
            y: 30,
            opacity: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="hv-steps"
      id="how-it-works"
      aria-labelledby="hv-steps-title"
    >
      {/* HEAD */}
      <div className="hv-steps__head-wrap">
        <div className="hv-steps__head">
          <span className="hv-steps__eyebrow">
            <span className="hv-steps__eyebrow-dot" aria-hidden="true" />
            <Plus width={13} height={13} />
            How It Works
          </span>

          <h2 id="hv-steps-title" className="hv-steps__title">
            <span className="hv-steps__title-line">From the first call to ongoing care,</span>
            <span className="hv-steps__title-line">
              <em>five</em> steps. No surprises.
            </span>
          </h2>

          <p className="hv-steps__sub">
            A clear, human process built around your family — not insurance
            paperwork. Most patients move from first call to first home visit
            in under a week.
          </p>

          <span className="hv-steps__scrollhint" aria-hidden="true">
            Scroll to move the journey
            <ArrowRight width={13} height={13} />
          </span>
        </div>
      </div>

      {/* PINNED REGION */}
      <div ref={pinRef} className="hv-steps__pin">
        <div ref={trackRef} className="hv-steps__track">
          {STEPS.map(
            (
              { id, index, Icon, duration, title, tagline, body, checklist, image, imageAlt },
              i
            ) => (
              <article
                key={id}
                id={id}
                className="hv-steps__panel"
                data-step={i + 1}
              >
                {/* MEDIA */}
                <div className="hv-steps__media">
                  <img
                    className="hv-steps__media-img"
                    src={image}
                    alt={imageAlt}
                    loading={i < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  <div className="hv-steps__media-overlay" aria-hidden="true" />

                  <span className="hv-steps__media-chip">
                    <Clock247 width={13} height={13} />
                    {duration}
                  </span>

                  <span className="hv-steps__media-corner" aria-hidden="true">
                    <Icon width={15} height={15} />
                    Haven · Step {index}
                  </span>

                  <span className="hv-steps__media-num" aria-hidden="true">
                    {index}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="hv-steps__content">
                  <span className="hv-steps__content-index">
                    <span className="hv-steps__content-index-line" aria-hidden="true" />
                    Step {index}
                    <span className="hv-steps__content-index-of">
                      / {STEPS.length.toString().padStart(2, '0')}
                    </span>
                  </span>

                  <span className="hv-steps__content-icon" aria-hidden="true">
                    <Icon width={22} height={22} />
                  </span>

                  <h3 className="hv-steps__content-title">{title}</h3>
                  <p className="hv-steps__content-tagline">{tagline}</p>
                  <p className="hv-steps__content-body">{body}</p>

                  <ul className="hv-steps__content-list" role="list">
                    {checklist.map((item) => (
                      <li key={item}>
                        <span className="hv-steps__content-list-dot" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          )}
        </div>

        {/* PROGRESS BAR */}
        <div className="hv-steps__progress" aria-hidden="true">
          <div className="hv-steps__progress-dots">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className="hv-steps__progress-dot"
                data-step={i + 1}
                aria-label={`Jump to step ${s.index}: ${s.title}`}
              >
                <span className="hv-steps__progress-dot-num">{s.index}</span>
                <span className="hv-steps__progress-dot-label">
                  {s.title.split(' ').slice(0, 2).join(' ')}
                </span>
              </button>
            ))}
          </div>
          <div className="hv-steps__progress-bar">
            <div className="hv-steps__progress-fill" />
          </div>
        </div>
      </div>

      {/* FOOT */}
      <div className="hv-steps__foot-wrap">
        <div className="hv-steps__foot">
          <div className="hv-steps__foot-trust">
            <ShieldCheck width={16} height={16} />
            <span>
              No upfront cost, <strong>no obligation</strong> — your first
              assessment is always free.
            </span>
          </div>
          <a href="#contact" className="hv-steps__foot-cta">
            <span>Start your first step</span>
            <ArrowRight width={14} height={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
