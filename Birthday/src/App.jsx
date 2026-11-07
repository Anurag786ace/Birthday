import { useState, useRef, useEffect } from 'react';
import './App.css';

import ConfettiCanvas from './components/ConfettiCanvas';
import FloatingHearts from './components/FloatingHearts';
import FloatingBalloons from './components/FloatingBalloons';
import StethoscopeLoader from './components/StethoscopeLoader';
import ChapterNav from './components/ChapterNav';
import Chapter1Intro from './components/Chapter1Intro';
import Chapter2NurseTribute from './components/Chapter2NurseTribute';
import Chapter3Candle from './components/Chapter3Candle';
import Chapter4CakeCut from './components/Chapter4CakeCut';
import Chapter5Wishes from './components/Chapter5Wishes';
import Chapter6Keepsake from './components/Chapter6Keepsake';
import Chapter7Letter from './components/Chapter7Letter';
import Chapter8Letter from './components/Chapter8Letter';

import {
  startBdayMusic,
  stopBdayMusic,
  toggleBdayMusic,
  isMusicPlaying,
  playSparkleSound,
} from './utils/audio';

function App() {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [musicActive, setMusicActive] = useState(false);
  const confettiRef = useRef(null);

  const chapterTitles = [
    'The Origin',
    'Nurse’s Tribute',
    'Candle & Wish',
    'Cake Cutting',
    'Wishes & Gifts',
    'Sealed Keepsake',
    'From The Heart',
    'A Promise To You',
  ];

  const navigateToChapter = (targetChapter) => {
    if (targetChapter === currentChapter) return;
    playSparkleSound();
    setTransitioning(true);

    setTimeout(() => {
      setCurrentChapter(targetChapter);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setTransitioning(false);
      }, 500);
    }, 700);
  };

  const handleNext = () => {
    navigateToChapter(Math.min(currentChapter + 1, 8));
  };

  const handlePrev = () => {
    navigateToChapter(Math.max(currentChapter - 1, 1));
  };

  const handleRestart = () => {
    navigateToChapter(1);
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

      {/* Animated Stethoscope Page Transition Loader */}
      <StethoscopeLoader visible={transitioning} />

      {/* Navigation & Story Progress */}
      <ChapterNav
        currentChapter={currentChapter}
        setChapter={(c) => navigateToChapter(c)}
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
          <Chapter2NurseTribute
            onNext={handleNext}
            onPrev={handlePrev}
            triggerConfetti={triggerConfetti}
          />
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
            onNext={handleNext}
            onRestart={handleRestart}
            onPrev={handlePrev}
            triggerConfetti={triggerConfetti}
          />
        )}

        {currentChapter === 6 && (
          <Chapter6Keepsake
            onNext={handleNext}
            onPrev={handlePrev}
            triggerConfetti={triggerConfetti}
          />
        )}

        {currentChapter === 7 && (
          <Chapter7Letter
            onNext={handleNext}
            onPrev={handlePrev}
            onRestart={handleRestart}
            triggerConfetti={triggerConfetti}
          />
        )}

        {currentChapter === 8 && (
          <Chapter8Letter
            onPrev={handlePrev}
            onRestart={handleRestart}
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
