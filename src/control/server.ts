import express from "express";
import dotenv from "dotenv";
import { connect } from "../database/typeorm";
import router from "../routes";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(router);

connect()
    .then(() => {
        console.log("Connected to the database");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => console.error("TypeORM connection error: ", error));
