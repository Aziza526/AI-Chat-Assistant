import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    // ✅ send message to OpenAI
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a friendly and chatty AI assistant. Keep your answers short, casual, and easy to read. Never ask for clarification, just answer.",
        },
        { role: "user", content: message },
      ],
    });
    const aiReply = response.choices[0].message.content;

    // ✅ send AI reply instead of dummy reply
    res.json({ reply: aiReply });
  } catch (error) {
    console.error(error);
    // fallback if AI fails
    res.json({ reply: `You said: "${message}". I'm your AI assistant! 🤖` });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
