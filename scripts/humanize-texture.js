const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../src/lib/data/ingredients');

function humanizeTexture() {
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json') && !f.includes('schema'));

  files.forEach(file => {
    const filePath = path.join(DATA_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let changed = false;

    if (data.ingredients && Array.isArray(data.ingredients)) {
      data.ingredients.forEach(ing => {
        const cat = data.meta.category_en;
        
        // 1. 점도(Viscosity) 숫자 -> 키워드 변환
        if (typeof ing.properties.viscosity === 'number') {
          const v = ing.properties.viscosity;
          if (v <= 10) ing.properties.viscosity = "watery";
          else if (v <= 30) ing.properties.viscosity = "thin";
          else if (v <= 60) ing.properties.viscosity = "medium";
          else if (v <= 85) ing.properties.viscosity = "thick";
          else ing.properties.viscosity = "very-thick";
          changed = true;
        }

        // 2. 상태(State) 및 식감(Mouthfeel) 보정
        if (!ing.texture_profile) {
          ing.texture_profile = {};
        }

        if (!ing.texture_profile.state) {
          if (cat === "Dairy & Fats" || cat === "Sauces & Condiments" || cat === "Pickles & Ferments") {
             ing.texture_profile.state = ing.id.includes('butter') || ing.id.includes('cheese') ? "solid" : "liquid";
          } else if (cat === "Herbs & Spices") {
             ing.texture_profile.state = "solid";
          } else {
             ing.texture_profile.state = "solid";
          }
          changed = true;
        }

        if (!ing.texture_profile.mouthfeel) {
          if (cat === "Dairy & Fats") ing.texture_profile.mouthfeel = "creamy";
          else if (cat === "Herbs & Spices") ing.texture_profile.mouthfeel = "leafy";
          else if (cat === "Sauces & Condiments") ing.texture_profile.mouthfeel = "smooth";
          else ing.texture_profile.mouthfeel = "standard";
          changed = true;
        }
      });
    }

    if (changed) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`🧼 [Humanized] ${file}`);
    }
  });
}

humanizeTexture();
console.log("🏆 물리적 질감 데이터 한글화 및 휴머나이징 완료!");
