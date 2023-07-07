const { Router } = require("express");
const router = Router();
const PushController = require("../controllers/PushController");

router.post("/subscription", async (req, res) => {
  try {
    const aux = req.headers["x-admuser"];
    const resp = PushController.updateToken(req, aux);

    res.status(200).json(resp);
  } catch (error) {
    res.status(500).send({ message: "Error al actualizar el token" });
  }
});

router.post("/new-message", async (req, res) => {
  try {
    const aux = req.headers["x-admuser"];
    const resp = PushController.newMessage(req, aux);
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).send({ message: "Error al enviar la notificación" });
  }
});

module.exports = router;
