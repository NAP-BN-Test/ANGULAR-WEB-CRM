const Sequelize = require('sequelize');

module.exports = function (db) {
    var table = db.define('Users', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        Username: Sequelize.STRING,
        Password: Sequelize.STRING,
        Name: Sequelize.STRING,
    });

    return table;
}