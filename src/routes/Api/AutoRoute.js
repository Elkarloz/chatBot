const express = require("express");
const clientController = require("../../controllers/ClientController.js");
const router = express.Router();

const deliveryController = require("../../controllers/deliveryController.js");
const textController = require("../../controllers/TextController.js");
const AuthMiddleware = require("../../middleware/session");

const session = new AuthMiddleware();

router.post("/", session.verifyAuth, async (req, res) => {
    try {
        const {
            key,
            text
        } = req.body;

        textController.setEditText({
            key: key,
            text: text
        });
        res.status(200).json("Datos del bot actualizados");
    } catch (error) {
        res.status(500).send({
            message: "Error al actualizar datos del bot",
        });
    }
});


module.exports = router;