const Sequelize = require('sequelize');

const db = {};

const sequelize = new Sequelize('FZpNq1DU0K', 'FZpNq1DU0K', '5UvhgGRAPS', {
    host: 'remotemysql.com',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db