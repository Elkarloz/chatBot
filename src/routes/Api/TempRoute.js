const express = require("express");
const clientController = require("../../controllers/ClientController.js");
const tempController = require("../../controllers/TempController.js");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const resp = await tempController.getAllActive();
        res.status(200).json(resp);
    } catch (error) {
        res.status(500).send({
            message: "Error en la api temporal.",
        });
    }
});



router.post("/active", async (req, res) => {
    try {
        const {
            TempClient,
            TempReason
        } = req.body;
        const resp = await tempController.changeStatus({
            TempClient: TempClient,
            TempReason: TempReason,
            TempStatus: 1
        });
        res.status(200).json({
            ok: resp
        });
    } catch (error) {
        res.status(500).send({
            message: "Error en la api temporal.",
        });
    }
});
module.exports = router;