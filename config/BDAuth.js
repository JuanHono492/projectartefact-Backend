require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_AUTH_NAME,
    process.env.DB_AUTH_USER,
    process.env.DB_AUTH_PASSWORD,
    {
        host: process.env.DB_AUTH_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false, // Desactivar el logging de SQL en la consola
    }
);

module.exports = sequelize;
