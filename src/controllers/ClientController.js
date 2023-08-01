const Client = require("../models/ClientModel");

const clientController = {};

clientController.getClient = async (phone) => {
    try {
        const client = await Client.findOne({
            where: {
                CliPhone: phone,
            },
        });

        return client;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

clientController.getClientId = async (id) => {
    try {
        const client = await Client.findOne({
            where: {
                CliId: id,
            },
        });

        return client;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

clientController.getClients = async () => {
    try {
        const clients = await Client.findAll();

        const simplifiedClients = clients.map(
            (client) => client.dataValues
        );

        return simplifiedClients;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

clientController.createClient = async (client) => {
    try {
        client = {
            CliName: client.CliName,
            CliPhone: client.CliPhone,
            CliObservation: client.CliObservation,
            CliLocation: client.CliLocation,
            CliAddress: client.CliAddress,
            CliDate: new Date(),
        };
        await Client.create(client);
        return "Cliente creado";
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

clientController.updateClient = async (client) => {
    try {
        await Client.update(client, {
            where: {
                CliId: client.CliId,
            },
        });

        return "Cliente actualizado";
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

clientController.updateClientAddress = async (CliId, CliAddressExtra) => {
    try {
        await Client.update({
            CliAddressExtra: CliAddressExtra
        }, {
            where: {
                CliId: CliId,
            },
        });

        return "Cliente actualizado";
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

module.exports = clientController;