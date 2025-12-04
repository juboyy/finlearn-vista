import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Json } from '@/integrations/supabase/types';

interface DailyInsight {
  id: string;
  title: string;
  content: string;
  insight_type: string;
  generated_date: string;
  created_at: string;
  metadata: Json | null;
}

export function useDailyInsights() {
  const [insights, setInsights] = useState<DailyInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();

  const fetchTodayInsights = useCallback(async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('daily_insights')
        .select('*')
        .eq('generated_date', today)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setInsights(data || []);
      return data || [];
    } catch (error) {
      console.error('Error fetching daily insights:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const generateInsights = useCallback(async () => {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-daily-insights');

      if (error) {
        console.error('Error generating insights:', error);
        toast({
          title: "Erro ao gerar insights",
          description: "Tente novamente mais tarde.",
          variant: "destructive",
        });
        return null;
      }

      if (data?.insights) {
        setInsights(data.insights);
        
        if (data.generated) {
          toast({
            title: "Novos insights gerados",
            description: `${data.insights.length} insights do dia foram criados.`,
          });
        }
      }

      return data;
    } catch (error) {
      console.error('Error calling generate-daily-insights:', error);
      toast({
        title: "Erro ao gerar insights",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
      return null;
    } finally {
      setGenerating(false);
    }
  }, [toast]);

  // Auto-fetch on mount and generate if needed
  useEffect(() => {
    const initializeInsights = async () => {
      const existingInsights = await fetchTodayInsights();
      
      // If no insights exist for today, generate them
      if (existingInsights.length === 0) {
        await generateInsights();
      }
    };

    initializeInsights();
  }, [fetchTodayInsights, generateInsights]);

  return {
    insights,
    loading,
    generating,
    fetchTodayInsights,
    generateInsights,
    refetch: fetchTodayInsights,
  };
}