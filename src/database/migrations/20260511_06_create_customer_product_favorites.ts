import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('customer_product_favorites', (table) => {
        table
            .bigInteger('customer_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('customers');

        table
            .bigInteger('product_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('products');

        table.timestamp('favorited_at').notNullable().defaultTo(knex.fn.now());

        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());

        table.primary(['customer_id', 'product_id']);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('customer_product_favorites');
}
