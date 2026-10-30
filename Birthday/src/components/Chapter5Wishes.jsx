import { useState, useEffect, useRef } from 'react';
import { playSparkleSound, playCelebrationChime, playPenScratchSound } from '../utils/audio';
import PhotoFrame from './PhotoFrame';

const FULL_LETTER_TEXT = `They say that while medicine puts days into life, nurses put life into days. On this special 8th of November, we pause to celebrate you, Debalina—the calm anchor when families are anxious, the soothing voice in cold hospital corridors, and the tender hand that heals with boundless grace.

Yet, as much as the world admires your maturity and bravery as a nurse, my favorite version of you will always be the girl who behaves like an adorable, innocent child the moment it's just the two of us. Behind that composed hospital exterior lives a bubbly, sweet, dramatic soul who pouts for chocolates, melts into warm hugs, and giggles with pure childlike wonder.

The way you let your guard down, throw cute mini-tantrums, and trust me with your softest, most vulnerable self is the greatest gift in the world. Never lose that playful child inside you—it is what makes your heart so extraordinarily rare and radiant.

Today, on November 8th, the charts are set aside, the call bells are silenced, and you have official permission to be the most pampered baby in the universe. May your year ahead be filled with unstoppable laughter, sweet adventures, endless chocolates, and love in every single breath.

Happy Birthday, our favorite nurse & forever little kiddo! 💖
With endless warmth, adoration, and pride.`;

const Chapter5Wishes = ({ onRestart, onPrev, triggerConfetti }) => {
  const [letterOpen, setLetterOpen] = useState(true);
  const [giftOpen, setGiftOpen] = useState(false);
  const [userWish, setUserWish] = useState('');
  
  // Writing animation state
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isWriting, setIsWriting] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const intervalRef = useRef(null);

  const [wishes, setWishes] = useState([
    { id: 1, text: 'Happy 8th November, Debalina! May your night shifts be calm and your coffee warm! ☕🌸', sender: 'Fellow Healthcare Admirer' },
    { id: 2, text: 'Debalina, never lose your adorable childlike smile—it heals hearts faster than any medicine! 🧸💖', sender: 'From the Heart' },
    { id: 3, text: 'On this 8th of November, may you receive all the chocolates and pampering you deserve! 🍫✨', sender: 'True Friend' },
    { id: 4, text: 'Happy Birthday to our favorite angel in scrubs & forever cute kiddo! 🩺🌸', sender: 'With Love' },
  ]);

  // Handle live writing typewriter animation
  useEffect(() => {
    if (!isWriting) return;

    let currentLen = displayedLength;
    intervalRef.current = setInterval(() => {
      currentLen += 2; // Write 2 characters at a time for smooth, realistic pacing

      if (currentLen % 14 === 0 && soundEnabled) {
        playPenScratchSound();
      }

      if (currentLen >= FULL_LETTER_TEXT.length) {
        setDisplayedLength(FULL_LETTER_TEXT.length);
        setIsWriting(false);
        clearInterval(intervalRef.current);
      } else {
        setDisplayedLength(currentLen);
      }
    }, 28);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isWriting, soundEnabled]);

  const handleSkipWriting = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayedLength(FULL_LETTER_TEXT.length);
    setIsWriting(false);
    playSparkleSound();
  };

  const handleReplayWriting = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayedLength(0);
    setIsWriting(true);
    playSparkleSound();
  };

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
      sender: 'Special 8th Nov Guest',
    };

    setWishes([newEntry, ...wishes]);
    setUserWish('');

    if (triggerConfetti) {
      triggerConfetti(window.innerWidth / 2, window.innerHeight * 0.7, 40);
    }
  };

  const renderedText = FULL_LETTER_TEXT.slice(0, displayedLength);
  const paragraphs = renderedText.split('\n\n');

  return (
    <section className="story-chapter chapter-wishes">
      <div className="chapter-badge-wrap">
        <span className="chapter-pill">Chapter V • 8th November Tribute</span>
      </div>

      <h1 className="chapter-title">
        The Golden Letter & Memories for Debalina
      </h1>

      <p className="chapter-lead">
        A treasure chest of heartfelt thoughts, personal memories, and 8th November birthday blessings
        written with pure admiration for you.
      </p>

      {/* Writing Animation Controls */}
      <div className="writing-controls-bar">
        <div className="writing-status-indicator">
          {isWriting ? (
            <>
              <span className="quill-writing-icon">✒️</span>
              <span className="writing-status-text">Writing heartfelt letter in real-time...</span>
            </>
          ) : (
            <>
              <span className="writing-done-check">✓</span>
              <span className="writing-status-text">Letter complete with love & blessings!</span>
            </>
          )}
        </div>

        <div className="writing-action-buttons">
          {isWriting ? (
            <button className="writing-pill-btn skip" onClick={handleSkipWriting} title="Skip animation to read full letter">
              <span>⚡ Skip to Full Letter</span>
            </button>
          ) : (
            <button className="writing-pill-btn replay" onClick={handleReplayWriting} title="Watch letter being written again">
              <span>✍️ Replay Writing Animation</span>
            </button>
          )}

          <button
            className={`writing-pill-btn sound-toggle ${soundEnabled ? 'active' : ''}`}
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Mute pen sound' : 'Enable pen sound'}
          >
            <span>{soundEnabled ? '🔊 Pen Sound On' : '🔇 Pen Sound Muted'}</span>
          </button>
        </div>
      </div>

      {/* Sealed Letter Section with Typewriter/Writing Effect */}
      <div className="letter-wrapper">
        <div className={`parchment-letter ${letterOpen ? 'open' : 'folded'}`}>
          <div className="letter-header">
            <span className="wax-seal" onClick={() => setLetterOpen(!letterOpen)} title="Toggle letter">
              🩺
            </span>
            <div className="letter-meta">
              <span className="salutation">Dearest Debalina,</span>
              <span className="date-stamp">8th November 🌸 • Official Birthday Edition</span>
            </div>
          </div>

          <div className="letter-body animated-writing-body">
            {paragraphs.map((paragraph, idx) => {
              const isCurrentParagraph = idx === paragraphs.length - 1;

              return (
                <p key={idx} className="writing-paragraph">
                  {paragraph}
                  {/* Pen is strictly inline right beside the last character of the active paragraph! */}
                  {isWriting && isCurrentParagraph && (
                    <span className="inline-pen-tracker" aria-hidden="true">
                      <span className="ink-caret">|</span>
                      <span className="active-pen-nib">
                        <svg viewBox="0 0 24 24" className="pen-nib-svg">
                          <path d="M3 21l3.5-1 12-12-2.5-2.5-12 12-1 3.5z" fill="#2c3e50" stroke="#f39c12" strokeWidth="1" />
                          <path d="M14 4.5l2.5 2.5" stroke="#f1c40f" strokeWidth="1.5" />
                          <circle cx="3.8" cy="20.2" r="1.2" fill="#c0392b" />
                          <path d="M3 21l2-2" stroke="#e74c3c" strokeWidth="1.2" />
                        </svg>
                      </span>
                    </span>
                  )}
                </p>
              );
            })}
          </div>
        </div>
      </div>

      {/* Debalina's Pinned Memories & Photo Gallery */}
      <div className="memory-album-section">
        <h2 className="section-subheading">📸 Debalina’s 8th November Photo Album</h2>
        <p className="album-intro">
          A collection of special moments and smiles. Click any photo frame to upload or change pictures of Debalina!
        </p>

        <div className="polaroid-album-grid">
          <PhotoFrame
            id="ch5_photo_smile"
            title="Her Radiant Smile 🌸"
            subtitle="Bringing joy everywhere"
            placeholderIcon="✨"
            placeholderGradient="linear-gradient(135deg, #ffd1dc, #ffccd5)"
            rotation={-3}
            size="medium"
          />
          <PhotoFrame
            id="ch5_photo_scrubs"
            title="The Healer in Scrubs 🩺"
            subtitle="Compassion that inspires"
            placeholderIcon="👩‍⚕️"
            placeholderGradient="linear-gradient(135deg, #c7ecee, #7ed6df)"
            rotation={2.5}
            size="medium"
          />
          <PhotoFrame
            id="ch5_photo_celebration"
            title="Cherished Moments 💖"
            subtitle="Forever our cute kiddo"
            placeholderIcon="🧸"
            placeholderGradient="linear-gradient(135deg, #ffeaa7, #fab1a0)"
            rotation={-1.5}
            size="medium"
          />
        </div>
      </div>

      {/* Interactive Virtual Gift Box */}
      <div className="gift-box-section">
        <h2 className="section-subheading">🎁 An 8th November Surprise Gift For Debalina</h2>
        <div className="gift-box-container">
          {!giftOpen ? (
            <div className="gift-box" onClick={handleOpenGift} title="Click to unwrap the gift!">
              <div className="gift-lid">
                <span className="lid-bow">🎀</span>
              </div>
              <div className="gift-body">
                <span className="gift-ribbon-vertical"></span>
                <span className="gift-ribbon-horizontal"></span>
                <span className="gift-tag">8th Nov • Debalina 🩺</span>
              </div>
              <p className="gift-prompt">Tap to untie ribbon & reveal your surprise!</p>
            </div>
          ) : (
            <div className="gift-unwrapped-award">
              <div className="trophy-icon">🏆</div>
              <div className="award-badge">OFFICIAL 8th NOV RECOGNITION</div>
              <h3>The Golden Heart & Forever Kiddo Award</h3>
              <p className="award-recipient">Presented to: <strong>Nurse Debalina • 8th November</strong></p>
              <p className="award-desc">
                “For saving lives with fearless grace by day, and stealing our hearts with the sweetest,
                most precious childlike giggles and pouts by night.”
              </p>
              <div className="award-stars">⭐⭐⭐⭐⭐</div>
            </div>
          )}
        </div>
      </div>

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

      {/* Final Story Ending & Restart Button */}
      <div className="story-ending-banner">
        <div className="ending-flowers">🌸 🩺 🧸 🎂 💖 🌸</div>
        <h2>“Here’s to another magnificent year of saving lives and being our favorite little kiddo!”</h2>
        <p>Happy 8th November Birthday, Debalina!</p>
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
