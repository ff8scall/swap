const fs = require('fs');
const path = require('path');

const inputPath = path.join(process.cwd(), 'src/lib/data/ingredients.json');
const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const seen = new Set();
const uniqueIngredients = [];

data.ingredients.forEach(ing => {
  if (!seen.has(ing.id)) {
    seen.add(ing.id);
    uniqueIngredients.push(ing);
  }
});

data.ingredients = uniqueIngredients;

fs.writeFileSync(inputPath, JSON.stringify(data, null, 2));
console.log(`Deduplication complete. Remaining ingredients: ${data.ingredients.length}`);
