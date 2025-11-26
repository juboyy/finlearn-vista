import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ProductViewData {
  productId: string;
  productType: string;
  productTitle: string;
  productCategory?: string;
  productTags?: string[];
}

export const useProductViewTracker = (productData: ProductViewData, userId: string | null) => {
  const startTimeRef = useRef<number>(Date.now());
  const accumulatedTimeRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);
  const lastVisibilityChangeRef = useRef<number>(Date.now());
  const hasTrackedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!userId || !productData.productId) return;

    // Reset tracking for new product
    startTimeRef.current = Date.now();
    accumulatedTimeRef.current = 0;
    lastVisibilityChangeRef.current = Date.now();
    isVisibleRef.current = true;
    hasTrackedRef.current = false;

    console.log('Starting view tracking for:', productData.productTitle);

    // Handle visibility changes (tab switching)
    const handleVisibilityChange = () => {
      const now = Date.now();
      
      if (document.hidden) {
        // Tab became hidden - pause timer
        if (isVisibleRef.current) {
          const timeSpent = now - lastVisibilityChangeRef.current;
          accumulatedTimeRef.current += timeSpent;
          isVisibleRef.current = false;
          console.log('Tab hidden. Accumulated time:', accumulatedTimeRef.current / 1000, 'seconds');
        }
      } else {
        // Tab became visible - resume timer
        isVisibleRef.current = true;
        lastVisibilityChangeRef.current = now;
        console.log('Tab visible. Resuming timer.');
      }
    };

    // Track view when component unmounts or user leaves
    const trackView = async () => {
      if (hasTrackedRef.current) return;
      hasTrackedRef.current = true;

      const now = Date.now();
      
      // Add current session time if tab is visible
      if (isVisibleRef.current) {
        const currentSessionTime = now - lastVisibilityChangeRef.current;
        accumulatedTimeRef.current += currentSessionTime;
      }

      const totalTimeSeconds = Math.floor(accumulatedTimeRef.current / 1000);

      // Only track if user spent at least 3 seconds
      if (totalTimeSeconds < 3) {
        console.log('View too short, not tracking');
        return;
      }

      console.log('Tracking view:', {
        product: productData.productTitle,
        timeSpent: totalTimeSeconds,
        userId
      });

      try {
        const { error } = await supabase.from('user_browsing_history').insert({
          user_id: userId,
          product_id: productData.productId,
          product_type: productData.productType,
          product_title: productData.productTitle,
          product_category: productData.productCategory,
          product_tags: productData.productTags,
          time_spent_seconds: totalTimeSeconds,
        });

        if (error) {
          console.error('Error tracking product view:', error);
        } else {
          console.log('Successfully tracked view');
        }
      } catch (error) {
        console.error('Error tracking product view:', error);
      }
    };

    // Handle page unload
    const handleBeforeUnload = () => {
      trackView();
    };

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup and track view on unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      trackView();
    };
  }, [userId, productData.productId, productData.productTitle]);

  return null;
};
