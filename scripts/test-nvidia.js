const fs = require('fs');

async function testApi() {
  const apiKey = process.env.NVIDIA_API_KEY;
  const payload = {
    text_prompts: [{ text: "A professional studio shot of fresh basil leaves on a dark slate background, cinematic lighting, food photography, 4k", weight: 1 }],
    seed: 0,
    steps: 30
  };

  try {
    const res = await fetch("https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux1-schnell", {
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
      console.log('Success!');
    } else {
      console.log('Error Data:', text);
    }
  } catch (err) {
    console.error(err);
  }
}

testApi();
