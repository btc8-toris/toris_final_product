const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const client = new OpenAI({
  baseURL: 'https://b6d2-2001-268-9a49-c438-708f-ccb1-311b-ed21.ngrok-free.app/v1',
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
