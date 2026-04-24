const fs = require('fs');


async function testNvidia() {
  const apiKey = process.env.NVIDIA_API_KEY;
  const payload = {
    text_prompts: [
      { text: "A highly detailed, professional cinematic food photography studio shot of fresh Tahini. Dark slate background, dramatic lighting, sharp focus, 4k resolution, premium culinary aesthetic.", weight: 1 }
    ],
    seed: 42,
    steps: 4
  };

  try {
    const res = await fetch("https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.1-schnell", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const text = await res.text();
    console.log('Status:', res.status);
    if (res.status === 200) {
      const data = JSON.parse(text);
      if (data.artifacts && data.artifacts[0].base64) {
        fs.writeFileSync('public/images/ingredients/tahini.png', Buffer.from(data.artifacts[0].base64, 'base64'));
        console.log('Success! Saved to public/images/ingredients/tahini.png');
      }
    } else {
      console.log('Error Data:', text);
    }
  } catch (err) {
    console.error(err);
  }
}

testNvidia();
