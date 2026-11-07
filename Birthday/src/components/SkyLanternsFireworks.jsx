import React, { useState, useEffect, useRef } from 'react';
import './SkyLanternsFireworks.css';
import { playFireworkSound, playSparkleSound, playCelebrationChime } from '../utils/audio';

// Pre-defined heartfelt lantern wishes for Debalina
const DEFAULT_LANTERN_WISHES = [
  'Happy Birthday Debalina! 🎂',
  'World’s Most Caring Nurse 🩺💖',
  'May all your sleepless shifts turn into bright smiles 🌸',
  'Stay as cute, silly & pure as a kiddo 🧸',
  'May every life you touch be blessed ✨',
  'Endless chocolates, warm hugs & zero stress 🍫',
  '8th November — The day an angel was born 🌟',
  'Thank you for being my favorite person in the universe 🤍',
  'Healing hands, golden heart, adorable soul 🎀',
];

export default function SkyLanternsFireworks({ triggerConfetti }) {
  const canvasRef = useRef(null);
  const viewportRef = useRef(null);
  const timeoutsRef = useRef([]);

  // Sky lanterns state (pure static config - animation handled on GPU via CSS!)
  const [lanterns, setLanterns] = useState([
    {
      id: 1,
      text: 'Happy Birthday Debalina! 🎂',
      left: 18,
      scale: 0.9,
      duration: '18s',
      delay: '0s',
      glowColor: '#ffb347',
    },
    {
      id: 2,
      text: 'World’s Best Nurse 🩺',
      left: 48,
      scale: 0.78,
      duration: '22s',
      delay: '-6s',
      glowColor: '#ffa07a',
    },
    {
      id: 3,
      text: 'Debalina’s 8th Nov Star 🌟',
      left: 76,
      scale: 0.85,
      duration: '20s',
      delay: '-12s',
      glowColor: '#ffcc80',
    },
  ]);

  const [customWish, setCustomWish] = useState('');
  const [lanternCount, setLanternCount] = useState(3);
  const [isFinaleRunning, setIsFinaleRunning] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Fireworks particles reference
  const fireworksRef = useRef([]);
  const animationFrameRef = useRef(null);

  // Initialize and run Canvas Particle Loop (High Performance 60FPS)
  useEffect(() => {
    const canvas = canvasRef.current;
    const viewport = viewportRef.current;
    if (!canvas || !viewport) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      if (viewport && canvas) {
        canvas.width = viewport.clientWidth;
        canvas.height = viewport.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Ultra-Fast Particle loop: 0 shadowBlur, 0 save/restore, Additive Blending
    const render = () => {
      // 1. Semi-transparent fade trail
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. High-speed additive glow without any GPU shadowBlur cost
      ctx.globalCompositeOperation = 'lighter';

      const particles = fireworksRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y > canvas.height + 25) {
          particles.splice(i, 1);
          continue;
        }

        // Soft outer ambient halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.alpha * 0.4})`;
        ctx.fill();

        // Bright hot-spark core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 94%, ${p.alpha})`;
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // Clear any pending finale timeouts
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, []);

  // Spawn Firework Explosion at (x, y) with particle cap
  const createExplosion = (x, y, colorHue = Math.random() * 360, particleCount = 42) => {
    // Safety cap: Never let active particles exceed 250
    if (fireworksRef.current.length > 250) {
      fireworksRef.current.splice(0, fireworksRef.current.length - 180);
    }

    playFireworkSound();

    const newParticles = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.25;
      const speed = 2.0 + Math.random() * 4.8;
      newParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: 0.048,
        friction: 0.965,
        radius: 1.8 + Math.random() * 1.6,
        hue: (colorHue + Math.random() * 25 - 12) % 360,
        alpha: 1,
        decay: 0.015 + Math.random() * 0.014,
      });
    }

    fireworksRef.current.push(...newParticles);
  };

  // Launch firework on canvas click
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    createExplosion(x, y);
  };

  // Release a new lantern with custom or default wish
  const handleReleaseLantern = (e) => {
    if (e) e.preventDefault();
    const wish =
      customWish.trim() ||
      DEFAULT_LANTERN_WISHES[Math.floor(Math.random() * DEFAULT_LANTERN_WISHES.length)];

    const newLantern = {
      id: Date.now(),
      text: wish,
      left: 12 + Math.random() * 76,
      scale: 0.85 + Math.random() * 0.25,
      duration: `${16 + Math.random() * 8}s`,
      delay: '0s',
      glowColor: ['#ffb347', '#ffa07a', '#ffcc80', '#ff9999'][
        Math.floor(Math.random() * 4)
      ],
    };

    setLanterns((prev) => [...prev.slice(-6), newLantern]); // Keep maximum 7 active lanterns
    setLanternCount((c) => c + 1);
    setCustomWish('');
    playSparkleSound();

    showToast(`🏮 Wish lantern launched into Debalina’s sky!`);
  };

  // Grand Fireworks Finale Choreography (Smooth, non-blocking & lightweight)
  const handleGrandFinale = () => {
    if (isFinaleRunning) return;
    setIsFinaleRunning(true);
    playCelebrationChime();

    if (triggerConfetti) {
      triggerConfetti(window.innerWidth / 2, window.innerHeight * 0.4, 75);
    }

    showToast('🎆 GRAND FINALE FOR DEBALINA! Look at the sky! 💖');

    const viewport = viewportRef.current;
    const w = viewport ? viewport.clientWidth : 600;
    const h = viewport ? viewport.clientHeight : 380;

    // 5 perfectly paced, stunning bursts (zero UI lag)
    const burstSequence = [
      { x: w * 0.28, y: h * 0.35, hue: 340, delay: 50 },    // Rose
      { x: w * 0.72, y: h * 0.30, hue: 45,  delay: 450 },   // Golden
      { x: w * 0.50, y: h * 0.25, hue: 190, delay: 900 },   // Medical Teal
      { x: w * 0.32, y: h * 0.42, hue: 290, delay: 1400 },  // Purple
      { x: w * 0.68, y: h * 0.32, hue: 15,  delay: 1950 },  // Warm Amber
    ];

    burstSequence.forEach(({ x, y, hue, delay }) => {
      const t = setTimeout(() => {
        createExplosion(x, y, hue, 42);
      }, delay);
      timeoutsRef.current.push(t);
    });

    // Release 2 special finale lanterns smoothly
    const tLantern = setTimeout(() => {
      setLanterns((prev) => [
        ...prev.slice(-5),
        {
          id: Date.now() + 1,
          text: '💖 Forever Cherished Debalina 💖',
          left: 28,
          scale: 1.05,
          duration: '22s',
          delay: '0s',
          glowColor: '#ffd700',
        },
        {
          id: Date.now() + 2,
          text: '✨ Happy 8th November! ✨',
          left: 68,
          scale: 1.0,
          duration: '20s',
          delay: '0s',
          glowColor: '#ff69b4',
        },
      ]);
      setLanternCount((c) => c + 2);
    }, 1200);
    timeoutsRef.current.push(tLantern);

    const tEnd = setTimeout(() => {
      setIsFinaleRunning(false);
    }, 3200);
    timeoutsRef.current.push(tEnd);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    const t = setTimeout(() => setToastMessage(''), 3200);
    timeoutsRef.current.push(t);
  };

  return (
    <div className="sky-lanterns-section">
      <div className="sky-header">
        <span className="sky-badge">🏮 Midnight Sky of Wishes & Light 🎆</span>
        <h3 className="sky-title">The 8th November Celestial Finale</h3>
        <p className="sky-subtext">
          Just like in <em>Tangled</em>, every lantern carrying love and healing rises into the night sky for Debalina.
          Tap the sky to launch fireworks or write your own heartfelt wish below!
        </p>
      </div>

      {/* Interactive Sky Box */}
      <div className="sky-viewport" ref={viewportRef} onClick={handleCanvasClick}>
        {/* HTML5 Canvas for Fireworks */}
        <canvas ref={canvasRef} className="fireworks-canvas" />

        {/* Ambient Stars & Constellations */}
        <div className="sky-stars-backdrop">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="twinkle-star"
              style={{
                left: `${(i * 19.3) % 96}%`,
                top: `${(i * 13.7) % 85}%`,
                animationDelay: `${(i * 0.25) % 3}s`,
                width: i % 4 === 0 ? '4px' : '2px',
                height: i % 4 === 0 ? '4px' : '2px',
              }}
            />
          ))}
        </div>

        {/* Glowing Horizon City & River Silhouette */}
        <div className="sky-horizon-glow"></div>

        {/* Floating Paper Sky Lanterns (100% GPU CSS Accelerated) */}
        <div className="lanterns-container">
          {lanterns.map((lan) => (
            <div
              key={lan.id}
              className="paper-lantern"
              style={{
                left: `${lan.left}%`,
                '--scale': lan.scale,
                '--rise-duration': lan.duration,
                '--rise-delay': lan.delay,
                '--lantern-glow': lan.glowColor,
              }}
            >
              <div className="lantern-balloon">
                {/* Candle flame glow inside */}
                <div className="lantern-flame"></div>
                {/* Paper ribs lines */}
                <div className="lantern-crease crease-left"></div>
                <div className="lantern-crease crease-right"></div>
                {/* Inscribed wish */}
                <span className="lantern-wish-text">{lan.text}</span>
              </div>
              <div className="lantern-base">
                <div className="lantern-tassel"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Tap Prompt Overlay */}
        <div className="sky-click-hint" aria-hidden="true">
          <span>✨ Tap anywhere on the sky to fire bursts • {lanternCount} lanterns floating</span>
        </div>
      </div>

      {/* Control Station & Wish Launcher */}
      <div className="sky-controls-card">
        <form className="wish-input-form" onSubmit={handleReleaseLantern}>
          <div className="input-group-lantern">
            <span className="input-icon">🏮</span>
            <input
              type="text"
              value={customWish}
              onChange={(e) => setCustomWish(e.target.value)}
              placeholder="Write a secret blessing or praise for Debalina..."
              maxLength={60}
              className="lantern-text-input"
            />
          </div>
          <button type="submit" className="launch-lantern-btn">
            <span>✨ Light & Release Lantern</span>
          </button>
        </form>

        <div className="action-buttons-row">
          <button
            className={`grand-finale-btn ${isFinaleRunning ? 'running' : ''}`}
            onClick={handleGrandFinale}
            disabled={isFinaleRunning}
          >
            <span>🎆 {isFinaleRunning ? 'Fireworks Illuminating Sky...' : 'Launch Grand Birthday Fireworks!'}</span>
          </button>
        </div>
      </div>

      {/* Floating notification toast */}
      {toastMessage && (
        <div className="sky-toast">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
