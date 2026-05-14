import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('password_recoveries').del();

    await knex('password_recoveries').insert([
        {
            id: 1,
            code: 'RECOVER-AAA-111',
            created_at: knex.fn.now(),
        },
        {
            id: 2,
            code: 'RECOVER-BBB-222',
            created_at: knex.fn.now(),
        },
        {
            id: 3,
            code: 'RECOVER-CCC-333',
            created_at: knex.fn.now(),
        },
    ]);
}
