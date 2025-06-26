/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('conversations').del();
  await knex('conversations').insert([
    { pair_id: 1, input: 'inputだよ', output: 'outputだよ', isReal: false },
    { pair_id: 1, input: 'inputだよ', output: 'outputだよ', isReal: true },
  ]);
};
