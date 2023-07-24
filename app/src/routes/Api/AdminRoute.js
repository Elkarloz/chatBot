const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/AdminController");
const AuthMiddleware = require("../../middleware/session");

const session = new AuthMiddleware();
router.post("/login", async (req, res) => {
  try {
    const resp = await adminController.login(req.body);
    req.session.status = true;
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).send({
      message: "Error al intentar hacer login"
    });
  }
});

router.post("/create", async (req, res) => {
  try {
    if (req.body.token == "dace") {
      const resp = await adminController.create(req.body);
      res.status(200).json(resp);
    } else {
      res.status(500).send({
        message: "No estas autorizado para esto."
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al crear el usuario."
    });
  }
});

router.post("/logout", session.verifyAuth, async (req, res) => {
  try {
    if (req.session.status === true) {
      req.session.status = false;
      res.status(200).send({
        message: "Logout exitoso"
      });
    } else {
      res.status(401).send({
        message: "No se ha iniciado sesión"
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al intentar hacer logout"
    });
  }
});


module.exports = router;