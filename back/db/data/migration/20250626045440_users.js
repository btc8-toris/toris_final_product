exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('nickname').notNullable();
    table.string('org_code').notNullable();
    table.string('salt').notNullable();
    table.string('hash').notNullable();
    table.string('answer1');
    table.string('answer2');
    table.string('answer3');
    table.string('answer4');
    table.string('answer5');
    table.string('character');
    table.integer('search_id').unique();
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now()).notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('users');
};
