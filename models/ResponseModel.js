const Sequelize = require("sequelize");
const db = require("../config/db/database");

const MRespon = db.define(
  "tblresponse",
  {
    ResId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ResTitle: {
      type: Sequelize.STRING,
    },
    ResResponse: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: "tblresponse",
  }
);

module.exports = MRespon;
