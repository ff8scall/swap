const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src/lib/data/ingredients');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && f !== 'schema.json' && f !== 'category-schema.json' && f !== 'index.json');

let totalCount = 0;
const missingFields = {};

files.forEach(file => {
    const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
    if (data.ingredients) {
        console.log(`${file}: ${data.ingredients.length} ingredients`);
        totalCount += data.ingredients.length;
        
        data.ingredients.forEach(ing => {
            if (!ing.properties) {
                missingFields[file] = (missingFields[file] || 0) + 1;
            } else if (ing.properties.ph_level === undefined) {
                 // Check for V2.1 specific fields if needed
            }
        });
    }
});

console.log('---');
console.log(`Total Ingredients: ${totalCount}`);
console.log('Missing properties section count by file:', missingFields);
