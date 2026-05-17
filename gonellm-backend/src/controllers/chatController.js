import axios from "axios";
import User from "../models/User.js";
import inMemoryUsers from "../utils/inMemoryStore.js";

export const chatWithLLaMA = async (req, res) => {
  try {
    const { message } = req.body;
    const userEmail = req.user.email;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Get user and check tokens
    let user = null;
    let usingInMemory = false;
    try {
      user = await User.findOne({ email: userEmail });
    } catch (dbError) {
      user = inMemoryUsers.get(userEmail);
      usingInMemory = true;
    }

    if (!user) {
      if (usingInMemory) {
        // Auto-create for Vercel stateless demo
        user = { email: userEmail, tokens: 3000, premium: false };
        inMemoryUsers.set(userEmail, user);
      } else {
        return res.status(400).json({ error: "User not found" });
      }
    }

    // Check if user has tokens
    if (user.tokens <= 0) {
      return res.status(403).json({ 
        error: "Insufficient tokens",
        message: "You have 0 tokens. Purchase more tokens to continue chatting.",
        tokens: 0
      });
    }

    // Calculate token cost (simple estimation: 1 token per character, max 100 tokens per message)
    const tokenCost = Math.min(message.length, 100);

    // Call LLaMA API (using OpenAI-compatible format) with retry logic
    let response;
    let retries = 3;
    const models = [
      process.env.LLAMA_MODEL || "llama-3.1-70b-versatile",
      "llama-3.1-8b-instant",
      "mixtral-8x7b-32768"
    ];

    for (let i = 0; i < retries; i++) {
      try {
        response = await axios.post(
          process.env.LLAMA_API_URL || "https://api.llama-api.com/chat/completions",
          {
            model: models[i % models.length],
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
        break; // Success, exit retry loop
      } catch (apiError) {
        console.error(`API attempt ${i + 1} failed:`, apiError.response?.data || apiError.message);
        if (i === retries - 1) {
          throw apiError; // All retries failed
        }
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }

    const aiResponse = response.data.choices[0].message.content;

    // Deduct tokens
    try {
      await User.updateOne(
        { email: userEmail },
        { $inc: { tokens: -tokenCost } }
      );
    } catch (dbError) {
      const memUser = inMemoryUsers.get(userEmail);
      if (memUser) {
        memUser.tokens = Math.max(0, memUser.tokens - tokenCost);
        inMemoryUsers.set(userEmail, memUser);
      }
    }

    // Get updated token count
    let updatedUser = null;
    try {
      updatedUser = await User.findOne({ email: userEmail });
    } catch (dbError) {
      updatedUser = inMemoryUsers.get(userEmail);
    }

    res.json({ 
      response: aiResponse,
      tokens: updatedUser?.tokens || 0
    });
  } catch (err) {
    console.error("LLaMA API error:", err.response?.data || err.message);
    
    // Return fallback response as 200 OK so frontend Chat UI doesn't crash
    res.json({ 
      response: "I'm sorry, I'm having trouble connecting to my AI backend right now. Please try again later. (Error: " + err.message + ")",
      tokens: user?.tokens || 0
    });
  }
};
