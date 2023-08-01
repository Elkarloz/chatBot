const express = require("express");
const saleController = require("../../controllers/SaleController.js");
const deliveryController = require("../../controllers/deliveryController.js");
const clienController = require("../../controllers/ClientController.js");
const AuthMiddleware = require("../../middleware/session");
const router = express.Router();
const session = new AuthMiddleware();

router.post("/", async (req, res) => {
    try {
        const {
            phone,
            admin
        } = req.body;
        const client = await clienController.getClient(phone);
        const sale = await saleController.createsale({
            SaleAdmin: admin,
            SaleClient: client.dataValues.CliId
        });
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).send({
            message: "Error al crear una venta.",
        });
    }
});

router.get("/:phone", async (req, res) => {
    try {
        const client = await clienController.getClient(req.params.phone);
        const sale = await saleController.getsale(client.dataValues.CliId);
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).send({
            message: "Error al crear una venta.",
        });
    }
});

router.post("/close", async (req, res) => {
    try {
        const {
            phone,
            resume,
            condition,
            delivery,
            address,
            reason
        } = req.body;
        const client = await clienController.getClient(phone);
        const sale = await saleController.closeSale(client.dataValues.CliId, resume, condition, delivery, address, reason);
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).send({
            message: "Error al crear una venta.",
        });
    }
});

router.post("/cancel", async (req, res) => {
    try {
        const {
            phone,
            reason
        } = req.body;
        const client = await clienController.getClient(phone);
        const sale = await saleController.cancelSale(client.dataValues.CliId, reason);
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).send({
            message: "Error al crear una venta.",
        });
    }
});

module.exports = router;