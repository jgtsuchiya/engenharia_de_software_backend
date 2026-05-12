import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('customer_product_favorites').del();

    await knex('customer_product_favorites').insert([
        {
            customer_id: 1,
            product_id: 1,
            updated_at: knex.fn.now(),
        },
        {
            customer_id: 2,
            product_id: 2,
            updated_at: knex.fn.now(),
        },
        {
            customer_id: 3,
            product_id: 3,
            updated_at: knex.fn.now(),
        },
    ]);
}
