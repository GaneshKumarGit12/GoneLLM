import axios from "axios";

export const chatWithLLaMA = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Call LLaMA API (using OpenAI-compatible format)
    const response = await axios.post(
      process.env.LLAMA_API_URL || "https://api.llama-api.com/chat/completions",
      {
        model: "llama-3.1-70b", // or your preferred LLaMA model
        messages: [
          {
            role: "system",
            content: "You are a helpful AI assistant powered by LLaMA. Provide accurate, helpful, and friendly responses.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.LLAMA_API_KEY}`,
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    res.json({ response: aiResponse });
  } catch (err) {
    console.error("LLaMA API error:", err.response?.data || err.message);
    
    // Fallback response if API fails
    res.status(500).json({ 
      error: "Failed to get response from LLaMA",
      details: err.message,
      fallback: "I'm sorry, I'm having trouble connecting to my AI backend right now. Please try again later."
    });
  }
};
