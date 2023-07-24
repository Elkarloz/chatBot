const Sequelize = require("sequelize");
const db = require("../config/db/database");

const MCSale = db.define(
    "tblsale", {
        SaleId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        SaleDelivery: {
            type: Sequelize.INTEGER,
        },
        SaleClient: {
            type: Sequelize.INTEGER,
        },
        SaleDate: {
            type: Sequelize.DATE,
        },
        SaleResume: {
            type: Sequelize.TEXT,
        },
    }, {
        tableName: "tblsale",
    }
);

module.exports = MCSale;