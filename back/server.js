const express = require('express');
const cookieParser = require('cookie-parser');
const llmRouter = require('./src/routes/llmRoutes');
const userRouter = require('./src/routes/userRoutes');
const pairsRouter = require('./src/routes/pairsRoutes');
const voicesRouter = require('./src/routes/voicesRoutes');
const authRouter = require('./src/routes/AuthRoutes');
const conversationsRouter = require('./src/routes/conversationsRoutes');

const app = express();

function setUpServer() {
  app.use(express.json());
  app.use(cookieParser());
  app.use('/api/llm', llmRouter);
  app.get('/', (req, res) => {
    return res.status(200).send('hello,express');
  });
  //ログイン・認証関連のエンドポイン
  app.use('/api/auth', authRouter);

  //users関連のエンドポイン
  app.use('/api/users', userRouter);

  //pairs関連のエンドポイント
  app.use('/api/pairs', pairsRouter);

  // 文字起こし関連のエンドポイント
  app.use('/api/voices', voicesRouter);

  // conversations関連のエンドポイント
  app.use('/api/conversations', conversationsRouter);

  return app;
}

module.exports = setUpServer;
