const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../src/lib/data/ingredients');

const STORAGE_KNOWLEDGE = {
  // --- Dairy & Fats ---
  "butter-unsalted": { days: 120, ko_tip: "냉장고 냄새를 흡수하지 않도록 밀폐 용기에 보관하세요.", en_tip: "Keep in airtight container to prevent absorbing fridge odors." },
  "milk-whole": { days: 7, ko_tip: "가장 차가운 냉장고 안쪽에 보관하세요.", en_tip: "Keep in the back of the fridge where it is coldest." },
  
  // --- Herbs (Fresh) ---
  "kkaennip": { days: 7, ko_tip: "젖은 키친타월로 감싸 지퍼백에 넣어 냉장 보관하세요.", en_tip: "Wrap in damp paper towel and put in a zipper bag." },
  "cilantro": { days: 10, ko_tip: "물컵에 꽂고 비닐을 씌워 꽃다발처럼 냉장 보관하세요.", en_tip: "Store like a bouquet in a glass of water with a bag over the top." },
  
  // --- Spices (Dry) ---
  "cumin": { days: 730, ko_tip: "열기와 습기를 피하여 서늘하고 어두운 곳에 보관하세요.", en_tip: "Store in a cool, dark place away from heat and moisture." },
  "gochugaru": { days: 365, ko_tip: "색과 맛 유지를 위해 냉동 보관하는 것이 가장 좋습니다.", en_tip: "Best stored in the freezer to maintain color and flavor." },

  // --- Sauces ---
  "gochujang": { days: 365, ko_tip: "개봉 후 냉장 보관하세요. 표면을 평평하게 눌러 공기 접촉을 최소화하세요.", en_tip: "Keep refrigerated after opening. Surface should be kept flat." },
  "soy-sauce": { days: 365, ko_tip: "개봉 후에는 향을 보존하기 위해 냉장 보관하는 것이 좋습니다.", en_tip: "Refrigerate after opening to preserve the delicate aroma." }
};

const CATEGORY_DEFAULTS = {
  "Dairy & Fats": { days: 14, ko_tip: "항상 4도 이하의 냉장 상태를 유지하세요.", en_tip: "Always keep refrigerated at 4°C or below." },
  "Herbs & Spices": { days: 365, ko_tip: "밀폐 용기에 담아 직사광선을 피해 보관하세요.", en_tip: "Keep in an airtight container away from direct sunlight." },
  "Sauces & Condiments": { days: 180, ko_tip: "오염 방지를 위해 뚜껑을 닫기 전 입구를 깨끗이 닦으세요.", en_tip: "Wipe the rim before closing to prevent contamination." },
  "Grains & Seeds": { days: 365, ko_tip: "서늘하고 건조한 곳에 두세요. 가루류는 밀폐 용기가 필수입니다.", en_tip: "Store in a cool, dry place. Flour is best in airtight containers." },
  "Pickles & Ferments": { days: 180, ko_tip: "재료가 항상 국물에 잠겨 있도록 관리하세요.", en_tip: "Ensure ingredients are submerged in brine/sauce." }
};

function injectStorageData() {
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json') && !f.includes('schema'));

  files.forEach(file => {
    const filePath = path.join(DATA_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let changed = false;

    if (data.ingredients && Array.isArray(data.ingredients)) {
      data.ingredients.forEach(ing => {
        const cat = data.meta.category_en;
        const expert = STORAGE_KNOWLEDGE[ing.id];
        const def = CATEGORY_DEFAULTS[cat] || { days: 30, ko_tip: "서늘한 곳에 보관하세요.", en_tip: "Store in a cool place." };

        // UI 호환 필드 주입
        ing.shelf_life = {
          opened_days: expert ? expert.days : def.days
        };
        ing.storage_tips = {
          en: expert ? expert.en_tip : def.en_tip,
          ko: expert ? expert.ko_tip : def.ko_tip
        };
        changed = true;
      });
    }

    if (changed) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`🏠 [V2 Storage] ${file}`);
    }
  });
}

injectStorageData();
console.log("🏆 UI 호환 보관 데이터 주입 완료!");
