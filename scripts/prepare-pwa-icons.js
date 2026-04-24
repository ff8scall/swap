const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const MASTER_ICON = 'C:\\Users\\ff8sc\\.gemini\\antigravity\\brain\\5e371fe4-4ef9-4e27-98ee-f147f548c574\\pwa_icon_master_1777037585214.png';
const ICONS_DIR = path.join(__dirname, '../public/icons');

async function prepareIcons() {
  if (!fs.existsSync(ICONS_DIR)) {
    fs.mkdirSync(ICONS_DIR, { recursive: true });
  }

  console.log("🎨 Generating PWA icons from master...");

  // 192x192
  await sharp(MASTER_ICON)
    .resize(192, 192)
    .png()
    .toFile(path.join(ICONS_DIR, 'icon-192x192.png'));
  
  // 512x512
  await sharp(MASTER_ICON)
    .resize(512, 512)
    .png()
    .toFile(path.join(ICONS_DIR, 'icon-512x512.png'));

  // Apple Touch Icon (180x180)
  await sharp(MASTER_ICON)
    .resize(180, 180)
    .png()
    .toFile(path.join(ICONS_DIR, 'apple-touch-icon.png'));

  // Favicon (32x32)
  await sharp(MASTER_ICON)
    .resize(32, 32)
    .png()
    .toFile(path.join(ICONS_DIR, 'favicon-32x32.png'));

  console.log("✅ PWA icons generated successfully!");
}

prepareIcons().catch(err => {
  console.error("❌ Error generating icons:", err);
});
