const express = require("express");
const router = express.Router();
const adminController = require("../controllers/AdminController");

router.post("/login", async (req, res) => {
  try {
    const resp = await adminController.login(req.body);
    req.session.status = true;
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).send({ message: "Error al obtener el usuario" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const resp = await adminController.create(req.body);
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).send({ message: "Error al crear el usuario" });
  }
});

module.exports = router;
