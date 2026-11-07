import React, { useState } from 'react';
import { playSparkleSound, playCelebrationChime } from '../utils/audio';

const REASONS = [
  "The way your gentle voice instantly calms patients when they feel afraid.",
  "Your legendary cute pout the moment you want chocolates or cuddles.",
  "How you stand strong through exhausting 12-hour shifts without ever losing your kindness.",
  "The adorable sleepy face you make when waking up from a night shift nap.",
  "Your courage: you run toward emergencies when everyone else is scared.",
  "The way you behave like a 5-year-old kiddo when it is just the two of us.",
  "Your soft hands that have healed and comforted so many aching souls.",
  "How passionate you are about protecting lives and making families feel safe.",
  "Your funny mini-tantrums over silly things just so you can be pampered.",
  "The pure radiant smile that lights up the entire hospital station.",
  "The way you never judge anyone and treat every person like family.",
  "How cute you look bundled up in scrubs with your stethoscope around your neck.",
  "Your incredible memory for every patient's name, medicine, and comfort needs.",
  "The fact that behind your brave nurse exterior lives the sweetest, softest heart.",
  "How you celebrate other people's joy like it's your own.",
  "The infectious giggle that makes everyone around you forget their stress.",
  "The pride in your eyes whenever a recovering patient walks out of the ward smiling.",
  "How you fight fatigue with a cup of warm tea and still walk out ready to love.",
  "The absolute trust and tenderness you share with me that nobody else gets to see.",
  "Because having you in this world makes life a thousand times warmer, safer, and brighter.",
  "The way you cuddle a plushie like the adorable baby you are.",
  "Your fierce loyalty and dedication to the people you love.",
  "How you make ordinary hospital corridors feel like places of hope.",
  "Your big heart that feels deeply, loves genuinely, and forgives easily.",
  "Because today is 8th November, and the universe was blessed with its sweetest angel.",
];

export default function ReasonsJar() {
  const [currentReasonIndex, setCurrentReasonIndex] = useState(0);
  const [unlockedCount, setUnlockedCount] = useState(1);
  const [isUnfolding, setIsUnfolding] = useState(false);

  const handleDrawReason = () => {
    playSparkleSound();
    setIsUnfolding(true);

    setTimeout(() => {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * REASONS.length);
      } while (nextIndex === currentReasonIndex && REASONS.length > 1);

      setCurrentReasonIndex(nextIndex);
      setUnlockedCount((prev) => prev + 1);
      setIsUnfolding(false);
      playCelebrationChime();
    }, 400);
  };

  return (
    <div className="reasons-jar-section">
      <div className="reasons-header">
        <span className="reasons-pill">✨ 365 Days of Gratitude</span>
        <h3 className="reasons-title">The Jar of Endless Love</h3>
        <p className="reasons-subtitle">
          Every day of the year, there is a reason why Debalina is admired and cherished. Click the jar to draw today's origami capsule:
        </p>
      </div>

      <div className="jar-display-stage">
        {/* Glass Jar Graphic with floating origami stars */}
        <div className="glass-jar" onClick={handleDrawReason} title="Click to draw a reason!">
          <div className="jar-lid">
            <span className="lid-ribbon">🎀</span>
          </div>
          <div className="jar-body">
            <div className="origami-stars-container">
              <span className="star s1">⭐</span>
              <span className="star s2">🌸</span>
              <span className="star s3">💖</span>
              <span className="star s4">⭐</span>
              <span className="star s5">🤍</span>
              <span className="star s6">✨</span>
              <span className="star s7">🧸</span>
            </div>
            <div className="jar-label">
              <span>365 REASONS</span>
              <small>WHY DEBALINA IS LOVED</small>
            </div>
          </div>
        </div>

        {/* Unfolded Origami Note Card */}
        <div className={`unfolded-note-card ${isUnfolding ? 'unfolding' : ''}`}>
          <div className="note-tape"></div>
          <div className="note-header">
            <span className="note-number">Reason #{currentReasonIndex + 1} of 365</span>
            <span className="note-date">8th November Edition 🌸</span>
          </div>

          <div className="note-body">
            <span className="quote-mark">“</span>
            <p className="reason-text">{REASONS[currentReasonIndex]}</p>
            <span className="quote-mark end">”</span>
          </div>

          <div className="note-footer">
            <span className="note-author">— With all my love & infinite admiration 💖</span>
          </div>
        </div>
      </div>

      <div className="reasons-actions">
        <button className="draw-reason-btn" onClick={handleDrawReason}>
          <span>✨ Draw Another Reason ({unlockedCount} revealed today)</span>
        </button>
      </div>

      <style>{`
        .reasons-jar-section {
          background: linear-gradient(135deg, rgba(254, 245, 250, 0.95), rgba(240, 248, 255, 0.95));
          border: 1.5px dashed rgba(255, 101, 132, 0.35);
          border-radius: 26px;
          padding: 34px 24px;
          margin: 36px 0;
          text-align: center;
        }
        .reasons-pill {
          display: inline-block;
          padding: 4px 14px;
          border-radius: 20px;
          background: rgba(255, 101, 132, 0.15);
          color: #e84364;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .reasons-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 1.65rem;
          color: #2d3436;
          margin-bottom: 6px;
        }
        .reasons-subtitle {
          font-size: 0.95rem;
          color: #636e72;
          max-width: 600px;
          margin: 0 auto 24px;
          line-height: 1.6;
        }
        .jar-display-stage {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }
        .glass-jar {
          width: 140px;
          cursor: pointer;
          transition: transform 0.25s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .glass-jar:hover {
          transform: translateY(-4px) scale(1.05);
        }
        .jar-lid {
          width: 90px;
          height: 22px;
          background: linear-gradient(180deg, #f9ca24, #f0932b);
          border-radius: 6px 6px 2px 2px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          display: flex;
          justify-content: center;
          position: relative;
        }
        .lid-ribbon {
          font-size: 1.2rem;
          margin-top: -8px;
        }
        .jar-body {
          width: 130px;
          height: 160px;
          border: 3px solid rgba(255,255,255,0.9);
          border-top: none;
          border-radius: 8px 8px 30px 30px;
          background: linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,200,220,0.2) 100%);
          box-shadow: inset 0 0 16px rgba(255,101,132,0.15), 0 12px 28px rgba(0,0,0,0.08);
          backdrop-filter: blur(4px);
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding: 14px 10px;
        }
        .origami-stars-container {
          position: relative;
          width: 100%;
          height: 80px;
        }
        .star {
          position: absolute;
          animation: starFloat 3s ease-in-out infinite alternate;
        }
        .star.s1 { top: 10px; left: 15px; font-size: 1.2rem; animation-delay: 0s; }
        .star.s2 { top: 25px; right: 20px; font-size: 1.1rem; animation-delay: 0.5s; }
        .star.s3 { bottom: 10px; left: 25px; font-size: 1.2rem; animation-delay: 1s; }
        .star.s4 { top: 5px; right: 35px; font-size: 1rem; animation-delay: 1.5s; }
        .star.s5 { bottom: 15px; right: 15px; font-size: 1rem; animation-delay: 0.8s; }
        .star.s6 { top: 35px; left: 45px; font-size: 0.9rem; animation-delay: 1.2s; }
        .star.s7 { top: 45px; right: 40px; font-size: 1rem; animation-delay: 0.3s; }

        @keyframes starFloat {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-6px) rotate(15deg); }
        }
        .jar-label {
          background: #ffffff;
          border: 1px solid #ffccd5;
          padding: 4px 8px;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
        }
        .jar-label span {
          font-size: 0.62rem;
          font-weight: 800;
          color: #e84364;
          letter-spacing: 0.5px;
        }
        .jar-label small {
          font-size: 0.48rem;
          color: #747d8c;
          font-weight: 700;
        }
        /* Unfolded Note */
        .unfolded-note-card {
          background: #fffdf9;
          border: 1px solid #ebdcb9;
          border-radius: 16px;
          padding: 24px 28px;
          max-width: 420px;
          text-align: left;
          box-shadow: 0 10px 28px rgba(0,0,0,0.06);
          position: relative;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .unfolded-note-card.unfolding {
          transform: scale(0.92);
          opacity: 0.5;
        }
        .note-tape {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 70px;
          height: 20px;
          background: rgba(255, 234, 167, 0.85);
          box-shadow: 0 2px 4px rgba(0,0,0,0.06);
        }
        .note-header {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px dashed #ebdcb9;
          padding-bottom: 8px;
          margin-bottom: 14px;
        }
        .note-number {
          font-size: 0.75rem;
          font-weight: 800;
          color: #e84364;
          text-transform: uppercase;
        }
        .note-date {
          font-size: 0.7rem;
          color: #747d8c;
          font-weight: 600;
        }
        .note-body {
          position: relative;
          padding: 0 6px;
        }
        .quote-mark {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 2rem;
          line-height: 1;
          color: rgba(255, 101, 132, 0.3);
          vertical-align: top;
        }
        .reason-text {
          font-family: var(--font-cursive, 'Dancing Script', cursive);
          font-size: 1.45rem;
          font-weight: 700;
          color: #2f3542;
          line-height: 1.5;
          margin: 4px 0 8px;
        }
        .note-footer {
          margin-top: 14px;
          font-size: 0.78rem;
          font-style: italic;
          color: #845ec2;
          text-align: right;
        }
        .reasons-actions {
          margin-top: 10px;
        }
        .draw-reason-btn {
          padding: 12px 28px;
          border-radius: 25px;
          background: linear-gradient(135deg, #ff6584, #845ec2);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.95rem;
          border: none;
          cursor: pointer;
          box-shadow: 0 6px 18px rgba(255,101,132,0.3);
          transition: transform 0.2s ease;
        }
        .draw-reason-btn:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 500px) {
          .reasons-title {
            font-size: 1.35rem;
          }
          .reasons-jar-card {
            padding: 20px 14px;
          }
          .jar-display-stage {
            gap: 16px;
          }
          .unfolded-note-card {
            padding: 18px 14px;
            width: 100%;
            box-sizing: border-box;
          }
          .draw-reason-btn {
            width: 100%;
            padding: 12px 18px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}

