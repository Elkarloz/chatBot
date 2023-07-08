const express = require("express");
const router = express.Router();

const chatController = require("../controllers/ChatController");

router.get("/", async (req, res) => {
  try {
    const resp = await chatController.getChatsActives();
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener los repartidores"
    });
  }
});

router.get("/Cliente/:phone", async (req, res) => {
  try {
    const resp = await chatController.getClient(req.params.phone);
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener el cliente"
    });
  }
});

router.post("/UpdateClient/:phone", async (req, res) => {
  try {
    const resp = await chatController.updateClientPhone(
      req.params.phone,
      req.body
    );
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener el cliente"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const resp = await chatController.getChatActiveId(req.params.id);
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener los repartidores"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const del = await chatController.createChat(req.body);
    res.status(200).json(del);
  } catch (error) {
    res.status(500).send({
      message: "Error al crear el repartidor"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const del = await deliveryController.updateDelivery(
      req.params.id,
      req.body
    );
    res.status(200).json(del);
  } catch (error) {
    res.status(500).send({
      message: "Error al actualizar el repartidor"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const del = await deliveryController.deleteDelivery(req.params.id);

    res.status(200).json(del);
  } catch (error) {
    res.status(500).send({
      message: "Error al eliminar el repartidor"
    });
  }
});

module.exports = router;