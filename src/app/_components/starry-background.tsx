'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const { scrollYProgress } = useScroll();

  // Parallax transforms for the nebula blobs
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Mouse state for interactivity
    let mouse = { x: -1000, y: -1000 };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    // Clear mouse when leaving window
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle Config
    const maxParticles = window.innerWidth < 768 ? 40 : 100;
    const connectionRadius = 150;
    const mouseRadius = 200;
    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 1.5 + 0.5,
      });
    }

    const animate = () => {
      if (!ctx || !canvas) return;

      // 1. Clear background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 2. Update and draw particles
      particles.forEach((p, index) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse repulsion logic
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        
        if (distToMouse < mouseRadius) {
          const force = (mouseRadius - distToMouse) / mouseRadius;
          const pushX = (dx / distToMouse) * force * 0.5;
          const pushY = (dy / distToMouse) * force * 0.5;
          p.x -= pushX * 2;
          p.y -= pushY * 2;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 240, 255, 0.6)'; // Subtle Electric Cyan
        ctx.fill();

        // 3. Draw connections
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distDx = p.x - p2.x;
          const distDy = p.y - p2.y;
          const distance = Math.sqrt(distDx * distDx + distDy * distDy);

          if (distance < connectionRadius) {
            const opacity = 1 - (distance / connectionRadius);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.15})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] bg-[#050a15] overflow-hidden pointer-events-none">
      {/* Parallax Nebula Layer */}
      <div className="absolute inset-0 opacity-40">
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-cyan-500/20 blur-[120px]" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-purple-600/15 blur-[150px]" 
        />
        <motion.div 
          style={{ y: y3 }}
          className="absolute top-[40%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-cyan-600/10 blur-[100px]" 
        />
        <motion.div 
          style={{ y: y4 }}
          className="absolute top-[10%] left-[30%] w-[50vw] h-[50vw] rounded-full bg-purple-500/10 blur-[130px]" 
        />
      </div>

      {/* SVG Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
    </div>
  );
}
