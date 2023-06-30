const Sequelize = require("sequelize");
const db = require("../config/db/database");

const MAdmin = db.define(
  "tbladmin",
  {
    AdmUser: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    AdmPass: {
      type: Sequelize.STRING,
    },
    AdmToken: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: "tbladmin",
  }
);

module.exports = MAdmin;
