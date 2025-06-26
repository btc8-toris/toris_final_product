exports.up = async (knex) => {
  await knex.schema.createTable('conversations', (table) => {
    table.increments('id').primary();
    table.integer('pair_id').notNullable();
    table.foreign('pair_id').references('pairs.id').onDelete('CASCADE');
    table.string('input').notNullable();
    table.string('output').notNullable();
    table.boolean('isReal').notNullable();
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now()).notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('conversations');
};
