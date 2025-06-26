const express = require('express');
const llmRouter = require('./routes/llm');

const app = express();

function setUpServer() {
  app.use(express.json());
  app.use('/llm', llmRouter);
  app.get('/', (req, res) => {
    return res.status(200).send('hello,express');
  });

  return app;
}

module.exports = setUpServer;
