const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();


const connectionString = process.env.POSTGRES_URL
const db = new Sequelize(
  connectionString, {
    dialect: "postgres",
    dialectModule: require('pg')
  }
)


module.exports = db;