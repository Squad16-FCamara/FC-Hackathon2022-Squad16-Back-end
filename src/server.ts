import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import routes from './routes';
import { DataSource } from 'typeorm';
import errorHandler from './middlewares/error';
config();

const appDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: true,
  synchronize: true,
  logging: false,
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

const port = process.env.PORT || 3333;

(async function start() {
  await appDataSource
    .initialize()
    .then(() => console.log('Connected to database'))
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
  app.listen(port, () => console.log('Server started'));
})();
