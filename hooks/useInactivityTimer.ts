import { useEffect, useCallback } from 'react';

interface InactivityTimerProps {
  onInactive: () => void;
  onActive: () => void;
  timeout?: number;
}

export function useInactivityTimer({
  onInactive,
  onActive,
  timeout = 5000
}: InactivityTimerProps) {
  const resetTimer = useCallback(() => {
    onActive();
  }, [onActive]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleActivity = () => {
      clearTimeout(timeoutId);
      resetTimer();
      timeoutId = setTimeout(onInactive, timeout);
    };

    // List of events to track
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
      'wheel'
    ];

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity);
    });

    // Initial timer
    timeoutId = setTimeout(onInactive, timeout);

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
      clearTimeout(timeoutId);
    };
  }, [onInactive, resetTimer, timeout]);
}