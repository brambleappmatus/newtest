import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Fact } from '@/types/facts';

export function useFacts() {
  const [randomFact, setRandomFact] = useState<Fact | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRandomFact = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('did_you_know')
        .select('id, fact_text, category');

      if (error) throw error;
      
      if (data && data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setRandomFact(data[randomIndex]);
      }
    } catch (err) {
      console.error('Error fetching facts:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch facts'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRandomFact();
  }, [fetchRandomFact]);

  return { randomFact, isLoading, error, fetchRandomFact };
}