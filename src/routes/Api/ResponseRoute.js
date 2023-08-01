const express = require("express");
const clientController = require("../../controllers/ClientController");
const router = express.Router();

const responseController = require("../../controllers/ResponseController");
const AuthMiddleware = require("../../middleware/session");

const session = new AuthMiddleware();

router.get("/", session.verifyAuth(["admin", "standard"]), async (req, res) => {
  try {
    const resp = await responseController.getResponses();
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener las respuestas"
    });
  }
});

router.post("/compile", async (req, res) => {
  try {
    const resp = await responseController.getResponses();
    const client = await clientController.getClient(req.body.phone);
    let temp = [];
    resp.forEach(item => {
      let element = item;
      element.ResResponse = element.ResResponse.replace("{direccion}", client.dataValues.CliAddress != null ? client.dataValues.CliAddress : 'Desconocido');
      element.ResResponse = element.ResResponse.replace("{nombre}", client.dataValues.CliName != null ? client.dataValues.CliName : 'Desconocido');
      element.ResResponse = element.ResResponse.replace("{link}", client.dataValues.CliLocation != null ? client.dataValues.CliLocation : 'Desconocido');
      element.ResResponse = element.ResResponse.replace("{telefono}", client.dataValues.CliPhone != null ? client.dataValues.CliPhone.split('@')[0] : 'Desconocido');
      element.ResResponse = element.ResResponse.replace("{observaciones}", client.dataValues.CliObservation != null ? client.dataValues.CliObservation : 'Desconocido');
      temp.push(element);
    });
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener las respuestas compiladas."
    });
  }
});

router.get("/p/:phone", session.verifyAuth(["admin", "standard"]), async (req, res) => {
  try {
    const resp = await responseController.getResponseParams(req.params.phone);
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener las respuestas"
    });
  }
});

router.post("/", session.verifyAuth(["admin", "standard"]), async (req, res) => {
  try {
    const resp = await responseController.createResponse(req.body);
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).send({
      message: "Error al crear la respuesta"
    });
  }
});

router.put("/:id", session.verifyAuth(["admin", "standard"]), async (req, res) => {
  try {
    const resp = await responseController.updateResponse(
      req.params.id,
      req.body
    );
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).send({
      message: "Error al actualizar la respuesta"
    });
  }
});

router.delete("/:id", session.verifyAuth(["admin", "standard"]), async (req, res) => {
  try {
    const resp = await responseController.deleteResponse(req.params.id);

    res.status(200).json(resp);
  } catch (error) {
    res.status(500).send({
      message: "Error al eliminar la respuesta"
    });
  }
});

module.exports = router;