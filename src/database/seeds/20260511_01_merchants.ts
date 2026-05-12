import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('order_items').del();
    await knex('customer_product_favorites').del();
    await knex('products').del();
    await knex('merchants').del();

    await knex('merchants').insert([
        {
            id: 1,
            trade_name: 'Loja Aurora',
            document: '12345678000190',
            email: 'aurora@merchant.test',
            password: 'hashed_password_1',
            updated_at: knex.fn.now(),
        },
        {
            id: 2,
            trade_name: 'Mercado Norte',
            document: '98765432000110',
            email: 'norte@merchant.test',
            password: 'hashed_password_2',
            updated_at: knex.fn.now(),
        },
        {
            id: 3,
            trade_name: 'Casa Verde',
            document: '11223344000155',
            email: 'verde@merchant.test',
            password: 'hashed_password_3',
            updated_at: knex.fn.now(),
        },
    ]);
}
