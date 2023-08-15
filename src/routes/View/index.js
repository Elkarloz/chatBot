const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../../middleware/session");
const controllerdeliverys = require("../../controllers/deliveryController");
const controllerResponse = require("../../controllers/ResponseController");
const clientController = require("../../controllers/ClientController");
const textController = require("../../controllers/TextController");
const scheduleController = require("../../controllers/ScheduleController");
const saleController = require("../../controllers/SaleController");
const deliveryController = require("../../controllers/deliveryController");
const tempController = require("../../controllers/TempController");
const session = new AuthMiddleware();

router.get("/Login", async function (req, res, next) {
  res.render("auth/login");
});

router.get("/", session.verifyAuth(["admin", "standard"]), async function (req, res, next) {
  res.render("home", {
    deliverys: await controllerdeliverys.getDeliverys(),
    role: req.session.role,
    admin: req.session.admin,
  });
});

router.get("", session.verifyAuth(["admin"]), async function (req, res, next) {
  res.render("auth/login");
});

router.get("/delivers", session.verifyAuth(["admin"]), async function (req, res, next) {
  const deliverys = await controllerdeliverys.getDeliverys();
  res.render("delivers", {
    deliverys: deliverys,
    role: req.session.role,
    admin: req.session.admin,
  });
});

router.get("/responses", session.verifyAuth(["admin"]), async function (req, res, next) {
  res.render("responses", {
    resp: await controllerResponse.getResponses(),
    role: req.session.role,
    admin: req.session.admin,
  });
});

router.get("/client", session.verifyAuth(["admin"]), async function (req, res, next) {
  let clients = await clientController.getClients();
  clients.forEach(client => {
    client.CliObservation = (client.CliObservation ? client.CliObservation : 'Aun no se ha registrado observaciones.');
    client.CliLocation = (client.CliLocation ? client.CliLocation : 'Aun no se ha registrado un link de ubicacion.');
    client.CliAddress = (client.CliAddress ? client.CliAddress : 'Aun no se ha registrado una dirección.');
    client.CliZone = (client.CliZone ? client.CliZone : 'Aun no se ha registrado una zona.');
    if (client.CliAddressExtra) {
      let temp = "";
      client.CliAddressExtra = JSON.parse(client.CliAddressExtra);
      client.CliAddressExtra.forEach(item => {
        temp += ('<li>' + item + '</li>');
      });
      client.CliAddressExtra = temp;
    } else {
      client.CliAddressExtra = (client.CliAddressExtra ? client.CliAddressExtra : '<li>No tiene direcciones extra registradas.</li>');
    }
  });
  res.render("client", {
    clients: clients,
    role: req.session.role,
    admin: req.session.admin,
  });
});

router.get("/interacciones", session.verifyAuth(["admin"]), async function (req, res, next) {
  res.render("auto", {
    json: await textController.getTextAll(),
    role: req.session.role,
    admin: req.session.admin,
  });
});

router.get("/sales", session.verifyAuth(["admin"]), async function (req, res, next) {
  const sales = await saleController.getSalesView();
  res.render("sales", {
    sales: sales,
    role: req.session.role,
    admin: req.session.admin,
  });
});

router.get("/schedule", session.verifyAuth(["admin"]), async function (req, res, next) {
  res.render("schedule", {
    json: await scheduleController.getTextAll(),
    role: req.session.role,
    admin: req.session.admin,
  });
});

router.get("/temp", session.verifyAuth(["admin"]), async function (req, res, next) {
  res.render("temp", {
    temps: await tempController.getAll(),
    role: req.session.role,
    admin: req.session.admin,
  });
});
module.exports = router;