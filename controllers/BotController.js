const deliveryController = require("./deliveryController"),
  textController = require("./textController"),
  chatController = require("./ChatController"),
  wppconnect = require("@wppconnect-team/wppconnect"),
  winston = require("winston"),
  logger = winston.createLogger({
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

const botController = {};

const clients = [];
let sessionZumitos = undefined,
  clientSession = undefined,
  sessionVerify = false,
  firstClient = null;

botController.main = async (wss) => {
  wss.on("connection", (ws) => {
    if (firstClient == null) {
      firstClient = ws;
    }
    clients.push(ws);

    if (sessionZumitos == undefined && firstClient == ws) {
      sessionZumitos = botController.bucleAsync();
    } else {
      botController.waitAsync(ws);
    }

    ws.on("message", async (message) => {
      if (message.includes("MSG>>")) {
        await botController.receiveMessage(message);
      } else if (message.includes("MSGFILE>>")) {
        await botController.receiveMessageFile(message);
      } else if (message.includes("FINISH>>")) {
        await botController.finishChat(message);
      }
    });

    ws.on("close", () => {
      clients.splice(clients.indexOf(ws), 1);
      if (ws === firstClient) {
        firstClient = null;
      }
    });
  });
};

botController.receiveMessage = async (message) => {
  const msgs = message + "";
  const msg = msgs.split(">>")[3];
  const id = msgs.split(">>")[1];
  const day = new Date().toLocaleTimeString();
  const phone = msgs.split(">>")[2];
  if (clientSession != undefined) {
    await clientSession.sendText(phone, msg);
    const fs = require("fs");
    const messageHost = "host>>" + msg + ">>" + day;
    fs.appendFile("./chats/" + id + ".dace", messageHost + "\n", (error) => {
      if (error) {
        botController.addLogError(
          "Ocurrió un error al escribir en el archivo:",
          error
        );
      } else {
        botController.addLogError(
          "La nueva línea se agregó correctamente al archivo."
        );
      }
    });
    botController.broadcastMessage("MSGHOST:" + id + "::" + messageHost);
  }
};

botController.receiveMessageFile = async (message) => {
  const msgs = message + "";
  const msg = msgs.split(">>")[3];
  const id = msgs.split(">>")[1];
  const day = new Date().toLocaleTimeString();
  const phone = msgs.split(">>")[2];
  const fs = require("fs");
  const messageHost = "host>>" + msg + ">>" + day;
  if (msg.includes('image')) {
    await clientSession.sendImageFromBase64(phone, msg, "ImagenZumitos");
  } else if (msg.includes('audio')) {
    await clientSession.sendPttFromBase64(phone, msg, "AudioZumitos");
  } else {
    await clientSession.sendFileFromBase64(phone, msg, "ArchivoZumitos")
  }
  fs.appendFile("./chats/" + id + ".dace", messageHost + "\n", (error) => {
    if (error) {
      botController.addLogError(
        "Ocurrió un error al escribir en el archivo:",
        error
      );
    } else {
      botController.addLogError(
        "La nueva línea se agregó correctamente al archivo."
      );
    }
  });
  botController.broadcastMessage(
    "MSGHOST:" + id + "::host>>" + msg + ">>" + day
  );
};

botController.finishChat = async (message) => {
  const msgs = message + "";
  const msg = msgs.split(">>")[3];
  let delivery = msgs.split(">>")[4];
  const id = msgs.split(">>")[1];
  const day = new Date().toLocaleTimeString();
  const phone = msgs.split(">>")[2];
  const dataClient = await chatController.getClient(phone);
  const messageHost = "host>>" + msg + ">>" + day;
  const dataDelivery = await deliveryController.getDelivery(delivery);
  if (dataDelivery.DelPhone.includes('$')) {
    delivery = dataDelivery.DelPhone.replace("$(", "").replace(")", "") + "@c.us";
  } else {
    delivery = "52" + dataDelivery.DelPhone + "@c.us";
  }
  const fs = require("fs");
  if (dataDelivery != null) {
    await clientSession.sendText(
      delivery,
      textController.getDelivery(dataDelivery, dataClient)
    );
    await clientSession.sendFileFromBase64(
      delivery,
      msg,
      "Pedido " + dataDelivery.DelName + "-" + day + ".pdf"
    );
    await clientSession.sendText(phone, textController.getMessageFinish());
    await chatController.updateClient(dataClient.CliId, {
      CliStatus: 0
    });
    await chatController.updateChatACtive(dataClient.CliId, {
      chatStatus: 0
    });
    fs.appendFile("./chats/" + id + ".dace", messageHost + "\n", (error) => {
      if (error) {
        botController.addLogError(
          "Ocurrió un error al escribir en el archivo:",
          error
        );
      } else {
        botController.addLogError(
          "La nueva línea se agregó correctamente al archivo."
        );
      }
    });
    await botController.broadcastMessage(
      "MSGHOST:" +
      id +
      "::host>>" +
      textController.getMessageHostFinish() +
      ">>" +
      day
    );
    await botController.broadcastHistory();
  }
};

botController.waitAsync = async (ws) => {
  if (sessionVerify) {
    ws.send("SESSION:SESION ACTIVA.");
    ws.send(
      "HISTORY:" + JSON.stringify(await chatController.getChatsActives())
    );
  } else {
    ws.send("SESSION:ESPERANDO UNA SESION ACTIVA.");
  }
};

botController.broadcastMessage = async (message) => {
  clients.forEach((client) => {
    client.send(message);
  });
};

botController.bucleAsync = async () => {
  let resultado = false;
  do {
    resultado = await wppconnect
      .create({
        session: "zumitos",
        catchQR: (base64Qrimg) => {
          if (firstClient != null) {
            firstClient.send("QR:" + JSON.stringify(base64Qrimg));
          }
        },
        statusFind: (statusSession) => {
          if (firstClient != null) {
            firstClient.send("SESSION:" + statusSession);
            if (statusSession == "inChat" || statusSession.includes("inChat")) {
              sessionVerify = true;
              botController.broadcastMessage("SESSION:SESION ACTIVA.");
              botController.broadcastHistory();
            } else if (statusSession == "desconnectedMobile") {
              sessionVerify = false;
              sessionZumitos = undefined;
              clientSession = undefined;
            }
          }
        },
        logQR: false,
        disableWelcome: true,
        headless: true,
        debug: false,
        updatesLog: false,
        useChrome: false,
        logger: logger,
        browserArgs: [
          '--no-sandbox',
        ],
      })
      .then((client) => {
        if (client.connected == true) {
          botController.start(client);
          clientSession = client;
          return client;
        }
        return false;
      })
      .catch((error) => console.log(error));
  } while (!resultado);

  return resultado;
};

botController.broadcastHistory = async () => {
  await botController.broadcastMessage(
    "HISTORY:" + JSON.stringify(await chatController.getChatsActives())
  );
};

botController.start = async (client) => {
  const startModel = require("../models/botModel");
  client.onMessage(async (msg) => {
    try {
      await startModel(client, msg);
    } catch (e) {
      console.log(e);
    }
  });
};

botController.addLogError = (str) => {
  const fs = require("fs");
  fs.appendFile("./log.dace", str + "\n", (error) => {
    if (error) {
      console.error("Ocurrió un error al escribir en el archivo:", error);
    }
  });
};

module.exports = botController;