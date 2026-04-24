import saucesCondiments from './sauces-condiments.json';
import herbsSpices from './herbs-spices.json';
import pantryEssentials from './pantry-essentials-sweeteners.json';
import bakingThickeners from './baking-thickeners.json';
import dairyFats from './dairy-fats.json';
import picklesFerments from './pickles-ferments.json';
import seaweedDriedSeafood from './seaweed-dried-seafood.json';
import grainsSeeds from './grains-seeds.json';

const ingredientsData = {
  ingredients: [
    ...saucesCondiments.ingredients,
    ...herbsSpices.ingredients,
    ...pantryEssentials.ingredients,
    ...bakingThickeners.ingredients,
    ...dairyFats.ingredients,
    ...picklesFerments.ingredients,
    ...seaweedDriedSeafood.ingredients,
    ...grainsSeeds.ingredients,
  ]
};

export default ingredientsData;
