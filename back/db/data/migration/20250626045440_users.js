exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('user_name').notNullable();
    table.string('org_code').notNullable();
    table.string('salt').notNullable();
    table.string('hash').notNullable();
    table.string('email').notNullable().unique();
    table.string('character');
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now()).notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('users');
};
