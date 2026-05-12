import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('order_items').del();
    await knex('customer_product_favorites').del();
    await knex('products').del();

    await knex('products').insert([
        {
            id: 1,
            merchant_id: 1,
            name: 'Cafeteira Compacta',
            description: 'Cafeteira 15 xicaras com filtro reutilizavel.',
            current_price: '219.90',
            stock_quantity: 12,
            updated_at: knex.fn.now(),
        },
        {
            id: 2,
            merchant_id: 2,
            name: 'Teclado Mecanico',
            description: 'Teclado switch azul com retroiluminacao.',
            current_price: '349.00',
            stock_quantity: 8,
            updated_at: knex.fn.now(),
        },
        {
            id: 3,
            merchant_id: 3,
            name: 'Fone Bluetooth',
            description: 'Fone sem fio com estojo de recarga.',
            current_price: '159.50',
            stock_quantity: 20,
            updated_at: knex.fn.now(),
        },
    ]);
}
