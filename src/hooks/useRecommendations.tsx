import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Recommendation {
  id: string;
  type: string;
  title: string;
  author: string;
  category: string;
  tags: string[];
  price: number;
  rating: number;
  description: string;
  match_score: number;
  reason: string;
}

export const useRecommendations = (userId: string | null) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchRecommendations = async () => {
    if (!userId) {
      // Return default recommendations if no user
      setRecommendations([]);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-recommendations', {
        body: { userId }
      });

      if (error) throw error;

      if (data?.recommendations) {
        setRecommendations(data.recommendations);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast({
        title: 'Erro ao carregar recomendações',
        description: 'Não foi possível carregar as recomendações personalizadas.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const trackProductView = async (productData: {
    productId: string;
    productType: string;
    productTitle: string;
    productCategory?: string;
    productTags?: string[];
    timeSpentSeconds?: number;
  }) => {
    if (!userId) return;

    try {
      await supabase.from('user_browsing_history').insert({
        user_id: userId,
        product_id: productData.productId,
        product_type: productData.productType,
        product_title: productData.productTitle,
        product_category: productData.productCategory,
        product_tags: productData.productTags,
        time_spent_seconds: productData.timeSpentSeconds || 0,
      });
    } catch (error) {
      console.error('Error tracking product view:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchRecommendations();
    }
  }, [userId]);

  return {
    recommendations,
    isLoading,
    refreshRecommendations: fetchRecommendations,
    trackProductView,
  };
};
