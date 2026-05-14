import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('order_items').del();

    await knex('order_items').insert([
        {
            id: 1,
            order_id: 1,
            product_id: 1,
            quantity: 2,
            unit_price: '19.90',
            updated_at: knex.fn.now(),
        },
        {
            id: 2,
            order_id: 2,
            product_id: 2,
            quantity: 1,
            unit_price: '349.00',
            updated_at: knex.fn.now(),
        },
        {
            id: 3,
            order_id: 3,
            product_id: 3,
            quantity: 2,
            unit_price: '159.50',
            updated_at: knex.fn.now(),
        },
    ]);
}
