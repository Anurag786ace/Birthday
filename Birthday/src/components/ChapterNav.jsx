import { playSparkleSound } from '../utils/audio';

const ChapterNav = ({
  currentChapter,
  setChapter,
  totalChapters,
  chapterTitles,
  isPlaying,
  toggleMusic,
}) => {
  return (
    <header className="story-nav-header">
      <div className="story-nav-inner">
        <div className="story-brand" onClick={() => { playSparkleSound(); setChapter(1); }}>
          <span className="brand-badge">🩺 Debalina's Day</span>
          <span className="brand-sub">The Healer's Birthday Story</span>
        </div>

        <nav className="chapter-indicators" aria-label="Story Chapters">
          {chapterTitles.map((title, index) => {
            const chapNum = index + 1;
            const isActive = currentChapter === chapNum;
            const isCompleted = currentChapter > chapNum;

            return (
              <button
                key={chapNum}
                className={`chapter-step-btn ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => {
                  playSparkleSound();
                  setChapter(chapNum);
                }}
                title={`Chapter ${chapNum}: ${title}`}
              >
                <span className="step-num">{chapNum}</span>
                <span className="step-label">{title}</span>
              </button>
            );
          })}
        </nav>

        <div className="nav-actions">
          <button
            className={`music-toggle-btn ${isPlaying ? 'playing' : ''}`}
            onClick={toggleMusic}
            title={isPlaying ? 'Pause Birthday Music' : 'Play Birthday Music'}
          >
            {isPlaying ? (
              <>
                <div className="audio-wave">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="music-btn-text">Music On</span>
              </>
            ) : (
              <>
                <span className="music-icon">🎵</span>
                <span className="music-btn-text">Play Melody</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="story-progress-bar-wrap">
        <div
          className="story-progress-bar"
          style={{ width: `${((currentChapter) / totalChapters) * 100}%` }}
        />
      </div>
    </header>
  );
};

export default ChapterNav;

