//Constantes de libs
const wppconnect = require("@wppconnect-team/wppconnect");
const winston = require("winston");
const BotModel = require("../models/BotModel");
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: {
        service: "user-service"
    },
    transports: [
        new winston.transports.File({
            filename: "error.log",
            level: "error"
        }),
        new winston.transports.File({
            filename: "combined.log"
        }),
    ],
});

//Variables & Constantes usables
const socketClient = [];
let sessionBot = false,
    sessionClient = undefined,
    sessionStatus = false,
    tried = false;

//Controlador
const botController = {};

botController.start = async (io) => {
    io.on('connection', async (socket) => {
        console.log('Nuevo cliente conectado:', socket.id);
        socket.join(socket.id);

        socketClient.push(socket);

        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
            socketClient.splice(socketClient.indexOf(socket), 1);
        });

        if (!sessionBot && !tried) {
            tried = true;
            io.emit('status', {
                body: "Estableciendo session."
            });
            do {
                sessionBot = await botController.startBucle(io, socket);
            } while (!sessionBot && socketClient.length != 0);
        } else if (sessionBot) {
            io.emit('status', {
                body: "Conectando con la session activa."
            });
            BotModel.grabber(socket, io, sessionClient);
        } else {
            io.emit('status', {
                body: "Estableciendo session."
            });
        }

        socket.on('request', async (data) => {
            io.to(socket.id).emit('background', await sessionClient.getMessages(data.chat));
        });
    });
};

botController.startBucle = async (io, socket) => {

    try {
        return await wppconnect
            .create({
                session: "zumitos",
                catchQR: (base64Qrimg) => {
                    if (io != null) {
                        io.emit('qr_code', {
                            body: JSON.stringify(base64Qrimg)
                        });
                    }
                },
                statusFind: (statusSession) => {
                    io.emit('status', {
                        body: statusSession
                    });
                    if (statusSession == "inChat" || statusSession.includes("inChat")) {
                        sessionStatus = true;
                        io.emit('status', {
                            body: "Ok"
                        });
                    } else if (statusSession == "desconnectedMobile" && sessionStatus == true) {
                        sessionStatus = false;
                        sessionClient = undefined;
                        tried = false;
                        sessionBot = false;
                        io.emit('status', {
                            body: "Desconectado"
                        });
                    }
                },
                logQR: false,
                disableWelcome: true,
                headless: false,
                debug: false,
                updatesLog: false,
                useChrome: false,
                logger: logger,
                browserArgs: [
                    '--no-sandbox',
                ],
            })
            .then(async (client) => {
                if (client.connected == true) {
                    BotModel.start(client, io, socket);
                    sessionClient = client;
                    return true;
                }
                return false;
            })
            .catch((error) => {
                if (socketClient.length == 0) {
                    tried = false;
                }
                return false;
            });
    } catch (error) {
        console.log("Ocurrio un error: " + error);
    }

};


module.exports = botController;