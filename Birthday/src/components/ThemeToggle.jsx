import React, { useState, useEffect, useCallback } from 'react';

// ─── localStorage key ───
const STORAGE_KEY = 'debalina_theme';

// ─── Theme palettes ───
const THEMES = {
  day: {
    '--color-bg-start': '#fff0f5',
    '--color-bg-mid': '#fff9f0',
    '--color-bg-end': '#f3f0ff',
    '--card-bg': 'rgba(255,255,255,0.88)',
    '--card-border': 'rgba(255, 255, 255, 0.7)',
    '--color-text': '#2d3436',
    '--color-text-muted': '#636e72',
    '--color-heading': '#1a1a2e',
  },
  night: {
    '--color-bg-start': '#0a0e27',
    '--color-bg-mid': '#111638',
    '--color-bg-end': '#1a1040',
    '--card-bg': 'rgba(22,25,50,0.92)',
    '--card-border': 'rgba(255, 255, 255, 0.12)',
    '--color-text': '#e8e8f0',
    '--color-text-muted': '#b2bec3',
    '--color-heading': '#ffffff',
  },
};

// ─── Generate random star data once ───
const NUM_STARS = 30;
const stars = Array.from({ length: NUM_STARS }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2 + 1, // 1–3 px
  delay: `${(Math.random() * 4).toFixed(2)}s`,
  duration: `${(1.5 + Math.random() * 2.5).toFixed(2)}s`,
}));

/**
 * ThemeToggle – Day/Night Nurse shift toggle for Debalina's birthday site.
 * Sets CSS custom properties on :root and a gradient on <body>.
 */
export default function ThemeToggle() {
  const [isNight, setIsNight] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'night';
    } catch {
      return false;
    }
  });

  // Apply theme vars + body gradient whenever mode changes
  const applyTheme = useCallback((night) => {
    const root = document.documentElement;
    const vars = night ? THEMES.night : THEMES.day;

    root.setAttribute('data-theme', night ? 'night' : 'day');

    Object.entries(vars).forEach(([prop, value]) => {
      root.style.setProperty(prop, value);
    });

    // Set body background gradient
    document.body.style.background = `linear-gradient(135deg, ${vars['--color-bg-start']}, ${vars['--color-bg-mid']}, ${vars['--color-bg-end']})`;
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.minHeight = '100vh';
  }, []);

  useEffect(() => {
    applyTheme(isNight);
    try {
      localStorage.setItem(STORAGE_KEY, isNight ? 'night' : 'day');
    } catch { /* quota errors, SSR, etc. */ }
  }, [isNight, applyTheme]);

  const toggle = () => setIsNight((prev) => !prev);

  return (
    <>
      {/* ── Inject keyframes + component styles ── */}
      <style>{componentStyles}</style>

      {/* ── Night‑mode star overlay ── */}
      {isNight && (
        <div className="tt-stars-overlay" aria-hidden="true">
          {stars.map((s) => (
            <span
              key={s.id}
              className="tt-star"
              style={{
                top: s.top,
                left: s.left,
                width: `${s.size}px`,
                height: `${s.size}px`,
                animationDelay: s.delay,
                animationDuration: s.duration,
              }}
            />
          ))}
        </div>
      )}

      {/* ── Toggle button ── */}
      <button
        className={`tt-toggle ${isNight ? 'tt-night' : 'tt-day'}`}
        onClick={toggle}
        aria-label={isNight ? 'Switch to Day Shift' : 'Switch to Night Shift'}
        title={isNight ? 'Switch to Day Shift' : 'Switch to Night Shift'}
      >
        {/* Track */}
        <span className="tt-track">
          {/* Celestial icon (slides left / right) */}
          <span className="tt-thumb">
            {isNight ? (
              /* Moon */
              <svg className="tt-icon tt-moon" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              /* Sun with rays */
              <svg className="tt-icon tt-sun" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="5" fill="currentColor" />
                <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </g>
              </svg>
            )}
          </span>
        </span>

        {/* Label */}
        <span className="tt-label">
          {isNight ? '🌙 Night Shift' : '☀️ Day Shift'}
        </span>
      </button>
    </>
  );
}

// ─── CSS (template literal keeps everything co‑located) ──────────────────────
const componentStyles = `
/* ══════════════════════════════════════════════
   ThemeToggle – keyframes
   ══════════════════════════════════════════════ */

/* Sun rays spin slowly */
@keyframes tt-spin-rays {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Moon gentle glow pulse */
@keyframes tt-moon-glow {
  0%, 100% { filter: drop-shadow(0 0 4px rgba(200,210,255,0.5)); }
  50%      { filter: drop-shadow(0 0 12px rgba(200,210,255,0.9)); }
}

/* Star twinkle */
@keyframes tt-twinkle {
  0%, 100% { opacity: 0.15; transform: scale(0.8); }
  50%      { opacity: 1;    transform: scale(1.2); }
}

/* Thumb slide */
@keyframes tt-slide-right {
  from { transform: translateX(0); }
  to   { transform: translateX(28px); }
}

/* ══════════════════════════════════════════════
   ThemeToggle – component styles
   ══════════════════════════════════════════════ */

/* ── Star overlay ── */
.tt-stars-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.tt-star {
  position: absolute;
  border-radius: 50%;
  background: #fff;
  animation: tt-twinkle ease-in-out infinite;
}

/* ── Toggle button reset ── */
.tt-toggle {
  all: unset;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
  position: relative;
  z-index: 50;
  font-family: inherit;
  transition: opacity 0.3s;
}

.tt-toggle:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 4px;
  border-radius: 20px;
}

/* ── Track ── */
.tt-track {
  position: relative;
  width: 56px;
  height: 28px;
  border-radius: 14px;
  transition: background 0.4s, box-shadow 0.4s;
  flex-shrink: 0;
}

/* Day track – warm sunrise gradient */
.tt-day .tt-track {
  background: linear-gradient(135deg, #ffd86f, #ffaa5c);
  box-shadow: 0 0 8px rgba(255,170,80,0.5);
}

/* Night track – deep navy gradient */
.tt-night .tt-track {
  background: linear-gradient(135deg, #1a1a4e, #2e1a6b);
  box-shadow: 0 0 10px rgba(100,100,220,0.35);
}

/* ── Thumb ── */
.tt-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s cubic-bezier(0.68, -0.3, 0.32, 1.3),
              background 0.4s;
}

.tt-day .tt-thumb {
  transform: translateX(0);
  background: #fff;
}

.tt-night .tt-thumb {
  transform: translateX(28px);
  background: #1e2152;
}

/* ── Icons ── */
.tt-icon {
  width: 16px;
  height: 16px;
}

.tt-sun {
  color: #f59e0b;
  animation: tt-spin-rays 12s linear infinite;
}

.tt-moon {
  color: #c9d1ff;
  animation: tt-moon-glow 3s ease-in-out infinite;
}

/* ── Label ── */
.tt-label {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  white-space: nowrap;
  transition: color 0.4s;
}

.tt-day .tt-label {
  color: #b45309;
}

.tt-night .tt-label {
  color: #c9d1ff;
}

@media (max-width: 768px) {
  .tt-label {
    display: none;
  }
  .tt-toggle {
    gap: 0;
  }
  .tt-track {
    width: 48px;
    height: 24px;
    border-radius: 12px;
  }
  .tt-thumb {
    width: 20px;
    height: 20px;
  }
  .tt-night .tt-thumb {
    transform: translateX(24px);
  }
  .tt-icon {
    width: 13px;
    height: 13px;
  }
}
`;
