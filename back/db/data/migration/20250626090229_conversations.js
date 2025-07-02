exports.up = async (knex) => {
  await knex.schema.createTable('conversations', (table) => {
    table.increments('id').primary();
    table.integer('pair_id').notNullable();
    table.foreign('pair_id').references('pairs.id').onDelete('CASCADE');
    table.string('transcript_url').notNullable();
    table.string('conversation_time').notNullable();
    table.boolean('read_flag').notNullable();
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now()).notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('conversations');
};
