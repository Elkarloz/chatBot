const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../../middleware/session");
const controllerdeliverys = require("../../controllers/deliveryController");
const controllerResponse = require("../../controllers/ResponseController");
const clientController = require("../../controllers/ClientController");
const textController = require("../../controllers/TextController");
const session = new AuthMiddleware();

router.get("/Login", async function (req, res, next) {
  res.render("auth/login");
});

router.get("/", session.verifyAuth, async function (req, res, next) {
  res.render("home", {
    deliverys: await controllerdeliverys.getDeliverys(),
  });
});

router.get("", session.verifyAuth, async function (req, res, next) {
  res.render("auth/login");
});

router.get("/delivers", session.verifyAuth, async function (req, res, next) {
  res.render("delivers", {
    deliverys: await controllerdeliverys.getDeliverys(),
  });
});

router.get("/responses", session.verifyAuth, async function (req, res, next) {
  res.render("responses", {
    resp: await controllerResponse.getResponses(),
  });
});

router.get("/client", session.verifyAuth, async function (req, res, next) {
  res.render("client", {
    clients: await clientController.getClients(),
  });
});

router.get("/interacciones", session.verifyAuth, async function (req, res, next) {
  res.render("auto", {
    json: await textController.getTextAll(),
  });
});

module.exports = router;