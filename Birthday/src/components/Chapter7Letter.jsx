import { useState, useEffect, useRef } from 'react';
import './Chapter7Letter.css';
import {
  playSparkleSound,
  playCelebrationChime,
  playPenScratchSound,
  playHeartbeatSound,
} from '../utils/audio';
import img4 from '../assets/Deb/img4.jpg';

const FULL_HEARTFELT_TEXT = `Hey 👋. So ajker jaar Birthday, se hocche shobar theke different. Onner kache nije koshto peye jaay, onner khushi-te nije khushi thake. Jakhan Hospital-e karor kichu hoye jaay, se nije shobar theke besi koshto paay .

Hoyeto ektu raagi, ektu-tei rege jaay. Raag-er mathay kakhan ki kore fele nijeo bujhena, pore hoyeto sheta tar nijero kharap laage. Eto-tay obhimaani ar jedi je, karor kono katha sune na, nijer icchatey chole. But tar sathe sathe etao satti je mon theke se ekhono Little Kid ache. Sei Little Kid eto-tay vulnerable je ektu katha-tey onek hurt hoye jaay... Ar sheta lukanor jonyo se eto raag dekhay. Shobay tar ei bairer ekta roop dekhe but bhitor-ta koto jon-e ba bujhe...

Se shobar samne just ekta smile dekhiye shobar kach theke shob kichu lukiye deye, but tar moner bhitore koto sadness ar pain lukiye ache kaoke bujhte deyena. Chokhe koto koto na-bola katha, mon theke kichu bolte chaileo bolena se, shobar theke lukiye rakhe...

Raag ar obhimaan ki shobay-ke dekhay, na shudhu nijer kacher ar nijer jon-key dekhay. But keo jakhan sheta bujhte na pere, take ulte raag dekhiye deye, takhan se shobar theke beshi hurt hoy.

Always remember, Debalina: Behind that fierce exterior and every cute little tantrum is a heart made of purest gold. You never have to hide your tears or pretend to be unbreakable with those who truly love you. 💖🌸

Happy Birthday, Debalina! To us, you will forever be the most special, treasured little kiddo in the world. ✨🧸`;

const Chapter7Letter = ({ onNext, onPrev, onRestart, triggerConfetti }) => {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isWriting, setIsWriting] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [letterOpen, setLetterOpen] = useState(true);
  const [comfortMessage, setComfortMessage] = useState('');
  const [floatingComforts, setFloatingComforts] = useState([]);
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

      if (currentLen >= FULL_HEARTFELT_TEXT.length) {
        setDisplayedLength(FULL_HEARTFELT_TEXT.length);
        setIsWriting(false);
        clearInterval(intervalRef.current);
        playCelebrationChime();
        if (triggerConfetti) {
          triggerConfetti(window.innerWidth / 2, window.innerHeight * 0.45, 120);
        }
      } else {
        setDisplayedLength(currentLen);
      }
    }, 26);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isWriting, soundEnabled]);

  const handleSkipWriting = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayedLength(FULL_HEARTFELT_TEXT.length);
    setIsWriting(false);
    playSparkleSound();
  };

  const handleReplayWriting = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayedLength(0);
    setIsWriting(true);
    playSparkleSound();
  };

  // Comfort reaction handlers
  const spawnFloatingEmoji = (emoji) => {
    const newItems = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      left: `${20 + Math.random() * 60}%`,
      bottom: `${20 + Math.random() * 30}%`,
      fontSize: `${22 + Math.random() * 18}px`,
      emoji,
    }));
    setFloatingComforts(newItems);
    setTimeout(() => setFloatingComforts([]), 3200);
  };

  const handleSendHug = () => {
    playHeartbeatSound();
    setComfortMessage('🤗 Sent a tight, warm hug to Debalina. You are safe here.');
    spawnFloatingEmoji('🤗');
  };

  const handleSendSoftness = () => {
    playSparkleSound();
    setComfortMessage('🌸 Soft head-pat sent: Your gentle, sensitive heart is your greatest power.');
    spawnFloatingEmoji('🌸');
  };

  const handleSendUnderstanding = () => {
    playCelebrationChime();
    setComfortMessage('✨ "We see the real you, and we love every single piece of you."');
    spawnFloatingEmoji('💖');
    if (triggerConfetti) {
      triggerConfetti(window.innerWidth / 2, window.innerHeight * 0.6, 80);
    }
  };

  // Text breakdown into paragraphs
  const currentText = FULL_HEARTFELT_TEXT.slice(0, displayedLength);
  const paragraphs = currentText.split('\n\n');

  return (
    <section className="story-chapter chapter-heartfelt-letter">
      {/* Floating comfort emojis */}
      {floatingComforts.length > 0 && (
        <div className="floating-comfort-container" aria-hidden="true">
          {floatingComforts.map((item) => (
            <span
              key={item.id}
              className="floating-comfort-item"
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
        <span className="chapter-pill">Chapter VII • From The Heart</span>
      </div>

      <div className="heartfelt-intro-card">
        <h1 className="chapter-title">The Unspoken Heart of Debalina</h1>
        <p className="chapter-lead">
          Beyond the strong nurse, the night shifts, and the brave smile — this page is for the little kid who feels everything so deeply.
        </p>
        <span className="heartfelt-tagline">
          ✨ Shobar Theke Different • Strictly For Your Eyes Only ✨
        </span>
      </div>

      {/* Photo Spotlight */}
      <div className="soft-soul-photo-wrap">
        <div className="soft-soul-polaroid">
          <img
            src={img4}
            alt="Debalina's sweet genuine smile"
            className="soft-soul-img"
          />
          <p className="soft-soul-caption">The purest smile behind the scrubs 🌸</p>
        </div>
      </div>

      {/* Writing Animation Controls Bar */}
      <div className="writing-controls-bar">
        <div className="writing-status-indicator">
          {isWriting ? (
            <>
              <span className="quill-writing-icon">✒️</span>
              <span className="writing-status-text">Writing from the heart in real-time...</span>
            </>
          ) : (
            <>
              <span className="writing-done-check">✓</span>
              <span className="writing-status-text">Letter complete with unconditional warmth!</span>
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
                <span className="diary-salutation">Dearest Debalina,</span>
                <span className="diary-date-badge">8th November 🌸 • Unspoken Words</span>
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

      {/* Interactive Comfort & Affirmations Section */}
      <div className="comfort-actions-section">
        <h3 className="comfort-actions-title">A Safe Space For Debalina 🌸</h3>
        <p className="comfort-actions-sub">
          When the world feels too overwhelming or misunderstandings hurt, tap a button to receive comfort:
        </p>

        <div className="comfort-buttons-grid">
          <button className="comfort-action-btn" onClick={handleSendHug}>
            <span>🤗 Send Warm Hug</span>
          </button>
          <button className="comfort-action-btn" onClick={handleSendSoftness}>
            <span>🌸 Gentle Head-Pat</span>
          </button>
          <button className="comfort-action-btn" onClick={handleSendUnderstanding}>
            <span>💖 "We Understand You"</span>
          </button>
        </div>

        {comfortMessage && (
          <div className="comfort-feedback-pill">
            <span>{comfortMessage}</span>
          </div>
        )}
      </div>

      {/* Grand Finale Story Ending Banner */}
      <div className="story-ending-banner">
        <div className="ending-flowers">🌸 🩺 🧸 🎂 💖 🌸</div>
        <h2>“Shobar theke different, and forever loved just as you are.”</h2>
        <p>Happy 8th November Birthday, Debalina! Keep smiling your genuine, precious smile.</p>
        <div className="ending-actions">
          <button className="secondary-story-btn" onClick={onPrev}>
            <span className="btn-arrow">⬅</span>
            <span>Back to Chapter VI</span>
          </button>
          <button className="primary-story-btn next-chapter-btn" onClick={onNext}>
            <span>Continue to Chapter VIII: A Promise To You</span>
            <span className="btn-arrow">➡</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Chapter7Letter;

