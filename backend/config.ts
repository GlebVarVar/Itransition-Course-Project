import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  database: "database",
  dialect: "mysql",
  username: "root",
  password: "rootroot",
  storage: ":memory",
  models: [__dirname + '/**/*.model.ts'],
});
