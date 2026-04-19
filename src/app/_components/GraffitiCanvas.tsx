'use client';

import React, { useRef, useEffect, useState } from 'react';

export default function GraffitiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const handlePaintToggle = (e: any) => {
      setIsActive(e.detail.enabled);
    };

    const handleReset = () => {
      if (contextRef.current && canvasRef.current) {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    };

    window.addEventListener('site-paint-toggle', handlePaintToggle);
    window.addEventListener('site-reset', handleReset);

    return () => {
      window.removeEventListener('site-paint-toggle', handlePaintToggle);
      window.removeEventListener('site-reset', handleReset);
    };
  }, []);

  const updateCanvasSize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use document scroll height to cover entire page
    // Use clientWidth to exclude vertical scrollbar width
    const width = document.documentElement.clientWidth;
    const height = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );

    canvas.width = width * 2;
    canvas.height = height * 2;
    canvas.style.width = '100%';
    canvas.style.height = `${height}px`;

    const context = canvas.getContext('2d');
    if (context) {
      context.scale(2, 2);
      context.lineCap = 'round';
      context.lineWidth = 5;
      context.shadowBlur = 10;
      // Re-apply existing properties if needed, or set defaults
      contextRef.current = context;
    }
  };

  useEffect(() => {
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  const startDrawing = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
    if (!isActive) return;
    
    // pageX/Y includes the scroll offset
    const { pageX, pageY } = 'touches' in nativeEvent ? nativeEvent.touches[0] : nativeEvent as MouseEvent;
    
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(pageX, pageY);
    setIsPainting(true);
  };

  const finishDrawing = () => {
    contextRef.current?.closePath();
    setIsPainting(false);
  };

  const draw = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
    if (!isPainting || !isActive) return;
    const { pageX, pageY } = 'touches' in nativeEvent ? nativeEvent.touches[0] : nativeEvent as MouseEvent;

    if (contextRef.current) {
      // Dynamic colors based on position
      const hue = (pageX + pageY) % 360;
      contextRef.current.strokeStyle = `hsl(${hue}, 100%, 60%)`;
      contextRef.current.shadowColor = `hsl(${hue}, 100%, 60%)`;
      
      contextRef.current.lineTo(pageX, pageY);
      contextRef.current.stroke();
    }
  };

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      onTouchStart={startDrawing}
      onTouchEnd={finishDrawing}
      onTouchMove={draw}
      ref={canvasRef}
      className={`absolute top-0 left-0 z-[50] pointer-events-none transition-opacity duration-500 ${isActive ? 'pointer-events-auto opacity-100 cursor-crosshair' : 'opacity-0'}`}
    />
  );
}
