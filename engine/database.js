require("dotenv").config({ path: ".env" });

const Sequelize = require("sequelize");
const database = new Sequelize(
  process.env.POSTGRES_DATABASE,
  process.env.POSTGRES_USERNAME,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOSTNAME,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres",
    pool: {
      //почитать
      max: +process.env.POSTGRES_POOL_MAX,
      min: +process.env.POSTGRES_POOL_MIN,
      acquire: 300000,
      idle: 90000,
      evict: 90000,
    },
    sync: {
      alter: false,
    },
    define: {
      freezeTableName: true,
    },
    // operatorsAliases: false,
    logging: false,
  }
);

module.exports = database;
