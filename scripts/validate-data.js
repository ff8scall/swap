const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../src/lib/data/ingredients');
const OUTPUT_FILE = path.join(__dirname, '../artifacts/missing_translations.json');

const EXCLUDED_FILES = ['schema.json', 'index.js'];

// fields to check for i18n
const I18N_FIELDS = ['name', 'description', 'category', 'chemical_impact', 'compensation_action', 'why_it_works', 'oops_insurance', 'origin_and_history', 'storage_tips', 'question', 'answer'];

const PLACEHOLDERS = ['Alternative', 'Substitution', 'TBD', '대안 재료', '준비 중', '분석 중', 'N/A'];

const missingItems = [];

function checkI18nObject(obj, pathInfo) {
  if (!obj || typeof obj !== 'object') return;

  const isMissing = !obj.ko;
  const isSame = obj.ko === obj.en && obj.en !== '';
  const isPlaceholder = PLACEHOLDERS.includes(obj.en) || PLACEHOLDERS.includes(obj.ko);

  if (isMissing || isSame || isPlaceholder) {
    missingItems.push({
      path: pathInfo,
      en: obj.en || '(EMPTY)',
      ko: obj.ko || '(MISSING)',
      status: isMissing ? 'MISSING' : (isSame ? 'POTENTIAL_UNLOCALIZED' : 'PLACEHOLDER')
    });
  }
}

function traverse(data, currentPath = '') {
  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      traverse(item, `${currentPath}[${index}]`);
    });
  } else if (data !== null && typeof data === 'object') {
    // Check if this object is an i18n object itself
    if (data.en !== undefined || data.ko !== undefined) {
      checkI18nObject(data, currentPath);
    } else {
      for (const key in data) {
        traverse(data[key], `${currentPath}.${key}`);
      }
    }
  }
}

function validateFile(filePath) {
  const fileName = path.basename(filePath);
  if (EXCLUDED_FILES.includes(fileName) || fileName.endsWith('.js')) return;

  console.log(`Checking ${fileName}...`);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    
    // Most files have an 'ingredients' array
    if (data.ingredients) {
      data.ingredients.forEach((ing, index) => {
        const ingPath = `${fileName}: ingredients[${index}] (${ing.id})`;
        traverse(ing, ingPath);
      });
    } else {
      traverse(data, fileName);
    }
  } catch (err) {
    console.error(`Error parsing ${fileName}:`, err.message);
  }
}

function run() {
  const files = fs.readdirSync(DATA_DIR);
  files.forEach(file => {
    const fullPath = path.join(DATA_DIR, file);
    if (fs.statSync(fullPath).isFile()) {
      validateFile(fullPath);
    } else if (fs.statSync(fullPath).isDirectory() && file !== '20260424') {
        // optionally check subdirectories if needed, but current setup is flat
    }
  });

  if (missingItems.length > 0) {
    console.log(`\nFound ${missingItems.length} potential translation issues.`);
    if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
      fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
    }
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(missingItems, null, 2));
    console.log(`Details saved to: ${OUTPUT_FILE}`);
  } else {
    console.log('\nAll i18n data looks localized!');
  }
}

run();
