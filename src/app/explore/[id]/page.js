import React, { Suspense } from 'react';
import IngredientDetailView from '@/components/swap/IngredientDetailView';
import ingredientsData from '@/lib/data/ingredients';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const ingredient = ingredientsData.ingredients.find((ing) => ing.id === id);

  if (!ingredient) return {};

  const title = `How to Substitute ${ingredient.name?.en || id} | Global Ingredient Swap`;
  const description = ingredient.description?.en || "";
  const ogImage = `/api/og?id=${id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

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
  const substituteFullInfo = bestSubstitute 
    ? ingredientsData.ingredients.find(ing => ing.id === bestSubstitute.id)
    : null;

  // Defensive SEO JSON-LD generation
  const safeEn = (obj, fallback = "") => obj?.en || fallback;
  const safeSubName = (sub) => safeEn(sub?.name, "Substitute");
  const safeCompAction = (sub) => safeEn(sub?.compensation_action, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Substitute ${safeEn(ingredient.name, id)}`,
    "description": safeEn(ingredient.description),
    "image": `https://swap.lego-sia.com/api/og?id=${ingredient.id}`,
    "step": (ingredient.substitutes || []).map((sub, idx) => ({
      "@type": "HowToStep",
      "name": `Option ${idx + 1}: ${safeSubName(sub)}`,
      "text": `Substitute with ${safeSubName(sub)} at a ratio of ${sub.ratio?.target_min || 1}-${sub.ratio?.target_max || 1} ${sub.ratio?.unit || 'unit'}. ${safeCompAction(sub)}`,
      "url": `https://swap.lego-sia.com/explore/${ingredient.id}`
    })),
    "totalTime": "PT1M"
  };

  // Add FAQ Schema if exists
  const faqJsonLd = ingredient.faq && ingredient.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": ingredient.faq.map(item => ({
      "@type": "Question",
      "name": item.question?.en || "",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer?.en || ""
      }
    }))
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <IngredientDetailView 
        ingredient={ingredient} 
        bestSubstitute={bestSubstitute} 
        substituteFullInfo={substituteFullInfo}
      />
    </>
  );
}
