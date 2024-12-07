'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDonationExamples } from '@/hooks/useDonationExamples';
import { useDonationAmount } from '@/hooks/useDonationAmount';
import { useFacts } from '@/hooks/useFacts';

const textVariants = {
  initial: { 
    opacity: 0,
    y: 20,
    filter: 'blur(10px)'
  },
  animate: { 
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    filter: 'blur(10px)',
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export default function ScreensaverContent() {
  const [currentScreen, setCurrentScreen] = useState<'hello' | 'donations' | 'facts'>('hello');
  const { randomExample, fetchRandomExample } = useDonationExamples();
  const { amount } = useDonationAmount();
  const { randomFact, fetchRandomFact } = useFacts();

  useEffect(() => {
    const cycleScreens = () => {
      setCurrentScreen('hello');
      
      const timers = [
        setTimeout(() => {
          fetchRandomExample();
          setCurrentScreen('donations');
        }, 5000),
        setTimeout(() => {
          fetchRandomFact();
          setCurrentScreen('facts');
        }, 10000),
        setTimeout(() => cycleScreens(), 20000) // Reset after 20s total (10s for facts)
      ];

      return () => timers.forEach(timer => clearTimeout(timer));
    };

    const cleanup = cycleScreens();
    return cleanup;
  }, [fetchRandomExample, fetchRandomFact]);

  return (
    <div className="relative h-full flex flex-col items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScreen === 'hello' && (
          <motion.div
            key="hello"
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.h1 
              className="text-[120px] font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text select-none"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              hello
            </motion.h1>
            
            <motion.div 
              className="text-center mt-12 space-y-3 select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.p 
                className="text-blue-300/90 text-2xl font-medium tracking-wide"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Tap to wake screen 🐾
              </motion.p>
              <motion.p 
                className="text-purple-300/80 text-xl font-medium tracking-wide"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              >
                and save shelter pets 🏠
              </motion.p>
            </motion.div>
          </motion.div>
        )}

        {currentScreen === 'donations' && (
          <motion.div
            key="donations"
            className="absolute inset-0 flex flex-col items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="text-center"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.h2 
                className="text-2xl font-medium text-blue-300/90 mb-3"
                variants={textVariants}
              >
                Monthly Donations
              </motion.h2>
              <motion.div 
                className="text-[160px] leading-none font-bold bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text mb-4"
                variants={textVariants}
              >
                €{amount.toFixed(2)}
              </motion.div>
              <motion.p 
                className="text-purple-300/90 text-xl"
                variants={textVariants}
              >
                collected this month
              </motion.p>
            </motion.div>

            {randomExample && (
              <motion.div 
                className="absolute bottom-32 left-0 right-0 text-center px-8"
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ delay: 0.3 }}
              >
                <p className="text-purple-200/90 text-2xl font-medium max-w-2xl mx-auto">
                  {randomExample.example_text}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {currentScreen === 'facts' && (
          <motion.div
            key="facts"
            className="absolute inset-0 flex flex-col items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.h2 
                className="text-[60px] font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-8"
                variants={textVariants}
              >
                Did You Know
              </motion.h2>
              {randomFact && (
                <motion.p 
                  className="text-[32px] leading-tight font-medium text-blue-300/90 max-w-3xl mx-auto"
                  variants={textVariants}
                >
                  {randomFact.fact_text} 🐾
                </motion.p>
              )}
            </motion.div>

            <motion.div 
              className="absolute bottom-32 left-0 right-0 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.p 
                className="text-blue-300/90 text-2xl font-medium tracking-wide"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Tap to wake screen 🐾
              </motion.p>
              <motion.p 
                className="text-purple-300/80 text-xl font-medium tracking-wide mt-2"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              >
                and save shelter pets 🏠
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}