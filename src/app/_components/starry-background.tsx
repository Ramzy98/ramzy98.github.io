'use client';

import { useEffect, useRef } from 'react';

type Particle = { x: number; y: number; vx: number; vy: number; radius: number };

/**
 * Slow-drifting constellation behind the page. With reduced motion it draws a
 * single still frame instead of animating.
 */
export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const connectionRadius = 140;
    let particles: Particle[] = [];
    let frame = 0;

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Scale density with screen area so phones aren't crowded or overworked.
      const count = Math.round(Math.min(70, (window.innerWidth * window.innerHeight) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.2 + 0.4,
      }));
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 211, 238, 0.5)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const distance = Math.hypot(p.x - q.x, p.y - q.y);
          if (distance < connectionRadius) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - distance / connectionRadius) * 0.1})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      cancelAnimationFrame(frame);
      seed();
      draw();
    };

    seed();
    draw();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 bg-background overflow-hidden pointer-events-none">
      <div className="absolute -top-[15%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-indigo-600/10 blur-[160px]" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
