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

    // Create a space-themed object: a wormhole
    const wormholeGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const wormholeMaterial = new THREE.MeshPhongMaterial({
      color: 0x6600ff,
      emissive: 0x440088,
      side: THREE.DoubleSide,
      shininess: 50,
    });
    const wormhole = new THREE.Mesh(wormholeGeometry, wormholeMaterial);

    // Add some particle effects
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCnt = 5000;
    const posArray = new Float32Array(particlesCnt * 3);

    for (let i = 0; i < particlesCnt * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0xffffff,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );

    scene.add(wormhole);
    scene.add(particlesMesh);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point light
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    camera.position.z = 30;

    const animate = () => {
      requestAnimationFrame(animate);
      wormhole.rotation.x += 0.01;
      wormhole.rotation.y += 0.005;
      particlesMesh.rotation.y += 0.002;
      renderer.render(scene, camera);
    };

    animate();

    // Center the scene
    renderer.setSize(300, 300);
    camera.aspect = 1;
    camera.updateProjectionMatrix();

    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className='text-center flex flex-col items-center'
      >
        <canvas
          ref={canvasRef}
          className='mb-2 rounded-lg'
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
          className='text-2xl text-white mb-1'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Oops! You&apos;ve been pulled into a wormhole.
        </motion.p>
        <motion.div
          className='text-white text-opacity-70 mb-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p>
            Don&apos;t worry, even spacetime can&apos;t escape this 404 error!
          </p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href='/'
            className='bg-white text-purple-900 px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition duration-300'
          >
            Exit the Wormhole (Home)
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
