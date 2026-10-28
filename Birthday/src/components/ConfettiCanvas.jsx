import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const ConfettiCanvas = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);

  const colors = [
    '#ff6b8b', '#ff8e53', '#ffc048', '#ff78ae', '#9b5de5',
    '#f15bb5', '#00f5d4', '#70d6ff', '#ffd166', '#ffffff'
  ];

  function addBurst(x, y, count = 120, spread = 360) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const originX = x ?? rect.width / 2;
    const originY = y ?? rect.height / 2;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * Math.random());
      const speed = 4 + Math.random() * 12;
      const size = 6 + Math.random() * 8;
      const type = Math.random() > 0.35 ? 'rect' : (Math.random() > 0.5 ? 'heart' : 'star');

      particlesRef.current.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed * (spread === 360 ? 1 : 0.8),
        vy: Math.sin(angle) * speed - (spread === 360 ? 3 : 6),
        size,
        type,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        tilt: Math.random() * 10,
        tiltSpeed: 0.08 + Math.random() * 0.1,
        opacity: 1,
        decay: 0.005 + Math.random() * 0.008,
      });
    }

    if (!animFrameRef.current) {
      loop();
    }
  }

  function continuousRain(durationMs = 4000) {
    const start = performance.now();
    const interval = setInterval(() => {
      const canvas = canvasRef.current;
      if (!canvas) {
        clearInterval(interval);
        return;
      }
      if (performance.now() - start > durationMs) {
        clearInterval(interval);
        return;
      }
      const x = Math.random() * canvas.width;
      addBurst(x, -20, 15, 120);
    }, 180);
  }

  useImperativeHandle(ref, () => ({
    burst: (x, y, count) => addBurst(x, y, count),
    rain: (duration) => continuousRain(duration),
  }));

  function drawHeart(ctx, x, y, size) {
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 2 + size * 0.2, x, y + size);
    ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 2 + size * 0.2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    ctx.closePath();
    ctx.fill();
  }

  function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  }

  function loop() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particlesRef.current.length - 1; i >= 0; i--) {
      const p = particlesRef.current[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22; // gravity
      p.vx *= 0.98; // air drag
      p.rotation += p.rotationSpeed;
      p.tilt += p.tiltSpeed;
      p.opacity -= p.decay;

      if (p.opacity <= 0 || p.y > canvas.height + 50) {
        particlesRef.current.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      const scaleX = Math.cos(p.tilt);
      ctx.scale(scaleX, 1);

      if (p.type === 'heart') {
        drawHeart(ctx, -p.size / 2, -p.size / 2, p.size * 1.2);
      } else if (p.type === 'star') {
        drawStar(ctx, 0, 0, 5, p.size, p.size * 0.45);
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      }

      ctx.restore();
    }

    if (particlesRef.current.length > 0) {
      animFrameRef.current = requestAnimationFrame(loop);
    } else {
      animFrameRef.current = null;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function handleResize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 99999,
      }}
    />
  );
});

export default ConfettiCanvas;
