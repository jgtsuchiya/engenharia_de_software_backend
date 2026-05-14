import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('order_items').del();
    await knex('orders').del();

    await knex('orders').insert([
        {
            id: 1,
            customer_id: 1,
            status: 'Pending',
            total_amount: '39.80',
            updated_at: knex.fn.now(),
        },
        {
            id: 2,
            customer_id: 2,
            status: 'Paid',
            total_amount: '349.00',
            updated_at: knex.fn.now(),
        },
        {
            id: 3,
            customer_id: 3,
            status: 'Shipped',
            total_amount: '319.00',
            updated_at: knex.fn.now(),
        },
    ]);
}
