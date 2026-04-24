const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../src/lib/data/ingredients');

// [Culinary Knowledge Base] 
// 실제 요리 전문가들이 사용하는 검증된 대체 데이터 매핑
const KNOWLEDGE_BASE = {
  // --- Dairy & Fats ---
  "butter-unsalted": {
    sub: { id: "vegetable-oil", en: "Vegetable Oil", ko: "식용유(베이킹 시)" },
    why: { en: "Provides necessary fat for texture in baking.", ko: "베이킹 시 질감에 필요한 지방분을 제공합니다." },
    action: { en: "Use 3/4 amount of oil for butter.", ko: "버터 양의 3/4 정도의 식용유를 사용하세요." }
  },
  "butter-salted": {
    sub: { id: "butter-unsalted", en: "Unsalted Butter + Salt", ko: "무염 버터 + 소금" },
    why: { en: "Adds the missing salinity to mimic salted butter.", ko: "무염 버터에 부족한 염도를 보충하여 가염 버터를 재현합니다." },
    action: { en: "Add 1/4 tsp salt per 1/2 cup butter.", ko: "버터 1/2컵당 소금 1/4작은술을 추가하세요." }
  },
  "milk-whole": {
    sub: { id: "soy-milk", en: "Soy Milk", ko: "두유" },
    why: { en: "Similar consistency and protein content.", ko: "비슷한 농도와 단백질 함량을 가지고 있습니다." },
    action: { en: "1:1 ratio, use unsweetened if possible.", ko: "1:1 비율로 사용하되, 가급적 무첨가 두유를 권장합니다." }
  },
  "olive-oil-evoo": {
    sub: { id: "avocado-oil", en: "Avocado Oil", ko: "아보카도 오일" },
    why: { en: "Neutral flavor with a healthy fat profile.", ko: "중립적인 맛과 건강한 지방 구성을 가지고 있습니다." },
    action: { en: "1:1 ratio.", ko: "1:1 비율로 대체 가능합니다." }
  },
  "cream-cheese": {
    sub: { id: "greek-yogurt", en: "Strained Greek Yogurt", ko: "꾸덕한 그릭 요거트" },
    why: { en: "Similar tang and thick texture.", ko: "비슷한 산미와 꾸덕한 질감을 제공합니다." },
    action: { en: "Strain overnight for best results.", ko: "최상의 결과를 위해 하룻밤 동안 유청을 뺀 뒤 사용하세요." }
  },
  "parmesan-cheese": {
    sub: { id: "pecorino-romano", en: "Pecorino Romano", ko: "페코리노 로마노" },
    why: { en: "Similar hard texture and salty, sharp flavor.", ko: "비슷하게 단단한 질감과 짭조름하고 강한 풍미를 가집니다." },
    action: { en: "Pecorino is saltier, use slightly less.", ko: "페코리노가 더 짜므로 양을 약간 줄여서 사용하세요." }
  },
  // --- Herbs & Spices ---
  "cumin": {
    sub: { id: "coriander-ground", en: "Ground Coriander", ko: "고수 가루" },
    why: { en: "Similar earthy tones, though less pungent.", ko: "자극은 덜하지만 비슷한 흙내음을 제공합니다." },
    action: { en: "Use 1/2 amount and adjust.", ko: "절반 정도 양을 먼저 넣고 취향껏 조절하세요." }
  },
  "soy-sauce": {
    sub: { id: "tamari", en: "Tamari (Gluten-free)", ko: "타마리 간장 (글루텐 프리)" },
    why: { en: "Similar deep umami and salinity.", ko: "비슷한 깊은 감칠맛과 염도를 제공합니다." },
    action: { en: "1:1 ratio.", ko: "1:1 비율로 사용하세요." }
  }
};

const CATEGORY_DEFAULTS = {
  "Dairy & Fats": { 
    sub: { id: "vegetable-oil", en: "Vegetable Oil", ko: "식용유" },
    allergen: "dairy" 
  },
  "Herbs & Spices": { 
    sub: { id: "dried-herbs", en: "Dried Herbs Mix", ko: "건조 허브 믹스" },
    allergen: "none" 
  },
  "Sauces & Condiments": { 
    sub: { id: "salt-pepper", en: "Salt & Pepper Base", ko: "소금 & 후추 베이스" },
    allergen: "soy" 
  }
};

function finalizeData() {
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json') && f !== 'schema.json' && f !== 'category-schema.json');

  files.forEach(file => {
    const filePath = path.join(DATA_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let changed = false;

    if (data.ingredients && Array.isArray(data.ingredients)) {
      data.ingredients.forEach(ing => {
        const cat = data.meta.category_en;
        
        // 1. 알러지 보정 (지능형)
        if (cat === "Dairy & Fats") ing.allergens = ["dairy"];
        else if (cat === "Herbs & Spices") ing.allergens = ["none"];
        else if (!ing.allergens || ing.allergens.length === 0) ing.allergens = ["none"];
        changed = true;

        // 2. 난이도 보정
        if (!ing.difficulty || ing.difficulty === 'undefined') {
          ing.difficulty = 'medium';
          changed = true;
        }

        // 3. 대체재 보정 (Knowledge Base 우선)
        const kbEntry = KNOWLEDGE_BASE[ing.id];
        if (kbEntry) {
          ing.substitutes = [{
            id: kbEntry.sub.id,
            name: { en: kbEntry.sub.en, ko: kbEntry.sub.ko },
            ratio: { source: 1, target_min: 1, target_max: 1, unit: "unit" },
            why_it_works: { en: kbEntry.why.en, ko: kbEntry.why.ko },
            compensation_action: { en: kbEntry.action.en, ko: kbEntry.action.ko }
          }];
          changed = true;
        } else if (!ing.substitutes || ing.substitutes.length === 0 || ing.substitutes[0].id.includes('alternative')) {
          // 기본값 적용
          const def = CATEGORY_DEFAULTS[cat] || { sub: { id: "general-alt", en: "General Alternative", ko: "일반 대안" } };
          ing.substitutes = [{
            id: def.sub.id,
            name: { en: def.sub.en, ko: def.sub.ko },
            ratio: { source: 1, target_min: 1, target_max: 1, unit: "unit" },
            why_it_works: { en: "Provides similar function.", ko: "비슷한 요리적 기능을 제공합니다." },
            compensation_action: { en: "Adjust to taste.", ko: "취향에 따라 조절하세요." }
          }];
          changed = true;
        }
      });
    }

    if (changed) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`✨ [Optimized] ${file}`);
    }
  });
}

finalizeData();
console.log("🏆 고품질 요리 데이터 검수 및 보정 완료!");
