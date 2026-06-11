import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';
import { Favorito } from '../entities/Favorito';
import { Customer } from '../entities/Cliente';
import { Product } from '../entities/Produto';
import { Merchant } from '../entities/Merchant';
import { PasswordRecovery } from '../entities/PasswordRecovery';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Favorito, Customer, Product, Merchant, PasswordRecovery],
    synchronize: false,
});

export const connect = async () => {
    return AppDataSource.initialize();
};
