const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
require('dotenv').config({ path: '.env.local' });

const API_KEY = process.env.NVIDIA_API_KEY || "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";
const API_URL = "https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.1-schnell";

async function fixCocoa() {
  const id = "cocoa-powder";
  const targetPath = path.join(__dirname, '../public/images/ingredients/cocoa-powder.png');

  console.log(`🍫 Re-generating image for ${id} (NVIDIA NIM - Name Bypass Strategy V2)...`);

  const prompt = "Gourmet dark chocolate powder in a luxury glass jar, professional cinematic food photography, studio shot, macro detail, rim lighting, sharp focus, dark slate background, premium culinary aesthetic, 4k resolution";

  const payload = {
    text_prompts: [{ text: prompt, weight: 1 }],
    seed: 888,
    steps: 4
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });

  if (response.status === 200) {
    const data = await response.json();
    if (data.artifacts && data.artifacts[0].base64) {
      const buffer = Buffer.from(data.artifacts[0].base64, 'base64');
      fs.writeFileSync(targetPath, buffer);
      const size = fs.statSync(targetPath).size;
      console.log(`✅ [NVIDIA Success] Image saved! (Size: ${size} bytes)`);
      
      const thumbPath = path.join(__dirname, '../public/images/thumbnails/cocoa-powder.webp');
      const width = 120;
      const circleShape = Buffer.from(`<svg><circle cx="60" cy="60" r="60" /></svg>`);

      await sharp(targetPath)
        .resize(width, width, { fit: 'cover' })
        .composite([{ input: circleShape, blend: 'dest-in' }]).webp({ quality: 85 }).toFile(thumbPath);
      
      console.log(`✅ [NVIDIA Success] Thumbnail saved!`);
    }
  } else {
    const err = await response.text();
    console.error(`❌ Failed: ${response.status}`, err);
  }
}

fixCocoa();
