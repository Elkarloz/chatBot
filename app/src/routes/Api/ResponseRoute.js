const express = require("express");
const router = express.Router();

const responseController = require("../../controllers/ResponseController");
const AuthMiddleware = require("../../middleware/session");

const session = new AuthMiddleware();

router.get("/", session.verifyAuth, async (req, res) => {
  try {
    const resp = await responseController.getResponses();
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).send({ message: "Error al obtener las respuestas" });
  }
});

router.get("/p/:phone", session.verifyAuth, async (req, res) => {
    try {
    const resp = await responseController.getResponseParams(req.params.phone);
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).send({ message: "Error al obtener las respuestas" });
  }
});

router.post("/", session.verifyAuth, async (req, res) => {
  try {
    const resp = await responseController.createResponse(req.body);
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).send({ message: "Error al crear la respuesta" });
  }
});

router.put("/:id", session.verifyAuth, async (req, res) => {
  try {
    const resp = await responseController.updateResponse(
      req.params.id,
      req.body
    );
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).send({ message: "Error al actualizar la respuesta" });
  }
});

router.delete("/:id", session.verifyAuth, async (req, res) => {
  try {
    const resp = await responseController.deleteResponse(req.params.id);

    res.status(200).json(resp);
  } catch (error) {
    res.status(500).send({ message: "Error al eliminar la respuesta" });
  }
});

module.exports = router;
