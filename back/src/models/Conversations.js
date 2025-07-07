const db = require('../../db/index');

const CONVERSATIONS_TABLE = 'conversations';

module.exports = {
  CONVERSATIONS_TABLE,

  //最近会話した人を取得
  async getRecentPair(userId) {
    return await db(CONVERSATIONS_TABLE)
      .innerJoin('pairs', `${CONVERSATIONS_TABLE}.pair_id`, 'pairs.id')
      .innerJoin('users', 'users.id', 'pairs.partner_id')
      .where('pairs.user_id', userId)
      .select(
        `${CONVERSATIONS_TABLE}.pair_id`,
        'users.nickname',
        `${CONVERSATIONS_TABLE}.created_at`
      );
  },

  //フィードバック待ちを取得
  async waitFeedback(userId) {
    return await db(CONVERSATIONS_TABLE)
      .innerJoin('pairs', `${CONVERSATIONS_TABLE}.pair_id`, 'pairs.id')
      .innerJoin('users', 'users.id', 'pairs.partner_id')
      .where('pairs.user_id', userId)
      .where(`${CONVERSATIONS_TABLE}.read_flag`, false)
      .select(
        `${CONVERSATIONS_TABLE}.pair_id`,
        'users.nickname',
        `${CONVERSATIONS_TABLE}.conversation_time`,
        `${CONVERSATIONS_TABLE}.transcript_url`,
        `${CONVERSATIONS_TABLE}.created_at`
      );
  },

  async getConversations(pairId) {
    return await db(CONVERSATIONS_TABLE)
      .where('pair_id', pairId)
      .select(
        `${CONVERSATIONS_TABLE}.id`,
        `${CONVERSATIONS_TABLE}.conversation_time`,
        `${CONVERSATIONS_TABLE}.transcript_url`,
        `${CONVERSATIONS_TABLE}.created_at`
      );
  },

  async saveConversation(data) {
    return await db(CONVERSATIONS_TABLE).insert(data);
  },

  async changeFlag(transcript_url) {
    return await db(CONVERSATIONS_TABLE).where('transcript_url', transcript_url).update('read_flag', true);
  },
};
