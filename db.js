const { Sequelize } = require('sequelize');

const { DB_NAME, DB_USER, DB_HOST, DB_PASSWORD, DB_PORT } = process.env;

let sequelize;

if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: false, //false
    });
} else {
    sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        dialect: 'postgres',
        host: DB_HOST,
        port: DB_PORT,
    });
}

module.exports = sequelize;
