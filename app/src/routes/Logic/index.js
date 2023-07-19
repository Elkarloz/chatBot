const express = require("express");
const router = express.Router();

router.get("/Login", async function (req, res, next) {
    res.render("login");
});

module.exports = router;