import { useState, useEffect, useRef } from 'react';
import { playBalloonPopSound, playSparkleSound } from '../utils/audio';

const BALLOON_COLORS = [
  { main: '#ff758c', highlight: '#ffccd5', string: '#e056fd' },
  { main: '#845ec2', highlight: '#d5c4fc', string: '#6c5ce7' },
  { main: '#ff9671', highlight: '#ffd8cc', string: '#e17055' },
  { main: '#00c9a7', highlight: '#bbfaf0', string: '#00b894' },
  { main: '#f9ca24', highlight: '#fff3cd', string: '#f0932b' },
  { main: '#ff6b8b', highlight: '#ffe3ec', string: '#d63031' },
  { main: '#4d96ff', highlight: '#cbe0ff', string: '#0984e3' },
];

const BALLOON_ICONS = ['🌸', '🩺', '💖', '8', '✨', '🧸', '🎂', '🤍'];

const FloatingBalloons = ({ triggerConfetti }) => {
  const [balloons, setBalloons] = useState([]);
  const nextIdRef = useRef(1);

  // Generate a new balloon
  const createBalloon = (initialY = null) => {
    const colorObj = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
    const id = nextIdRef.current++;
    const icon = Math.random() > 0.4 ? BALLOON_ICONS[Math.floor(Math.random() * BALLOON_ICONS.length)] : null;
    const size = 52 + Math.random() * 28; // width between 52px and 80px
    const left = 3 + Math.random() * 92; // 3% to 95%
    const duration = 14 + Math.random() * 12; // 14s to 26s
    const swayDuration = 3 + Math.random() * 2.5; // 3s to 5.5s
    const swayAmount = 18 + Math.random() * 25; // px sway
    const delay = initialY !== null ? 0 : Math.random() * 2;
    const startY = initialY !== null ? initialY : window.innerHeight + 100;

    return {
      id,
      color: colorObj.main,
      highlight: colorObj.highlight,
      stringColor: colorObj.string,
      icon,
      size,
      left,
      duration,
      swayDuration,
      swayAmount,
      delay,
      startY,
      popped: false,
    };
  };

  // Initial population of balloons scattered vertically
  useEffect(() => {
    const initialList = [];
    const count = 14;
    for (let i = 0; i < count; i++) {
      // Scatter vertically across viewport so screen starts with balloons already flying
      const yPos = Math.random() * window.innerHeight;
      initialList.push(createBalloon(yPos));
    }
    setBalloons(initialList);

    // Continuous interval to release fresh balloons
    const interval = setInterval(() => {
      setBalloons((prev) => {
        // Keep active count between 12 and 18
        if (prev.length < 18) {
          return [...prev, createBalloon()];
        }
        return prev;
      });
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  // Pop balloon on click
  const handlePopBalloon = (e, balloon) => {
    e.stopPropagation();
    playBalloonPopSound();

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = rect.left + rect.width / 2;
    const clickY = rect.top + rect.height / 2;

    if (triggerConfetti) {
      triggerConfetti(clickX, clickY, 30);
    }

    setBalloons((prev) =>
      prev.map((b) => (b.id === balloon.id ? { ...b, popped: true } : b))
    );

    // Remove popped balloon after pop animation
    setTimeout(() => {
      setBalloons((prev) => prev.filter((b) => b.id !== balloon.id));
    }, 400);
  };

  // Release a flurry of extra balloons
  const releaseFlurry = () => {
    playSparkleSound();
    const extra = [];
    for (let i = 0; i < 7; i++) {
      extra.push(createBalloon(window.innerHeight + 40 + i * 20));
    }
    setBalloons((prev) => [...prev, ...extra]);
  };

  return (
    <>
      <div className="floating-balloons-viewport" aria-hidden="true">
        {balloons.map((b) => {
          if (b.popped) {
            return (
              <div
                key={b.id}
                className="popped-sparkle-burst"
                style={{
                  left: `${b.left}%`,
                  top: '50%',
                }}
              >
                <span>💥</span>
                <span>✨</span>
              </div>
            );
          }

          return (
            <div
              key={b.id}
              className="balloon-wrapper"
              style={{
                left: `${b.left}%`,
                animationDuration: `${b.duration}s`,
                animationDelay: `${b.delay}s`,
                '--sway-amt': `${b.swayAmount}px`,
                '--sway-time': `${b.swayDuration}s`,
              }}
              onClick={(e) => handlePopBalloon(e, b)}
              title="Click to POP the balloon! 🎈"
            >
              <div
                className="balloon-body-wrap"
                style={{
                  width: `${b.size}px`,
                  height: `${b.size * 1.25}px`,
                }}
              >
                {/* Realistic 3D SVG Balloon */}
                <svg
                  viewBox="0 0 100 160"
                  className="balloon-svg"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <radialGradient
                      id={`balloonGrad-${b.id}`}
                      cx="35%"
                      cy="30%"
                      r="65%"
                    >
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                      <stop offset="25%" stopColor={b.highlight} stopOpacity="0.9" />
                      <stop offset="70%" stopColor={b.color} />
                      <stop offset="100%" stopColor={b.color} filter="brightness(0.8)" />
                    </radialGradient>
                    <filter id={`dropShadow-${b.id}`} x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="2" dy="6" stdDeviation="4" floodOpacity="0.15" />
                    </filter>
                  </defs>

                  {/* Balloon Egg Body */}
                  <path
                    d="M 50,8 C 22,8 8,36 8,68 C 8,102 32,126 46,129 L 45,134 L 55,134 L 54,129 C 68,126 92,102 92,68 C 92,36 78,8 50,8 Z"
                    fill={`url(#balloonGrad-${b.id})`}
                    filter={`url(#dropShadow-${b.id})`}
                  />

                  {/* Specular curved reflection highlight */}
                  <path
                    d="M 28,26 C 24,38 24,54 30,68 C 31,70 29,71 27,69 C 22,53 22,36 27,24 C 28,23 30,24 28,26 Z"
                    fill="#ffffff"
                    opacity="0.65"
                  />

                  {/* Balloon Bottom Knot */}
                  <polygon
                    points="45,133 55,133 58,138 42,138"
                    fill={b.color}
                  />

                  {/* Dangling Swaying String */}
                  <path
                    className="balloon-string"
                    d="M 50,138 Q 42,146 54,152 T 48,160"
                    fill="none"
                    stroke={b.stringColor}
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />

                  {/* Optional Icon / Badge printed on balloon */}
                  {b.icon && (
                    <text
                      x="50"
                      y="74"
                      textAnchor="middle"
                      fontSize="24"
                      fill="#ffffff"
                      opacity="0.85"
                      style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}
                    >
                      {b.icon}
                    </text>
                  )}
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Button to Release Balloons on Demand */}
      <button
        className="release-balloons-pill"
        onClick={releaseFlurry}
        title="Send more floating balloons into the sky!"
      >
        <span className="pill-balloon-icon">🎈</span>
        <span className="pill-text">Release Balloons</span>
      </button>
    </>
  );
};

export default FloatingBalloons;

