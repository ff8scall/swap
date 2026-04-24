const fs = require('fs');
const path = require('path');

const HOST = 'swap.lego-sia.com';
const KEY = '8041ea3b12eb4065bbde01ce972ce120';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const DATA_DIR = path.join(__dirname, '../src/lib/data/ingredients');

async function submitSingleToIndexNow(url) {
  const endpoint = `https://www.bing.com/indexnow?url=${encodeURIComponent(url)}&key=${KEY}&keyLocation=${encodeURIComponent(KEY_LOCATION)}`;

  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      console.log(`✅ [Stream] Submitted: ${url}`);
      return true;
    } else {
      console.error(`❌ [Stream] Failed: ${url} (${response.status})`);
      return false;
    }
  } catch (error) {
    console.error(`❌ [Stream] Error: ${url}`, error);
    return false;
  }
}

async function triggerIndexNow() {
  console.log("🚀 Starting IndexNow Streaming Submission...");
  
  const baseUrl = `https://${HOST}`;
  const urls = [
    baseUrl,
    `${baseUrl}/explore`,
    `${baseUrl}/docs`
  ];

  // Load all ingredient IDs
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json') && !f.includes('schema'));
  files.forEach(file => {
    const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
    if (data.ingredients) {
      data.ingredients.forEach(ing => {
        urls.push(`${baseUrl}/explore/${ing.id}`);
      });
    }
  });

  console.log(`📡 Total URLs to submit: ${urls.length}`);

  for (const url of urls) {
    await submitSingleToIndexNow(url);
    // Optional: Add a small delay if needed to prevent rate limiting
    await new Promise(resolve => setTimeout(resolve, 200)); 
  }

  console.log("🏆 IndexNow Streaming Submission Complete!");
}

triggerIndexNow();
