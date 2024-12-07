import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { DonationExample } from '@/types/donations';

export function useDonationExamples() {
  const [donationExamples, setDonationExamples] = useState<DonationExample[]>([]);
  const [randomExample, setRandomExample] = useState<DonationExample | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchDonationExamples() {
      try {
        const { data, error } = await supabase
          .from('donation_examples')
          .select('id, example_text');

        if (error) throw error;
        
        if (mounted && data && data.length > 0) {
          setDonationExamples(data);
          const randomIndex = Math.floor(Math.random() * data.length);
          setRandomExample(data[randomIndex]);
        }
      } catch (err) {
        console.error('Error fetching donation examples:', err);
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch donation examples'));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    fetchDonationExamples();

    return () => {
      mounted = false;
    };
  }, []);

  return { donationExamples, randomExample, isLoading, error };
}