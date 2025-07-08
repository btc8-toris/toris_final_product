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
    console.log('💀 ~ myInfoGet ~ my_id:', my_id);

    const data = await userModel.getMyInfo(my_id);
    console.log('💀 ~ myInfoGet ~ data:', data);

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

  // async answer1Write(req, res) {
  //   const user_id = req.params.id;
  //   const answer1 = req.body.answer1;
  //   await userModel.writeAnswer1(user_id, answer1);
  //   res.status(200).end();
  // },
  // async answer2Write(req, res) {
  //   user_id = req.params.id;
  //   answer = req.body;
  //   await userModel.writeAnswer2(user_id, answer);
  //   res.status(200).end();
  // },
  // async answer3Write(req, res) {
  //   user_id = req.params.id;
  //   answer = req.body;
  //   await userModel.writeAnswer3(user_id, answer);
  //   res.status(200).end();
  // },
  // async answer4Write(req, res) {
  //   user_id = req.params.id;
  //   answer = req.body;
  //   await userModel.writeAnswer4(user_id, answer);
  //   res.status(200).end();
  // },
  // async answer5Write(req, res) {
  //   user_id = req.params.id;
  //   answer = req.body;
  //   await userModel.writeAnswer5(user_id, answer);
  //   res.status(200).end();
  // },
};
