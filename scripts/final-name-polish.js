const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../src/lib/data/ingredients');
const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));

function humanizeId(id) {
  return id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

files.forEach(file => {
  const filePath = path.join(DATA_DIR, file);
  let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let modified = false;

  if (data.ingredients) {
    data.ingredients.forEach(ing => {
      if (ing.substitutes) {
        ing.substitutes.forEach(sub => {
          if (sub.name?.en === "General Alt") {
            sub.name.en = humanizeId(sub.id);
            modified = true;
          }
          if (sub.name?.ko === "대안 재료") {
             // Basic heuristic for KO name if missing
             sub.name.ko = sub.id; // Or just leave it for UI to handle if we have a better mapping
             modified = true;
          }
        });
      }
    });
  }

  if (modified) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Polished ${file}`);
  }
});
