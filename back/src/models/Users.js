const db = require('../../db/index');

const USERS_TABLE = 'users';

module.exports = {
  USERS_TABLE,

  //デモ用の6人の情報を取得する
  async get6persons() {
    return await db(USERS_TABLE).where('org_code', '99999');
  },

  //一人のユーザー情報を取得(🚀一旦は全情報を取得。必要に応じてここで加工) ※検索用IDで取得
  async selectUser(search_id) {
    return await db(USERS_TABLE).where('search_id', search_id);
  },

  //自分と同じ部署のユーザー情報を取得(🚀一旦は全情報を取得。必要に応じてここで加工)
  async selectSameOrgUser(org_code) {
    return await db(USERS_TABLE).where('org_code', org_code);
  },

  //自分のユーザー情報を取得
  async getMyInfo(my_id) {
    return await db(USERS_TABLE).where('id', my_id);
  },

  //質問に対する回答を登録
  async writeAnswerAll(user_id, answerObj) {
    await db(USERS_TABLE).where('id', user_id).update(answerObj);
    return await db(USERS_TABLE)
      .where('id', user_id)
      .select(
        'id as userId',
        'nickname as nickName',
        'answer1',
        'answer2',
        'answer3',
        'answer4',
        'answer5',
        'search_id as searchId'
      )
      .first();
  },
};
