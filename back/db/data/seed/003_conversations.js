/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('conversations').del();
  await knex('conversations').insert([
    {
      pair_id: 1,
      transcript_url: 'uv2ucgjveqc1iv0juo2b',
      conversation_time: '21.93',
      read_flag: false,
    },
  ]);
};
