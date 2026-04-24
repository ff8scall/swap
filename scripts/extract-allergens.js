const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../src/lib/data/ingredients');
const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json') && !f.includes('schema'));

const allAllergens = new Set();

files.forEach(file => {
  const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
  if (data.ingredients) {
    data.ingredients.forEach(ing => {
      if (ing.allergens) {
        ing.allergens.forEach(a => allAllergens.add(a));
      }
    });
  }
});

console.log(Array.from(allAllergens).sort());
