'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ScreensaverBackground() {
  return (
    <>
      {/* Dark background */}
      <div className="absolute inset-0 bg-[#080B1D]" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/20 blur-[100px]"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/20 blur-[100px]"
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Static gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080B1D]/50 to-[#080B1D]" />
    </>
  );
}