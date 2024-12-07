'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useDonationExamples } from '@/hooks/useDonationExamples';
import { useDonationAmount } from '@/hooks/useDonationAmount';

export default function DonationsPage() {
  const { donationExamples, randomExample } = useDonationExamples();
  const { amount } = useDonationAmount();

  return (
    <main className="p-2 sm:p-4 bg-white dark:bg-zinc-900 min-h-screen">
      <div className="max-w-7xl mx-auto xs:ml-56 pt-16">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-800 dark:text-zinc-100 mb-4">
            Monthly Donations
          </h1>
          <div className="text-6xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-2">
            €{amount.toFixed(2)}
          </div>
          <p className="text-gray-600 dark:text-zinc-300 text-lg">
            collected this month
          </p>
        </motion.div>

        {randomExample && (
          <motion.div
            className="max-w-2xl mx-auto text-center mb-16 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-gray-600 dark:text-zinc-300 text-xl font-medium">
              {randomExample.example_text}
            </p>
          </motion.div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {donationExamples.map((example, index) => (
            <motion.div
              key={example.id}
              className="bg-gradient-to-br from-gray-50/50 to-gray-50/30 dark:from-zinc-800/30 dark:to-zinc-800/20 p-8 rounded-2xl backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <p className="text-gray-600 dark:text-zinc-300 text-lg text-center">
                {example.example_text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}