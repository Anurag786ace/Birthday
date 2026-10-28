import { useState } from 'react';
import { playHeartbeatSound, playSparkleSound } from '../utils/audio';

const Chapter2NurseTribute = ({ onNext, onPrev }) => {
  const [stampActive, setStampActive] = useState(false);
  const [selectedPillar, setSelectedPillar] = useState(0);

  const pillars = [
    {
      title: 'Comfort in Pain',
      tag: 'Gentle Hands',
      text: 'Debalina doesn’t just administer medicine; she administers patience, calm whispers, and hope when pain feels overwhelming.',
      icon: '🤍',
    },
    {
      title: 'Unwavering Strength',
      tag: 'Tireless Spirit',
      text: 'Even after 12-hour shifts on her feet, she still finds energy to smile, hold a hand, and make a patient feel like they matter most.',
      icon: '💪',
    },
    {
      title: 'The Silent Hero',
      tag: 'Real-Life Superhero',
      text: 'Capes are overrated—the truest superheroes wear scrubs and carry stethoscopes, saving days one gentle heartbeat at a time.',
      icon: '🦸‍♀️',
    },
    {
      title: 'Sunshine Personality',
      tag: 'Radiant Joy',
      text: 'Her infectious laugh and warm energy don’t just heal patients; they brighten up the entire nursing station and everyone around her.',
      icon: '✨',
    },
  ];

  const handleStamp = () => {
    setStampActive(true);
    playSparkleSound();
    playHeartbeatSound();
  };

  return (
    <section className="story-chapter chapter-tribute">
      <div className="chapter-badge-wrap">
        <span className="chapter-pill">Chapter II • Dedicated Praise</span>
      </div>

      <h1 className="chapter-title">
        An Ode to Debalina: The Heart of Healing
      </h1>

      <p className="chapter-lead">
        Nursing is not merely a profession—it is a sacred craft of compassion, strength, and endless love.
        Today, we take a moment to honor the girl behind the stethoscope.
      </p>

      {/* Tribute Hero Banner */}
      <div className="nurse-hero-banner">
        <div className="nurse-illustration-wrap">
          <div className="stetho-heart-svg-wrap">
            <svg viewBox="0 0 200 200" className="stetho-svg">
              <defs>
                <linearGradient id="stethoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff758c" />
                  <stop offset="100%" stopColor="#ff7eb3" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              {/* Earpieces */}
              <path d="M 60,35 Q 70,10 90,30 L 95,55" fill="none" stroke="#636e72" strokeWidth="4" strokeLinecap="round" />
              <path d="M 140,35 Q 130,10 110,30 L 105,55" fill="none" stroke="#636e72" strokeWidth="4" strokeLinecap="round" />
              <circle cx="60" cy="35" r="5" fill="#2d3436" />
              <circle cx="140" cy="35" r="5" fill="#2d3436" />
              {/* Connector */}
              <path d="M 95,55 C 95,70 105,70 105,55" fill="none" stroke="#636e72" strokeWidth="4" />
              <path d="M 100,65 L 100,85" fill="none" stroke="#ff758c" strokeWidth="5" />
              {/* Heart Tubing */}
              <path
                d="M 100,85 C 70,55 20,85 45,130 C 65,165 100,185 100,185 C 100,185 135,165 155,130 C 180,85 130,55 100,85 Z"
                fill="none"
                stroke="url(#stethoGrad)"
                strokeWidth="6"
                strokeLinecap="round"
                filter="url(#glow)"
              />
              {/* Diaphragm */}
              <circle cx="100" cy="185" r="14" fill="#dfe6e9" stroke="#b2bec3" strokeWidth="3" />
              <circle cx="100" cy="185" r="8" fill="#ff758c" />
              {/* Center Heart beat icon */}
              <text x="100" y="125" textAnchor="middle" fontSize="24" fill="#ff4757">❤️</text>
            </svg>
          </div>
          <div className="nurse-tribute-text">
            <h3>"Healing Hands, Caring Heart"</h3>
            <p>
              Debalina, you make cold hospital rooms feel safe. You give strength to those fighting their hardest battles.
              You never give up on a patient, and you bring dignity, tenderness, and hope to everything you do.
              The world is undeniably softer, brighter, and kinder because you chose this noble path.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Pillars Carousel / Tabs */}
      <div className="pillars-container">
        <h2 className="section-subheading">✨ What Makes Debalina Unforgettable</h2>
        <div className="pillar-tabs">
          {pillars.map((item, idx) => (
            <button
              key={idx}
              className={`pillar-tab-btn ${selectedPillar === idx ? 'active' : ''}`}
              onClick={() => {
                playSparkleSound();
                setSelectedPillar(idx);
              }}
            >
              <span className="tab-icon">{item.icon}</span>
              <span className="tab-title">{item.title}</span>
            </button>
          ))}
        </div>

        <div className="pillar-detail-card">
          <span className="pillar-badge">{pillars[selectedPillar].tag}</span>
          <h3 className="pillar-heading">{pillars[selectedPillar].title}</h3>
          <p className="pillar-text">{pillars[selectedPillar].text}</p>
        </div>
      </div>

      {/* Official Medical Prescription Slip (Rx) */}
      <div className="rx-prescription-card">
        <div className="rx-paper-texture">
          <div className="rx-header">
            <div className="rx-symbol">℞</div>
            <div className="rx-hospital-details">
              <h4>DEPARTMENT OF HAPPINESS & CELEBRATION</h4>
              <p>Special Birthday Medical Order • No. DEBALINA-BDAY-2026</p>
            </div>
            <div className="rx-stamp-area" onClick={handleStamp} title="Click to stamp official approval!">
              <div className={`official-stamp ${stampActive ? 'stamped' : ''}`}>
                <span>VERIFIED</span>
                <strong>BEST NURSE EVER</strong>
                <span>100% APPROVED</span>
              </div>
            </div>
          </div>

          <div className="rx-patient-info">
            <div>
              <span className="rx-label">PATIENT NAME:</span>
              <span className="rx-val">Debalina (Our Favorite Healthcare Angel)</span>
            </div>
            <div>
              <span className="rx-label">DIAGNOSIS:</span>
              <span className="rx-val">Severe Case of Being Awesome & It's Her Birthday!</span>
            </div>
          </div>

          <div className="rx-prescriptions-list">
            <div className="rx-item">
              <span className="bullet">✦</span>
              <div className="item-text">
                <strong>Tab. Pure Bliss & Relaxation (1000mg):</strong>
                <span>Take immediately. Zero work emails, zero call bells, maximum couch chilling!</span>
              </div>
            </div>
            <div className="rx-item">
              <span className="bullet">✦</span>
              <div className="item-text">
                <strong>Syr. Sweet Delights (500ml):</strong>
                <span>Administer generous slices of birthday cake and sweet treats without counting calories.</span>
              </div>
            </div>
            <div className="rx-item">
              <span className="bullet">✦</span>
              <div className="item-text">
                <strong>Infusion of Love & Pampering (Continuous):</strong>
                <span>Run at full speed with tight hugs, compliments, and heartfelt wishes.</span>
              </div>
            </div>
            <div className="rx-item">
              <span className="bullet">✦</span>
              <div className="item-text">
                <strong>Refills:</strong>
                <span>Unlimited refills valid for the next 365 days of good health and joy!</span>
              </div>
            </div>
          </div>

          <div className="rx-footer">
            <div className="rx-doctor">
              <span>Prescribing Physician:</span>
              <span className="rx-doc-signature">The Universe & Everyone Who Loves Debalina ✍️</span>
            </div>
            <button className="stamp-btn" onClick={handleStamp}>
              {stampActive ? '✓ Prescription Officially Certified!' : '🩺 Click to Stamp Official Approval'}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="chapter-actions dual">
        <button className="secondary-story-btn" onClick={onPrev}>
          <span className="btn-arrow">⬅</span>
          <span>Chapter I: The Origin</span>
        </button>
        <button className="primary-story-btn" onClick={onNext}>
          <span>Chapter III • The Glowing Candle & Wish</span>
          <span className="btn-arrow">➔</span>
        </button>
      </div>
    </section>
  );
};

export default Chapter2NurseTribute;
