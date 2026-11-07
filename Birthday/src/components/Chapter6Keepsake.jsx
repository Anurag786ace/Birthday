import { useState } from 'react';
import SecretEnvelope from './SecretEnvelope';
import ReasonsJar from './ReasonsJar';
import SkyLanternsFireworks from './SkyLanternsFireworks';
import { playSparkleSound } from '../utils/audio';

const Chapter6Keepsake = ({ onNext, onPrev, triggerConfetti }) => {
  const [userWish, setUserWish] = useState('');
  const [wishes, setWishes] = useState([
    { id: 1, text: 'Happy 8th November, Debalina! May your night shifts be calm and your coffee warm! ☕🌸', sender: 'Fellow Healthcare Admirer' },
    { id: 2, text: 'Debalina, never lose your adorable childlike smile—it heals hearts faster than any medicine! 🧸💖', sender: 'From the Heart' },
    { id: 3, text: 'On this 8th of November, may you receive all the chocolates and pampering you deserve! 🍫✨', sender: 'True Friend' },
    { id: 4, text: 'Happy Birthday to our favorite angel in scrubs & forever cute kiddo! 🩺🌸', sender: 'With Love' },
  ]);

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!userWish.trim()) return;

    playSparkleSound();
    const newEntry = {
      id: Date.now(),
      text: userWish.trim(),
      sender: 'Special 8th Nov Guest',
    };

    setWishes([newEntry, ...wishes]);
    setUserWish('');
    if (triggerConfetti) {
      triggerConfetti(window.innerWidth / 2, window.innerHeight * 0.6, 60);
    }
  };

  return (
    <section className="story-chapter chapter-wishes-jar">
      <div className="chapter-badge-wrap">
        <span className="chapter-pill">Chapter VI • Sealed Keepsake & Celestial Wishes</span>
      </div>

      <h1 className="chapter-title">The Secret Keepsake & Night Sky</h1>
      <p className="chapter-lead">
        Open Debalina's personal wax-sealed envelope, discover 365 reasons she is cherished,
        and release luminous sky lanterns into the midnight stars.
      </p>

      {/* Secret Love Letter Envelope */}
      <div className="secret-envelope-wrapper-section">
        <h2 className="section-subheading">✉️ A Sealed Secret Just For You</h2>
        <p className="section-note">Penned with heartfelt admiration on 8th November — strictly for Debalina’s eyes only:</p>
        <SecretEnvelope triggerConfetti={triggerConfetti} />
      </div>

      {/* 365 Days of Reasons Why You Are Loved Jar with Origami Stars */}
      <ReasonsJar />

      {/* Wishes Jar & Community Notes */}
      <div className="wishes-jar-section">
        <h2 className="section-subheading">✨ The Glowing 8th November Wish Jar</h2>
        <p className="jar-intro">Leave a permanent note of love, encouragement, or gratitude in Debalina's jar:</p>

        <form className="add-wish-form" onSubmit={handleAddWish}>
          <input
            type="text"
            className="add-wish-input"
            placeholder="Write an 8th November birthday message or pampering wish..."
            value={userWish}
            onChange={(e) => setUserWish(e.target.value)}
          />
          <button type="submit" className="add-wish-btn">
            <span>Drop in Jar ✨</span>
          </button>
        </form>

        <div className="wishes-cards-grid">
          {wishes.map((w) => (
            <div key={w.id} className="single-wish-card">
              <span className="wish-quote-symbol">❝</span>
              <p className="wish-content">{w.text}</p>
              <span className="wish-author">— {w.sender}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grand Celestial Sky Lanterns & Fireworks Finale */}
      <SkyLanternsFireworks triggerConfetti={triggerConfetti} />

      {/* Chapter 6 Navigation Actions */}
      <div className="story-ending-banner">
        <div className="ending-flowers">🌸 🩺 🧸 🎂 💖 🌸</div>
        <h2>“The sky lights up in your honor, Debalina!”</h2>
        <p>There is one more deeply personal page waiting strictly for your eyes...</p>
        <div className="ending-actions">
          <button className="secondary-story-btn" onClick={onPrev}>
            <span className="btn-arrow">⬅</span>
            <span>Back to Chapter V</span>
          </button>
          <button className="primary-story-btn next-chapter-btn" onClick={onNext}>
            <span>Continue to Chapter VII: From The Heart</span>
            <span className="btn-arrow">➡</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Chapter6Keepsake;

