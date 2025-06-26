const userModel = require('../models/Users');

module.exports = {
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
};
