/**
 * Bing IndexNow URL Submission Script
 * Usage: Run this script after build or when data is updated.
 */

const HOST = 'swap.sia.com';
const KEY = process.env.INDEXNOW_KEY || '7f8e9a0b1c2d3e4f5a6b7c8d9e0f1a2b';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

export async function submitToIndexNow(urlList) {
  if (!urlList || urlList.length === 0) return;

  const data = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urlList
  };

  try {
    const response = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      console.log(`✅ Successfully submitted ${urlList.length} URLs to IndexNow.`);
    } else {
      const errorText = await response.text();
      console.error(`❌ IndexNow submission failed: ${response.status}`, errorText);
    }
  } catch (error) {
    console.error('❌ Error submitting to IndexNow:', error);
  }
}
