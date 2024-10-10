const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

// Referenciar la variable de entorno correctamente
// const connection = process.env.PORT_PROD
// console.log("Connection string: ", connection);

// Establecer la conexión con Sequelize
// const db = new Sequelize(connection, { 
//   dialect: "postgres",
//   dialectModule: require('pg')
//  });

const connectionString = process.env.POSTGRES_URL
const db = new Sequelize(
  connectionString, {
    dialect: "postgres",
    dialectModule: require('pg')
  }
)


module.exports = db;