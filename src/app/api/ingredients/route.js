import { NextResponse } from 'next/server';
import ingredientsData from '@/lib/data/ingredients';

export async function GET() {
  // Return simple list for performance
  const list = ingredientsData.ingredients.map(ing => ({
    id: ing.id,
    name: ing.name,
    category: ing.category
  }));

  return NextResponse.json({
    total: list.length,
    ingredients: list
  });
}
