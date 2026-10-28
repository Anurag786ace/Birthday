import { useState } from 'react';
import { playSparkleSound, playCelebrationChime } from '../utils/audio';

const Chapter5Wishes = ({ onRestart, onPrev, triggerConfetti }) => {
  const [letterOpen, setLetterOpen] = useState(true);
  const [giftOpen, setGiftOpen] = useState(false);
  const [userWish, setUserWish] = useState('');
  const [wishes, setWishes] = useState([
    { id: 1, text: 'May your coffee always be warm and your night shifts quick and calm! ☕', sender: 'Fellow Healthcare Admirer' },
    { id: 2, text: 'Debalina, your gentle soul makes this world a safer and softer place to live in. 🌸', sender: 'From the Heart' },
    { id: 3, text: 'May you receive all the healing, kindness, and smiles that you give to everyone else! ✨', sender: 'True Friend' },
    { id: 4, text: 'Happy Birthday to our favorite angel in scrubs! Keep shining brightly! 🩺💖', sender: 'With Love' },
  ]);

  const handleOpenGift = () => {
    setGiftOpen(true);
    playCelebrationChime();
    if (triggerConfetti) {
      triggerConfetti(window.innerWidth / 2, window.innerHeight * 0.5, 120);
    }
  };

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!userWish.trim()) return;

    playSparkleSound();
    const newEntry = {
      id: Date.now(),
      text: userWish.trim(),
      sender: 'Special Guest',
    };

    setWishes([newEntry, ...wishes]);
    setUserWish('');

    if (triggerConfetti) {
      triggerConfetti(window.innerWidth / 2, window.innerHeight * 0.7, 40);
    }
  };

  return (
    <section className="story-chapter chapter-wishes">
      <div className="chapter-badge-wrap">
        <span className="chapter-pill">Chapter V • Words from the Heart</span>
      </div>

      <h1 className="chapter-title">
        The Golden Letter & Wishes for Debalina
      </h1>

      <p className="chapter-lead">
        A treasure chest of heartfelt thoughts, personal tributes, and birthday blessings
        curated just for you.
      </p>

      {/* Sealed Letter Section */}
      <div className="letter-wrapper">
        <div className={`parchment-letter ${letterOpen ? 'open' : 'folded'}`}>
          <div className="letter-header">
            <span className="wax-seal" onClick={() => setLetterOpen(!letterOpen)} title="Toggle letter">
              🩺
            </span>
            <div className="letter-meta">
              <span className="salutation">Dearest Debalina,</span>
              <span className="date-stamp">On Your Special Birthday 🌸</span>
            </div>
          </div>

          <div className="letter-body">
            <p>
              They say that while medicine puts days into life, nurses put life into days.
              You don’t just monitor vital signs, Debalina—you become the steady anchor when
              families are anxious, the soothing voice in cold hospital rooms, and the warm hand
              that holds on when someone feels afraid.
            </p>
            <p>
              It takes a rare breed of strength to give so much of yourself every day.
              You bear witness to raw human emotion, fight fatigue with a cup of tea, and still walk
              out of the doors with a heart ready to love and laugh.
            </p>
            <p>
              Today, the charts are closed and the calls are silenced. Today is strictly about
              celebrating the wonderful, gorgeous, compassionate woman you are. May your year ahead be
              overflowing with genuine smiles, peaceful sleep, dreams taking flight, and love in every single corner.
            </p>
            <p className="letter-signoff">
              Happy Birthday, our favorite nurse! 💖
              <br />
              <strong>With endless warmth, pride, and love.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Virtual Gift Box */}
      <div className="gift-box-section">
        <h2 className="section-subheading">🎁 A Surprise Gift For Debalina</h2>
        <div className="gift-box-container">
          {!giftOpen ? (
            <div className="gift-box" onClick={handleOpenGift} title="Click to unwrap the gift!">
              <div className="gift-lid">
                <span className="lid-bow">🎀</span>
              </div>
              <div className="gift-body">
                <span className="gift-ribbon-vertical"></span>
                <span className="gift-ribbon-horizontal"></span>
                <span className="gift-tag">For Debalina 🩺</span>
              </div>
              <p className="gift-prompt">Tap to untie ribbon & reveal your surprise!</p>
            </div>
          ) : (
            <div className="gift-unwrapped-award">
              <div className="trophy-icon">🏆</div>
              <div className="award-badge">OFFICIAL RECOGNITION</div>
              <h3>The Golden Heart & Angel of Healing Award</h3>
              <p className="award-recipient">Presented to: <strong>Nurse Debalina</strong></p>
              <p className="award-desc">
                “For unwavering compassion, selfless dedication, healing hands, and bringing
                immeasurable sunshine into the lives of everyone around her.”
              </p>
              <div className="award-stars">⭐⭐⭐⭐⭐</div>
            </div>
          )}
        </div>
      </div>

      {/* Wishes Jar & Community Notes */}
      <div className="wishes-jar-section">
        <h2 className="section-subheading">✨ The Glowing Wish Jar</h2>
        <p className="jar-intro">Leave a permanent note of love, encouragement, or gratitude in Debalina's jar:</p>

        <form className="add-wish-form" onSubmit={handleAddWish}>
          <input
            type="text"
            className="add-wish-input"
            placeholder="Write a sweet message, blessing, or nurse appreciation..."
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

      {/* Final Story Ending & Restart Button */}
      <div className="story-ending-banner">
        <div className="ending-flowers">🌸 🩺 🎂 💖 🌸</div>
        <h2>“Here’s to another year of saving lives and living yours to the fullest!”</h2>
        <p>Happy Birthday, Debalina!</p>
        <div className="ending-actions">
          <button className="secondary-story-btn" onClick={onPrev}>
            <span className="btn-arrow">⬅</span>
            <span>Back to Cake Cutting</span>
          </button>
          <button className="primary-story-btn replay-btn" onClick={onRestart}>
            <span>↺ Read Story From Chapter I</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Chapter5Wishes;

