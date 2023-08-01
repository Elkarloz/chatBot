const express = require("express");
const clientController = require("../../controllers/ClientController.js");
const router = express.Router();

const deliveryController = require("../../controllers/deliveryController.js");
const AuthMiddleware = require("../../middleware/session");

const session = new AuthMiddleware();

router.post("/", session.verifyAuth(["admin", "standard"]), async (req, res) => {
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

router.post("/address", session.verifyAuth(["admin", "standard"]), async (req, res) => {
    try {
        let user = await clientController.getClient(req.body.client);
        let temp = [];
        const deleteParam = req.body.delete;
        const addParam = req.body.add;
        if (deleteParam != null) {
            user.CliAddressExtra = JSON.parse(user.CliAddressExtra);
            user.CliAddressExtra.forEach(element => {
                if (element != deleteParam) {
                    temp.push(element);
                }
            });
            user.CliAddressExtra = temp;
            user.CliAddressExtra = (user.CliAddressExtra).length != 0 ? JSON.stringify(user.CliAddressExtra) : null;
            const resp = await clientController.updateClientAddress(user.CliId, user.CliAddressExtra);
            res.status(200).json(resp);
        } else if (addParam != null) {
            user.CliAddressExtra = JSON.parse(user.CliAddressExtra);
            if (user.CliAddressExtra != null) {
                if (!user.CliAddressExtra.includes(addParam)) {
                    (user.CliAddressExtra).push(addParam);
                }
            } else {
                let temp = [];
                temp.push(addParam);
                user.CliAddressExtra = temp;
            }
            user.CliAddressExtra = JSON.stringify(user.CliAddressExtra);
            const resp = await clientController.updateClientAddress(user.CliId, user.CliAddressExtra);
            res.status(200).json(resp);
        } else {
            res.status(400).send({
                error: "Bad request",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error al actualizar datos del cliente",
        });
    }
});

router.get("/:phone", session.verifyAuth(["admin", "standard"]), async (req, res) => {
    try {
        const resp = await clientController.getClient(req.params.phone);
        res.status(200).json(resp);
    } catch (error) {
        res.status(500).send({
            message: "Error al obtener el cliente",
        });
    }
});

router.delete("/:id", session.verifyAuth(["admin", "standard"]), async (req, res) => {
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