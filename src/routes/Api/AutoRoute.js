const express = require("express");
const clientController = require("../../controllers/ClientController.js");
const router = express.Router();

const deliveryController = require("../../controllers/deliveryController.js");
const textController = require("../../controllers/TextController.js");
const ScheduleController = require("../../controllers/ScheduleController");
const AuthMiddleware = require("../../middleware/session");

const session = new AuthMiddleware();

router.post("/", session.verifyAuth(["admin", "standard"]), async (req, res) => {
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


router.post("/schedule", session.verifyAuth(["admin", "standard"]), async (req, res) => {
    try {
        const {
            key,
            text
        } = req.body;

        const timeString = text;
        const startTime = timeString.split('-')[0];
        const endTime = timeString.split('-')[1];

        if (startTime != "" && endTime != "") {
            ScheduleController.setEditText({
                key: key,
                text: text
            });
            res.status(200).json("Datos del bot actualizados");
        } else {
            res.status(400).send({
                message: "Horario invalido.",
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Error al actualizar datos del bot.",
        });
    }
});


module.exports = router;