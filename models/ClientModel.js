const Sequelize = require("sequelize");
const db = require("../config/db/database");

const MClient = db.define(
  "tblclient",
  {
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
    CliPhone: {
      type: Sequelize.STRING,
    },
    CliImg:{
      type: Sequelize.STRING,
    },
    CliStatus: {
      type: Sequelize.INTEGER,
    },
    CliObservation: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: "tblclient",
  }
);

module.exports = MClient;
