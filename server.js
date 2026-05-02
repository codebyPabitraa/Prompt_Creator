require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests. Please wait 15 minutes and try again."
  }
});

app.use("/generate", limiter);

const SYSTEM_PROMPT = `You are an expert prompt engineer. Convert the user's raw idea into a clear, detailed, ready-to-use AI prompt. Output ONLY the final prompt. No explanation, no preamble, no markdown fences.`;

app.post("/generate", async (req, res) => {
  const { idea, category } = req.body;

  console.log("Received request:", { idea, category });

  if (!idea) return res.status(400).json({ error: "No idea provided" });

  try {
    console.log("Calling Groq API...");
    console.log("API Key loaded:", process.env.GROQ_API_KEY ? "Yes ✓" : "No ✗");

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 1000,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Category: ${category || "General"}\nIdea: ${idea}` }
        ]
      })
    });

    const data = await response.json();
    console.log("API Response:", JSON.stringify(data, null, 2));

    const result = data.choices?.[0]?.message?.content || "Error generating.";
    res.json({ result });

  } catch (err) {
    console.error("Full error:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));