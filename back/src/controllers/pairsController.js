const pairsModel = require('../models/Pairs');

module.exports = {
  async addPairs(req, res) {
    try {
      const { user_id, partner_id } = req.body;

      await pairsModel.savePairs({
        user_id,
        partner_id,
      });
      return res.status(201).json({
        message: 'ペアの追加に成功しました',
      });
    } catch (error) {
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  async getPairsInfo(req, res) {
    user_id = req.params.user_id;
    const data = await pairsModel.pairInfo(user_id);
    res.status(200).json(data);
  },
};
