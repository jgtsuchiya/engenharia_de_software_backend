import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('order_items', (table) => {
        table.bigIncrements('id').primary();

        table
            .bigInteger('order_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('orders');

        table
            .bigInteger('product_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('products');

        table.integer('quantity').notNullable();

        table.decimal('unit_price', 12, 2).notNullable();

        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('order_items');
}
