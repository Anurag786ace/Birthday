import React, { useState } from 'react';
import { playSparkleSound, playCelebrationChime } from '../utils/audio';

const SCENES = [
  {
    step: 1,
    time: '08:30 AM • Pediatric Ward',
    role: 'NURSE MODE: ON DUTY 🩺',
    roleClass: 'nurse',
    title: 'The Nervous Little Patient',
    text: 'A 7-year-old boy is sitting on the hospital bed, tears welling up in his eyes, terrified of his medicine injection. What does Nurse Debalina do?',
    choices: [
      {
        id: 'A',
        icon: '🧸',
        label: 'Make silly funny faces & talk about teddy bears',
        result: 'The boy giggles, forgets all his fear, and the medicine is done before he even notices! +100 Healing Compassion 🌸',
      },
      {
        id: 'B',
        icon: '🦸‍♂️',
        label: 'Explain it as giving him superhero powers',
        result: 'He puffs out his chest like Iron Man, smiles proudly, and high-fives Nurse Debalina! +100 Bravery 🌟',
      },
    ],
  },
  {
    step: 2,
    time: '02:45 PM • The Afternoon ICU Rush',
    role: 'NURSE MODE: MAXIMUM FOCUS 💪',
    roleClass: 'nurse',
    title: 'The Beeping Monitor Marathon',
    text: 'Call bells are ringing, doctors are asking for lab reports, and medication charts need updating. How does she handle the chaos?',
    choices: [
      {
        id: 'A',
        icon: '⚡',
        label: 'Lightning swift prioritization & steady hands',
        result: 'She navigates the room like a grandmaster, bringing calm and precision to every patient bed. +150 Grace Under Pressure ✨',
      },
      {
        id: 'B',
        icon: '☕',
        label: 'Grab a quick 3-minute warm tea sip & conquer',
        result: 'Recharged with caffeine and positive spirit, she clears every single chart effortlessly! +150 Endurance 🍵',
      },
    ],
  },
  {
    step: 3,
    time: '08:15 PM • Outside the Hospital Doors',
    role: 'KIDDO MODE: TRANSFORMATION IMMINENT 🤫',
    roleClass: 'kiddo',
    title: 'The Secret Transformation',
    text: 'Debalina clocks out, takes off her stethoscope, and steps through the glass doors. YOU are standing there holding a warm hoodie and her favorite chocolates. What happens next?',
    choices: [
      {
        id: 'A',
        icon: '🥺',
        label: 'The Legendary Cute Pout & Demanding Tight Hugs',
        result: 'All adult nurse seriousness instantly vanishes! She pouts like an adorable 5-year-old and buries her head into a cozy hug! +999 Baby Cuteness Overdose 🥰',
      },
      {
        id: 'B',
        icon: '💃',
        label: 'Do a triumphant happy wiggle dance for chocolate',
        result: 'She takes the chocolate bar with sparkling eyes, does a goofy happy dance, and giggles with pure innocent joy! +999 Infinite Sweetness 🍫',
      },
    ],
  },
];

export default function DayNightStoryGame({ triggerConfetti }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleChoose = (choice) => {
    playSparkleSound();
    setSelectedChoice(choice);
  };

  const handleNextScene = () => {
    playSparkleSound();
    if (currentStep + 1 < SCENES.length) {
      setCurrentStep((prev) => prev + 1);
      setSelectedChoice(null);
    } else {
      setIsCompleted(true);
      playCelebrationChime();
      if (triggerConfetti) {
        triggerConfetti(window.innerWidth / 2, window.innerHeight * 0.4, 120);
      }
    }
  };

  const handleRestart = () => {
    playSparkleSound();
    setCurrentStep(0);
    setSelectedChoice(null);
    setIsCompleted(false);
  };

  const scene = SCENES[currentStep];

  return (
    <div className="story-game-container">
      <div className="game-badge-header">
        <span className="game-pill">🎮 Interactive Mini-Story</span>
        <h3 className="game-title">A Day in Debalina's Shoes</h3>
        <p className="game-desc">
          Walk through a day in the life of our favorite girl—from brave hospital superhero to the sweetest kiddo on earth!
        </p>
      </div>

      {!isCompleted ? (
        <div className="game-card-screen">
          {/* Progress Indicators */}
          <div className="game-steps-bar">
            {SCENES.map((s, idx) => (
              <div
                key={s.step}
                className={`step-dot ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'done' : ''}`}
              >
                <span>{s.step}</span>
              </div>
            ))}
          </div>

          <div className="scene-header">
            <span className="scene-time">🕒 {scene.time}</span>
            <span className={`scene-mode ${scene.roleClass}`}>{scene.role}</span>
          </div>

          <h4 className="scene-title">{scene.title}</h4>
          <p className="scene-text">{scene.text}</p>

          {/* Choices Grid */}
          <div className="choices-grid">
            {scene.choices.map((c) => {
              const isSelected = selectedChoice?.id === c.id;
              return (
                <button
                  key={c.id}
                  className={`choice-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleChoose(c)}
                >
                  <span className="choice-icon">{c.icon}</span>
                  <span className="choice-label">{c.label}</span>
                </button>
              );
            })}
          </div>

          {/* Outcome Bubble */}
          {selectedChoice && (
            <div className="outcome-box">
              <span className="outcome-badge">OUTCOME</span>
              <p className="outcome-text">{selectedChoice.result}</p>
              <button className="next-scene-btn" onClick={handleNextScene}>
                <span>{currentStep === SCENES.length - 1 ? 'Reveal Grand Title 🏆' : 'Next Scene ➔'}</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Final Victory Screen */
        <div className="game-victory-screen">
          <div className="victory-medal">🎖️</div>
          <span className="victory-badge">OFFICIAL RECOGNITION</span>
          <h4 className="victory-title">The Grand Healer & Forever Kiddo Award</h4>
          <p className="victory-desc">
            Debalina has conquered the hospital, healed every broken spirit, and successfully switched into the most pampered baby in the universe!
          </p>
          <div className="stat-bars">
            <div className="stat-row">
              <span>🩺 Healthcare Heroism</span>
              <div className="bar-track"><div className="bar-fill" style={{ width: '100%' }}></div></div>
              <strong>100%</strong>
            </div>
            <div className="stat-row">
              <span>🥺 Kiddo Pout Cuteness</span>
              <div className="bar-track"><div className="bar-fill kiddo" style={{ width: '100%' }}></div></div>
              <strong>999%</strong>
            </div>
          </div>
          <button className="game-replay-btn" onClick={handleRestart}>
            <span>↺ Play Story Again</span>
          </button>
        </div>
      )}

      <style>{`
        .story-game-container {
          background: linear-gradient(135deg, rgba(245, 240, 255, 0.95), rgba(255, 245, 250, 0.95));
          border: 2px solid rgba(132, 94, 194, 0.25);
          border-radius: 26px;
          padding: 32px 24px;
          margin: 36px 0;
          text-align: center;
          box-shadow: 0 16px 36px rgba(132, 94, 194, 0.08);
        }
        .game-badge-header {
          max-width: 580px;
          margin: 0 auto 20px;
        }
        .game-pill {
          display: inline-block;
          padding: 4px 14px;
          border-radius: 20px;
          background: rgba(132, 94, 194, 0.15);
          color: #845ec2;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .game-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 1.65rem;
          color: #2d3436;
          margin-bottom: 6px;
        }
        .game-desc {
          font-size: 0.95rem;
          color: #636e72;
          line-height: 1.6;
        }
        .game-card-screen {
          background: #ffffff;
          border-radius: 20px;
          padding: 26px 24px;
          max-width: 600px;
          margin: 0 auto;
          box-shadow: 0 10px 30px rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.06);
          animation: gameFadeIn 0.35s ease;
        }
        @keyframes gameFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .game-steps-bar {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 18px;
        }
        .step-dot {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f1f2f6;
          color: #747d8c;
          font-weight: 800;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
        }
        .step-dot.active {
          background: #845ec2;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(132,94,194,0.35);
          transform: scale(1.1);
        }
        .step-dot.done {
          background: #00cec9;
          color: #ffffff;
        }
        .scene-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f1f2f6;
          padding-bottom: 10px;
          margin-bottom: 14px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .scene-time {
          font-size: 0.8rem;
          font-weight: 700;
          color: #747d8c;
        }
        .scene-mode {
          font-size: 0.72rem;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 12px;
        }
        .scene-mode.nurse {
          background: rgba(0, 206, 201, 0.15);
          color: #00a896;
        }
        .scene-mode.kiddo {
          background: rgba(255, 101, 132, 0.15);
          color: #e84364;
        }
        .scene-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 1.35rem;
          color: #2d3436;
          margin-bottom: 8px;
        }
        .scene-text {
          font-size: 0.95rem;
          color: #57606f;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .choices-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }
        .choice-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          border-radius: 16px;
          background: #fbf9fb;
          border: 1.5px solid #e8def8;
          color: #2d3436;
          font-size: 0.92rem;
          font-weight: 600;
          cursor: pointer;
          text-align: left;
          transition: all 0.25s ease;
        }
        .choice-btn:hover {
          background: #f4ecfd;
          border-color: #845ec2;
          transform: translateY(-2px);
        }
        .choice-btn.selected {
          background: linear-gradient(135deg, rgba(132, 94, 194, 0.12), rgba(255, 101, 132, 0.12));
          border-color: #845ec2;
          box-shadow: 0 4px 14px rgba(132, 94, 194, 0.2);
        }
        .choice-icon {
          font-size: 1.4rem;
        }
        .outcome-box {
          background: #fdfaf6;
          border: 1.5px solid #fdcb6e;
          border-radius: 14px;
          padding: 18px;
          text-align: center;
          animation: outcomeDrop 0.3s ease-out;
        }
        @keyframes outcomeDrop {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .outcome-badge {
          display: inline-block;
          font-size: 0.65rem;
          font-weight: 800;
          color: #d35400;
          background: rgba(243, 156, 18, 0.15);
          padding: 2px 8px;
          border-radius: 8px;
          margin-bottom: 6px;
        }
        .outcome-text {
          font-size: 0.95rem;
          color: #2d3436;
          font-weight: 600;
          line-height: 1.5;
          margin-bottom: 14px;
        }
        .next-scene-btn {
          padding: 10px 24px;
          border-radius: 25px;
          background: linear-gradient(135deg, #845ec2, #ff6584);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.9rem;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(132, 94, 194, 0.3);
          transition: transform 0.2s ease;
        }
        .next-scene-btn:hover {
          transform: translateY(-2px);
        }
        /* Victory Screen */
        .game-victory-screen {
          background: #ffffff;
          border-radius: 20px;
          padding: 32px 24px;
          max-width: 580px;
          margin: 0 auto;
          box-shadow: 0 16px 40px rgba(0,0,0,0.06);
          border: 2px solid #fdcb6e;
          animation: victoryZoom 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes victoryZoom {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .victory-medal {
          font-size: 3.5rem;
          margin-bottom: 8px;
        }
        .victory-badge {
          font-size: 0.72rem;
          font-weight: 800;
          color: #d35400;
          background: #fff3cd;
          padding: 3px 12px;
          border-radius: 12px;
          letter-spacing: 0.8px;
        }
        .victory-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 1.45rem;
          color: #2d3436;
          margin: 12px 0 8px;
        }
        .victory-desc {
          font-size: 0.95rem;
          color: #57606f;
          line-height: 1.6;
          margin-bottom: 22px;
        }
        .stat-bars {
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #fbf9f8;
          padding: 16px 20px;
          border-radius: 12px;
          margin-bottom: 22px;
          text-align: left;
        }
        .stat-row {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.85rem;
          font-weight: 700;
          color: #2d3436;
        }
        .stat-row span {
          width: 170px;
          flex-shrink: 0;
        }
        .bar-track {
          flex: 1;
          height: 10px;
          background: #e4e7eb;
          border-radius: 6px;
          overflow: hidden;
        }
        .bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #00cec9, #0984e3);
          border-radius: 6px;
        }
        .bar-fill.kiddo {
          background: linear-gradient(90deg, #ff6584, #ff8e53);
        }
        .game-replay-btn {
          padding: 12px 28px;
          border-radius: 25px;
          background: linear-gradient(135deg, #ff6584, #845ec2);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.92rem;
          border: none;
          cursor: pointer;
          box-shadow: 0 6px 18px rgba(255,101,132,0.3);
          transition: transform 0.2s ease;
        }
        .game-replay-btn:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 480px) {
          .story-game-card {
            padding: 20px 12px;
          }
          .game-title {
            font-size: 1.35rem;
          }
          .scene-card {
            padding: 16px 12px;
          }
          .choice-btn {
            padding: 10px 12px;
            font-size: 0.85rem;
          }
          .stat-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
          .stat-row span {
            width: 100%;
            font-size: 0.8rem;
          }
          .bar-track {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

