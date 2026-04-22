import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Heartbeat, ShieldCheck, HomeHealth, Clock247, Sparkles,
  Calendar, ArrowRight, Star, MapPin,
  Stethoscope, Award, Users, HeartSolid,
} from './icons.jsx';

gsap.registerPlugin(useGSAP);

// 4 real therapy / psychology-session scenes rotating in the hero stage.
// Sourced from Vecteezy (free preview). Swap any file in /public/hero-N.mp4.
const BASE = import.meta.env.BASE_URL;

const SCENES = [
  {
    video: `${BASE}hero-1.mp4`,
    poster: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1600&q=85&auto=format&fit=crop',
    alt: 'Worried man talking with a female psychologist during a therapy session',
    caption: 'Individual Therapy',
  },
  {
    video: `${BASE}hero-2.mp4`,
    poster: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=1600&q=85&auto=format&fit=crop',
    alt: 'Psychologist listening with empathy during a couple session',
    caption: 'Couples Counseling',
  },
  {
    video: `${BASE}hero-3.mp4`,
    poster: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1600&q=85&auto=format&fit=crop',
    alt: 'Psychiatrist recording a patient condition during mental health consultation',
    caption: 'Mental Health Support',
  },
  {
    video: `${BASE}hero-4.mp4`,
    poster: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1600&q=85&auto=format&fit=crop',
    alt: 'Therapist listening to a patient receiving psychiatric support',
    caption: 'Psychiatric Care',
  },
];
const INTERVAL_MS = 8000;

const splitLetters = (text) =>
  text.split('').map((ch, i) => (
    <span key={i} className="hv-hero__letter" aria-hidden="true">
      {ch === ' ' ? '\u00A0' : ch}
    </span>
  ));

function Hero() {
  const ref = useRef(null);
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveScene((prev) => (prev + 1) % SCENES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  useGSAP(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ease = 'expo.out';

    const tl = gsap.timeline({ defaults: { ease }, delay: 0.2 });

    tl.fromTo('.hv-hero__eyebrow', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 });

    tl.fromTo(
      '.hv-hero__letter',
      { yPercent: 110, rotate: 4 },
      { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.018 },
      '-=0.3'
    );

    tl.fromTo(
      '.hv-hero__sub, .hv-hero__bullets li',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.06 },
      '-=0.7'
    );

    tl.fromTo(
      '.hv-hero__cta',
      { y: 20, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.08, ease: 'back.out(1.4)' },
      '-=0.5'
    );

    tl.fromTo(
      '.hv-hero__trust-item, .hv-hero__stat',
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, stagger: 0.06 },
      '-=0.5'
    );

    tl.fromTo(
      '.hv-hero__stage',
      { y: 40, opacity: 0, scale: 0.94 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
      '-=1'
    );

    tl.fromTo(
      '.hv-hero__float-card',
      { y: 30, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.5)' },
      '-=0.6'
    );

    // Continuous floats
    if (!reduce) {
      gsap.to('.hv-hero__float-card--1', { y: -6, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to('.hv-hero__float-card--2', { y: 8,  duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to('.hv-hero__float-card--3', { y: -5, duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.5 });
    }
  }, { scope: ref });

  return (
    <section ref={ref} className="hv-hero" id="hero" aria-labelledby="hv-hero-title">
      {/* Atmosphere */}
      <div className="hv-hero__atm" aria-hidden="true">
        <div className="hv-hero__grain" />
        <div className="hv-hero__blob hv-hero__blob--1" />
        <div className="hv-hero__blob hv-hero__blob--2" />
        <div className="hv-hero__blob hv-hero__blob--3" />
      </div>

      <div className="hv-hero__wrap">
        {/* LEFT — editorial content */}
        <div className="hv-hero__content">
          <span className="hv-hero__eyebrow">
            <span className="hv-hero__eyebrow-dot" aria-hidden="true" />
            <Sparkles width={14} height={14} />
            Nationwide · Home Health Network
          </span>

          <h1 id="hv-hero-title" className="hv-hero__title">
            <span className="sr-only">Compassionate care, where life already is.</span>
            <span className="hv-hero__title-line" aria-hidden="true">{splitLetters('Compassionate')}</span>
            <span className="hv-hero__title-line" aria-hidden="true">
              {splitLetters('care, ')}
              <em className="hv-hero__title-accent">{splitLetters('where')}</em>
            </span>
            <span className="hv-hero__title-line" aria-hidden="true">{splitLetters('life already is.')}</span>
          </h1>

          <p className="hv-hero__sub">
            Skilled nursing, therapy and companion care — delivered at home,
            with the dignity your family deserves.
          </p>

          {/* Social proof — caregiver avatar stack */}
          <div className="hv-hero__social">
            <div className="hv-hero__avatars" aria-hidden="true">
              <span className="hv-hero__avatars-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&q=80&auto=format&fit=crop&crop=faces')" }} />
              <span className="hv-hero__avatars-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&q=80&auto=format&fit=crop&crop=faces')" }} />
              <span className="hv-hero__avatars-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=120&q=80&auto=format&fit=crop&crop=faces')" }} />
              <span className="hv-hero__avatars-more">+48k</span>
            </div>
            <div className="hv-hero__social-text">
              <div className="hv-hero__social-stars" aria-hidden="true">
                <Star width={11} height={11} />
                <Star width={11} height={11} />
                <Star width={11} height={11} />
                <Star width={11} height={11} />
                <Star width={11} height={11} />
              </div>
              <span>Trusted by <strong>48,000+ families</strong> across the U.S.</span>
            </div>
          </div>

          <ul className="hv-hero__bullets">
            <li><ShieldCheck width={18} height={18} /> <span>Medicare, Medicaid & most insurance accepted</span></li>
            <li><Clock247 width={18} height={18} /> <span>24/7 intake · Nurse match within 24 h</span></li>
            <li><Award width={18} height={18} /> <span>CHAP, Joint Commission & HIPAA accredited</span></li>
          </ul>

          <div className="hv-hero__ctas">
            <a href="#contact" className="hv-hero__cta hv-hero__cta--primary">
              <Calendar width={18} height={18} />
              <span>Schedule a free assessment</span>
              <ArrowRight width={18} height={18} className="hv-hero__cta-arrow" />
            </a>
            <a href="#coverage" className="hv-hero__cta hv-hero__cta--ghost">
              <ShieldCheck width={18} height={18} />
              <span>Check my coverage</span>
            </a>
          </div>

          <div className="hv-hero__trust">
            <span className="hv-hero__trust-label">
              <span className="hv-hero__trust-line" />
              Trusted by families in 38 states
              <span className="hv-hero__trust-line" />
            </span>
            <div className="hv-hero__trust-row">
              <span className="hv-hero__trust-item"><ShieldCheck width={14} height={14} /> CHAP</span>
              <span className="hv-hero__trust-item"><Heartbeat width={14} height={14} /> Medicare Cert.</span>
              <span className="hv-hero__trust-item"><Award width={14} height={14} /> Joint Commission</span>
              <span className="hv-hero__trust-item"><Users width={14} height={14} /> HIPAA Compliant</span>
            </div>
          </div>

          <dl className="hv-hero__stats">
            <div className="hv-hero__stat">
              <span className="hv-hero__stat-icon"><Stethoscope width={18} height={18} /></span>
              <div>
                <dt>12 yrs</dt>
                <dd>of in-home care</dd>
              </div>
            </div>
            <div className="hv-hero__stat">
              <span className="hv-hero__stat-icon"><Users width={18} height={18} /></span>
              <div>
                <dt>48,000+</dt>
                <dd>families served</dd>
              </div>
            </div>
            <div className="hv-hero__stat">
              <span className="hv-hero__stat-icon"><Star width={18} height={18} /></span>
              <div>
                <dt>4.9 / 5</dt>
                <dd>patient satisfaction</dd>
              </div>
            </div>
          </dl>
        </div>

        {/* RIGHT — Signature stage (video bg + 3D overlay) */}
        <div className="hv-hero__stage">
          {/*
            4 rotating therapy videos (Vecteezy previews downloaded locally).
            Replace /public/hero-1.mp4 .. hero-4.mp4 to swap clips.
          */}
          {SCENES.map((s, i) => (
            <div
              key={i}
              className={`hv-hero__scene${i === activeScene ? ' is-active' : ''}`}
              aria-hidden={i !== activeScene}
            >
              <video
                className="hv-hero__scene-video"
                autoPlay
                muted
                loop
                playsInline
                preload={i === 0 ? 'auto' : 'metadata'}
                poster={s.poster}
                aria-label={s.alt}
              >
                <source src={s.video} type="video/mp4" />
              </video>
            </div>
          ))}

          {/* Progress dots */}
          <div className="hv-hero__stage-progress" aria-hidden="true">
            {SCENES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`hv-hero__stage-dot${i === activeScene ? ' is-active' : ''}`}
                onClick={() => setActiveScene(i)}
                aria-label={`Show scene ${i + 1}`}
              />
            ))}
          </div>

          {/* Cinematic overlay — brand gradient over video */}
          <div className="hv-hero__stage-overlay" aria-hidden="true" />

          {/* Stage chrome: live tag (dynamic caption) + on-call */}
          <div className="hv-hero__stage-top">
            <span className="hv-hero__stage-tag">
              <span className="hv-hero__stage-tag-dot" />
              <span className="hv-hero__stage-tag-label">Live</span>
              <span className="hv-hero__stage-tag-sep">·</span>
              <span className="hv-hero__stage-tag-caption">
                {SCENES.map((s, i) => (
                  <span
                    key={i}
                    className={`hv-hero__stage-tag-item${i === activeScene ? ' is-active' : ''}`}
                  >
                    {s.caption}
                  </span>
                ))}
              </span>
            </span>
            <span className="hv-hero__stage-time">
              <Clock247 width={13} height={13} />
              24 / 7 on-call
            </span>
          </div>

          {/* Floating micro-cards */}
          <div className="hv-hero__float-card hv-hero__float-card--1">
            <span className="hv-hero__float-icon hv-hero__float-icon--accent">
              <Heartbeat width={18} height={18} />
            </span>
            <div>
              <strong>Care plan ready</strong>
              <span>Nurse arrives tomorrow · 9:30 AM</span>
            </div>
          </div>

          <div className="hv-hero__float-card hv-hero__float-card--2">
            <span className="hv-hero__float-icon">
              <MapPin width={18} height={18} />
            </span>
            <div>
              <strong>Serving 38 states</strong>
              <span>From coast to coast</span>
            </div>
          </div>

          <div className="hv-hero__float-card hv-hero__float-card--3 hv-hero__rating">
            <div className="hv-hero__rating-stars" aria-hidden="true">
              <Star width={14} height={14} />
              <Star width={14} height={14} />
              <Star width={14} height={14} />
              <Star width={14} height={14} />
              <Star width={14} height={14} />
            </div>
            <strong>4.9 / 5</strong>
            <span>from 2,400+ families</span>
          </div>
        </div>
      </div>

    </section>
  );
}

export default Hero;
