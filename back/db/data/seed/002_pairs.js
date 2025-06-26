/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('pairs').del();
  await knex('pairs').insert([{ user_id: 1, partner_id: 2 }]);
};
