import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('orders', (table) => {
        table.bigIncrements('id').primary();

        table
            .bigInteger('customer_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('customers');

        table.enu('status', ['Pending', 'Paid', 'Shipped']).notNullable().defaultTo('Pending');

        table.decimal('total_amount', 12, 2).notNullable();

        table.timestamp('ordered_at').notNullable().defaultTo(knex.fn.now());

        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('orders');
}
