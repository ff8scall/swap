const OpenAI = require('openai');

async function testApi() {
  const openai = new OpenAI({
    apiKey: process.env.NVIDIA_API_KEY,
    baseURL: 'https://integrate.api.nvidia.com/v1',
  });

  try {
    const response = await openai.chat.completions.create({
      model: "meta/llama3-8b-instruct", // a safe common model
      messages: [{ role: "user", content: "Hello!" }]
    });

    console.log("Chat Success!", response.choices[0].message.content);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

testApi();
