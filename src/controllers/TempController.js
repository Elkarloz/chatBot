const Temp = require("../models/TempModel");
const clientController = require("./ClientController");
const deliveryController = require("./deliveryController");

const tempController = {};

tempController.create = async (temp) => {
    try {
        const today = new Date();
        const anio = today.getFullYear();
        const mes = (today.getMonth() + 1).toString().padStart(2, '0');
        const dia = today.getDate().toString().padStart(2, '0');
        const todayFormat = `${anio}-${mes}-${dia}`;
        temp.TempDate = todayFormat;
        const user = await deliveryController.getDeliveryPhone((temp.TempClient).split('@')[0]);
        if (temp.TempClient != "status@broadcast" && user == null) {
            await Temp.create(temp);
        }
        return "Temporal creado.";
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

tempController.changeStatus = async (temp) => { //status 1=supervisado, 0=default, hablo pero no tuvo actividad, 2=tuvo actividad como una venta cancelada o cerrada.
    try {
        await Temp.update(temp, {
            where: {
                TempClient: temp.TempClient,
                TempStatus: 0
            },
        });
        return "Temporal actualizado.";
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

tempController.getAllActive = async () => {
    try {
        const temp = await Temp.findAll({
            where: {
                TempStatus: 0
            }
        });
        const simplifiedtemp = temp.map(
            (temp) => temp.dataValues
        );

        return simplifiedtemp;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

tempController.getAll = async () => {
    try {
        const temp = await Temp.findAll();
        const simplifiedtemp = temp.map(
            (temp) => temp.dataValues
        );

        let resp = simplifiedtemp;

        for (let i = 0; i < resp.length; i++) {
            const user = await clientController.getClient(resp[i].TempClient);
            if (user != null) {
                resp[i].TempIdClient = user.CliId;
            } else {
                resp[i].TempIdClient = '';
            }
        }

        return resp;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

tempController.isActive = async (user) => {
    let temp = await Temp.findOne({
        where: {
            TempClient: user,
            TempStatus: 0
        },
    });

    const today = new Date();
    const anio = today.getFullYear();
    const mes = (today.getMonth() + 1).toString().padStart(2, '0');
    const dia = today.getDate().toString().padStart(2, '0');
    const todayFormat = `${anio}-${mes}-${dia}`;

    if (temp == null) {
        temp = await Temp.findOne({
            where: {
                TempClient: user,
                TempDate: todayFormat
            },
        });
        if (temp == null) {
            return false;
        } else {
            if (temp.TempStatus != 0) {
                return true;
            }
            return false;
        }
    }
    return true;
};

module.exports = tempController;