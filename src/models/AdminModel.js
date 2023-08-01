const Sequelize = require("sequelize");
const db = require("../config/db/database");

const MAdmin = db.define(
  "tbladmin", {
    AdmId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    AdmUser: {
      type: Sequelize.STRING,
    },
    AdmPass: {
      type: Sequelize.STRING,
    },
    AdmRole: {
      type: Sequelize.STRING,
    },
  }, {
    tableName: "tbladmin",
  }
);

module.exports = MAdmin;