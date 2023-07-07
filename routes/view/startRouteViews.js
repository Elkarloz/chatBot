const express = require("express");
const router = express.Router();
const controller = require("../../controllers/deliveryController");
const controllerResponse = require("../../controllers/ResponseController");

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
  });
});

module.exports = router;
