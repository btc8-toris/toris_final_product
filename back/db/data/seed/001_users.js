/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    {
      user_name: 'つるちゃん',
      org_code: '99999',
      salt: '111',
      hash: 'aaa',
      email: 't@11',
      character: '陽気',
    },
    {
      user_name: 'N君',
      org_code: '99999',
      salt: '112',
      hash: 'bbb',
      email: 'n@11',
      character: '真面目',
    },
    {
      user_name: 'テスト君',
      org_code: '99999',
      salt: '111',
      hash: 'ccc',
      email: 'tt@11',
      character: '気難しい',
    },
  ]);
};
