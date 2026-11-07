import { useState, useEffect, useRef } from 'react';
import './Chapter8Letter.css';
import {
  playSparkleSound,
  playCelebrationChime,
  playPenScratchSound,
  playHeartbeatSound,
} from '../utils/audio';
import img3 from '../assets/Deb/img3.jpg';

const CHAPTER8_FULL_TEXT = `Jakhan tui shei baar baar Block - Unblock kortis, ami literally onek koshto kore nijer mind thik rakhtam. Karon ami na thik thakle toke thik ba ager moton kortam ki kore... Ekta meye je eto taay soft-hearted, shobar theke besi trust korto, takey ami hurt kore fellam bhul kore.

First-e jakhan tor sathe katha bola start korechilam, ami eto realize korini but pore korechilam. Tui amar sathe katha bole kotota happy feel kortis. Jakhan boltis, tor Didir chele chocolate kheye nilo, Aunty tor jonya chocolate na ene tar jonya niye elo. Sunte sunte khub bhalo lagto actually-te, jemon puro ekta baccha ar taar innocent mon.

Ami ki korte giye ki kore feli janina, but pore realize hoy. Ekta innocent ar bacchar moton meye-ke ami life-er sab theke boro hurt kore felechi.

Pujo-te enjoyment nei, Birthday-te nei. Jar kache ei gulo shobar theke besi enjoyment chilo. Satti etay je mon na bhalo thakle enjoyment bhalo habe ki kore. Jatoi bol sab kichu thikache, tui thikachis, ami-e jani kotota bhalo achis...

Tai ami etay try kori je, abar tui ager moton Debalina hoye uthis, shei ekta bacchar moton. Amake raag dekha, obhimaan dekha, kono mind korina. Jate tui happy thakis, kono rokomer hurdles na ase. Atleast toke help korte paari everytime......

Jai hoye jak, etay wish je ei Birthday-te tor life-e sab kichu thik hoye jak, khub bhalo hok ar tor life abar lit up hok.

Happy 8th November Birthday, Debalina! 🌸✨
May your sweet innocence, your childlike laughter, and your glowing joy return to you completely. 💖🍫`;

const Chapter8Letter = ({ onPrev, onRestart, triggerConfetti }) => {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isWriting, setIsWriting] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [letterOpen, setLetterOpen] = useState(true);
  const [healingMessage, setHealingMessage] = useState('');
  const [floatingItems, setFloatingItems] = useState([]);
  const intervalRef = useRef(null);

  // Real-time typewriter writing animation
  useEffect(() => {
    if (!isWriting) return;

    let currentLen = displayedLength;
    intervalRef.current = setInterval(() => {
      currentLen += 2; // Write 2 characters per tick for smooth, natural reading speed

      if (currentLen % 14 === 0 && soundEnabled) {
        playPenScratchSound();
      }

      if (currentLen >= CHAPTER8_FULL_TEXT.length) {
        setDisplayedLength(CHAPTER8_FULL_TEXT.length);
        setIsWriting(false);
        clearInterval(intervalRef.current);
        playCelebrationChime();
        if (triggerConfetti) {
          triggerConfetti(window.innerWidth / 2, window.innerHeight * 0.45, 140);
        }
      } else {
        setDisplayedLength(currentLen);
      }
    }, 25);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isWriting, soundEnabled]);

  const handleSkipWriting = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayedLength(CHAPTER8_FULL_TEXT.length);
    setIsWriting(false);
    playSparkleSound();
  };

  const handleReplayWriting = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayedLength(0);
    setIsWriting(true);
    playSparkleSound();
  };

  // Floating emoji reaction spawner
  const spawnFloatingEmojis = (emojiList) => {
    const newItems = Array.from({ length: 14 }).map((_, i) => ({
      id: Date.now() + i,
      left: `${15 + Math.random() * 70}%`,
      bottom: `${20 + Math.random() * 25}%`,
      fontSize: `${22 + Math.random() * 16}px`,
      emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
    }));
    setFloatingItems(newItems);
    setTimeout(() => setFloatingItems([]), 3400);
  };

  const handleGiveChocolates = () => {
    playSparkleSound();
    setHealingMessage('🍫 All the chocolates in the universe are reserved strictly for Debalina! No one gets to steal yours ever again.');
    spawnFloatingEmojis(['🍫', '🍬', '🍩', '💖', '🧸']);
    if (triggerConfetti) {
      triggerConfetti(window.innerWidth / 2, window.innerHeight * 0.55, 60);
    }
  };

  const handleBringBackKiddo = () => {
    playHeartbeatSound();
    setHealingMessage('🌸 “May that innocent, childlike laughter return to your eyes, today and always.”');
    spawnFloatingEmojis(['🌸', '✨', '🤍', '🧸']);
  };

  const handlePromiseSupport = () => {
    playCelebrationChime();
    setHealingMessage('✨ A promise to stand by you, understand your silence, and protect your happiness.');
    spawnFloatingEmojis(['✨', '💖', '🕊️', '🌸']);
    if (triggerConfetti) {
      triggerConfetti(window.innerWidth / 2, window.innerHeight * 0.45, 100);
    }
  };

  const currentText = CHAPTER8_FULL_TEXT.slice(0, displayedLength);
  const paragraphs = currentText.split('\n\n');

  return (
    <section className="story-chapter chapter-promise-letter">
      {/* Floating Emojis */}
      {floatingItems.length > 0 && (
        <div className="floating-chocolates-container" aria-hidden="true">
          {floatingItems.map((item) => (
            <span
              key={item.id}
              className="floating-chocolate-item"
              style={{
                left: item.left,
                bottom: item.bottom,
                fontSize: item.fontSize,
              }}
            >
              {item.emoji}
            </span>
          ))}
        </div>
      )}

      {/* Chapter Badge */}
      <div className="chapter-badge-wrap">
        <span className="chapter-pill">Chapter VIII • The Final Chapter • A Promise To You</span>
      </div>

      <div className="promise-intro-card">
        <h1 className="chapter-title">Ager Moton Debalina</h1>
        <p className="chapter-lead">
          Words from the deepest corner of the soul — honoring your innocent heart, your tears, and the brightest wishes for your life ahead.
        </p>
        <span className="promise-tagline">
          🍫 A Lifetime of Chocolates, Care & Unconditional Understanding ✨
        </span>
      </div>

      {/* Polaroid of Debalina */}
      <div className="soft-soul-photo-wrap">
        <div className="soft-soul-polaroid">
          <img
            src={img3}
            alt="Debalina celebrating with happiness"
            className="soft-soul-img"
          />
          <p className="soft-soul-caption">To your brightest, sweetest smile 🌸</p>
        </div>
      </div>

      {/* Writing Animation Controls Bar */}
      <div className="writing-controls-bar">
        <div className="writing-status-indicator">
          {isWriting ? (
            <>
              <span className="quill-writing-icon">✒️</span>
              <span className="writing-status-text">Writing final personal letter in real-time...</span>
            </>
          ) : (
            <>
              <span className="writing-done-check">✓</span>
              <span className="writing-status-text">Letter complete from the soul.</span>
            </>
          )}
        </div>

        <div className="writing-action-buttons">
          {isWriting ? (
            <button
              className="writing-pill-btn skip"
              onClick={handleSkipWriting}
              title="Skip animation to read full letter"
            >
              <span>⚡ Skip to Full Letter</span>
            </button>
          ) : (
            <button
              className="writing-pill-btn replay"
              onClick={handleReplayWriting}
              title="Watch letter being written again"
            >
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

      {/* Parchment / Diary Letter */}
      <div className="heartfelt-layout">
        <div className={`diary-parchment-letter ${letterOpen ? 'open' : 'folded'}`}>
          <div className="diary-notebook-margin" aria-hidden="true"></div>

          {/* Letter Header */}
          <div className="diary-letter-header">
            <div className="diary-seal-wrap">
              <div
                className="diary-wax-seal"
                onClick={() => setLetterOpen(!letterOpen)}
                title="Debalina's personal wax signet"
              >
                D
              </div>
              <div>
                <span className="diary-salutation">For Debalina,</span>
                <span className="diary-date-badge">8th November 🌸 • Words From My Soul</span>
              </div>
            </div>
          </div>

          {/* Letter Body with Real-time Pen Tracking */}
          <div className="diary-letter-body">
            {paragraphs.map((paragraph, idx) => {
              const isCurrentParagraph = idx === paragraphs.length - 1;

              return (
                <p key={idx} className="diary-para writing-paragraph">
                  {paragraph}
                  {/* Inline pen tracker right at the active writing nib */}
                  {isWriting && isCurrentParagraph && (
                    <span className="inline-pen-tracker" aria-hidden="true">
                      <span className="ink-caret">|</span>
                      <span className="active-pen-nib">
                        <svg viewBox="0 0 24 24" className="pen-nib-svg">
                          <path
                            d="M3 21l3.5-1 12-12-2.5-2.5-12 12-1 3.5z"
                            fill="#2c3e50"
                            stroke="#f39c12"
                            strokeWidth="1"
                          />
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

      {/* Chocolate & Healing Interactive Section */}
      <div className="chocolate-healing-section">
        <h3 className="chocolate-healing-title">Special Promises For Debalina 🍫</h3>
        <p className="chocolate-healing-sub">
          Tap any button to send pampering, chocolates, and unconditional warmth:
        </p>

        <div className="chocolate-buttons-grid">
          <button className="chocolate-action-btn" onClick={handleGiveChocolates}>
            <span>🍫 All Chocolates For Debalina</span>
          </button>
          <button className="chocolate-action-btn" onClick={handleBringBackKiddo}>
            <span>🌸 Bring Back The Childlike Giggles</span>
          </button>
          <button className="chocolate-action-btn" onClick={handlePromiseSupport}>
            <span>✨ Always In Your Corner</span>
          </button>
        </div>

        {healingMessage && (
          <div className="chocolate-feedback-pill">
            <span>{healingMessage}</span>
          </div>
        )}
      </div>

      {/* Grand Finale Story Ending Banner */}
      <div className="story-ending-banner">
        <div className="ending-flowers">🌸 🩺 🧸 🎂 💖 🍫 🌸</div>
        <h2>“May your life light up, your heart heal, and your smile never fade.”</h2>
        <p>Happy 8th November Birthday, Debalina! You are cherished beyond words.</p>
        <div className="ending-actions">
          <button className="secondary-story-btn" onClick={onPrev}>
            <span className="btn-arrow">⬅</span>
            <span>Back to Chapter VII</span>
          </button>
          <button
            className="primary-story-btn"
            onClick={() => {
              playCelebrationChime();
              if (triggerConfetti) {
                triggerConfetti(window.innerWidth / 2, window.innerHeight * 0.45, 180);
              }
            }}
          >
            <span>🎉 Grand Birthday Celebration ✨</span>
          </button>
          <button className="secondary-story-btn replay-btn" onClick={onRestart}>
            <span>↺ Read Full Story From Chapter I</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Chapter8Letter;

