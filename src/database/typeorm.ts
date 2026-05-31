import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import { Favorito } from '../entities/Favorito';
import { Customer } from '../entities/Cliente';
import { Product } from '../entities/Produto';

dotenv.config();

export const connect = async () => {
    return createConnection({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [Favorito, Customer, Product
        ],
        synchronize: false,
    });
};
