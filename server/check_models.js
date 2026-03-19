// server/check_models.js
require('dotenv').config();
const axios = require('axios');

async function getAvailableModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("❌ No API Key found in .env");
    return;
  }

  try {
    console.log("🔍 Checking available models...");
    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );

    const models = response.data.models;
    console.log("\n✅ AVAILABLE MODELS:");
    models.forEach(model => {
      if (model.supportedGenerationMethods.includes("generateContent")) {
        console.log(`• ${model.name.replace('models/', '')}`);
      }
    });

  } catch (error) {
    console.error("❌ Error fetching models:", error.response ? error.response.data : error.message);
  }
}

getAvailableModels();