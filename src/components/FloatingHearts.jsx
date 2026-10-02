import React, { useMemo } from 'react';

export default function FloatingHearts() {
  // Generate random hearts with different sizes, speeds, and positions
  const hearts = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 98}%`,
      size: `${Math.floor(Math.random() * 18) + 12}px`,
      duration: `${Math.floor(Math.random() * 12) + 10}s`,
      delay: `${Math.random() * 8}s`,
      opacity: (Math.random() * 0.5 + 0.2).toFixed(2),
      heartChar: ['❤️', '💖', '💕', '💗', '✨', '🌹'][Math.floor(Math.random() * 6)]
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute animate-float-heart select-none"
          style={{
            left: h.left,
            fontSize: h.size,
            animationDuration: h.duration,
            animationDelay: h.delay,
            opacity: h.opacity,
          }}
        >
          {h.heartChar}
        </span>
      ))}
    </div>
  );
}
