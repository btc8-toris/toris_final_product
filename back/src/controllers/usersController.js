const userModel = require('../models/Users');

module.exports = {
  async sixPersonsGet(req, res) {
    const data = await userModel.get6persons();
    res.status(200).json(data);
  },

  async userGet(req, res) {
    search_id = req.params.id;
    const data = await userModel.selectUser(search_id);
    res.status(200).json(data);
  },

  async myInfoGet(req, res) {
    my_id = req.params.id;
    const data = await userModel.getMyInfo(my_id);
    res.status(200).json(data);
  },

  async sameOrgUserGet(req, res) {
    org_code = req.params.org_code;
    const data = await userModel.selectSameOrgUser(org_code);
    //🚀現時点ではid=1の人を除外
    const returnData = data.filter((obj) => obj.id !== 1);
    res.status(200).json(returnData);
  },

  async answerWriteAll(req, res) {
    const user_id = req.params.id;
    let answerObj = req.body.answer;
    const searchId = Number(user_id) + 1000;
    answerObj.search_id = String(searchId);
    const data = await userModel.writeAnswerAll(user_id, answerObj);
    res.status(200).json(data);
  },
};
