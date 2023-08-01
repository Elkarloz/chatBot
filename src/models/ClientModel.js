const Sequelize = require("sequelize");
const db = require("../config/db/database");

const MClient = db.define(
  "tblclient", {
    CliId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CliName: {
      type: Sequelize.STRING,
    },
    CliAddress: {
      type: Sequelize.STRING,
    },
    CliAddressExtra: {
      type: Sequelize.TEXT,
    },
    CliPhone: {
      type: Sequelize.STRING,
    },
    CliLocation: {
      type: Sequelize.TEXT,
    },
    CliZone: {
      type: Sequelize.TEXT,
    },
    CliObservation: {
      type: Sequelize.STRING,
    },
    CliDate: {
      type: Sequelize.DATE,
    },
  }, {
    tableName: "tblclient",
  }
);

module.exports = MClient;