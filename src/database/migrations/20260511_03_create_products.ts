import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('products', (table) => {
        table.bigIncrements('id').primary();

        table
            .bigInteger('merchant_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('merchants');

        table.string('name', 255).notNullable();

        table.text('description').notNullable();

        table.decimal('current_price', 12, 2).notNullable();

        table.integer('stock_quantity').notNullable();

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());

        table.timestamp('deleted_at').nullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('products');
}
