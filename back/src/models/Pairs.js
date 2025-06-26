const db = require('../../db/index');

const PAIRS_TABLE = 'pairs';
const USERS_TABLE = 'users';

module.exports = {
  PAIRS_TABLE,

  async savePairs(insertData) {
    return db(PAIRS_TABLE).insert(insertData);
  },

  //会話ペアの情報を入手
  async pairInfo(my_Id) {
    return db(USERS_TABLE)
      .innerJoin(PAIRS_TABLE, function () {
        this.on('pairs.partner_id', '=', 'users.id');
      })
      .where('pairs.user_id', my_Id);
  },
};
