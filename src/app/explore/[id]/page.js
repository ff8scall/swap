import React, { Suspense } from 'react';
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

  const bestSubstitute = ingredient.substitutes?.[0];

  // Defensive SEO JSON-LD generation
  const safeEn = (obj, fallback = "") => obj?.en || fallback;
  const safeSubName = (sub) => safeEn(sub?.name, "Substitute");
  const safeCompAction = (sub) => safeEn(sub?.compensation_action, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Substitute ${safeEn(ingredient.name, id)}`,
    "description": safeEn(ingredient.description),
    "image": `https://swap.sia.com/og/${ingredient.id}.png`,
    "step": (ingredient.substitutes || []).map((sub, idx) => ({
      "@type": "HowToStep",
      "name": `Option ${idx + 1}: ${safeSubName(sub)}`,
      "text": `Substitute with ${safeSubName(sub)} at a ratio of ${sub.ratio?.target_min || 1}-${sub.ratio?.target_max || 1} ${sub.ratio?.unit || 'unit'}. ${safeCompAction(sub)}`,
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
