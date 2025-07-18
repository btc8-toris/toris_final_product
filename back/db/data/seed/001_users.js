/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    {
      nickname: 'ゆうたろう',
      org_code: '99999',
      salt: '111',
      hash: 'aaa',
      answer1: '自分の成長を実感できたとき',
      answer2: '部下の挑戦を応援してくれる人',
      answer3: '自分の中で納得できること',
      answer4: 'どちらも全力。仕事が充実すればプライベートも充実する',
      answer5: '助け合いやチームワークが強い',
      character: '',
      search_id: 1001,
    },
    {
      nickname: 'Ruka',
      org_code: '99999',
      salt: '112',
      hash: 'aab',
      answer1: 'お客様や同僚から感謝されたとき',
      answer2: '部下の挑戦を応援してくれる人',
      answer3: '周囲から評価されること',
      answer4: '完全に切り分けたい',
      answer5: '助け合いやチームワークが強い',
      character: '',
      search_id: 1002,
    },
    {
      nickname: 'さる',
      org_code: '99999',
      salt: '113',
      hash: 'aac',
      answer1: '自分の成長を実感できたとき',
      answer2: '部下の挑戦を応援してくれる人',
      answer3: 'チームや会社の目標を達成すること',
      answer4: '完全に切り分けたい',
      answer5: '助け合いやチームワークが強い',
      character: '',
      search_id: 1003,
    },
    {
      nickname: 'つるちゃん',
      org_code: '99999',
      salt: '114',
      hash: 'aad',
      answer1: '自分の成長を実感できたとき',
      answer2: '余計なことは言わず任せてくれる人',
      answer3: 'クライアントの課題を解決すること',
      answer4: 'どちらも全力。仕事が充実すればプライベートも充実する',
      answer5: '助け合いやチームワークが強い',
      character: '',
      search_id: 1004,
    },
    {
      nickname: 'ポンタ',
      org_code: '99999',
      salt: '115',
      hash: 'aae',
      answer1: '難しい課題を乗り越えたとき',
      answer2: '一緒に現場で動いてくれる人',
      answer3: '成長し続けられること',
      answer4: '融合している（趣味＝仕事など）',
      answer5: '助け合いやチームワークが強い',
      character: '',
      search_id: 1005,
    },
    {
      nickname: 'ウエンツ',
      org_code: '99999',
      salt: '116',
      hash: 'aaf',
      answer1: '自分の成長を実感できたとき',
      answer2: '部下の挑戦を応援してくれる人',
      answer3: 'チームや会社の目標を達成すること',
      answer4: 'どちらも全力。仕事が充実すればプライベートも充実する',
      answer5: '助け合いやチームワークが強い',
      character: '',
      search_id: 1006,
    },
  ]);
};
