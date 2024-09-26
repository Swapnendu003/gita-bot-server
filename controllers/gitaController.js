const fetch = require('node-fetch');

// Fetch API key from environment variables
const API_KEY = process.env.FIREWORKS_API_KEY;

// This is the model ID for Fireworks AI
const MODEL_ID = "accounts/fireworks/models/llama-v3p1-405b-instruct";

// Function to filter out non-motivational queries
function isMotivationalQuery(userInput) {
    const motivationalKeywords = ["motivate", "inspire", "gita", "quote", "spiritual", "uplift"];
    
    // Check if any of the motivational keywords are present in the user's input
    return motivationalKeywords.some(keyword => userInput.toLowerCase().includes(keyword));
}

// Main function to generate response using Fireworks AI
async function generateResponse(userInput) {
    if (!isMotivationalQuery(userInput)) {
        return "Sorry, I can only provide motivational and spiritual guidance.";
    }

    const prompt = `Provide a motivational quote from the Bhagavad Gita for this situation: "${userInput}"`;

    try {
        // Call the Fireworks AI API
        const response = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: MODEL_ID,
                max_tokens: 2048,
                top_p: 1,
                top_k: 40,
                presence_penalty: 0,
                frequency_penalty: 0,
                temperature: 0.7,
                messages: [
                    { role: "system", content: "You are a spiritual guide." },
                    { role: "user", content: prompt }
                ]
            })
        });

        const data = await response.json();

        // Return the response text from the AI model
        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content;
        } else {
            throw new Error('No valid response from Fireworks AI');
        }
    } catch (error) {
        console.error("Error fetching AI response:", error);
        throw new Error('Failed to generate response from Fireworks AI');
    }
}

module.exports = {
    generateResponse
};
