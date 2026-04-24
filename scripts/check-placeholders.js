const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../src/lib/data/ingredients');
const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));

const placeholders = ["General Alt", "대안 재료", "Alternative", "Placeholder"];

files.forEach(file => {
  const content = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
  placeholders.forEach(p => {
    if (content.includes(p)) {
      console.log(`Found "${p}" in ${file}`);
    }
  });
});
