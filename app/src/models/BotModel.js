const ClientModel = require('./ClientModel');
const TextController = require('../controllers/TextController');
const botController = require('../controllers/BotController');
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

        if (user == null) {
            await ClientModel.create({
                CliPhone: msg.from,
                CliDate: new Date(),
            });
            await client.sendText(msg.from, TextController.getText('unknown'));
        } else {
            const fecha = new Date();
            const año = fecha.getFullYear();
            const mes = fecha.getMonth() + 1;
            const dia = fecha.getDate();
            const dayUser = user.CliDate;
            const [añoFecha2, mesFecha2, diaFecha2] = dayUser.split('-').map(Number);

            if (año === añoFecha2 && mes === mesFecha2 && dia === diaFecha2) {
                await client.sendText(msg.from, TextController.getText('welcome'));
                await ClientModel.update({
                    CliDate: today
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
                body: base64
            });
        } else if (msg.type == "poll_creation") {
            io.emit('message', {
                phone: msg.from,
                type: "sms",
                body: "Has recibido un mensaje que contiene una encuesta, por temas de incompatibilidad no podrá verla."
            });
        } else if (msg.type == "sticker") {
            io.emit('message', {
                phone: msg.from,
                type: "sms",
                body: "Has recibido un mensaje que contiene un sticker, por temas de incompatibilidad no podrá verlo."
            });
        } else if (msg.type == "vcard") {
            let temp = msg.content.split("\n");
            temp = temp[2].replace('N:;', '').replace(';;;', '');
            io.emit('message', {
                phone: msg.from,
                type: "sms",
                body: "Tarjeta de contacto del número: " + temp
            });
        } else {
            msg.body = msg.body.replace("\n", '');
            io.emit('message', {
                phone: msg.from,
                type: "sms",
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
            default:
                await client.sendFileFromBase64(data.phone, data.body, "ArchivoZumitos")
                break;
        }
        io.emit('message', data);
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

        if (lastMessage.type == "image" || lastMessage.type == "document" && lastMessage.type == 'ptt') {
            lastMessage = "Envió una archivo..."
        } else if (lastMessage.type == "poll_creation") {
            lastMessage = "Has recibido un mensaje que contiene una encuesta, por temas de incompatibilidad no podrá verla."
        } else if (lastMessage.type == "sticker") {
            lastMessage = "Has recibido un mensaje que contiene un sticker, por temas de incompatibilidad no podrá verlo.";
        } else if (lastMessage.type == "vcard") {
            let temp = lastMessage.content.split("\n");
            temp = temp[2].replace('N:;', '').replace(';;;', '');
            lastMessage = "Tarjeta de contacto del número: " + temp;
        } else {
            lastMessage.body = lastMessage.body.replace("\n", '');
            lastMessage = lastMessage.body;
        }


        if (user == null) {
            temp.push({
                CliName: chats[i].contact.formattedName,
                CliDate: timeMessage,
                CliImg: imgUser,
                CliLastMessage: lastMessage,
            })
        } else {
            temp.push({
                CliName: user.CliName,
                CliDate: timeMessage,
                CliImg: imgUser,
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