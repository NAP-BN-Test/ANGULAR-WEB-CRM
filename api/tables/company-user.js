const Sequelize = require('sequelize');

module.exports = function (db) {
    var table = db.define('Companies', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        UserID: Sequelize.BIGINT,
        CompanyID: Sequelize.BIGINT,
    });

    return table;
}