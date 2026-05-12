import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('order_items').del();
    await knex('orders').del();
    await knex('customer_product_favorites').del();
    await knex('customers').del();

    await knex('customers').insert([
        {
            id: 1,
            name: 'Ana Lima',
            email: 'ana.lima@customer.test',
            password: 'hashed_password_1',
            updated_at: knex.fn.now(),
        },
        {
            id: 2,
            name: 'Bruno Costa',
            email: 'bruno.costa@customer.test',
            password: 'hashed_password_2',
            updated_at: knex.fn.now(),
        },
        {
            id: 3,
            name: 'Carla Souza',
            email: 'carla.souza@customer.test',
            password: 'hashed_password_3',
            updated_at: knex.fn.now(),
        },
    ]);
}
