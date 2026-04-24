const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src/lib/data/ingredients');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && f !== 'schema.json' && f !== 'category-schema.json' && f !== 'index.json');

const targetIngredients = [];

files.forEach(file => {
    const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
    if (data.ingredients) {
        data.ingredients.forEach(ing => {
            if (!ing.properties || !ing.properties.ph_level) {
                targetIngredients.push({
                    id: ing.id,
                    name: ing.name.ko,
                    file: file
                });
            }
        });
    }
});

console.log(JSON.stringify(targetIngredients, null, 2));
console.log(`Total targeting: ${targetIngredients.length}`);
