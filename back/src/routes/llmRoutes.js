const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const client = new OpenAI({
  baseURL: ' https://cfb0-2001-268-9a4c-5d56-317b-25d0-cb83-2ea2.ngrok-free.app/v1',
  apiKey: 'lm-studio', // lm-studioにする
});

const model = 'google/gemma-3-4b'; // 使うモデル

router.get('/', async (req, res) => {
  return res.status(200).json({ data: 'hello,llmRouter' });
});

router.post('/questions', async (req, res) => {
  const { message } = req.body;
  const returnObj = await client.chat.completions.create({
    model,
    messages: [
      {
        role: 'user',
        content: message,
      },
    ],
  });
  return res.status(201).json({ data: returnObj });
});

module.exports = router;
