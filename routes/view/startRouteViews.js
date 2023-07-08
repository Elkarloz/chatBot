const express = require("express");
const router = express.Router();
const controller = require("../../controllers/deliveryController");
const controllerResponse = require("../../controllers/ResponseController");
const textController = require("../../controllers/textController");

router.get("/", async function (req, res, next) {
  res.render("login", {
    title: "Chat Bot | Chat",
    deliverys: await controller.getDeliverys(),
    responses: await controllerResponse.getResponses(),
  });
});

router.get("/home/", async function (req, res, next) {
  res.render("index", {
    title: "Chat Bot | Chat",
    deliverys: await controller.getDeliverys(),
    responses: await controllerResponse.getResponses(),
    bots: textController.getText(),
  });
});

module.exports = router;