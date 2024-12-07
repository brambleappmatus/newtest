import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { DonationExample } from '@/types/donations';

export function useDonationExamples() {
  const [donationExamples, setDonationExamples] = useState<DonationExample[]>([]);
  const [randomExample, setRandomExample] = useState<DonationExample | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRandomExample = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('donation_examples')
        .select('id, example_text');

      if (error) throw error;
      
      if (data && data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setRandomExample(data[randomIndex]);
        setDonationExamples(data);
      }
    } catch (err) {
      console.error('Error fetching donation examples:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch donation examples'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRandomExample();
  }, [fetchRandomExample]);

  return { donationExamples, randomExample, isLoading, error, fetchRandomExample };
}