const ClientModel = require('./ClientModel');
const SaleModel = require('./SaleModel');
const TextController = require('../controllers/TextController');
const botController = require('../controllers/BotController');
const deliveryController = require('../controllers/deliveryController');
const BotModel = {};

BotModel.start = (client, io, socket) => {
    BotModel.grabber(socket, io, client);
    client.onMessage(async (msg) => {
        try {
            await BotModel.bootstrap(client, msg, io);
        } catch (e) {
            BotModel.addLogError(e);
        }
    });
};

BotModel.bootstrap = async (client, msg, io) => {
    if (!msg.isGroupMsg) {
        const user = await ClientModel.findOne({
            where: {
                CliPhone: msg.from
            }
        });

        const imgUser = msg.sender.profilePicThumbObj == null ? '/dist/img/AdminLTELogo.png' : msg.sender.profilePicThumbObj.img == undefined ? '/dist/img/AdminLTELogo.png' : msg.sender.profilePicThumbObj.img;
        const nameUser = user == null ? msg.sender.pushname : user.CliName;

        if (user == null) {
            await ClientModel.create({
                CliPhone: msg.from,
                //CliName: nameUser,
                CliDate: new Date(),
            });
            await client.sendText(msg.from, TextController.getText('unknown', null, null));
        } else {
            const fecha = new Date();
            const año = fecha.getFullYear();
            const mes = fecha.getMonth() + 1;
            const dia = fecha.getDate();
            const dayUser = user.CliDate;
            const [añoFecha2, mesFecha2, diaFecha2] = dayUser.split('-').map(Number);

            if (dia != diaFecha2) {
                await client.sendText(msg.from, TextController.getText('welcome', user, null));
                await ClientModel.update({
                    CliDate: new Date(),
                }, {
                    where: {
                        CliId: user.CliId,
                    },
                });
            }
        }

        if (msg.type == "image" || msg.type == "document" || msg.type == 'ptt') {
            const base64 = await client.downloadMedia(msg.id);
            io.emit('message', {
                phone: msg.from,
                type: msg.type,
                name: nameUser,
                img: imgUser,
                body: base64,
                nameFile: msg.type == "document" ? msg.filename : null,
            });
        } else if (msg.type == "poll_creation") {
            io.emit('message', {
                phone: msg.from,
                type: "sms",
                name: nameUser,
                img: imgUser,
                body: "Has recibido un mensaje que contiene una encuesta, por temas de incompatibilidad no podrá verla."
            });
        } else if (msg.type == "sticker") {
            io.emit('message', {
                phone: msg.from,
                type: "sms",
                name: nameUser,
                img: imgUser,
                body: "Has recibido un mensaje que contiene un sticker, por temas de incompatibilidad no podrá verlo."
            });
        } else if (msg.type == "vcard") {
            let temp = msg.content.split("\n");
            temp = temp[2].replace('N:;', '').replace(';;;', '');
            io.emit('message', {
                phone: msg.from,
                type: "sms",
                name: nameUser,
                img: imgUser,
                body: "Tarjeta de contacto del número: " + temp
            });
        } else {
            msg.body = msg.body.replace("\n", '');
            io.emit('message', {
                phone: msg.from,
                type: "sms",
                name: nameUser,
                img: imgUser,
                body: msg.body
            });
        }
    }
};

BotModel.grabber = async (socket, io, client) => {
    let chats = [];
    do {
        chats = await client.listChats({
            onlyUsers: true
        });
    } while (chats.length == 0)
    chats = await BotModel.setRecord(chats, client);
    io.emit('record', chats);
    io.emit('status', {
        body: "Ok"
    });
    await socket.on('message', async (data) => {
        switch (data.type) {
            case "sms":
                await client.sendText(data.phone, data.body);
                break;
            case "image":
                await client.sendImageFromBase64(data.phone, data.body, "ImagenZumitos");
                break;
            case "audio":
                await client.sendPttFromBase64(data.phone, data.body, "AudioZumitos");
                break;
            case "document":
                await client.sendFileFromBase64(data.phone, data.body, "ArchivoZumitos")
                break;
        }
        data.phone = "server";
        data.name = "Server(Usted)";
        data.img = '/dist/img/AdminLTELogo.png';
        io.emit('message', data);
    });

    await socket.on('media', async (data) => {
        const base64 = await client.downloadMedia(data.msg);
        io.emit('media', {
            id: data.id,
            body: base64,
            type: data.type,
            name: data.name
        });

    });

    await socket.on('close', async (data) => {
        await client.logout();
        await client.close();
        io.emit('status', {
            body: "Estableciendo session."
        });
        io.emit('close', {
            token: true,
        });
    });


    await socket.on('close_sale', async (data) => {
        const user = await ClientModel.findOne({
            where: {
                CliPhone: data.client
            }
        });
        await SaleModel.create({
            SaleDelivery: data.delivery,
            SaleClient: user.CliId,
            SaleResume: data.body,
        });

        const delivery = await deliveryController.getDelivery(data.delivery);
        let phone = delivery.DelPhone;

        if (phone.includes('$')) {
            phone = phone.replace('$(', "").replace(')', '') + "@c.us";
        } else {
            phone = "521" + phone + "@c.us";
        }

        let msg = TextController.getText('sale', null, null);
        await client.sendText(user.CliPhone, msg);
        msg = TextController.getText('sale_delivery', user, data.body);
        await client.sendText(phone, msg);
    });

}

BotModel.setRecord = async (chats, client) => {
    let temp = [];
    for (let i = 0; i < chats.length; i++) {
        const user = await ClientModel.findOne({
            where: {
                CliPhone: chats[i].contact.id._serialized
            }
        });
        let lastMessage = await client.getMessages(chats[i].contact.id._serialized, {
            count: 1
        });
        lastMessage = lastMessage[0];
        const timeMessage = new Date(lastMessage.timestamp * 1000);
        const imgUser = lastMessage.sender.profilePicThumbObj == null ? null : lastMessage.sender.profilePicThumbObj.img;

        if (lastMessage.type == "image" || lastMessage.type == "document" || lastMessage.type == 'ptt') {
            lastMessage = "Envió una archivo..."
        } else if (lastMessage.type == "poll_creation") {
            lastMessage = "Has recibido un mensaje que contiene una encuesta, por temas de incompatibilidad no podrá verla."
        } else if (lastMessage.type == "sticker") {
            lastMessage = "Has recibido un mensaje que contiene un sticker, por temas de incompatibilidad no podrá verlo.";
        } else if (lastMessage.type == "vcard") {
            let temp = lastMessage.content.split("\n");
            temp = temp[2].replace('N:;', '').replace(';;;', '');
            lastMessage = "Tarjeta de contacto del número: " + temp;
        } else if (lastMessage.type == "chat") {
            lastMessage.body = lastMessage.body.replace("\n", '');
            lastMessage = lastMessage.body;
        } else {
            lastMessage = "Has recibido un mensaje que el chatBot no puede procesar o entender.";
        }



        if (user == null) {
            temp.push({
                CliName: chats[i].contact.formattedName,
                CliDate: timeMessage,
                CliImg: imgUser,
                CliPhone: chats[i].contact.id._serialized,
                CliLastMessage: lastMessage,
            })
        } else {
            temp.push({
                CliName: user.CliName,
                CliDate: timeMessage,
                CliImg: imgUser,
                CliPhone: chats[i].contact.id._serialized,
                CliLastMessage: lastMessage,
            });
        }
    }
    return temp;
}

BotModel.addLogError = (str) => {
    const fs = require("fs");
    fs.appendFile("./error.dace", str + "\n", (error) => {
        if (error) {
            console.log("Ocurrió un error al escribir en el archivo:", error);
        }
    });
};

module.exports = BotModel;