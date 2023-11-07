import 'dotenv/config';

import express from 'express';
import * as process from 'process';
import { authAccessMiddleware } from './middlewares/authAccessMiddleware';
import { IS_DEV } from './constants/IS_DEV';
import { initMainMiddlewares } from './config/initMainMiddlewares';
import balance from './routes/balance/balance';
import { PORT } from './constants/PORT';
import { onStartedServer } from './config/onStartedServer';
import { IS_PM2 } from './constants/IS_PM2';

const app = express();

initMainMiddlewares(app);

app.get('/', (req, res) => {
  const statusString = `<h1>Server works! ✅ <br/>DEV=${IS_DEV}<br/>PORT=${PORT}<br/>IS_PM2=${IS_PM2}</h1><h3>SERVER PROCESS LOCATION=${process.cwd()}</h3>`;
  res.status(200).send(statusString);
});

app.use('/balance', authAccessMiddleware, balance);

app.get('*', (req, res) => {
  res.status(404).send(`"${req.path}" not found`);
});

const server = require('http').createServer(app);
server.listen(PORT, onStartedServer);
