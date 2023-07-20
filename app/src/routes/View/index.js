const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../../middleware/session");
const controllerdeliverys = require("../../controllers/deliveryController");
const controllerResponse = require("../../controllers/ResponseController");
const session = new AuthMiddleware();

router.get("/Login", async function (req, res, next) {
  res.render("auth/login");
});

router.get("/", session.verifyAuth, async function (req, res, next) {
  res.render("home");
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

module.exports = router;
