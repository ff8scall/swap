const OpenAI = require('openai');
const fs = require('fs');

async function testApi() {
  const openai = new OpenAI({
    apiKey: process.env.NVIDIA_API_KEY,
    baseURL: 'https://integrate.api.nvidia.com/v1',
  });

  try {
    const response = await openai.images.generate({
      model: "black-forest-labs/flux1-schnell", // or stabilityai/stable-diffusion-xl
      prompt: "A beautiful cinematic shot of a fresh tomato",
      response_format: "b64_json"
    });

    console.log("Success! Got image.");
    fs.writeFileSync('test_tomato.png', Buffer.from(response.data[0].b64_json, 'base64'));
  } catch (err) {
    console.error("Error:", err);
  }
}

testApi();
