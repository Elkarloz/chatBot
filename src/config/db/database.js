const Sequelize = require("sequelize");

const database = new Sequelize("dbchat", "javier", "advertencia123#", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  logging: false,
  define: {
    timestamps: false,
  },
});

database.sync();



module.exports = database;