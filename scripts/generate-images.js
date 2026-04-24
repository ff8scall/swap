const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const API_KEY = process.env.NVIDIA_API_KEY;
const API_URL = "https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.1-schnell";
const OUTPUT_DIR = path.join(__dirname, '../public/images/ingredients');
const DATA_DIR = path.join(__dirname, '../src/lib/data/ingredients');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateIngredientImage(ingredient) {
  const imagePath = path.join(OUTPUT_DIR, `${ingredient.id}.png`);
  
  if (fs.existsSync(imagePath)) {
    console.log(`⏩ [Skip] ${ingredient.id} 이미 존재`);
    return true;
  }

  const prompt = `${ingredient.name.en}, professional cinematic food photography, studio shot, macro detail, dramatic lighting, sharp focus, dark slate background, premium culinary aesthetic, 4k resolution`;

  const payload = {
    text_prompts: [{ text: prompt, weight: 1 }],
    seed: 42,
    steps: 4
  };

  try {
    console.log(`🎨 [Generating] ${ingredient.id} (${ingredient.name.ko})...`);
    
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (response.status === 200) {
      const data = await response.json();
      if (data.artifacts && data.artifacts[0].base64) {
        fs.writeFileSync(imagePath, Buffer.from(data.artifacts[0].base64, 'base64'));
        console.log(`✅ [Success] ${ingredient.id}.png 저장 완료!`);
        return true;
      }
    } else if (response.status === 429) {
      console.log("⏳ Rate limit 도달. 20초 대기...");
      return 'RETRY_LATER';
    } else {
      const errorText = await response.text();
      console.error(`❌ [Error] ${ingredient.id} 실패 (Status: ${response.status}):`, errorText);
      return false;
    }
  } catch (error) {
    console.error(`❌ [Error] ${ingredient.id} 시스템 오류:`, error.message);
    return false;
  }
}

async function main() {
  console.log("🚀 고품질 이미지 생성 파이프라인 (V3 - Standard API) 시작");
  
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json') && !f.includes('schema'));
  let allIngredients = [];
  
  files.forEach(file => {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
      if (data.ingredients) allIngredients = allIngredients.concat(data.ingredients);
    } catch (e) {}
  });

  console.log(`📊 대상: ${allIngredients.length}종`);

  let index = 0;
  while (index < allIngredients.length) {
    const ingredient = allIngredients[index];
    const result = await generateIngredientImage(ingredient);

    if (result === 'RETRY_LATER') {
      await new Promise(r => setTimeout(r, 20000));
      continue;
    } else if (result === false) {
      console.log("⚠️ 10초 대기 후 건너뜁니다.");
      await new Promise(r => setTimeout(r, 10000));
    } else {
      await new Promise(r => setTimeout(r, 3500)); // Rate limit 안전 장치
    }
    index++;
  }
  console.log("🏁 작업 완료!");
}

main();
