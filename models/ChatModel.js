const Sequelize = require("sequelize");
const db = require("../config/db/database");

const MChat = db.define(
  "tblchat",
  {
    chatId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    chatClient: {
      type: Sequelize.INTEGER,
    },
    chatBody: {
      type: Sequelize.TEXT,
    },
    chatDate: {
      type: Sequelize.DATE,
    },
    chatStatus: {
      type: Sequelize.INTEGER,
    },
  },
  {
    tableName: "tblchat",
  }
);

module.exports = MChat;
