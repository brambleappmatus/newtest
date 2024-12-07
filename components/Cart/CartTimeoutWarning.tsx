'use client';

import React, { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';

export default function CartTimeoutWarning() {
  const { cart, clearCart } = useStore();
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [countdownId, setCountdownId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let activityTimeout: NodeJS.Timeout;
    let clearCartTimeout: NodeJS.Timeout;
    let countdownInterval: NodeJS.Timeout;

    const resetTimeout = () => {
      // Clear any existing timeouts
      if (activityTimeout) clearTimeout(activityTimeout);
      if (clearCartTimeout) clearTimeout(clearCartTimeout);
      if (countdownInterval) clearInterval(countdownInterval);
      
      if (cart.length > 0) {
        activityTimeout = setTimeout(() => {
          setShowWarning(true);
          setCountdown(10);
          
          // Start countdown interval
          countdownInterval = setInterval(() => {
            setCountdown(prev => {
              if (prev <= 1) {
                clearInterval(countdownInterval);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);

          // Set timeout to clear cart
          clearCartTimeout = setTimeout(async () => {
            await clearCart();
            setShowWarning(false);
            setCountdown(10);
          }, 10000);

          setTimeoutId(clearCartTimeout);
          setCountdownId(countdownInterval);
        }, 60000); // 1 minute
      }
    };

    // Initialize timeout if cart has items
    if (cart.length > 0) {
      resetTimeout();
    }

    return () => {
      if (activityTimeout) clearTimeout(activityTimeout);
      if (clearCartTimeout) clearTimeout(clearCartTimeout);
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [cart.length, clearCart]);

  const handleContinueShopping = () => {
    if (timeoutId) clearTimeout(timeoutId);
    if (countdownId) clearInterval(countdownId);
    setShowWarning(false);
    setCountdown(10);
  };

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-zinc-100">
          Cart Timeout Warning
        </h2>
        <p className="text-gray-600 dark:text-zinc-300 mb-4">
          Uh-oh! 😥 Your cart will be cleared in {countdown} seconds 💔
        </p>
        <button
          onClick={handleContinueShopping}
          className="w-full py-2 bg-zinc-800 dark:bg-zinc-700 text-white rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}