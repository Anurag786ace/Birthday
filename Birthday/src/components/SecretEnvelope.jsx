import React, { useState } from 'react';
import './SecretEnvelope.css';
import { playSparkleSound, playCelebrationChime } from '../utils/audio';

export default function SecretEnvelope({ triggerConfetti }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [hearts, setHearts] = useState([]);

  const handleOpen = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);
    playSparkleSound();

    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      playCelebrationChime();
      if (triggerConfetti) {
        triggerConfetti(window.innerWidth / 2, window.innerHeight * 0.45, 100);
      }
    }, 600);

    // Spawn floating heart particles
    const newHearts = Array.from({ length: 22 }).map((_, i) => ({
      id: Date.now() + i,
      left: `${10 + Math.random() * 80}%`,
      bottom: `${15 + Math.random() * 40}%`,
      fontSize: `${18 + Math.random() * 20}px`,
      animationDuration: `${3.5 + Math.random() * 3}s`,
      animationDelay: `${Math.random() * 1.5}s`,
      emoji: ['💖', '🌸', '✨', '🤍', '🧸', '🩺'][Math.floor(Math.random() * 6)],
    }));
    setHearts(newHearts);
  };

  const handleReseal = (e) => {
    e.stopPropagation();
    setIsOpen(false);
    setIsOpening(false);
    setHearts([]);
    playSparkleSound();
  };

  return (
    <div className={`secret-envelope-section ${isOpen ? 'envelope-is-open' : ''}`}>
      {/* Floating hearts particles */}
      {isOpen && (
        <div className="hearts-container" aria-hidden="true">
          {hearts.map((h) => (
            <span
              key={h.id}
              className="floating-heart"
              style={{
                left: h.left,
                bottom: h.bottom,
                fontSize: h.fontSize,
                animationDuration: h.animationDuration,
                animationDelay: h.animationDelay,
              }}
            >
              {h.emoji}
            </span>
          ))}
        </div>
      )}

      {!isOpen ? (
        /* ==================== CLOSED STATE: LUXURIOUS VINTAGE ENVELOPE ==================== */
        <div className="envelope-closed-stage">
          <div
            className={`vintage-envelope ${isOpening ? 'breaking-seal' : ''}`}
            onClick={handleOpen}
            title="Tap the royal wax seal to open Debalina's secret letter!"
          >
            {/* Triangular Flap (folding down from top edge) */}
            <div className={`envelope-top-flap ${isOpening ? 'flap-opening' : ''}`}>
              <svg viewBox="0 0 460 140" className="flap-svg" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="flapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#eddcc3" />
                    <stop offset="80%" stopColor="#e2c8a7" />
                    <stop offset="100%" stopColor="#d5b892" />
                  </linearGradient>
                  <filter id="flapShadow" x="-10%" y="0%" width="120%" height="150%">
                    <feDropShadow dx="0" dy="6" stdDeviation="5" floodOpacity="0.2" />
                  </filter>
                </defs>
                <polygon
                  points="0,0 460,0 230,135"
                  fill="url(#flapGrad)"
                  filter="url(#flapShadow)"
                  stroke="#d4b896"
                  strokeWidth="1"
                />
              </svg>

              {/* Ornate Monogram Wax Seal pinned right at the tip of the triangle */}
              <div
                className="wax-seal-button"
                onClick={handleOpen}
                title="Tap the royal monogram wax seal to open Debalina's secret letter"
              >
                <div className="seal-stamp-ring">
                  <span className="seal-monogram">D</span>
                </div>
              </div>
            </div>

            {/* Envelope Front Pocket */}
            <div className="envelope-pocket">
              {/* Postage Stamp in corner */}
              <div className="postage-stamp">
                <div className="postage-stamp-inner">
                  <span className="postage-stamp-icon">🩺</span>
                  <span className="postage-stamp-date">8th Nov</span>
                  <span className="postage-stamp-label">SPECIAL</span>
                </div>
              </div>

              {/* Calligraphy Inscription on front of envelope */}
              <div className="envelope-inscription">
                <span>For Debalina • 8th November Edition ✨</span>
              </div>
            </div>
          </div>

          <p className="envelope-action-hint">
            ✨ Tap the royal monogram seal to open Debalina's secret letter ✨
          </p>
        </div>
      ) : (
        /* ==================== OPEN STATE: GLORIOUS, UNRESTRICTED LOVE LETTER ==================== */
        <div className="opened-letter-stage">
          {/* Header Badge */}
          <div className="keepsake-envelope-header">
            <span className="keepsake-badge">📜 Special Birthday Keepsake • 8th November</span>
          </div>

          {/* Full, Beautifully Formatted Parchment Letter */}
          <div className="revealed-parchment-letter">
            <div className="notebook-red-margin"></div>

            <div className="letter-header-row">
              <span className="letter-greeting">Dearest Debalina 🌸,</span>
              <span className="letter-corner-tag">Strictly for your eyes only</span>
            </div>

            <div className="letter-text-content">
              <p className="letter-para">
                To the girl who spends every shift healing the world, holding strangers’ hands in fear,
                and standing as a guardian angel through long, sleepless nights...
              </p>

              <p className="letter-para">
                You pour so much love, patience, and courage into everyone around you. But what I cherish
                most in this entire universe is the moment you step off duty and become just <em>you</em>—my
                favorite person, who behaves like an adorable, innocent kiddo who pouts for chocolates and
                melts into warm hugs.
              </p>

              <p className="letter-para">
                Behind the scrubs and stethoscope is the gentlest heart I have ever known. Thank you for
                trusting me with your smiles, your cute little tantrums, and your truest self.
              </p>
            </div>

            <div className="letter-footer-block">
              <div className="letter-bday-wish">
                Happy Birthday, Debalina! 💖
              </div>
              <div className="letter-sign">
                Forever yours, with a heart full of endless love & admiration ✍️✨
              </div>
            </div>
          </div>

          {/* Re-seal Button positioned cleanly BELOW the letter */}
          <div className="letter-reseal-wrapper">
            <button className="reseal-letter-btn" onClick={handleReseal}>
              <span>🔒 Fold Letter & Re-seal Envelope</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
