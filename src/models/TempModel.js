const Sequelize = require("sequelize");
const db = require("../config/db/database");

const MChat = db.define(
    "tbltemp", {
        TempId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        TempClient: {
            type: Sequelize.TEXT,
        },
        TempDate: {
            type: Sequelize.STRING,
        },
        TempStatus: {
            type: Sequelize.INTEGER,
        },
        TempReason: {
            type: Sequelize.TEXT,
        }
    }, {
        tableName: "tbltemp",
    }
);

module.exports = MChat;