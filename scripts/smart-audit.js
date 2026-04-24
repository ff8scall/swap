const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../src/lib/data/ingredients');

const CULINARY_FIXES = {
  "soy-sauce": { sub: "tamari", en: "Tamari", ko: "타마리 간장", why: "Gluten-free fermented alternative.", ko_why: "글루텐 프리 발효 간장 대안입니다." },
  "gochujang": { sub: "miso-chili-mix", en: "Miso + Chili Mix", ko: "미소-고추 믹스", why: "Mimics the fermented sweetness and heat.", ko_why: "발효된 단맛과 매운맛을 재현합니다." },
  "sesame-oil-toasted": { sub: "perilla-oil", en: "Perilla Oil", ko: "들기름", why: "Similar nutty aromatic profile.", ko_why: "비슷하게 고소하고 향긋한 풍미를 가집니다." },
  "olive-oil-evoo": { sub: "avocado-oil", en: "Avocado Oil", ko: "아보카도 오일", why: "Healthy fats with neutral taste.", ko_why: "건강한 지방과 중립적인 맛을 가집니다." },
  "cumin": { sub: "ground-coriander", en: "Ground Coriander", ko: "고수 가루", why: "Earthy flavor notes.", ko_why: "흙내음이 나는 풍미를 가집니다." },
  "baking-powder": { sub: "baking-soda-acid", en: "Baking Soda + Cream of Tartar", ko: "베이킹 소다 + 크림 오브 타르타르", why: "Creates the same leavening reaction.", ko_why: "동일한 팽창 반응을 만들어냅니다." },
  "cornstarch": { sub: "potato-starch", en: "Potato Starch", ko: "감자 전분", why: "High thickening power and clear finish.", ko_why: "강한 점성과 투명한 마무리를 제공합니다." }
};

function smartAudit() {
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json') && !f.includes('schema'));

  files.forEach(file => {
    const filePath = path.join(DATA_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let changed = false;

    if (data.ingredients && Array.isArray(data.ingredients)) {
      data.ingredients.forEach(ing => {
        // 1. 알러지 보정 (유제품 카테고리만)
        if (data.meta && data.meta.category_en === "Dairy & Fats") {
          if (!ing.allergens || !ing.allergens.includes("dairy")) {
            ing.allergens = ["dairy"];
            changed = true;
          }
        }

        // 2. 대체재 정밀 보정
        const fix = CULINARY_FIXES[ing.id];
        if (fix) {
          ing.substitutes = [{
            id: fix.sub,
            name: { en: fix.en, ko: fix.ko },
            ratio: { source: 1, target_min: 1, target_max: 1, unit: "unit" },
            why_it_works: { en: fix.why, ko: fix.ko_why },
            compensation_action: { en: "1:1 ratio unless specified.", ko: "별도 지시가 없으면 1:1 비율로 사용하세요." }
          }];
          changed = true;
        } else if (ing.substitutes && ing.substitutes[0] && (ing.substitutes[0].name.en === 'General Alternative' || ing.substitutes[0].id.includes('alternative'))) {
          const sub = ing.substitutes[0];
          const cleanName = sub.id.replace('alternative-', '').replace('sub-', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          sub.name.en = cleanName;
          sub.name.ko = cleanName;
          changed = true;
        }
      });
    }

    if (changed) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`💎 [Polished] ${file}`);
    }
  });
}

smartAudit();
console.log("✨ 스마트 데이터 오딧 완료!");
