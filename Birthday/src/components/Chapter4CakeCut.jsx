import { useState } from 'react';
import { playCakeSliceSound, startBdayMusic, playSparkleSound } from '../utils/audio';

const Chapter4CakeCut = ({ onNext, onPrev, triggerConfetti, triggerRain, onStartMusic }) => {
  const [isCut, setIsCut] = useState(false);
  const [isCutting, setIsCutting] = useState(false);
  const [fedSlices, setFedSlices] = useState(0);

  const handleCutCake = () => {
    if (isCutting || isCut) return;
    setIsCutting(true);
    playCakeSliceSound();

    setTimeout(() => {
      setIsCut(true);
      setIsCutting(false);
      if (triggerConfetti) {
        triggerConfetti(window.innerWidth / 2, window.innerHeight * 0.4, 150);
      }
      if (triggerRain) {
        triggerRain(3500);
      }
      if (onStartMusic) {
        onStartMusic();
      }
    }, 900);
  };

  const handleFeedSlice = () => {
    setFedSlices((prev) => prev + 1);
    playSparkleSound();
    if (triggerConfetti) {
      triggerConfetti(window.innerWidth / 2, window.innerHeight * 0.6, 35);
    }
  };

  const handleResetCake = () => {
    setIsCut(false);
    playSparkleSound();
  };

  return (
    <section className="story-chapter chapter-cake">
      <div className="chapter-badge-wrap">
        <span className="chapter-pill">Chapter IV • The Sweetest Moment</span>
      </div>

      <h1 className="chapter-title">
        {isCut ? '🎉 Happy Birthday, Nurse Debalina! 🎉' : 'The Grand Cake Cutting Ceremony'}
      </h1>

      <p className="chapter-lead">
        {isCut
          ? 'The cake is cut, the celebration is in full swing, and smiles are everywhere! May your year be as sweet as every bite!'
          : 'Hold the ceremonial knife, gather around, and let’s slice Debalina’s custom-crafted birthday cake!'}
      </p>

      {/* Celebration Banner when cut */}
      {isCut && (
        <div className="celebration-banner-wrapper">
          <div className="celebration-banner">
            <span className="bunting">🎊 🎈 🌸 🩺 🎂 🌸 🎈 🎊</span>
            <h2>HAPPY BIRTHDAY DEBALINA!</h2>
            <p>To our heroic nurse, incredible friend, and pure ray of sunshine!</p>
          </div>
        </div>
      )}

      {/* Cake Stage */}
      <div className="cake-ceremony-stage">
        <div className="cake-pedestal">
          {/* Animated Knife */}
          <div
            className={`ceremonial-knife ${isCutting ? 'cutting' : ''} ${isCut ? 'cut-done' : ''}`}
            onClick={handleCutCake}
            title="Click knife to slice the cake!"
          >
            <div className="knife-blade">
              <span className="knife-shine"></span>
            </div>
            <div className="knife-handle">
              <span className="knife-ribbon">🎀</span>
            </div>
          </div>

          {/* Layered Birthday Cake Illustration */}
          <div className={`birthday-cake ${isCut ? 'cake-sliced' : ''}`}>
            {/* Top Candles & Sparklers */}
            <div className="cake-sparklers">
              <span className="sparkler s1">✨</span>
              <span className="sparkler s2">⭐</span>
              <span className="sparkler s3">✨</span>
            </div>

            {/* Top Tier */}
            <div className="cake-tier tier-top">
              <div className="frosting-plaque">
                <span>Debalina 🌸</span>
              </div>
              <div className="strawberries-row">
                <span>🍓</span><span>🍓</span><span>🍓</span>
              </div>
              <div className="frosting-drips"></div>
            </div>

            {/* Middle Tier */}
            <div className="cake-tier tier-mid">
              <div className="nurse-fondant-decor">
                <span className="fondant-badge">🩺</span>
                <span className="fondant-pill">💖</span>
                <span className="fondant-badge">🩹</span>
              </div>
              <div className="cream-pearls"></div>
            </div>

            {/* Bottom Tier */}
            <div className="cake-tier tier-bottom">
              <div className="bottom-frosting-swirls"></div>
              <div className="cake-base-plate"></div>
            </div>

            {/* Sliced Out Cake Wedge */}
            {isCut && (
              <div className="cake-slice-wedge">
                <div className="wedge-frosting">🍓</div>
                <div className="wedge-cream"></div>
                <div className="wedge-plate">
                  <span>Golden Plate</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="cake-controls">
          {!isCut ? (
            <button
              className={`cut-cake-btn ${isCutting ? 'disabled' : ''}`}
              onClick={handleCutCake}
              disabled={isCutting}
            >
              <span className="knife-btn-icon">🔪</span>
              <span className="btn-main-text">
                {isCutting ? 'Slicing with Love...' : 'Cut the Birthday Cake! 🎂'}
              </span>
            </button>
          ) : (
            <div className="cut-celebration-actions">
              <button className="feed-slice-btn" onClick={handleFeedSlice}>
                <span>🍰 Feed Virtual Slice of Cake to Debalina! ({fedSlices} shared)</span>
              </button>
              <button className="cut-again-btn" onClick={handleResetCake}>
                <span>↺ Re-cut Cake</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Balloons and Party Props */}
      {isCut && (
        <div className="floating-balloons-container" aria-hidden="true">
          <span className="balloon b1" style={{ left: '10%' }}>🎈</span>
          <span className="balloon b2" style={{ left: '25%' }}>🌸</span>
          <span className="balloon b3" style={{ left: '70%' }}>🎈</span>
          <span className="balloon b4" style={{ left: '85%' }}>💖</span>
        </div>
      )}

      {/* Navigation */}
      <div className="chapter-actions dual">
        <button className="secondary-story-btn" onClick={onPrev}>
          <span className="btn-arrow">⬅</span>
          <span>Chapter III: The Glowing Candle</span>
        </button>
        <button className="primary-story-btn" onClick={onNext}>
          <span>Chapter V • Letters & Wishes Jar</span>
          <span className="btn-arrow">➔</span>
        </button>
      </div>
    </section>
  );
};

export default Chapter4CakeCut;
