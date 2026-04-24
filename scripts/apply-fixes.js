const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../src/lib/data/ingredients');

const FIXES = {
  "shiso-leaf": { "en": "Shiso Leaf", "ko": "시소 잎" },
  "parsley-plus-lemon": { "en": "Parsley & Lemon", "ko": "파슬리와 레몬" },
  "lemon-zest": { "en": "Lemon Zest", "ko": "레몬 제스트" },
  "ginger-plus-lemon": { "en": "Ginger & Lemon", "ko": "생강과 레몬" },
  "lemon-zest-salt": { "en": "Lemon Zest & Salt", "ko": "레몬 소금" },
  "red-onion-garlic": { "en": "Red Onion & Garlic", "ko": "적양파와 마늘" },
  "curry-powder-plus-allspice": { "en": "Curry Powder & Allspice", "ko": "카레 가루와 올스파이스" },
  "sweet-basil-mint": { "en": "Sweet Basil & Mint", "ko": "스위트 바질과 민트" },
  "thyme-sumac-sesame": { "en": "Thyme, Sumac & Sesame", "ko": "타임, 수막, 참깨" },
  "paprika-cayenne-mix": { "en": "Paprika & Cayenne", "ko": "파프리카와 카옌" },
  "oregano-savory-mix": { "en": "Oregano & Savory", "ko": "오레가노와 세이보리" },
  "garlic-onion-powder": { "en": "Garlic & Onion Powder", "ko": "마늘과 양파 가루" },
  "lemon-juice": { "en": "Lemon Juice", "ko": "레몬즙" },
  "bay-leaf-lime-zest": { "en": "Bay Leaf & Lime Zest", "ko": "월계수 잎과 라임 제스트" },
  "prepared-mustard": { "en": "Prepared Mustard", "ko": "연겨자/머스터드" },
  "maple-syrup-extract": { "en": "Maple Syrup & Extract", "ko": "메이플 시럽과 익스트랙" },
  "turmeric-color-only": { "en": "Turmeric (for color)", "ko": "강황 (색상용)" },
  "vanilla-extract": { "en": "Vanilla Extract", "ko": "바닐라 익스트랙" },
  "anise-seeds": { "en": "Anise Seeds", "ko": "아니스 씨앗" },
  "cinnamon-clove-nutmeg-mix": { "en": "Cinnamon, Clove & Nutmeg", "ko": "시나몬, 정향, 넛맥" },
  "cinnamon-clove-mix": { "en": "Cinnamon & Clove", "ko": "시나몬과 정향" },
  "allspice-ground": { "en": "Ground Allspice", "ko": "올스파이스 가루" },
  "mace": { "en": "Mace", "ko": "메이스" },
  "saffron-for-color": { "en": "Saffron (for color)", "ko": "사프란 (색상용)" },
  "coriander-seeds-ground": { "en": "Ground Coriander", "ko": "고수 씨앗 가루" },
  "caraway-seeds": { "en": "Caraway Seeds", "ko": "카라웨이 씨앗" },
  "allspice": { "en": "Allspice", "ko": "올스파이스" },
  "fresh-ginger": { "en": "Fresh Ginger", "ko": "신선한 생강" },
  "marjoram": { "en": "Marjoram", "ko": "마조람" },
  "thyme-plus-sage": { "en": "Thyme & Sage", "ko": "타임과 세이지" },
  "thyme-plus-oregano": { "en": "Thyme & Oregano", "ko": "타임과 오레가노" },
  "star-anise-ground": { "en": "Ground Star Anise", "ko": "팔각 가루" },
  "sake-plus-sugar": { "en": "Sake & Sugar", "ko": "사케와 설탕" },
  "soy-sauce": { "en": "Soy Sauce", "ko": "간장" },
  "miso-paste": { "en": "Miso Paste", "ko": "미소 된장" },
  "peanut-butter": { "en": "Peanut Butter", "ko": "땅콩 버터" },
  "mushroom-sauce": { "en": "Mushroom Sauce", "ko": "버섯 소스" },
  "dry-sherry": { "en": "Dry Sherry", "ko": "드라이 셰리" },
  "lime-juice-plus-sugar": { "en": "Lime Juice & Sugar", "ko": "라임즙과 설탕" },
  "gochujang-vinegar-mix": { "en": "Gochujang & Vinegar", "ko": "고추장과 식초" },
  "bbq-sauce-plus-soy": { "en": "BBQ Sauce & Soy", "ko": "BBQ 소스와 간장" },
  "soy-sauce-lemon-mix": { "en": "Soy Sauce & Lemon", "ko": "간장과 레몬" },
  "apple-cider-vinegar": { "en": "Apple Cider Vinegar", "ko": "사과 식초" },
  "gochujang-cumin-mix": { "en": "Gochujang & Cumin", "ko": "고추장과 큐민" },
  "fish-sauce": { "en": "Fish Sauce", "ko": "피쉬 소스" },
  "lime-chili-salt-mix": { "en": "Lime, Chili & Salt", "ko": "라임, 고추, 소금" },
  "soy-sauce-plus-molasses": { "en": "Soy Sauce & Molasses", "ko": "간장과 당밀" },
  "chili-oil-plus-fried-garlic": { "en": "Chili Oil & Fried Garlic", "ko": "고추기름과 튀긴 마늘" },
  "smoked-paprika": { "en": "Smoked Paprika", "ko": "훈제 파프리카" },
  "soy-sauce-plus-honey": { "en": "Soy Sauce & Honey", "ko": "간장과 꿀" },
  "gochujang-miso-mix": { "en": "Gochujang & Miso", "ko": "고추장과 미소" },
  "light-soy-sauce-plus-salt": { "en": "Light Soy Sauce & Salt", "ko": "국간장과 소금" }
};

const EXCLUDED_FILES = ['schema.json', 'index.js'];

function applyFixes(data) {
  let count = 0;
  if (Array.isArray(data)) {
    data.forEach(item => {
      count += applyFixes(item);
    });
  } else if (data !== null && typeof data === 'object') {
    if (data.id && data.name && (data.name.en === 'Alternative' || data.name.ko === '대안 재료')) {
      const fix = FIXES[data.id];
      if (fix) {
        data.name = fix;
        count++;
      }
    }
    for (const key in data) {
      if (key !== 'id') {
        count += applyFixes(data[key]);
      }
    }
  }
  return count;
}

function processFile(filePath) {
  const fileName = path.basename(filePath);
  if (EXCLUDED_FILES.includes(fileName) || fileName.endsWith('.js')) return;

  const content = fs.readFileSync(filePath, 'utf8');
  let data = JSON.parse(content);
  
  const fixCount = applyFixes(data);
  if (fixCount > 0) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Applied ${fixCount} fixes to ${fileName}`);
  }
}

function run() {
  const files = fs.readdirSync(DATA_DIR);
  files.forEach(file => {
    const fullPath = path.join(DATA_DIR, file);
    if (fs.statSync(fullPath).isFile()) {
      processFile(fullPath);
    }
  });
}

run();
