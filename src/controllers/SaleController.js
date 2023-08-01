const Sale = require("../models/SaleModel");
const clientController = require("./ClientController");
const adminController = require("./AdminController");
const deliveryController = require("./deliveryController");

const saleController = {};

saleController.getsale = async (client) => {
    try {
        const sale = await Sale.findOne({
            where: {
                SaleClient: client,
                SaleStatus: 1,
            },
        });

        return sale;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

saleController.getsales = async () => {
    try {
        const sales = await Sale.findAll();

        const simplifiedsales = sales.map(
            (sale) => sale.dataValues
        );

        return simplifiedsales;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

saleController.getSalesView = async () => {
    let sales = await saleController.getsales();
    let temp = [];
    for (let sale of sales) {
        const client = await clientController.getClientId(sale.SaleClient);
        const admin = await adminController.getAdmin(sale.SaleAdmin);
        const delivery = await deliveryController.getDelivery(sale.SaleDelivery);
        sale.SaleStatus = sale.SaleStatus == 0 ? 'Cancelado' : sale.SaleStatus == 1 ? 'Abierta' : 'Cerrada';
        sale.SaleDelivery = sale.SaleDelivery == null ? 'No aplica.' : delivery == null ? 'El repartidor fue eliminado de la base de datos.' : delivery.DelName;
        sale.SaleClient = client.CliName;
        sale.SaleReason = sale.SaleReason == "" ? 'No registro.' : sale.SaleReason;
        sale.SaleAdmin = (admin.AdmUser).toUpperCase();
        sale.SaleResume = sale.SaleResume == null ? 'No registra un resume.' : sale.SaleResume == "" ? 'No registra un resume' : sale.SaleResume;
        sale.SaleCondition = sale.SaleCondition == null ? "Cancelo pedido." : sale.SaleCondition;
        sale.SaleAddress = sale.SaleAddress == null ? 'No aplica.' : sale.SaleAddress;
        temp.push(sale);
    }
    return temp;
}

saleController.createsale = async (sale) => {
    try {
        await Sale.create(sale);
        return "Venta creada.";
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

saleController.updatesale = async (sale) => {
    try {
        await Sale.update(sale, {
            where: {
                SaleId: sale.SaleId,
            },
        });

        return "Venta actualizada.";
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

saleController.cancelSale = async (client, reason) => {
    try {
        await Sale.update({
            SaleStatus: 0,
            SaleReason: reason,
        }, {
            where: {
                SaleClient: client,
                SaleStatus: 1,
            },
        });

        return "Venta cancelada.";
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};


saleController.closeSale = async (client, resume, condition, delivery, address, reason) => {
    try {
        await Sale.update({
            SaleStatus: 2,
            SaleReason: reason,
            SaleDelivery: delivery,
            SaleAddress: address,
            SaleCondition: condition,
            SaleResume: resume,
        }, {
            where: {
                SaleClient: client,
                SaleStatus: 1,
            },
        });

        return "Venta cerrada.";
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

module.exports = saleController;