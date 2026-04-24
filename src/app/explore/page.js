import React, { Suspense } from 'react';
import IngredientExploreView from '@/components/swap/IngredientExploreView';
import ingredientsData from '@/lib/data/ingredients';

export const metadata = {
  title: 'Explore Ingredient Substitutes | Swap.sia',
  description: 'Search and browse scientifically verified ingredient substitutes for baking and K-Food.',
};

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="loading">Loading ingredients...</div>}>
      <IngredientExploreView ingredients={ingredientsData.ingredients} />
    </Suspense>
  );
}
