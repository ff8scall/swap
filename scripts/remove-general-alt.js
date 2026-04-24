const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../src/lib/data/ingredients');

function removeGeneralAlt() {
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json') && !f.includes('schema'));

  files.forEach(file => {
    const filePath = path.join(DATA_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let changed = false;

    if (data.ingredients && Array.isArray(data.ingredients)) {
      data.ingredients.forEach(ing => {
        if (ing.substitutes && Array.isArray(ing.substitutes)) {
          ing.substitutes.forEach(sub => {
            if (sub.name && (sub.name.en === 'General Alt' || sub.name.ko === 'General Alt')) {
              // ID를 기반으로 이름 생성 (예: sea-salt -> Sea Salt / 천일염)
              const id = sub.id || 'substitution';
              const readableEn = id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
              
              sub.name = {
                en: readableEn,
                ko: readableEn // 임시로 영어명으로 덮어씀 (UI에서 필터링됨)
              };
              changed = true;
            }
          });
        }
      });
    }

    if (changed) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`🧹 [Cleaned General Alt] ${file}`);
    }
  });
}

removeGeneralAlt();
console.log("🏆 모든 데이터에서 'General Alt' 제거 완료!");
