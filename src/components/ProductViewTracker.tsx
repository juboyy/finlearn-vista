import { useEffect } from 'react';
import { useProductViewTracker } from '@/hooks/useProductViewTracker';

interface ProductViewTrackerProps {
  productId: string;
  productType: string;
  productTitle: string;
  productCategory?: string;
  productTags?: string[];
  userId: string | null;
}

/**
 * Component wrapper for tracking product views.
 * Can be used in pages where hooks can't be directly added.
 */
export const ProductViewTracker = ({
  productId,
  productType,
  productTitle,
  productCategory,
  productTags,
  userId
}: ProductViewTrackerProps) => {
  useProductViewTracker(
    {
      productId,
      productType,
      productTitle,
      productCategory,
      productTags
    },
    userId
  );

  return null;
};
