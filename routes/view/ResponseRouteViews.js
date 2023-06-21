const express = require("express");
const router = express.Router();

const controller = require("../../controllers/ResponseController");

router.get("/", async function (req, res, next) {
  res.render("responses", {
    title: "Chat Bot | Respuestas",
    activeLink: "responses",
    responses: await controller.getResponses(),
  });
});

module.exports = router;
