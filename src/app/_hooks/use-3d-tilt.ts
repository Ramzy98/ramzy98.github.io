'use client';

import { useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { useCallback, useRef } from 'react';

export interface Use3DTiltReturn {
  ref: React.RefObject<HTMLDivElement>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  handleMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseLeave: () => void;
}

export function use3DTilt(maxRotation: number = 10, springConfig = { stiffness: 150, damping: 20, mass: 0.1 }): Use3DTiltReturn {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const rotateX = useTransform(mouseY, [0, 1], [maxRotation, -maxRotation]);
  const rotateY = useTransform(mouseX, [0, 1], [-maxRotation, maxRotation]);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseXRelative = (event.clientX - rect.left) / width;
      const mouseYRelative = (event.clientY - rect.top) / height;

      x.set(mouseXRelative);
      y.set(mouseYRelative);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0.5);
    y.set(0.5);
  }, [x, y]);

  return {
    ref,
    rotateX,
    rotateY,
    mouseX,
    mouseY,
    handleMouseMove,
    handleMouseLeave,
  };
}
