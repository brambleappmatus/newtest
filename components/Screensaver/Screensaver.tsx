'use client';

import React, { useState } from 'react';
import { useInactivityTimer } from '@/hooks/useInactivityTimer';
import ScreensaverContent from './ScreensaverContent';
import ScreensaverBackground from './ScreensaverBackground';

export default function Screensaver() {
  const [isActive, setIsActive] = useState(false);
  
  useInactivityTimer({
    onInactive: () => setIsActive(true),
    onActive: () => setIsActive(false),
    timeout: 5000 // 5 seconds
  });

  if (!isActive) return null;

  return (
    <div 
      className="fixed inset-0 bg-[#080B1D] z-[200] cursor-pointer overflow-hidden"
      onClick={() => setIsActive(false)}
    >
      <ScreensaverBackground />
      <ScreensaverContent />
    </div>
  );
}