const Sequelize = require("sequelize");
const db = require("../config/db/database");

const MDelivery = db.define(
    "tbldelivery",
    {
        DelId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        DelName: {
            type: Sequelize.STRING,
        },
        DelPhone: {
            type: Sequelize.STRING,
        },
    }, 
    {
        tableName: "tbldelivery",
    }
);

module.exports = MDelivery;
