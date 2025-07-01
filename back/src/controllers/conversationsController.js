const conversationsModel = require('../models/Conversations');

module.exports = {
  async resentPair(req, res) {
    const userId = req.params.user_id;
    const data = await conversationsModel.getRecentPair(userId);
    if (data.length > 1) {
      data.sort((first, second) => second.created_at - first.created_at);
      if (data.length > 6) {
        data.splice(6, data.length - 6);
      }
    } else if (data.length === 0) {
      return res.status(404).json({ message: '最近会話した人はいません' });
    }
    return res.status(200).json(data);
  },

  async feedback(req, res) {
    const userId = req.params.user_id;
    const data = await conversationsModel.waitFeedback(userId);
    if (data.length === 0) {
      return res.status(404).json({ message: 'フィードバック待ちはありません' });
    } else if (data.length > 1) {
      data.sort((first, second) => second.created_at - first.created_at);
    }

    if (data.length > 6) {
      data.splice(6, data.length - 6);
    }
    return res.status(200).json(data);
  },
};
