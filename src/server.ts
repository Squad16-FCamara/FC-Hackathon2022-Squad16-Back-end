import 'express-async-errors';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { createConnection } from 'typeorm';
import errorHandler from './middlewares/error';
import { User } from './entities/user';
import routes from './routes';
import { createServer } from 'http';
import WebSocket, { Server } from 'ws';
config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

const server = createServer(app);
const wss = new Server({ server });

const port = process.env.PORT || 3333;
(async function start() {
  await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: true,
    synchronize: true,
    logging: false,
    entities: [User],
  })
    .then(() => console.log('Connected to database'))
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });

  wss.on('connection', (ws) =>
    ws.on('message', (data) => {
      const message = data.toString();
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    })
  );

  server.listen(port, () => console.log('Server started'));
})();
