const ClientModel = require('./ClientModel');
const SaleModel = require('./SaleModel');
const TextController = require('../controllers/TextController');
const botController = require('../controllers/BotController');
const scheduleController = require("../controllers/ScheduleController");
const deliveryController = require('../controllers/deliveryController');
const saleController = require('../controllers/SaleController');
const tempController = require('../controllers/TempController');
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

        const varTemp = await tempController.isActive(msg.from);
        if (!(varTemp)) {
            await tempController.create({
                TempClient: msg.from,
            });
        }

        const imgUser = msg.sender.profilePicThumbObj == null ? '/dist/img/AdminLTELogo.png' : msg.sender.profilePicThumbObj.img == undefined ? '/dist/img/AdminLTELogo.png' : msg.sender.profilePicThumbObj.img;
        const nameUser = user == null ? msg.sender.pushname : user.CliName;

        const timeString = scheduleController.getText(getDayString());
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();
        const startTime = timeString.split('-')[0];
        const endTime = timeString.split('-')[1];
        const {
            hour: startHour,
            minutes: startMinutes
        } = convertTimeToNumbers(startTime);
        const {
            hour: endHour,
            minutes: endMinutes
        } = convertTimeToNumbers(endTime);

        if (isWithinRange(currentHour, currentMinutes, startHour, startMinutes, endHour, endMinutes)) {
            if (user == null) {
                await ClientModel.create({
                    CliPhone: msg.from,
                    //CliName: nameUser,
                    CliDate: new Date(),
                });
                await client.sendText(msg.from, TextController.getText('unknown', null, null, null));
            } else {
                const fecha = new Date();
                const año = fecha.getFullYear();
                const mes = fecha.getMonth() + 1;
                const dia = fecha.getDate();
                const dayUser = user.CliDate;
                const [añoFecha2, mesFecha2, diaFecha2] = dayUser.split('-').map(Number);

                if (dia != diaFecha2) {
                    await client.sendText(msg.from, TextController.getText('welcome', user, null, null));
                    await ClientModel.update({
                        CliDate: new Date(),
                    }, {
                        where: {
                            CliId: user.CliId,
                        },
                    });
                }
            }
        }

        const unread = await client.getChatById(msg.from);
        if (msg.type == "image" || msg.type == "document" || msg.type == 'ptt') {
            const base64 = await client.downloadMedia(msg.id);
            io.emit('message', {
                phone: msg.from,
                type: msg.type,
                name: nameUser,
                UnreadCount: unread.unreadCount,
                img: imgUser,
                body: base64,
                nameFile: msg.type == "document" ? msg.filename : null,
            });
        } else if (msg.type == "poll_creation") {
            io.emit('message', {
                phone: msg.from,
                type: "sms",
                name: nameUser,
                UnreadCount: unread.unreadCount,
                img: imgUser,
                body: "Has recibido un mensaje que contiene una encuesta, por temas de incompatibilidad no podrá verla."
            });
        } else if (msg.type == "sticker") {
            io.emit('message', {
                phone: msg.from,
                type: "sms",
                name: nameUser,
                UnreadCount: unread.unreadCount,
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
                body: "Tarjeta de contacto del número: " + temp,
                UnreadCount: unread.unreadCount,
            });
        } else {
            msg.body = msg.body.replace("\n", '');
            io.emit('message', {
                phone: msg.from,
                type: "sms",
                name: nameUser,
                img: imgUser,
                body: msg.body,
                UnreadCount: unread.unreadCount,
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

        const unread = await client.getChatById(data.phone);
        data.name = "Server(Usted)";
        data.img = '/dist/img/AdminLTELogo.png';

        io.emit('message', {
            phone: "server",
            name: data.name,
            body: data.body,
            type: 'sms',
            img: data.img,
            UnreadCount: unread.unreadCount,
            client: data.phone
        });
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
        await tempController.changeStatus({
            TempClient: data.client,
            TempStatus: 2
        });
        const user = await ClientModel.findOne({
            where: {
                CliPhone: data.client
            }
        });

        if (user != null) {
            await saleController.closeSale(
                user.CliId,
                data.resume,
                "Domicilio",
                data.delivery,
                data.address == "0" ? user.CliAddress : data.address,
            );

            const delivery = await deliveryController.getDelivery(data.delivery);
            let phone = delivery.DelPhone;

            if (phone.includes('$')) {
                phone = phone.replace('$(', "").replace(')', '') + "@c.us";
            } else {
                phone = "521" + phone + "@c.us";
            }

            let msg = TextController.getText('sale', null, null, null);
            await client.sendText(user.CliPhone, msg);
            msg = TextController.getText(data.address != "0" ? 'sale_delivery_2' : 'sale_delivery', user, data.body, data.address == "0" ? null : data.address);
            await client.sendText(phone, msg);
        }
    });


    await socket.on('close_sale_pick_up', async (data) => {
        await tempController.changeStatus({
            TempClient: data.client,
            TempStatus: 2
        });
        const user = await ClientModel.findOne({
            where: {
                CliPhone: data.client
            }
        });
        if (user != null) {
            await saleController.closeSale(
                user.CliId,
                data.resume,
                "PickUp",
                null,
                null,
            );
            let msg = TextController.getText('sale_pick', null, data.body, null);
            await client.sendText(user.CliPhone, msg);
        }
    });

    await socket.on('resume', async (data) => {
        await client.sendText("573204777967@c.us", TextController.getText('resume_day', null, data.cant, null));
        io.emit('message', {
            phone: "Sistema",
            type: "sms",
            name: "Servidor",
            img: null,
            body: "Fue enviado el mensaje de finalizacion de resumen de día.",
            UnreadCount: 0,
        });
    })
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
        const unread = await client.getChatById(chats[i].contact.id._serialized);

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
                UnreadCount: unread.unreadCount,
                SaleStatus: null,
            })
        } else {
            const saleStatus = await saleController.getsale(user.CliId);
            temp.push({
                CliName: user.CliName,
                CliDate: timeMessage,
                CliImg: imgUser,
                CliPhone: chats[i].contact.id._serialized,
                CliLastMessage: lastMessage,
                UnreadCount: unread.unreadCount,
                SaleStatus: (saleStatus != null ? (saleStatus.length != 0 ? 1 : null) : null),
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

function convertTimeToNumbers(timeStr) {
    const [hour, minutes] = timeStr.replace(/[a-zA-Z.]/g, '').split(':');
    return {
        hour: parseInt(hour, 10),
        minutes: parseInt(minutes, 10),
    };
}

function isWithinRange(currentHour, currentMinutes, startHour, startMinutes, endHour, endMinutes) {
    if (currentHour > startHour && currentHour < endHour) {
        return true;
    } else if (currentHour === startHour && currentMinutes >= startMinutes) {
        return true;
    } else if (currentHour === endHour && currentMinutes <= endMinutes) {
        return true;
    } else {
        return false;
    }
}

function getDayString() {
    const today = new Date();
    const numberDay = today.getDay();
    const srtringDay = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado"
    ];
    return srtringDay[numberDay];
}

module.exports = BotModel;