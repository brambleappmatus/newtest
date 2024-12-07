import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function useDonationAmount() {
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchDonationAmount() {
      try {
        const { data, error } = await supabase
          .from('donations_collected')
          .select('collected_amount')
          .single();

        if (error) throw error;
        
        if (mounted && data) {
          setAmount(data.collected_amount);
        }
      } catch (err) {
        console.error('Error fetching donation amount:', err);
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch donation amount'));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    fetchDonationAmount();

    return () => {
      mounted = false;
    };
  }, []);

  return { amount, isLoading, error };
}