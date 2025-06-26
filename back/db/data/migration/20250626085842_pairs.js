exports.up = async (knex) => {
  await knex.schema.createTable('pairs', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable();
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
    table.integer('partner_id').notNullable();
    table.foreign('partner_id').references('users.id').onDelete('CASCADE');
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now()).notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('pairs');
};
