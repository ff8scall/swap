import { NextResponse } from 'next/server';
import ingredientsData from '@/lib/data/ingredients';

export async function GET(request, { params }) {
  const { id } = await params;
  const ingredient = ingredientsData.ingredients.find(ing => ing.id === id);

  if (!ingredient) {
    return NextResponse.json({ error: 'Ingredient not found' }, { status: 404 });
  }

  return NextResponse.json(ingredient);
}
