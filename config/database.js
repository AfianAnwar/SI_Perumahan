const Sequelize = require('sequelize')

const db = new Sequelize('perumahan', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

module.exports = db;