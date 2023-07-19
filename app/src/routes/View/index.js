const express = require("express");
const router = express.Router();

router.get("/Login", async function (req, res, next) {
    res.render("auth/login");
});

router.get("/", async function (req, res, next) {
    res.render("home");
});

module.exports = router;