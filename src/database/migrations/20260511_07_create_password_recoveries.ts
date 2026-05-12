import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('password_recoveries', (table) => {
        table.bigIncrements('id').primary();

        table.string('code', 255).notNullable();

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('password_recoveries');
}
