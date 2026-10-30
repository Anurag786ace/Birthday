import { useState, useRef, useEffect } from 'react';
import './App.css';

import ConfettiCanvas from './components/ConfettiCanvas';
import FloatingHearts from './components/FloatingHearts';
import FloatingBalloons from './components/FloatingBalloons';
import ChapterNav from './components/ChapterNav';
import Chapter1Intro from './components/Chapter1Intro';
import Chapter2NurseTribute from './components/Chapter2NurseTribute';
import Chapter3Candle from './components/Chapter3Candle';
import Chapter4CakeCut from './components/Chapter4CakeCut';
import Chapter5Wishes from './components/Chapter5Wishes';

import {
  startBdayMusic,
  stopBdayMusic,
  toggleBdayMusic,
  isMusicPlaying,
  playSparkleSound,
} from './utils/audio';

function App() {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [musicActive, setMusicActive] = useState(false);
  const confettiRef = useRef(null);

  const chapterTitles = [
    'The Origin',
    'Nurse’s Tribute',
    'Candle & Wish',
    'Cake Cutting',
    'Wishes & Gifts',
  ];

  const handleNext = () => {
    playSparkleSound();
    setCurrentChapter((prev) => Math.min(prev + 1, 5));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    playSparkleSound();
    setCurrentChapter((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    playSparkleSound();
    setCurrentChapter(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleMusic = () => {
    toggleBdayMusic((state) => {
      setMusicActive(state);
    });
  };

  const handleStartMusic = () => {
    startBdayMusic((state) => {
      setMusicActive(state);
    });
  };

  const triggerConfetti = (x, y, count) => {
    if (confettiRef.current) {
      confettiRef.current.burst(x, y, count);
    }
  };

  const triggerRain = (duration) => {
    if (confettiRef.current) {
      confettiRef.current.rain(duration);
    }
  };

  // Sync music state
  useEffect(() => {
    setMusicActive(isMusicPlaying());
  }, []);

  return (
    <div className="story-app-container">
      {/* Background Floating Elements */}
      <FloatingHearts />

      {/* Beautiful Floating Balloons */}
      <FloatingBalloons triggerConfetti={triggerConfetti} />

      {/* Confetti Particle Canvas */}
      <ConfettiCanvas ref={confettiRef} />

      {/* Navigation & Story Progress */}
      <ChapterNav
        currentChapter={currentChapter}
        setChapter={(c) => {
          setCurrentChapter(c);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        totalChapters={chapterTitles.length}
        chapterTitles={chapterTitles}
        isPlaying={musicActive}
        toggleMusic={handleToggleMusic}
      />

      {/* Story Chapter Canvas */}
      <main className="story-content-main">
        {currentChapter === 1 && (
          <Chapter1Intro onNext={handleNext} />
        )}

        {currentChapter === 2 && (
          <Chapter2NurseTribute onNext={handleNext} onPrev={handlePrev} />
        )}

        {currentChapter === 3 && (
          <Chapter3Candle
            onNext={handleNext}
            onPrev={handlePrev}
            triggerConfetti={triggerConfetti}
          />
        )}

        {currentChapter === 4 && (
          <Chapter4CakeCut
            onNext={handleNext}
            onPrev={handlePrev}
            triggerConfetti={triggerConfetti}
            triggerRain={triggerRain}
            onStartMusic={handleStartMusic}
          />
        )}

        {currentChapter === 5 && (
          <Chapter5Wishes
            onRestart={handleRestart}
            onPrev={handlePrev}
            triggerConfetti={triggerConfetti}
          />
        )}
      </main>

      {/* Story Footer */}
      <footer className="story-global-footer">
        <p>
          Crafted with boundless admiration & love for <strong>Debalina</strong> 🌸
        </p>
        <span className="footer-sub">
          May your heartbeat stay steady, your soul stay vibrant, and your smile never fade.
        </span>
      </footer>
    </div>
  );
}

export default App;
