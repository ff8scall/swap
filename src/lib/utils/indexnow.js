/**
 * Bing IndexNow URL Submission Script
 * Usage: Run this script after build or when data is updated.
 */

const HOST = 'swap.lego-sia.com';
const KEY = '8041ea3b12eb4065bbde01ce972ce120';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

/**
 * Submits a list of URLs to IndexNow (Batch Mode)
 */
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
      console.log(`✅ [Batch] Successfully submitted ${urlList.length} URLs to IndexNow.`);
    } else {
      const errorText = await response.text();
      console.error(`❌ [Batch] IndexNow submission failed: ${response.status}`, errorText);
    }
  } catch (error) {
    console.error('❌ [Batch] Error submitting to IndexNow:', error);
  }
}

/**
 * Submits a single URL to IndexNow (Streaming Mode)
 */
export async function submitSingleToIndexNow(url) {
  const endpoint = `https://www.bing.com/indexnow?url=${encodeURIComponent(url)}&key=${KEY}&keyLocation=${encodeURIComponent(KEY_LOCATION)}`;

  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      console.log(`✅ [Stream] Successfully submitted: ${url}`);
    } else {
      console.error(`❌ [Stream] Failed: ${url} (${response.status})`);
    }
  } catch (error) {
    console.error(`❌ [Stream] Error: ${url}`, error);
  }
}

