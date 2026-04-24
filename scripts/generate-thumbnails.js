const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '../public/images/ingredients');
const TARGET_DIR = path.join(__dirname, '../public/images/thumbnails');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

async function generateThumbnails() {
  const files = fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith('.png'));
  console.log(`🚀 Processing ${files.length} images...`);

  // 원형 마스크 생성
  const width = 120;
  const r = width / 2;
  const circleShape = Buffer.from(
    `<svg><circle cx="${r}" cy="${r}" r="${r}" /></svg>`
  );

  for (const file of files) {
    const id = path.parse(file).name;
    const targetPath = path.join(TARGET_DIR, `${id}.webp`);

    try {
      await sharp(path.join(SOURCE_DIR, file))
        .resize(width, width, { fit: 'cover' })
        .composite([{
          input: circleShape,
          blend: 'dest-in'
        }])
        .webp({ quality: 85 })
        .toFile(targetPath);
      
      console.log(`✅ Generated: ${id}.webp`);
    } catch (err) {
      console.error(`❌ Failed: ${id}`, err);
    }
  }

  console.log('🏁 All thumbnails generated!');
}

generateThumbnails();
