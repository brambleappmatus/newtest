import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Fact } from '@/types/facts';

export function useFacts() {
  const [randomFact, setRandomFact] = useState<Fact | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchRandomFact() {
      try {
        const { data, error } = await supabase
          .from('did_you_know')
          .select('id, fact_text, category');

        if (error) throw error;
        
        if (mounted && data && data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          setRandomFact(data[randomIndex]);
        }
      } catch (err) {
        console.error('Error fetching facts:', err);
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch facts'));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    fetchRandomFact();

    return () => {
      mounted = false;
    };
  }, []);

  return { randomFact, isLoading, error };
}