import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('customers', (table) => {
        table.bigIncrements('id').primary();

        table.string('name', 255).notNullable();

        table.string('email', 255).notNullable().unique();
        
        table.string('password', 255).notNullable();

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        
        table.timestamp('deleted_at').nullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('customers');
}
