const express = require('express');
const llmRouter = require('./src/routes/llmRoutes');
const userRouter = require('./src/routes/userRoutes');
const pairsRouter = require('./src/routes/pairsRoutes');

const app = express();

function setUpServer() {
  app.use(express.json());
  app.use('/api/llm', llmRouter);
  app.get('/', (req, res) => {
    return res.status(200).send('hello,express');
  });

  //users関連のエンドポイン
  app.use('/api/users', userRouter);

  //pairs関連のエンドポイント
  app.use('/api/pairs', pairsRouter);

  return app;
}

module.exports = setUpServer;
