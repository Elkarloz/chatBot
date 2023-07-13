const express = require("express");
const router = express.Router();

const chatController = require("../controllers/ChatController");
const AuthMiddleware = require("../middleware/session");

const session = new AuthMiddleware();

router.get("/", session.verifyAuth, async (req, res) => {
  try {
    const resp = await chatController.getChatsActives();
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener los repartidores",
    });
  }
});

router.get("/Cliente/:phone", session.verifyAuth, async (req, res) => {
  try {
    const resp = await chatController.getClient(req.params.phone);
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener el cliente",
    });
  }
});

router.post("/UpdateClient/:phone", session.verifyAuth, async (req, res) => {
  try {
    const resp = await chatController.updateClientPhone(
      req.params.phone,
      req.body
    );
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener el cliente",
    });
  }
});

router.get("/:id", session.verifyAuth, async (req, res) => {
  try {
    const resp = await chatController.getChatActiveId(req.params.id);
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener los repartidores",
    });
  }
});

router.post("/", session.verifyAuth, async (req, res) => {
  try {
    const del = await chatController.createChat(req.body);
    res.status(200).json(del);
  } catch (error) {
    res.status(500).send({
      message: "Error al crear el repartidor",
    });
  }
});

router.put("/:id", session.verifyAuth, async (req, res) => {
  try {
    const del = await deliveryController.updateDelivery(
      req.params.id,
      req.body
    );
    res.status(200).json(del);
  } catch (error) {
    res.status(500).send({
      message: "Error al actualizar el repartidor",
    });
  }
});

router.delete("/:id", session.verifyAuth, async (req, res) => {
  try {
    const del = await deliveryController.deleteDelivery(req.params.id);

    res.status(200).json(del);
  } catch (error) {
    res.status(500).send({
      message: "Error al eliminar el repartidor",
    });
  }
});

module.exports = router;
