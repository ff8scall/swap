const data = require('../src/lib/data/ingredients.json');

// 새 카테고리 매핑
const categoryMap = {
  // Sauces & Condiments
  'gochujang': 'Sauces & Condiments',
  'doenjang': 'Sauces & Condiments',
  'mirin': 'Sauces & Condiments',
  'fish-sauce': 'Sauces & Condiments',
  'oyster-sauce': 'Sauces & Condiments',
  'sriracha': 'Sauces & Condiments',
  'hoisin-sauce': 'Sauces & Condiments',
  'worcestershire-sauce': 'Sauces & Condiments',
  'kecap-manis': 'Sauces & Condiments',
  'yuzu-kosho': 'Sauces & Condiments',
  'doubanjiang': 'Sauces & Condiments',
  'chili-crisp': 'Sauces & Condiments',
  'tahini': 'Sauces & Condiments',
  'anchovy-paste': 'Sauces & Condiments',
  'coconut-aminos': 'Sauces & Condiments',
  'liquid-smoke': 'Sauces & Condiments',
  'rice-wine-vinegar': 'Sauces & Condiments',
  'rice-vinegar': 'Sauces & Condiments',
  'harissa-paste': 'Sauces & Condiments',
  'tamarind-paste': 'Sauces & Condiments',
  'shaoxing-wine': 'Sauces & Condiments',
  
  // Herbs & Spices
  'cilantro': 'Herbs & Spices',
  'lemongrass': 'Herbs & Spices',
  'galangal': 'Herbs & Spices',
  'sumac': 'Herbs & Spices',
  'thai-basil': 'Herbs & Spices',
  'curry-leaves': 'Herbs & Spices',
  'garam-masala': 'Herbs & Spices',
  'star-anise': 'Herbs & Spices',
  'allspice': 'Herbs & Spices',
  'cardamom': 'Herbs & Spices',
  'cloves': 'Herbs & Spices',
  'nutmeg': 'Herbs & Spices',
  'zaatar': 'Herbs & Spices',
  'kashmiri-chili': 'Herbs & Spices',
  'fenugreek-seeds': 'Herbs & Spices',
  'mustard-seeds': 'Herbs & Spices',
  'asafoetida': 'Herbs & Spices',
  'amchur': 'Herbs & Spices',
  'epazote': 'Herbs & Spices',
  'shallots': 'Herbs & Spices',
  'vanilla-bean': 'Herbs & Spices',
  'saffron': 'Herbs & Spices',
  
  // Pantry Essentials & Sweeteners
  'gochugaru': 'Pantry Essentials & Sweeteners',
  'maple-syrup': 'Pantry Essentials & Sweeteners',
  'molasses': 'Pantry Essentials & Sweeteners',
  'palm-sugar': 'Pantry Essentials & Sweeteners',
  'pomegranate-molasses': 'Pantry Essentials & Sweeteners',
  'malt-syrup': 'Pantry Essentials & Sweeteners',
  'panko': 'Pantry Essentials & Sweeteners',
  
  // Baking & Thickeners
  'buttermilk': 'Baking & Thickeners',
  'heavy-cream': 'Baking & Thickeners',
  'egg-baking': 'Baking & Thickeners',
  'baking-powder': 'Baking & Thickeners',
  'cream-of-tartar': 'Baking & Thickeners',
  'cornstarch': 'Baking & Thickeners',
  'arrowroot-powder': 'Baking & Thickeners',
  'xanthan-gum': 'Baking & Thickeners',
  'gelatin': 'Baking & Thickeners',
  'agar-agar': 'Baking & Thickeners',
  
  // Dairy & Fats
  'sour-cream': 'Dairy & Fats',
  'ricotta': 'Dairy & Fats',
  'mascarpone': 'Dairy & Fats',
  'ghee': 'Dairy & Fats',
  'creme-fraiche': 'Dairy & Fats',
  'pecorino-romano': 'Dairy & Fats',
  'gorgonzola': 'Dairy & Fats',
  'shortening': 'Dairy & Fats',
  'lard': 'Dairy & Fats',
  'truffle-oil': 'Dairy & Fats',
  
  // Seaweed & Dried Seafood
  'nori': 'Seaweed & Dried Seafood',
  'kombu': 'Seaweed & Dried Seafood',
  'bonito-flakes': 'Seaweed & Dried Seafood',
  
  // Pickles & Ferments
  'preserved-lemon': 'Pickles & Ferments',
  'umeboshi': 'Pickles & Ferments',
  'fenugreek-leaves': 'Pickles & Ferments',
  'koji': 'Pickles & Ferments',
  
  // Grains & Seeds
  'quinoa': 'Grains & Seeds',
  'masa-harina': 'Grains & Seeds',
};

const koNames = {
  'Sauces & Condiments': '소스 및 장류',
  'Herbs & Spices': '허브 및 향신료',
  'Pantry Essentials & Sweeteners': '기본 식재료 및 감미료',
  'Baking & Thickeners': '베이킹 및 증점제',
  'Dairy & Fats': '유제품 및 유지류',
  'Seaweed & Dried Seafood': '건어물 및 해조류',
  'Pickles & Ferments': '절임 및 발효 식품',
  'Grains & Seeds': '곡물 및 씨앗류'
};

// 업데이트
let updated = 0;
data.ingredients.forEach(ing => {
  const newCat = categoryMap[ing.id];
  if (newCat) {
    ing.category = { en: newCat, ko: koNames[newCat] };
    updated++;
  }
});

console.log('Updated:', updated, 'ingredients');

// 통계
const stats = {};
data.ingredients.forEach(ing => {
  const c = ing.category.en;
  stats[c] = (stats[c] || 0) + 1;
});

console.log('=== 카테고리 통계 ===');
console.log(JSON.stringify(stats, null, 2));

// 파일 저장
const fs = require('fs');
fs.writeFileSync('./src/lib/data/ingredients.json', JSON.stringify(data, null, 2));
console.log('파일 저장 완료!');