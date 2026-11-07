import React, { useState, useEffect } from 'react';
import {
  startLullabyMusic,
  stopLullabyMusic,
  toggleLullabyMusic,
  isLullabyActive,
  playSparkleSound,
} from '../utils/audio';

export default function LullabyMode() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCuddled, setIsCuddled] = useState(false);

  useEffect(() => {
    setIsPlaying(isLullabyActive());
    return () => {
      // Don't stop music on unmount so she can listen as she browses, or stop if needed
    };
  }, []);

  const handleToggle = () => {
    playSparkleSound();
    toggleLullabyMusic((active) => {
      setIsPlaying(active);
    });
  };

  const handleCuddle = () => {
    playSparkleSound();
    setIsCuddled(true);
    setTimeout(() => setIsCuddled(false), 2000);
  };

  return (
    <div className="lullaby-box">
      <div className="lullaby-header">
        <span className="lullaby-pill">🌙 Kiddo Bedtime Mode</span>
        <h3 className="lullaby-title">Lullaby for our Favorite Kiddo</h3>
        <p className="lullaby-subtitle">
          After a tiring 12-hour hospital shift, our brave nurse deserves the sweetest, gentlest sleep.
        </p>
      </div>

      {/* Rocking Teddy Bear & Stars Stage */}
      <div className="rocking-stage">
        <div className={`rocking-cloud ${isPlaying ? 'drifting' : ''}`}>☁️</div>
        <div className="rocking-moon">🌙</div>

        <div
          className={`rocking-teddy ${isPlaying ? 'rocking' : ''} ${isCuddled ? 'cuddled' : ''}`}
          onClick={handleCuddle}
          title="Click to cuddle the sleepy teddy bear!"
        >
          <div className="teddy-art">🧸</div>
          <div className="teddy-sleep-bubbles">
            <span>z</span>
            <span>z</span>
            <span>Z</span>
          </div>
        </div>

        <div className="dreamy-stars">
          <span>⭐</span>
          <span>✨</span>
          <span>⭐</span>
        </div>
      </div>

      {/* Music Box Controls */}
      <div className="lullaby-controls">
        <button
          className={`lullaby-play-btn ${isPlaying ? 'playing' : ''}`}
          onClick={handleToggle}
        >
          <span className="lullaby-icon">{isPlaying ? '⏸️' : '🎵'}</span>
          <span>{isPlaying ? 'Pause Soft Lullaby' : 'Play Gentle Bedtime Music Box'}</span>
        </button>

        <button className="teddy-cuddle-btn" onClick={handleCuddle}>
          <span>🤗 {isCuddled ? 'Cuddled tight! 🥰' : 'Cuddle the Teddy'}</span>
        </button>
      </div>

      <div className="lullaby-footer-note">
        <span>“Sweet dreams, little kiddo. The world is safe tonight because of your healing hands.” 🌸</span>
      </div>

      <style>{`
        .lullaby-box {
          background: linear-gradient(135deg, rgba(235, 240, 255, 0.95), rgba(255, 245, 250, 0.95));
          border: 2px dashed rgba(132, 94, 194, 0.35);
          border-radius: 24px;
          padding: 28px 24px;
          margin-top: 28px;
          text-align: center;
          position: relative;
          box-shadow: 0 10px 30px rgba(132, 94, 194, 0.08);
        }
        .lullaby-pill {
          display: inline-block;
          padding: 4px 14px;
          border-radius: 20px;
          background: rgba(132, 94, 194, 0.15);
          color: #845ec2;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .lullaby-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 1.45rem;
          color: #2d3436;
          margin-bottom: 6px;
        }
        .lullaby-subtitle {
          font-size: 0.92rem;
          color: #636e72;
          max-width: 520px;
          margin: 0 auto 18px;
          line-height: 1.5;
        }
        .rocking-stage {
          position: relative;
          height: 130px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 10px 0 20px;
        }
        .rocking-cloud {
          position: absolute;
          left: 20%;
          top: 10px;
          font-size: 2rem;
          opacity: 0.7;
        }
        .rocking-cloud.drifting {
          animation: cloudDrift 6s ease-in-out infinite alternate;
        }
        @keyframes cloudDrift {
          0% { transform: translateX(0); }
          100% { transform: translateX(30px); }
        }
        .rocking-moon {
          position: absolute;
          right: 22%;
          top: 5px;
          font-size: 2.2rem;
          filter: drop-shadow(0 0 10px rgba(254, 202, 87, 0.5));
          animation: moonGlow 3s ease-in-out infinite alternate;
        }
        @keyframes moonGlow {
          0% { transform: scale(1); filter: brightness(1); }
          100% { transform: scale(1.08); filter: brightness(1.2); }
        }
        .rocking-teddy {
          position: relative;
          font-size: 4rem;
          cursor: pointer;
          user-select: none;
          transform-origin: 50% 90%;
          transition: transform 0.3s ease;
        }
        .rocking-teddy.rocking {
          animation: teddyRock 2.6s ease-in-out infinite alternate;
        }
        .rocking-teddy.cuddled {
          animation: teddyCuddle 0.6s ease-in-out;
        }
        @keyframes teddyRock {
          0% { transform: rotate(-12deg) translateY(0); }
          50% { transform: rotate(0deg) translateY(-4px); }
          100% { transform: rotate(12deg) translateY(0); }
        }
        @keyframes teddyCuddle {
          0% { transform: scale(1); }
          50% { transform: scale(1.25) rotate(-8deg); }
          100% { transform: scale(1); }
        }
        .teddy-sleep-bubbles {
          position: absolute;
          top: -10px;
          right: -15px;
          display: flex;
          flex-direction: column;
          font-family: monospace;
          font-weight: 700;
          color: #845ec2;
        }
        .teddy-sleep-bubbles span {
          animation: bubbleFloat 2s ease-in-out infinite;
          opacity: 0;
        }
        .teddy-sleep-bubbles span:nth-child(1) { font-size: 0.75rem; animation-delay: 0s; }
        .teddy-sleep-bubbles span:nth-child(2) { font-size: 0.95rem; animation-delay: 0.6s; }
        .teddy-sleep-bubbles span:nth-child(3) { font-size: 1.15rem; animation-delay: 1.2s; }
        @keyframes bubbleFloat {
          0% { opacity: 0; transform: translate(0, 5px) scale(0.6); }
          50% { opacity: 0.9; }
          100% { opacity: 0; transform: translate(12px, -20px) scale(1.2); }
        }
        .dreamy-stars {
          position: absolute;
          bottom: 10px;
          display: flex;
          gap: 70px;
          font-size: 1.2rem;
          opacity: 0.6;
        }
        .lullaby-controls {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .lullaby-play-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 25px;
          background: linear-gradient(135deg, #845ec2, #ff6584);
          color: #fff;
          font-weight: 700;
          font-size: 0.92rem;
          box-shadow: 0 4px 15px rgba(132, 94, 194, 0.3);
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .lullaby-play-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(132, 94, 194, 0.4);
        }
        .lullaby-play-btn.playing {
          background: linear-gradient(135deg, #00cec9, #0984e3);
        }
        .teddy-cuddle-btn {
          display: inline-flex;
          align-items: center;
          padding: 12px 20px;
          border-radius: 25px;
          background: #fff;
          border: 1px solid rgba(132, 94, 194, 0.3);
          color: #845ec2;
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .teddy-cuddle-btn:hover {
          background: rgba(132, 94, 194, 0.08);
          transform: translateY(-1px);
        }
        .lullaby-footer-note {
          font-size: 0.85rem;
          font-style: italic;
          color: #845ec2;
          margin-top: 6px;
        }

        @media (max-width: 480px) {
          .lullaby-box {
            padding: 20px 12px;
          }
          .lullaby-title {
            font-size: 1.25rem;
          }
          .lullaby-controls-row {
            flex-direction: column;
            gap: 10px;
          }
          .lullaby-play-btn, .teddy-cuddle-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

