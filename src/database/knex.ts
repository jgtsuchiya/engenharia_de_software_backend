import { Knex, knex } from 'knex';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config: Knex.Config = {
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
       port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: path.resolve(__dirname, 'migrations'),
    },
    seeds: {
        directory: path.resolve(__dirname, 'seeds'),
    },
};

export default config;
