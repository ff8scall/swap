import React from 'react';
import IngredientDetailView from '@/components/swap/IngredientDetailView';
import ingredientsData from '@/lib/data/ingredients.json';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return ingredientsData.ingredients.map((ing) => ({
    id: ing.id,
  }));
}

export default async function IngredientDetailPage({ params }) {
  const { id } = await params;
  const ingredient = ingredientsData.ingredients.find((ing) => ing.id === id);
  
  if (!ingredient) {
    notFound();
  }

  const bestSubstitute = ingredient.substitutes[0];

  // Enhanced JSON-LD for Google Rich Snippets (Server Side)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Substitute ${ingredient.name.en}`,
    "description": ingredient.description.en,
    "image": `https://swap.sia.com/og/${ingredient.id}.png`,
    "step": ingredient.substitutes.map((sub, idx) => ({
      "@type": "HowToStep",
      "name": `Option ${idx + 1}: ${sub.name.en}`,
      "text": `Substitute with ${sub.name.en} at a ratio of ${sub.ratio.target_min}-${sub.ratio.target_max} ${sub.ratio.unit}. ${sub.compensation_action.en}`,
      "url": `https://swap.sia.com/explore/${ingredient.id}`
    })),
    "totalTime": "PT1M"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IngredientDetailView ingredient={ingredient} bestSubstitute={bestSubstitute} />
    </>
  );
}
