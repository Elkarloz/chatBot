const express = require("express");
const router = express.Router();

const controller = require("../../controllers/deliveryController");

router.get("/", async function (req, res, next) {
  res.render("deliverys", {
    title: "Chat Bot | Reparidores",
    activeLink: "deliverys",
    deliverys: await controller.getDeliverys(),
  });
});

module.exports = router;
