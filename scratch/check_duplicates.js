const fs = require('fs');
const path = require('path');

const ingredientsDir = 'src/lib/data/ingredients';
const files = fs.readdirSync(ingredientsDir).filter(f => f.endsWith('.json'));

let allIngredients = [];
files.forEach(file => {
    const content = JSON.parse(fs.readFileSync(path.join(ingredientsDir, file), 'utf8'));
    if (content.ingredients) {
        allIngredients = allIngredients.concat(content.ingredients);
    }
});

const idCounts = {};
allIngredients.forEach(ing => {
    idCounts[ing.id] = (idCounts[ing.id] || 0) + 1;
});

const duplicates = Object.keys(idCounts).filter(id => idCounts[id] > 1);

if (duplicates.length > 0) {
    console.log('Duplicate IDs found:');
    duplicates.forEach(id => {
        console.log(`- ${id} (${idCounts[id]} times)`);
    });
} else {
    console.log('No duplicate IDs found.');
}
