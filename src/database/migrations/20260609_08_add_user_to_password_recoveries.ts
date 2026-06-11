import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('password_recoveries', (table) => {
        table.string('email', 255).notNullable().after('id');
        table.enu('user_type', ['customer', 'merchant']).notNullable().after('email');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('password_recoveries', (table) => {
        table.dropColumn('email');
        table.dropColumn('user_type');
    });
}
