import cors from "cors";
import express from "express";
import "express-async-errors";
import Youch from "youch";
import "./bootstrap";
import "./database";
import { routes } from "./routes";
import { INTERNAL_SERVER_ERROR } from "./utils/HTTPSTATUS";
const { NODE_ENV } = process.env;

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
    this.server.use(async (error, req, res, next) => {
      if (NODE_ENV === "development") {
        const errors = await new Youch(error, req).toJSON();
        return res.status(INTERNAL_SERVER_ERROR).json(errors);
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ error: "Internal server error" });
    });
  }
}

export default new App().server;
