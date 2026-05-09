import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const connect = async () => {
    return createConnection({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [
        ],
        synchronize: false,
    });
};
