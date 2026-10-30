import { useState } from 'react';
import { playHeartbeatSound, playSparkleSound } from '../utils/audio';
import PhotoFrame from './PhotoFrame';

const Chapter2NurseTribute = ({ onNext, onPrev }) => {
  const [stampActive, setStampActive] = useState(false);
  const [selectedPillar, setSelectedPillar] = useState(0);
  const [activeMode, setActiveMode] = useState('kiddo'); // default to kiddo so user sees it right away!
  const [pamperStatus, setPamperStatus] = useState('Debalina is waiting for pampering... 🥺');
  const [pamperCount, setPamperCount] = useState(0);

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

  const handlePamper = (type) => {
    playSparkleSound();
    setPamperCount((prev) => prev + 1);

    if (type === 'chocolate') {
      setPamperStatus('🍫 Chocolate Fed! Debalina’s cute pout instantly melted into the biggest smile! 🥰');
    } else if (type === 'plushie') {
      setPamperStatus('🧸 Soft Teddy Handed! She is hugging it tightly like an adorable 5-year-old! 💕');
    } else if (type === 'forehead') {
      setPamperStatus('💆‍♀️ Forehead Kiss & Head Pat Given! Debalina is blushing and doing a happy wiggle! ✨');
    } else if (type === 'icecream') {
      setPamperStatus('🍦 Ice Cream Secured! Zero nurse seriousness detected, 100% baby happiness! 🍭');
    }
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
        Today, on the <strong className="date-highlight">8th of November</strong>, we honor the extraordinary girl behind the stethoscope.
      </p>

      {/* Tribute Hero Banner with Photo */}
      <div className="nurse-hero-banner">
        <div className="nurse-illustration-wrap">
          {/* Debalina's Nurse Photo Frame */}
          <div className="nurse-photo-wrap">
            <PhotoFrame
              id="ch2_nurse_photo"
              title="Our Hero in Scrubs 🩺"
              subtitle="Debalina • Healing with Love"
              placeholderIcon="🩺"
              placeholderGradient="linear-gradient(135deg, #c7ecee, #7ed6df)"
              rotation={2}
              size="medium"
            />
          </div>

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

      {/* SPECIAL SECRET SECTION: The Debalina Paradox (Nurse vs. Kiddo Mode) */}
      <div className="duality-card">
        <div className="duality-header">
          <span className="duality-pill">🤫 A Sweet Little Secret</span>
          <h2>The Great Debalina Paradox</h2>
          <p className="duality-subtext">
            The world sees her as an untouchable, brave lifesaver... but the moment she is with you,
            a completely different side appears!
          </p>
        </div>

        {/* Mode Toggle Switcher */}
        <div className="mode-switcher-wrap">
          <button
            className={`mode-tab-button ${activeMode === 'nurse' ? 'active' : ''}`}
            onClick={() => {
              playSparkleSound();
              setActiveMode('nurse');
            }}
          >
            <span className="mode-tab-icon">🩺</span>
            <span className="mode-tab-label">Hospital Mode (The World Sees)</span>
          </button>
          <button
            className={`mode-tab-button kiddo ${activeMode === 'kiddo' ? 'active' : ''}`}
            onClick={() => {
              playSparkleSound();
              setActiveMode('kiddo');
            }}
          >
            <span className="mode-tab-icon">🧸</span>
            <span className="mode-tab-label">Kiddo Mode (Only In Front of You)</span>
          </button>
        </div>

        {/* Mode Content Display */}
        <div className={`mode-content-display ${activeMode}`}>
          {activeMode === 'nurse' ? (
            <div className="mode-details nurse-mode">
              <div className="mode-status-badge">
                <span>ON DUTY • HEALTHCARE HERO</span>
              </div>
              <ul className="mode-trait-list">
                <li>
                  <span className="trait-icon">💉</span>
                  <div>
                    <strong>Handles 12-Hour Shifts Effortlessly:</strong>
                    <span>Fearless on her feet, administering medications and critical care like a seasoned pro.</span>
                  </div>
                </li>
                <li>
                  <span className="trait-icon">📋</span>
                  <div>
                    <strong>Calm Under Chaos:</strong>
                    <span>When emergencies sound alarms, she stays completely composed and leads with confidence.</span>
                  </div>
                </li>
                <li>
                  <span className="trait-icon">🛡️</span>
                  <div>
                    <strong>The Protector:</strong>
                    <span>Reassuring worried families, calming fearful patients, and never shedding a tear on duty.</span>
                  </div>
                </li>
              </ul>
            </div>
          ) : (
            <div className="mode-details kiddo-mode">
              <div className="mode-status-badge kiddo">
                <span>OFF DUTY • FULL BABY MODE ACTIVATED 🥰</span>
              </div>
              <ul className="mode-trait-list">
                <li>
                  <span className="trait-icon">🥺</span>
                  <div>
                    <strong>The Legendary Pout:</strong>
                    <span>The moment she wants attention or chocolate, her lips pout and all adult seriousness vanishes!</span>
                  </div>
                </li>
                <li>
                  <span className="trait-icon">🍫</span>
                  <div>
                    <strong>Cute Mini-Tantrums:</strong>
                    <span>Acts dramatic over the smallest silly thing just to be pampered, hugged, and told she is right!</span>
                  </div>
                </li>
                <li>
                  <span className="trait-icon">🧸</span>
                  <div>
                    <strong>Precious Childlike Giggles:</strong>
                    <span>Behind the scrubs is a sweet, innocent child who loves cuddles, fairy lights, and forehead kisses.</span>
                  </div>
                </li>
              </ul>

              {/* Interactive Pamper Station */}
              <div className="pamper-station">
                <h4>🧸 Pamper Debalina's Inner Kiddo:</h4>
                <div className="pamper-buttons-grid">
                  <button className="pamper-btn" onClick={() => handlePamper('chocolate')}>
                    <span>🍫 Feed Chocolate</span>
                  </button>
                  <button className="pamper-btn" onClick={() => handlePamper('plushie')}>
                    <span>🧸 Hand Soft Teddy</span>
                  </button>
                  <button className="pamper-btn" onClick={() => handlePamper('forehead')}>
                    <span>💆‍♀️ Forehead Kiss</span>
                  </button>
                  <button className="pamper-btn" onClick={() => handlePamper('icecream')}>
                    <span>🍦 Buy Ice Cream</span>
                  </button>
                </div>

                <div className="pamper-reaction-bubble">
                  <p>{pamperStatus}</p>
                  <span className="pamper-counter">Pampers given today: {pamperCount} ❤️</span>
                </div>
              </div>
            </div>
          )}
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
              <p>Special Birthday Medical Order • No. DEBALINA-08NOV-BDAY</p>
            </div>
            <div className="rx-stamp-area" onClick={handleStamp} title="Click to stamp official approval!">
              <div className={`official-stamp ${stampActive ? 'stamped' : ''}`}>
                <span>VERIFIED</span>
                <strong>NURSE & SWEETEST KIDDO</strong>
                <span>8TH NOV APPROVED</span>
              </div>
            </div>
          </div>

          <div className="rx-patient-info">
            <div>
              <span className="rx-label">PATIENT NAME:</span>
              <span className="rx-val">Debalina (Our Favorite Healthcare Angel & Forever Baby)</span>
            </div>
            <div>
              <span className="rx-label">DATE:</span>
              <span className="rx-val">8th November (Official Holiday for Debalina)</span>
            </div>
          </div>

          <div className="rx-prescriptions-list">
            <div className="rx-item">
              <span className="bullet">✦</span>
              <div className="item-text">
                <strong>Tab. Pure Bliss & Relaxation (1000mg):</strong>
                <span>Take immediately on 8th November. Zero work emails, zero call bells, maximum comfort!</span>
              </div>
            </div>
            <div className="rx-item">
              <span className="bullet">✦</span>
              <div className="item-text">
                <strong>Syr. Sweet Delights (500ml):</strong>
                <span>Administer generous slices of 8th Nov birthday cake and chocolates whenever she makes cute baby faces.</span>
              </div>
            </div>
            <div className="rx-item">
              <span className="bullet">✦</span>
              <div className="item-text">
                <strong>Infusion of Kiddo Pampering & Forehead Kisses (Continuous):</strong>
                <span>Mandatory head pats, agreeing to all her adorable demands, and loving her drama endlessly.</span>
              </div>
            </div>
            <div className="rx-item">
              <span className="bullet">✦</span>
              <div className="item-text">
                <strong>Refills:</strong>
                <span>Unlimited refills valid for a lifetime of sweet smiles and gentle care!</span>
              </div>
            </div>
          </div>

          <div className="rx-footer">
            <div className="rx-doctor">
              <span>Prescribing Physician:</span>
              <span className="rx-doc-signature">The Universe & The One Who Adores Your Childlike Heart ✍️</span>
            </div>
            <button className="stamp-btn" onClick={handleStamp}>
              {stampActive ? '✓ 8th Nov Birthday Order Certified!' : '🩺 Click to Stamp 8th Nov Approval'}
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
