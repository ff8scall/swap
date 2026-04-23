const fs = require('fs');
const path = require('path');

const dataPath = path.join(process.cwd(), 'src/lib/data/ingredients.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

console.log(`Checking ${data.ingredients.length} ingredients...`);

const missing = [];

data.ingredients.forEach((ing, index) => {
  if (!ing.id) missing.push(`Index ${index}: Missing id`);
  if (!ing.name || !ing.name.en || !ing.name.ko) missing.push(`ID ${ing.id || index}: Missing name (en/ko)`);
  if (!ing.category || !ing.category.en || !ing.category.ko) missing.push(`ID ${ing.id || index}: Missing category (en/ko)`);
  if (!ing.substitutes || !Array.isArray(ing.substitutes)) missing.push(`ID ${ing.id || index}: Missing substitutes array`);
  
  if (ing.substitutes) {
    ing.substitutes.forEach((sub, sIndex) => {
      if (!sub.name || !sub.name.en || !sub.name.ko) missing.push(`ID ${ing.id}: Substitute ${sIndex} missing name`);
      if (!sub.ratio || !sub.ratio.unit) missing.push(`ID ${ing.id}: Substitute ${sIndex} missing ratio/unit`);
      if (!sub.chemical_impact || !sub.chemical_impact.en) missing.push(`ID ${ing.id}: Substitute ${sIndex} missing chemical_impact`);
    });
  }
});

if (missing.length > 0) {
  console.log('❌ Found errors:');
  missing.forEach(err => console.log(err));
} else {
  console.log('✅ All data is valid for V2 schema.');
}
