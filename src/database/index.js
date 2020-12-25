import Sequelize from "sequelize";
import { Category } from "../app/models/category";
import { File } from "../app/models/file";
import { Transactions } from "../app/models/transactions";
import { User } from "../app/models/user";
import postgresConfig from "../config/database";

const models = [User, File, Category, Transactions];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(postgresConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
