import { useEffect, useState } from 'react';

const FloatingHearts = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const emojis = ['💖', '✨', '🌸', '🩺', '⭐', '🕊️', '💐', '🎂', '🤍'];
    const generated = [];

    for (let i = 0; i < 28; i++) {
      generated.push({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: Math.random() * 96,
        size: 14 + Math.random() * 22,
        duration: 10 + Math.random() * 16,
        delay: Math.random() * 12,
        opacity: 0.18 + Math.random() * 0.35,
      });
    }

    setItems(generated);
  }, []);

  return (
    <div className="floating-background-container" aria-hidden="true">
      {items.map((item) => (
        <span
          key={item.id}
          className="floating-heart"
          style={{
            left: `${item.left}%`,
            fontSize: `${item.size}px`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            opacity: item.opacity,
          }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;

