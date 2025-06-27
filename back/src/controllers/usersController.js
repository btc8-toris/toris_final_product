const userModel = require('../models/Users');

module.exports = {
  async sixPersonsGet(req, res) {
    const data = await userModel.get6persons();
    res.status(200).json(data);
  },

  async userGet(req, res) {
    user_id = req.params.id;
    const data = await userModel.selectUser(user_id);
    res.status(200).json(data);
  },

  async sameOrgUserGet(req, res) {
    org_code = req.params.org_code;
    const data = await userModel.selectSameOrgUser(org_code);
    //🚀現時点ではid=1の人を除外
    const returnData = data.filter((obj) => obj.id !== 1);
    res.status(200).json(returnData);
  },

  async answer1Write(req, res) {
    user_id = req.params.id;
    answer = req.body;
    await userModel.writeAnswer1(user_id, answer);
    res.status(200).end();
  },
  async answer2Write(req, res) {
    user_id = req.params.id;
    answer = req.body;
    await userModel.writeAnswer2(user_id, answer);
    res.status(200).end();
  },
  async answer3Write(req, res) {
    user_id = req.params.id;
    answer = req.body;
    await userModel.writeAnswer3(user_id, answer);
    res.status(200).end();
  },
  async answer4Write(req, res) {
    user_id = req.params.id;
    answer = req.body;
    await userModel.writeAnswer4(user_id, answer);
    res.status(200).end();
  },
  async answer5Write(req, res) {
    user_id = req.params.id;
    answer = req.body;
    await userModel.writeAnswer5(user_id, answer);
    res.status(200).end();
  },
};
