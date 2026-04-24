const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../src/lib/data/ingredients');

function safetyAudit() {
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json') && !f.includes('schema'));

  files.forEach(file => {
    const filePath = path.join(DATA_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let changed = false;

    if (data.ingredients && Array.isArray(data.ingredients)) {
      data.ingredients.forEach(ing => {
        const originalAllergens = JSON.stringify(ing.allergens);
        
        // 1. 대두(Soy) 관련
        if (ing.id.includes('soy') || ing.id.includes('miso') || ing.id.includes('doenjang') || ing.id.includes('gochujang') || ing.id.includes('tofu')) {
          if (!ing.allergens.includes('soy')) ing.allergens.push('soy');
        }
        
        // 2. 갑각류(Crustaceans) 관련
        if (ing.id.includes('shrimp') || ing.id.includes('saeu') || ing.id.includes('crab') || ing.id.includes('lobster')) {
          if (!ing.allergens.includes('crustaceans')) ing.allergens.push('crustaceans');
        }
        
        // 3. 생선(Fish) 관련
        if (ing.id.includes('fish') || ing.id.includes('anchovy') || ing.id.includes('mackerel') || ing.id.includes('tuna')) {
          if (!ing.allergens.includes('fish')) ing.allergens.push('fish');
        }
        
        // 4. 유제품(Dairy) 관련
        if (ing.id.includes('milk') || ing.id.includes('butter') || ing.id.includes('cheese') || ing.id.includes('cream')) {
          if (!ing.allergens.includes('dairy')) ing.allergens.push('dairy');
        }
        
        // 5. 견과류(Nuts/Sesame) 관련
        if (ing.id.includes('sesame') || ing.id.includes('peanut') || ing.id.includes('almond') || ing.id.includes('walnut')) {
          const tag = ing.id.includes('sesame') ? 'sesame' : 'nuts';
          if (!ing.allergens.includes(tag)) ing.allergens.push(tag);
        }

        // 중복 제거 및 'none' 정리
        ing.allergens = [...new Set(ing.allergens)];
        if (ing.allergens.length > 1 && ing.allergens.includes('none')) {
          ing.allergens = ing.allergens.filter(a => a !== 'none');
        }
        
        if (originalAllergens !== JSON.stringify(ing.allergens)) {
          changed = true;
        }
      });
    }

    if (changed) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`🛡️ [Safety Fixed] ${file}`);
    }
  });
}

safetyAudit();
console.log("✅ 안전 데이터 검수 완료!");
