const fs = require('fs');
const path = require('path');

const data = require('../src/lib/data/ingredients.json');
const ingredients = data.ingredients;

// 카테고리별 그룹화
const categories = {
  'Sauces & Condiments': [],
  'Herbs & Spices': [],
  'Pantry Essentials & Sweeteners': [],
  'Baking & Thickeners': [],
  'Dairy & Fats': [],
  'Pickles & Ferments': [],
  'Seaweed & Dried Seafood': [],
  'Grains & Seeds': []
};

ingredients.forEach(ing => {
  const cat = ing.category.en;
  if (categories[cat]) {
    categories[cat].push(ing);
  } else {
    console.warn(`Unknown category: ${cat} for ${ing.id}`);
  }
});

// 출력 디렉토리
const outputDir = path.join(__dirname, '../src/lib/data/ingredients');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 각 카테고리별 파일 작성
Object.entries(categories).forEach(([catName, items]) => {
  const filename = catName.toLowerCase().replace(/[^a-z]+/g, '-') + '.json';
  const filepath = path.join(outputDir, filename);
  const content = {
    meta: {
      category_en: catName,
      category_ko: items[0]?.category.ko || '',
      count: items.length,
      generated_at: new Date().toISOString()
    },
    ingredients: items
  };
  fs.writeFileSync(filepath, JSON.stringify(content, null, 2));
  console.log(`Created ${filename} with ${items.length} items`);
});

// 인덱스 파일 생성 (모든 카테고리 목록)
const index = {
  categories: Object.keys(categories).map(catName => ({
    en: catName,
    ko: categories[catName][0]?.category.ko || '',
    count: categories[catName].length,
    file: catName.toLowerCase().replace(/[^a-z]+/g, '-') + '.json'
  })),
  total: ingredients.length,
  generated_at: new Date().toISOString()
};

fs.writeFileSync(path.join(outputDir, 'index.json'), JSON.stringify(index, null, 2));
console.log('Created index.json');

// 원본 파일은 그대로 유지 (옵션: 백업)
const backupPath = path.join(__dirname, '../src/lib/data/ingredients-backup.json');
const sourcePath = path.join(__dirname, '../src/lib/data/ingredients.json');
if (fs.existsSync(sourcePath)) {
  fs.copyFileSync(sourcePath, backupPath);
  console.log('Backup created at ingredients-backup.json');
} else {
  console.warn('Source file not found, skipping backup');
}