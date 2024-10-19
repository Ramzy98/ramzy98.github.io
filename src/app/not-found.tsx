'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import * as THREE from 'three';

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });

    renderer.setSize(300, 300);

    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshNormalMaterial();
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    camera.position.z = 30;

    const animate = () => {
      requestAnimationFrame(animate);
      torusKnot.rotation.x += 0.01;
      torusKnot.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600'>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className='text-center '
      >
        <canvas
          ref={canvasRef}
          className='mb-8 rounded-lg'
          width={300}
          height={300}
        />
        <motion.h1
          className='text-6xl font-bold text-white mb-4'
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        >
          404
        </motion.h1>
        <motion.p
          className='text-2xl text-white mb-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Houston, we have a problem. Page not found!
        </motion.p>
        <motion.div
          className='text-white text-opacity-70 mb-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p>Don&apos;t panic and always carry a towel!</p>
          <p className='mt-2'>
            Looks like this page got lost in the space-time continuum.
          </p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href='/'
            className='bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition duration-300'
          >
            Return to Earth (Home)
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
