import { useState } from 'react';
import { playCandleBlowSound, playSparkleSound } from '../utils/audio';

const Chapter3Candle = ({ onNext, onPrev, triggerConfetti }) => {
  const [isBlown, setIsBlown] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const [customWish, setCustomWish] = useState('');
  const [isTypingWish, setIsTypingWish] = useState(false);

  const handleBlowCandle = () => {
    if (isBlown) return;
    setIsBlown(true);
    setWishMade(true);
    playCandleBlowSound();

    if (triggerConfetti) {
      triggerConfetti(window.innerWidth / 2, window.innerHeight * 0.45, 90);
    }
  };

  const handleRelight = () => {
    setIsBlown(false);
    playSparkleSound();
  };

  return (
    <section className={`story-chapter chapter-candle ${isBlown ? 'candle-extinguished' : 'candle-burning'}`}>
      <div className="chapter-badge-wrap">
        <span className="chapter-pill">Chapter III • Make a Wish</span>
      </div>

      <h1 className="chapter-title">
        {isBlown ? '✨ The Wish Has Taken Flight! ✨' : 'The Glowing Candle of Debalina’s Dreams'}
      </h1>

      <p className="chapter-lead">
        {isBlown
          ? 'Your wish has risen into the stars. The universe has recorded every whisper of happiness meant for you.'
          : 'Close your eyes, take a deep breath, think of the sweetest dream your heart desires, and blow out the candle!'}
      </p>

      {/* Candle Stage */}
      <div className="candle-stage-wrapper">
        <div className={`ambient-glow ${isBlown ? 'glow-off' : 'glow-on'}`} />

        <div className="candle-container" onClick={handleBlowCandle} title="Click candle to blow it out!">
          {/* Flame & Smoke */}
          <div className="flame-smoke-area">
            {!isBlown ? (
              <div className="realistic-flame">
                <div className="flame-outer"></div>
                <div className="flame-inner"></div>
                <div className="flame-blue"></div>
                <div className="flame-sparks">
                  <span></span><span></span><span></span>
                </div>
              </div>
            ) : (
              <div className="smoke-trail">
                <div className="smoke-puff p1"></div>
                <div className="smoke-puff p2"></div>
                <div className="smoke-puff p3"></div>
                <div className="sparkle-stars">✨ ⭐ 🌟</div>
              </div>
            )}
          </div>

          {/* Candle Wick */}
          <div className="candle-wick"></div>

          {/* Candle Body */}
          <div className="candle-body">
            <div className="candle-wax-texture">
              <span className="wax-drip d1"></span>
              <span className="wax-drip d2"></span>
              <span className="wax-drip d3"></span>
            </div>
            <div className="candle-inscription">
              <span>🩺 Debalina</span>
            </div>
          </div>

          {/* Candle Stand / Base */}
          <div className="candle-base">
            <div className="golden-plate"></div>
            <div className="rose-petals-ring">
              <span>🌸</span><span>🌺</span><span>🌸</span><span>🌺</span><span>🌸</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="candle-control-box">
          {!isBlown ? (
            <button className="blow-candle-btn" onClick={handleBlowCandle}>
              <span className="wind-icon">💨</span>
              <span className="btn-main-text">Blow Out the Candle & Make a Wish!</span>
            </button>
          ) : (
            <div className="wish-revealed-panel">
              <div className="wish-blessing-card">
                <div className="blessing-header">
                  <span className="magic-icon">🌟</span>
                  <h3>The Universe’s Blessing For Nurse Debalina</h3>
                </div>
                <p className="blessing-text">
                  “May all the healing, kindness, and patient love you give so selflessly to the world
                  return to you multiplied a million times over. May your shifts be smooth, your heart always full,
                  your laughter ever bright, and your wildest dreams come true.”
                </p>
                <div className="blessing-footer">
                  <button className="relight-btn" onClick={handleRelight}>
                    <span>🕯️ Relight Candle</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Wish Note Area */}
      <div className="personal-wish-box">
        <h4>💌 Whisper Your Secret Birthday Wish to the Stars:</h4>
        <div className="wish-input-row">
          <input
            type="text"
            className="wish-input"
            placeholder="e.g. A peaceful vacation, boundless joy, lots of chocolates..."
            value={customWish}
            onChange={(e) => setCustomWish(e.target.value)}
          />
          <button
            className="send-wish-btn"
            onClick={() => {
              if (customWish.trim()) {
                playSparkleSound();
                setIsTypingWish(true);
                if (triggerConfetti) triggerConfetti(window.innerWidth / 2, window.innerHeight / 2, 40);
                setTimeout(() => setIsTypingWish(false), 2500);
              }
            }}
          >
            <span>Send to Universe 🚀</span>
          </button>
        </div>
        {isTypingWish && (
          <p className="wish-sent-msg">✨ Your secret wish for Debalina has been etched into the stars! ✨</p>
        )}
      </div>

      {/* Navigation */}
      <div className="chapter-actions dual">
        <button className="secondary-story-btn" onClick={onPrev}>
          <span className="btn-arrow">⬅</span>
          <span>Chapter II: The Healer's Heart</span>
        </button>
        <button className="primary-story-btn" onClick={onNext}>
          <span>Chapter IV • The Cake Cutting Ceremony</span>
          <span className="btn-arrow">➔</span>
        </button>
      </div>
    </section>
  );
};

export default Chapter3Candle;
