import './bootstrap';
import express from 'express';
import Youch from 'youch';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import HTTPSTATUS from './utils/HTTPSTATUS';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
