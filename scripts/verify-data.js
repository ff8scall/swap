const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/lib/data/ingredients');
const schemaPath = path.join(dataDir, 'schema.json');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && !['schema.json', 'category-schema.json', 'index.json'].includes(f));

const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

console.log('--- Data Verification Started ---');

let errorCount = 0;

files.forEach(file => {
    const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
    data.ingredients.forEach(ing => {
        // Basic check for V2.1 mandatory fields
        const requiredFields = ['id', 'name', 'category', 'properties', 'thermal_behavior', 'functional_properties', 'texture_profile'];
        requiredFields.forEach(field => {
            if (!ing[field]) {
                console.error(`Error: [${file}] Ingredient ${ing.id} is missing field: ${field}`);
                errorCount++;
            }
        });
        
        if (ing.properties) {
            const propFields = ['ph_level', 'moisture_content', 'sweetness_index', 'viscosity', 'umami_intensity'];
            propFields.forEach(f => {
                if (ing.properties[f] === undefined) {
                    console.error(`Error: [${file}] Ingredient ${ing.id} is missing property: ${f}`);
                    errorCount++;
                }
            });
        }
    });
});

if (errorCount === 0) {
    console.log('✅ All ingredients passed V2.1 basic validation!');
} else {
    console.error(`❌ Found ${errorCount} errors during validation.`);
}
