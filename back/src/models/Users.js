const db = require('../../db/index');

const USERS_TABLE = 'users';

module.exports = {
  USERS_TABLE,

  //一人のユーザー情報を取得(🚀一旦は全情報を取得。必要に応じてここで加工)
  async selectUser(user_id) {
    return db(USERS_TABLE).where('id', user_id);
  },

  //自分と同じ部署のユーザー情報を取得(🚀一旦は全情報を取得。必要に応じてここで加工)
  async selectSameOrgUser(org_code) {
    return db(USERS_TABLE).where('org_code', org_code);
  },
};
