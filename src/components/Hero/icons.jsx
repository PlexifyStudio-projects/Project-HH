// ============================================================
// HAVEN ICON SET — clinical / medical-grade stroke icons
// Refined from Lucide/Heroicons with medical-specific details
// ============================================================

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

// ── Heartbeat — clean medical ECG ──
export const Heartbeat = (p) => (
  <svg {...base} {...p} aria-hidden="true">
    <path d="M3 12h3.5l1.8-3.5a.5.5 0 0 1 .92.08L12 17l2.5-10 2 5h4.5" />
  </svg>
);

// ── Shield with interior check (rounded, institutional) ──
export const ShieldCheck = (p) => (
  <svg {...base} {...p} aria-hidden="true">
    <path d="M12 3.2c2.3 1.1 4.6 1.9 8 2 0 4.6-.4 10.2-8 15.6C4.4 15.4 4 9.8 4 5.2c3.4-.1 5.7-.9 8-2Z" />
    <path d="m8.8 12 2.3 2.3 4.1-4.6" strokeWidth="1.8" />
  </svg>
);

// ── Home with pitched roof + medical cross centered ──
export const HomeHealth = (p) => (
  <svg {...base} {...p} aria-hidden="true">
    <path d="M3 10.6 12 3l9 7.6" />
    <path d="M5.5 9.3V20a1 1 0 0 0 1 1h3.5v-5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v5h3.5a1 1 0 0 0 1-1V9.3" />
    <path d="M12 16.4v4" />
    <path d="M10 18.4h4" />
  </svg>
);

// ── Clock — clean medical time ──
export const Clock247 = (p) => (
  <svg {...base} {...p} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5V12l3 1.8" strokeWidth="1.8" />
  </svg>
);

// ── Sparkles refined ──
export const Sparkles = (p) => (
  <svg {...base} {...p} aria-hidden="true">
    <path d="M12 4v3M12 17v3M4 12h3M17 12h3" />
    <path d="m6.2 6.2 2 2M15.8 15.8l2 2M6.2 17.8l2-2M15.8 8.2l2-2" />
    <circle cx="12" cy="12" r="2.4" />
  </svg>
);

// ── Phone — with subtle call wave ──
export const Phone = (p) => (
  <svg {...base} {...p} aria-hidden="true">
    <path d="M5 4h3.4l1.6 4-2 1.2a11 11 0 0 0 6.8 6.8l1.2-2 4 1.6V19c0 1.1-.9 2-2 2A17 17 0 0 1 3 6c0-1.1.9-2 2-2Z" />
    <path d="M15.5 5.2a4.5 4.5 0 0 1 3.3 3.3" opacity=".5" />
    <path d="M15 2.5a7.5 7.5 0 0 1 6.5 6.5" opacity=".3" />
  </svg>
);

// ── Calendar with check, rounded corners ──
export const Calendar = (p) => (
  <svg {...base} {...p} aria-hidden="true">
    <rect x="3.5" y="5.5" width="17" height="15" rx="2.5" />
    <path d="M8 3v4.5M16 3v4.5M3.5 10.2h17" />
    <path d="m9.8 15 1.8 1.8 3.6-3.8" strokeWidth="1.8" />
  </svg>
);

// ── Arrow right — rounded medical ──
export const ArrowRight = (p) => (
  <svg {...base} {...p} aria-hidden="true">
    <path d="M5 12h14M13 5.5l6.5 6.5-6.5 6.5" />
  </svg>
);

export const ArrowUpRight = (p) => (
  <svg {...base} {...p} aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

// ── Star (fill) ──
export const Star = (p) => (
  <svg {...base} {...p} fill="currentColor" stroke="none" aria-hidden="true">
    <path d="M12 2.5 14.9 8.6l6.8.9-5 4.7 1.3 6.7L12 17.8 6 20.9l1.3-6.7-5-4.7 6.8-.9Z" />
  </svg>
);

// ── Map pin with radar-dot ──
export const MapPin = (p) => (
  <svg {...base} {...p} aria-hidden="true">
    <path d="M20 10c0 5.5-8 12-8 12s-8-6.5-8-12a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="2.8" />
  </svg>
);

// ── Stethoscope — anatomically refined ──
export const Stethoscope = (p) => (
  <svg {...base} {...p} aria-hidden="true">
    <path d="M5 2.5v6a4.5 4.5 0 0 0 9 0v-6" />
    <path d="M4 2.5h2M13 2.5h2" strokeWidth="1.8" />
    <path d="M9.5 13v3.5a4.5 4.5 0 0 0 9 0V15" />
    <circle cx="18.5" cy="14" r="2.3" />
    <circle cx="18.5" cy="14" r="0.6" fill="currentColor" />
  </svg>
);

// ── Award — with ribbon + inner star ──
export const Award = (p) => (
  <svg {...base} {...p} aria-hidden="true">
    <circle cx="12" cy="9" r="5.8" />
    <path d="M12 5.5 13.1 7.8l2.4.35-1.75 1.7.41 2.4L12 11.1l-2.16 1.15.41-2.4L8.5 8.15l2.4-.35Z" strokeWidth="1.3" />
    <path d="m8 14 -1.5 7 5.5 -3 5.5 3 -1.5 -7" />
  </svg>
);

// ── Users — care team (cleaner grouping) ──
export const Users = (p) => (
  <svg {...base} {...p} aria-hidden="true">
    <circle cx="9" cy="8" r="3.4" />
    <path d="M2.5 20v-1.5a5 5 0 0 1 5-5h3a5 5 0 0 1 5 5V20" />
    <path d="M16 4a3.4 3.4 0 0 1 0 6.6" />
    <path d="M17.5 13.2A5 5 0 0 1 21.5 18V20" />
  </svg>
);

// ── Plus — clean medical ──
export const Plus = (p) => (
  <svg {...base} {...p} aria-hidden="true">
    <path d="M12 5v14M5 12h14" strokeWidth="2" />
  </svg>
);

// ── Workflow — process steps connected ──
export const Workflow = (p) => (
  <svg {...base} {...p} aria-hidden="true">
    <rect x="2.5" y="2.5" width="6.5" height="6.5" rx="1.5" />
    <rect x="15" y="15" width="6.5" height="6.5" rx="1.5" />
    <path d="M9 5.75h3.5a3 3 0 0 1 3 3v6.5" />
    <circle cx="5.75" cy="5.75" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="18.25" cy="18.25" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

// ── Message / quote bubble ──
export const MessageQuote = (p) => (
  <svg {...base} {...p} aria-hidden="true">
    <path d="M21 14.5a2.5 2.5 0 0 1-2.5 2.5H8l-4.5 4V5.5A2.5 2.5 0 0 1 6 3h12.5A2.5 2.5 0 0 1 21 5.5Z" />
    <path d="M9 9.5c-1.1 0-2 .9-2 2s.9 2 2 2M9 9.5v-.5M9 13.5v.5" strokeWidth="1.4" />
    <path d="M15 9.5c-1.1 0-2 .9-2 2s.9 2 2 2M15 9.5v-.5M15 13.5v.5" strokeWidth="1.4" />
  </svg>
);

// ── Heart (filled, anatomical curve) ──
export const HeartSolid = (p) => (
  <svg {...base} {...p} fill="currentColor" stroke="none" aria-hidden="true">
    <path d="M12 20.9c-.3 0-.6-.1-.8-.3C6 16.4 2 12.9 2 8.7 2 6 4.1 3.9 6.8 3.9c1.7 0 3.3.9 4.2 2.3l1 1.4 1-1.4c.9-1.4 2.5-2.3 4.2-2.3 2.7 0 4.8 2.1 4.8 4.8 0 4.2-4 7.7-9.2 11.9-.2.2-.5.3-.8.3Z" />
  </svg>
);

// ── Heart (outline) ──
export const Heart = (p) => (
  <svg {...base} {...p} aria-hidden="true">
    <path d="M20.8 6.6a5 5 0 0 0-7.1 0L12 8.3l-1.7-1.7a5 5 0 0 0-7.1 7.1l1.7 1.7L12 22.7l7.1-7.3 1.7-1.7a5 5 0 0 0 0-7.1Z" />
  </svg>
);

// ── Video play (for tour) ──
export const PlayCircle = (p) => (
  <svg {...base} {...p} aria-hidden="true">
    <circle cx="12" cy="12" r="9.5" />
    <path d="M10 8.5v7l6-3.5-6-3.5Z" fill="currentColor" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
  </svg>
);

// ── Document / Care plan ──
export const Clipboard = (p) => (
  <svg {...base} {...p} aria-hidden="true">
    <rect x="7.5" y="3.5" width="9" height="3.5" rx="1" />
    <path d="M7.5 5.5H6A2 2 0 0 0 4 7.5V20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5a2 2 0 0 0-2-2h-1.5" />
    <path d="M8 11h8M8 14.5h6M8 18h4" strokeWidth="1.4" />
  </svg>
);
