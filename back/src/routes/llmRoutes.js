const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const client = new OpenAI({
  baseURL: 'https://5579-115-39-95-89.ngrok-free.app/v1',
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
  console.log(returnObj);
  return res.status(201).json({ data: returnObj });
});

module.exports = router;
