import { Router } from "express";

const { Configuration, OpenAIApi } = require("openai");
const router = Router();

// chat user
router.post("/", async (req, res) => {
  const message = req.body.message.value;
  console.log("This is request body", message);

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
    });
    // console.log(completion.data.choices[0].message);
    const botReply = completion.data.choices[0].message;
    res.send({ reply: botReply });
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

export default router;
