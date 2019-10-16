const Sequelize = require('sequelize')
var db = require('../database/db');

module.exports = db.sequelize.define(
    'accounts', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    }, 
    {
        timestamps: false
    }
)
