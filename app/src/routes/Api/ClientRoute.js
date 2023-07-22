const express = require("express");
const clientController = require("../../controllers/ClientController.js");
const router = express.Router();

const deliveryController = require("../../controllers/deliveryController.js");
const AuthMiddleware = require("../../middleware/session");

const session = new AuthMiddleware();

router.post("/", session.verifyAuth, async (req, res) => {
    try {
        let resp = null;
        const user = await clientController.getClient(req.body.CliPhone);
        if (user == null) {
            resp = await clientController.createClient(req.body);
        } else {
            resp = await clientController.updateClient(req.body);
        }
        res.status(200).json(resp);
    } catch (error) {
        res.status(500).send({
            message: "Error al actualizar datos del cliente",
        });
    }
});

router.get("/:phone", session.verifyAuth, async (req, res) => {
    try {
        const resp = await clientController.getClient(req.params.phone);
        res.status(200).json(resp);
    } catch (error) {
        res.status(500).send({
            message: "Error al obtener el cliente",
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