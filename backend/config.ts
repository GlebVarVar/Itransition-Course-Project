import { Sequelize } from "sequelize-typescript";
import * as models from "./models";



const modelsArray = Object.values(models);


export const sequelize = new Sequelize({
  database: "database",
  dialect: "mysql",
  username: "root",
  password: "rootroot",
  port: 3307,
  storage: ":memory",
  models: modelsArray,
});
