const express = require("express");
const router = express.Router();

router.get("/", async function (req, res, next) {
  res.render("index", {
    title: "Chat Bot | Inicio",
    activeLink: "home",
  });
});

module.exports = router;
