import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Phone,
  Calendar,
  MessageQuote,
  MapPin,
  Clock247,
  ShieldCheck,
  ArrowRight,
  Plus,
  Heartbeat,
  Heart,
} from '../Hero/icons.jsx';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CHANNELS = [
  {
    id: 'call',
    Icon: Phone,
    label: 'Call us',
    primary: '1-800-555-1234',
    meta: '24/7 care advisors',
    href: 'tel:18005551234',
    tone: 'accent',
  },
  {
    id: 'text',
    Icon: MessageQuote,
    label: 'Text us',
    primary: 'HAVEN to 55433',
    meta: 'Reply under 5 min',
    href: 'sms:55433?body=HAVEN',
    tone: 'teal',
  },
  {
    id: 'schedule',
    Icon: Calendar,
    label: 'Schedule a call',
    primary: '15-min consult',
    meta: 'On your time',
    href: '#schedule',
    tone: 'sage',
  },
  {
    id: 'email',
    Icon: Heart,
    label: 'Email',
    primary: 'care@haven.us',
    meta: 'Same-day reply',
    href: 'mailto:care@haven.us',
    tone: 'rose',
  },
];

const NEXT_STEPS = [
  { time: 'Within 1 h',   title: 'A care advisor calls you back',     detail: 'Real person, no bots, no hold.' },
  { time: 'Within 24 h',  title: 'Coverage verified',                 detail: 'We call your insurer so you don\'t have to.' },
  { time: 'Within 48 h',  title: 'Free in-home assessment',           detail: 'A registered nurse visits on a time you choose.' },
  { time: 'Within 1 wk',  title: 'Care starts',                       detail: 'Same clinician, same day every week.' },
];

const TRUST_BADGES = [
  { Icon: ShieldCheck, label: 'HIPAA compliant' },
  { Icon: ShieldCheck, label: 'SSL 256-bit encrypted' },
  { Icon: Heart,       label: 'Never shared with third parties' },
];

function Contact() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({
    patientName: '',
    yourName: '',
    relation: '',
    phone: '',
    email: '',
    zip: '',
    condition: '',
    preferredContact: 'phone',
    bestTime: 'anytime',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;

      gsap.from('.hv-contact__eyebrow, .hv-contact__title-line, .hv-contact__sub', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.hv-contact__head', start: 'top 80%' },
      });

      gsap.fromTo(
        '.hv-contact__channel',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.08,
          immediateRender: false,
          scrollTrigger: { trigger: '.hv-contact__channels', start: 'top 85%', toggleActions: 'play none none none' },
        }
      );

      gsap.fromTo(
        '.hv-contact__panel',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: 'power3.out',
          stagger: 0.12,
          immediateRender: false,
          scrollTrigger: { trigger: '.hv-contact__split', start: 'top 80%', toggleActions: 'play none none none' },
        }
      );

      gsap.fromTo(
        '.hv-contact__step',
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.08,
          immediateRender: false,
          scrollTrigger: { trigger: '.hv-contact__steps', start: 'top 90%', toggleActions: 'play none none none' },
        }
      );
    },
    { scope: sectionRef }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, POST to /api/intake
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      className="hv-contact"
      id="contact"
      aria-labelledby="hv-contact-title"
    >
      <div className="hv-contact__wrap">
        {/* URGENT STRIP */}
        <div className="hv-contact__urgent" role="note">
          <span className="hv-contact__urgent-icon" aria-hidden="true">
            <Heartbeat width={14} height={14} />
          </span>
          <span>
            <strong>Medical emergency?</strong> Please call <a href="tel:911">911</a> now.
            Haven is not a 24/7 emergency service — our clinical on-call team
            supports established patients only.
          </span>
        </div>

        {/* HEAD */}
        <div className="hv-contact__head">
          <span className="hv-contact__eyebrow">
            <span className="hv-contact__eyebrow-dot" aria-hidden="true" />
            <Plus width={13} height={13} />
            Get in touch
          </span>

          <h2 id="hv-contact-title" className="hv-contact__title">
            <span className="hv-contact__title-line">Let's figure out your next step —</span>
            <span className="hv-contact__title-line">
              <em>together</em>.
            </span>
          </h2>

          <p className="hv-contact__sub">
            Pick the channel that works for your family. A Haven care advisor
            will be on the other end within an hour — no scripts, no sales
            pressure, just a real person.
          </p>
        </div>

        {/* CHANNELS */}
        <ul className="hv-contact__channels" role="list">
          {CHANNELS.map(({ id, Icon, label, primary, meta, href, tone }) => (
            <li key={id}>
              <a href={href} className="hv-contact__channel" data-tone={tone}>
                <span className="hv-contact__channel-icon" aria-hidden="true">
                  <Icon width={22} height={22} />
                </span>
                <span className="hv-contact__channel-label">{label}</span>
                <span className="hv-contact__channel-primary">{primary}</span>
                <span className="hv-contact__channel-meta">
                  <Clock247 width={10} height={10} />
                  {meta}
                </span>
                <span className="hv-contact__channel-arrow" aria-hidden="true">
                  <ArrowRight width={14} height={14} />
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* SPLIT — Form + Side panel */}
        <div className="hv-contact__split">
          {/* FORM PANEL */}
          <div className="hv-contact__panel hv-contact__panel--form">
            {!submitted ? (
              <>
                <header className="hv-contact__form-head">
                  <span className="hv-contact__form-eyebrow">
                    <MessageQuote width={13} height={13} />
                    Tell us about your situation
                  </span>
                  <h3 className="hv-contact__form-title">
                    One form, <em>no</em> surprises.
                  </h3>
                  <p className="hv-contact__form-sub">
                    We ask only what a care advisor needs to call you back
                    prepared. Takes about 90 seconds.
                  </p>
                </header>

                <form className="hv-contact__form" onSubmit={handleSubmit}>
                  <div className="hv-contact__form-grid">
                    <label className="hv-contact__field">
                      <span className="hv-contact__field-label">
                        Your name <em>required</em>
                      </span>
                      <input
                        type="text"
                        name="yourName"
                        value={form.yourName}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                        placeholder="Jane Doe"
                      />
                    </label>

                    <label className="hv-contact__field">
                      <span className="hv-contact__field-label">
                        Relationship to patient
                      </span>
                      <select name="relation" value={form.relation} onChange={handleChange}>
                        <option value="">Select…</option>
                        <option value="self">I am the patient</option>
                        <option value="child">Adult child</option>
                        <option value="spouse">Spouse / partner</option>
                        <option value="sibling">Sibling</option>
                        <option value="grandchild">Grandchild</option>
                        <option value="other">Other family / friend</option>
                      </select>
                    </label>

                    <label className="hv-contact__field">
                      <span className="hv-contact__field-label">
                        Patient name
                      </span>
                      <input
                        type="text"
                        name="patientName"
                        value={form.patientName}
                        onChange={handleChange}
                        placeholder="If different from you"
                      />
                    </label>

                    <label className="hv-contact__field">
                      <span className="hv-contact__field-label">
                        Best phone <em>required</em>
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        autoComplete="tel"
                        placeholder="(555) 555-1234"
                      />
                    </label>

                    <label className="hv-contact__field">
                      <span className="hv-contact__field-label">Email</span>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                        placeholder="name@domain.com"
                      />
                    </label>

                    <label className="hv-contact__field">
                      <span className="hv-contact__field-label">ZIP</span>
                      <input
                        type="text"
                        name="zip"
                        value={form.zip}
                        onChange={handleChange}
                        inputMode="numeric"
                        pattern="[0-9]{5}"
                        maxLength="5"
                        autoComplete="postal-code"
                        placeholder="10001"
                      />
                    </label>

                    <label className="hv-contact__field hv-contact__field--full">
                      <span className="hv-contact__field-label">Primary condition or need</span>
                      <input
                        type="text"
                        name="condition"
                        value={form.condition}
                        onChange={handleChange}
                        placeholder="e.g. post-stroke recovery, wound care, dementia support"
                      />
                    </label>

                    <fieldset className="hv-contact__field hv-contact__field--full hv-contact__fieldset">
                      <legend className="hv-contact__field-label">Preferred contact</legend>
                      <div className="hv-contact__radios">
                        {[
                          { value: 'phone', label: 'Phone' },
                          { value: 'text',  label: 'Text' },
                          { value: 'email', label: 'Email' },
                        ].map((opt) => (
                          <label key={opt.value} className="hv-contact__radio">
                            <input
                              type="radio"
                              name="preferredContact"
                              value={opt.value}
                              checked={form.preferredContact === opt.value}
                              onChange={handleChange}
                            />
                            <span>{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <label className="hv-contact__field hv-contact__field--full">
                      <span className="hv-contact__field-label">
                        Best time to call
                      </span>
                      <select name="bestTime" value={form.bestTime} onChange={handleChange}>
                        <option value="anytime">Any time</option>
                        <option value="morning">Morning (8 am – 12 pm)</option>
                        <option value="afternoon">Afternoon (12 – 5 pm)</option>
                        <option value="evening">Evening (5 – 8 pm)</option>
                      </select>
                    </label>

                    <label className="hv-contact__field hv-contact__field--full">
                      <span className="hv-contact__field-label">
                        Tell us a bit more <em>optional</em>
                      </span>
                      <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Anything that would help us prepare for the call — recent hospital stay, diagnosis, current caregiver situation…"
                      />
                    </label>
                  </div>

                  <div className="hv-contact__form-foot">
                    <ul className="hv-contact__trust">
                      {TRUST_BADGES.map(({ Icon, label }) => (
                        <li key={label}>
                          <Icon width={13} height={13} />
                          {label}
                        </li>
                      ))}
                    </ul>

                    <button type="submit" className="hv-contact__submit">
                      <span>Request a free call back</span>
                      <ArrowRight width={14} height={14} />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="hv-contact__success" role="status" aria-live="polite">
                <span className="hv-contact__success-icon">
                  <Heart width={28} height={28} />
                </span>
                <h3 className="hv-contact__success-title">
                  Thank you — we've got you.
                </h3>
                <p className="hv-contact__success-body">
                  A Haven care advisor will call you back within one hour. If
                  you'd prefer to talk sooner, our team is on the phone right
                  now at{' '}
                  <a href="tel:18005551234">1-800-555-1234</a>.
                </p>
                <div className="hv-contact__success-meta">
                  <Clock247 width={13} height={13} />
                  <span>Expected callback: within 1 hour</span>
                </div>
              </div>
            )}
          </div>

          {/* SIDE PANEL — Next steps + Office info */}
          <aside className="hv-contact__panel hv-contact__panel--side">
            <div className="hv-contact__steps-wrap">
              <span className="hv-contact__steps-eyebrow">
                What happens next
              </span>
              <ol className="hv-contact__steps">
                {NEXT_STEPS.map(({ time, title, detail }, i) => (
                  <li key={title} className="hv-contact__step">
                    <span className="hv-contact__step-num">{String(i + 1).padStart(2, '0')}</span>
                    <div className="hv-contact__step-body">
                      <span className="hv-contact__step-time">{time}</span>
                      <h4 className="hv-contact__step-title">{title}</h4>
                      <p className="hv-contact__step-detail">{detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="hv-contact__office">
              <span className="hv-contact__office-eyebrow">
                <MapPin width={13} height={13} />
                Headquarters
              </span>
              <address className="hv-contact__office-address">
                <strong>Haven Home Health</strong>
                2200 Market Street, Suite 800
                <br />
                San Diego, CA 92101
              </address>
              <dl className="hv-contact__office-meta">
                <div>
                  <dt>Phone</dt>
                  <dd><a href="tel:18005551234">1-800-555-1234</a></dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd><a href="mailto:care@haven.us">care@haven.us</a></dd>
                </div>
                <div>
                  <dt>Hours</dt>
                  <dd>24 / 7 intake · Clinical 7 am – 9 pm PT</dd>
                </div>
                <div>
                  <dt>Languages</dt>
                  <dd>English · Español · Mandarin · Hindi · French</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Contact;
