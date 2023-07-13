const express = require("express");
const router = express.Router();
const controller = require("../../controllers/deliveryController");
const controllerResponse = require("../../controllers/ResponseController");
const textController = require("../../controllers/textController");
const AuthMiddleware = require("../../middleware/session");

const session = new AuthMiddleware();
router.get("/", async function (req, res, next) {
  res.render("login", {
    title: "Chat Bot | Chat",
    deliverys: await controller.getDeliverys(),
    responses: await controllerResponse.getResponses(),
  });
});

router.get("/home/", session.verifyAuth, async function (req, res, next) {
  res.render("index", {
    title: "Chat Bot | Chat",
    deliverys: await controller.getDeliverys(),
    responses: await controllerResponse.getResponses(),
    bots: textController.getText(),
  });
});

module.exports = router;
