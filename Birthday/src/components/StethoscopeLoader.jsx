import React, { useState, useEffect } from 'react';

/**
 * StethoscopeLoader - Animated stethoscope page transition loader.
 * Plays a draw-on stethoscope SVG, pulsing chest piece, ECG heartbeat trace,
 * and "Turning the page..." text between chapter transitions.
 *
 * @param {boolean} visible - Controls whether the loader is shown.
 */
const StethoscopeLoader = ({ visible }) => {
  // Internal state to keep the component mounted during fade-out
  const [shouldRender, setShouldRender] = useState(visible);
  // Controls the fade-out CSS class
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (visible) {
      // When becoming visible, reset fade and mount
      setFadeOut(false);
      setShouldRender(true);
    } else if (shouldRender) {
      // When hiding, start fade-out then unmount after transition
      setFadeOut(true);
      const timer = setTimeout(() => setShouldRender(false), 400);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!shouldRender) return null;

  return (
    <>
      <style>{styles}</style>
      <div className={`steth-loader-overlay ${fadeOut ? 'steth-loader-fadeout' : ''}`}>
        <div className="steth-loader-content">
          {/* === SVG Stethoscope + ECG === */}
          <svg
            className="steth-svg"
            viewBox="0 0 200 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* ---------- Tubing (draws itself) ---------- */}
            {/* Left earpiece nub */}
            <circle cx="62" cy="18" r="5" className="steth-earpiece" />
            {/* Right earpiece nub */}
            <circle cx="138" cy="18" r="5" className="steth-earpiece" />

            {/* Left tube */}
            <path
              d="M62 23 C62 60, 70 90, 85 110"
              className="steth-tube steth-tube-left"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Right tube */}
            <path
              d="M138 23 C138 60, 130 90, 115 110"
              className="steth-tube steth-tube-right"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Yoke / junction */}
            <path
              d="M85 110 C90 118, 95 122, 100 125 C105 122, 110 118, 115 110"
              className="steth-tube steth-tube-yoke"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Single tube down to chest piece */}
            <path
              d="M100 125 C100 145, 100 160, 100 178"
              className="steth-tube steth-tube-stem"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            {/* ---------- Chest piece (pulses) ---------- */}
            <circle cx="100" cy="195" r="22" className="steth-chestpiece" />
            <circle cx="100" cy="195" r="14" className="steth-chestpiece-inner" />
            {/* Small center dot */}
            <circle cx="100" cy="195" r="4" className="steth-chestpiece-dot" />

            {/* ---------- ECG / Heartbeat trace ---------- */}
            <polyline
              points="10,245 40,245 50,245 58,245 64,235 68,260 74,225 80,255 86,240 92,245 130,245 190,245"
              className="steth-ecg"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* === Text === */}
          <p className="steth-loader-text">Turning the page...</p>
        </div>
      </div>
    </>
  );
};

/* ------------------------------------------------------------------ */
/*  All CSS as a template literal – scoped via class-name prefixes    */
/* ------------------------------------------------------------------ */
const styles = `
/* ===== Overlay ===== */
.steth-loader-overlay {
  position: fixed;
  inset: 0;
  z-index: 99998;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  animation: stethFadeIn 0.25s ease-out forwards;
}
.steth-loader-overlay.steth-loader-fadeout {
  animation: stethFadeOut 0.4s ease-in forwards;
}

@keyframes stethFadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes stethFadeOut {
  from { opacity: 1; }
  to   { opacity: 0; }
}

/* ===== Centered content wrapper ===== */
.steth-loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

/* ===== SVG canvas ===== */
.steth-svg {
  width: 160px;
  height: auto;
  filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.15));
}

/* ===== Earpieces ===== */
.steth-earpiece {
  fill: #e0e0e0;
  opacity: 0;
  animation: stethPartFadeIn 0.15s ease-out forwards;
}

/* ===== Tubing draw-on ===== */
.steth-tube {
  fill: none;
  stroke: #e0e0e0;
}
.steth-tube-left {
  stroke-dasharray: 120;
  stroke-dashoffset: 120;
  animation: stethDraw 0.35s 0.05s ease-out forwards;
}
.steth-tube-right {
  stroke-dasharray: 120;
  stroke-dashoffset: 120;
  animation: stethDraw 0.35s 0.05s ease-out forwards;
}
.steth-tube-yoke {
  stroke-dasharray: 60;
  stroke-dashoffset: 60;
  animation: stethDraw 0.2s 0.35s ease-out forwards;
}
.steth-tube-stem {
  stroke-dasharray: 60;
  stroke-dashoffset: 60;
  animation: stethDraw 0.2s 0.5s ease-out forwards;
}

@keyframes stethDraw {
  to { stroke-dashoffset: 0; }
}
@keyframes stethPartFadeIn {
  to { opacity: 1; }
}

/* ===== Chest piece (appears then pulses) ===== */
.steth-chestpiece {
  fill: #b0bec5;
  opacity: 0;
  animation: stethPartFadeIn 0.15s 0.65s ease-out forwards,
             stethPulse 0.6s 0.7s ease-in-out infinite;
  transform-origin: 100px 195px;
}
.steth-chestpiece-inner {
  fill: #90a4ae;
  opacity: 0;
  animation: stethPartFadeIn 0.15s 0.65s ease-out forwards,
             stethPulse 0.6s 0.7s ease-in-out infinite;
  transform-origin: 100px 195px;
}
.steth-chestpiece-dot {
  fill: #607d8b;
  opacity: 0;
  animation: stethPartFadeIn 0.15s 0.65s ease-out forwards;
}

@keyframes stethPulse {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.08); }
}

/* ===== ECG heartbeat trace ===== */
.steth-ecg {
  fill: none;
  stroke: #ef5350;
  stroke-dasharray: 260;
  stroke-dashoffset: 260;
  animation: stethEcgDraw 0.5s 0.75s ease-in-out forwards;
  filter: drop-shadow(0 0 4px rgba(239, 83, 80, 0.6));
}

@keyframes stethEcgDraw {
  to { stroke-dashoffset: 0; }
}

/* ===== Text ===== */
.steth-loader-text {
  margin: 0;
  font-family: 'Georgia', 'Times New Roman', serif;
  font-size: 1.05rem;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.85);
  opacity: 0;
  animation: stethTextFade 0.4s 0.8s ease-out forwards;
}

@keyframes stethTextFade {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
`;

export default StethoscopeLoader;
