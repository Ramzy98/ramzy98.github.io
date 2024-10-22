'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';
import { sendGTMEvent } from '@next/third-parties/google';

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });

    renderer.setSize(300, 300);

    const blackHoleGeometry = new THREE.SphereGeometry(3, 32, 32);
    const blackHoleMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const blackHole = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial);
    scene.add(blackHole);

    const diskGeometry = new THREE.RingGeometry(4, 8, 64);
    const diskMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        void main() {
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(vUv, center);
          float angle = atan(vUv.y - center.y, vUv.x - center.x);
          float intensity = sin(angle * 10.0 + time * 2.0) * 0.5 + 0.5;
          vec3 color = mix(vec3(1.0, 0.5, 0.0), vec3(0.0, 0.5, 1.0), intensity);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });
    const accretionDisk = new THREE.Mesh(diskGeometry, diskMaterial);
    accretionDisk.rotation.x = Math.PI / 2;
    scene.add(accretionDisk);

    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
    });
    const starsVertices = [];
    for (let i = 0; i < 5000; i++) {
      const x = THREE.MathUtils.randFloatSpread(1000);
      const y = THREE.MathUtils.randFloatSpread(1000);
      const z = THREE.MathUtils.randFloatSpread(1000);
      starsVertices.push(x, y, z);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    camera.position.z = 20;

    const animate = (time: number) => {
      requestAnimationFrame(animate);
      blackHole.rotation.y += 0.005;
      accretionDisk.rotation.z += 0.002;
      starField.rotation.y += 0.0002;
      (diskMaterial.uniforms.time as { value: number }).value = time / 1000;
      renderer.render(scene, camera);
    };

    animate(0);

    return () => {
      renderer.dispose();
    };
  }, []);

  const handleEscape = () => {
    sendGTMEvent({ event: '404_escape_click' });
    router.push('/home');
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 min-h-screen overflow-hidden">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="text-center flex flex-col items-center relative"
        >
          <canvas
            ref={canvasRef}
            className="mb-4 rounded-full shadow-lg shadow-purple-500/50"
            width={300}
            height={300}
          />
          <motion.h1
            className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
          >
            404
          </motion.h1>
          <motion.p
            className="text-xl text-white mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Oops! You&apos;ve been sucked into a black hole.
          </motion.p>
          <motion.div
            className="text-white text-opacity-70 mb-4 max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <p>Don&apos;t panic! Even light can&apos;t escape this 404 error, but you can!</p>
          </motion.div>

          <motion.button
            onClick={handleEscape}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition duration-300 shadow-lg"
          >
            Escape the Event Horizon
          </motion.button>

          <motion.div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 2 }}
          >
            {[...Array(20)].map((_, index) => (
              <motion.div
                key={index}
                className="absolute bg-white rounded-full"
                style={{
                  width: Math.random() * 3 + 1 + 'px',
                  height: Math.random() * 3 + 1 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
