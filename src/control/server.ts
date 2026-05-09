import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { connect } from '../database/typeorm';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

connect().then(() => {
    console.log('Connected to the database');

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(error => console.log('TypeORM connection error: ', error));
