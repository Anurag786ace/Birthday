import { useState } from 'react';
import { playHeartbeatSound, playSparkleSound } from '../utils/audio';

const Chapter1Intro = ({ onNext }) => {
  const [pulseActive, setPulseActive] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const superpowers = [
    {
      id: 1,
      icon: '🩺',
      title: 'The Healing Touch',
      tagline: 'Gentle & Reassuring',
      description:
        'More comforting than any medicine, Debalina’s gentle presence turns anxiety into relief and loneliness into warmth for every patient under her care.',
      accent: '#ff6b8b',
    },
    {
      id: 2,
      icon: '🌙',
      title: 'The Midnight Vigil',
      tagline: 'Quiet Heroism',
      description:
        'When the rest of the world rests, she stands guard. Through long grueling night shifts, she is the guardian angel keeping hope alive until sunrise.',
      accent: '#6c5ce7',
    },
    {
      id: 3,
      icon: '🌸',
      title: 'Grace Under Pressure',
      tagline: 'Calm in the Storm',
      description:
        'In critical moments when seconds count, her steady hands, quick mind, and soothing voice bring order and peace to the chaos.',
      accent: '#00b894',
    },
    {
      id: 4,
      icon: '💖',
      title: 'Heart of Pure Gold',
      tagline: 'Infinite Empathy',
      description:
        'She treats every patient like family. Her listening ear and genuine smile have healed more broken spirits than numbers could ever measure.',
      accent: '#fdcb6e',
    },
  ];

  const handlePulse = () => {
    setPulseActive(true);
    playHeartbeatSound();
    setTimeout(() => setPulseActive(false), 1200);
  };

  return (
    <section className="story-chapter chapter-intro">
      <div className="chapter-badge-wrap">
        <span className="chapter-pill">Chapter I • The Origin</span>
      </div>

      <h1 className="chapter-title">
        The Girl in Scrubs Who Heals the World
      </h1>

      <p className="chapter-lead">
        In a world that often rushes by, there are rare souls whose quiet bravery and tender hands
        bring light into the darkest hospital rooms. Today, that story belongs to someone truly extraordinary:
        <span className="highlight-name"> Debalina</span>.
      </p>

      {/* Interactive Heartbeat Monitor */}
      <div className={`ecg-monitor-card ${pulseActive ? 'pulsing' : ''}`}>
        <div className="ecg-header">
          <div className="ecg-status">
            <span className="live-dot"></span>
            <span>CARDIAC RHYTHM: PURE COMPASSION</span>
          </div>
          <div className="ecg-bpm">
            <span>BPM</span>
            <strong>{pulseActive ? '108' : '72'}</strong>
          </div>
        </div>

        <div className="ecg-screen">
          <svg className="ecg-svg" viewBox="0 0 500 120" preserveAspectRatio="none">
            <path
              className="ecg-line-bg"
              d="M0,60 L70,60 L85,60 L95,20 L105,100 L115,40 L125,75 L135,60 L230,60 L245,60 L255,15 L265,105 L275,35 L285,75 L295,60 L390,60 L405,60 L415,20 L425,100 L435,40 L445,75 L455,60 L500,60"
            />
            <path
              className={`ecg-line-glow ${pulseActive ? 'active-pulse' : ''}`}
              d="M0,60 L70,60 L85,60 L95,20 L105,100 L115,40 L125,75 L135,60 L230,60 L245,60 L255,15 L265,105 L275,35 L285,75 L295,60 L390,60 L405,60 L415,20 L425,100 L435,40 L445,75 L455,60 L500,60"
            />
          </svg>
          <div className="ecg-scanline"></div>
        </div>

        <div className="ecg-footer">
          <button className="heartbeat-action-btn" onClick={handlePulse}>
            <span className="heart-icon">💓</span>
            <span>{pulseActive ? 'Heartbeat Felt: 100% Love & Care!' : 'Tap to Listen to Debalina’s Caring Heart'}</span>
          </button>
        </div>
      </div>

      {/* Superpowers Grid */}
      <div className="superpowers-section">
        <h2 className="section-subheading">
          ✨ Debalina’s Healing Superpowers
        </h2>
        <p className="section-note">Tap each badge to reveal what makes her so beloved:</p>

        <div className="superpower-grid">
          {superpowers.map((card) => {
            const isSelected = activeCard === card.id;
            return (
              <div
                key={card.id}
                className={`power-card ${isSelected ? 'open' : ''}`}
                style={{ '--card-accent': card.accent }}
                onClick={() => {
                  playSparkleSound();
                  setActiveCard(isSelected ? null : card.id);
                }}
              >
                <div className="card-top">
                  <span className="card-icon">{card.icon}</span>
                  <span className="card-tag">{card.tagline}</span>
                </div>
                <h3 className="card-heading">{card.title}</h3>
                <p className="card-desc">{card.description}</p>
                <div className="card-glow-indicator">
                  <span>{isSelected ? '✨ Loved & Cherished' : 'Tap to read tribute'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Story Quote Callout */}
      <div className="quote-callout">
        <div className="quote-icon">❝</div>
        <p className="quote-text">
          “To cure sometimes, to relieve often, to comfort always. But Debalina does more—she brings life, light, and warmth wherever her stethoscope travels.”
        </p>
        <span className="quote-author">— With endless admiration for our favorite Nurse</span>
      </div>

      {/* Navigation to next chapter */}
      <div className="chapter-actions">
        <button className="primary-story-btn" onClick={onNext}>
          <span>Turn the Page: Chapter II • The Nurse's Tribute</span>
          <span className="btn-arrow">➔</span>
        </button>
      </div>
    </section>
  );
};

export default Chapter1Intro;

