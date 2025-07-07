const express = require('express');
const router = express.Router();
const {
  resentPair,
  feedback,
  logs,
  addConversations,
  readFlag,
} = require('../controllers/conversationsController');

// パスパラ？はuser_id 最近会話をした人を取得
router.get('/recentpair/:user_id', resentPair);
// パスパラ？はuser_id フィードバック待ち
router.get('/feedback/:user_id', feedback);
// パスパラ？はpairs_id 過去のログ
router.get('/log/:pair_id', logs);
// 会話の文字起こし結果を保存
router.post('/transcripts', addConversations);
// 未読を既読に変更
router.put('/read/:id', readFlag);

module.exports = router;
