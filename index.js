const express = require("express"),
  path = require("path"),
  route = require("./routes"),
  app = express(),
  wppconnect = require("@wppconnect-team/wppconnect"),
  WebSocket = require("ws");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/", route.start);
app.use("/Api/Response", route.apiResponse);
app.use("/Api/Delivery", route.apiDelivery);
app.use("/Api/Chat", route.apiChat);

const server = app.listen(3000, () => {
  console.log("Server running on port 3000");
});

let sessionZumitos = undefined;
let clientSession = undefined;
let sessionVerify = false;
let firstClient = null;

const clients = [];
const wss = new WebSocket.Server({ server });
const chatController = require("./controllers/ChatController");
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});
wss.on("connection", (ws) => {
  console.log("Cliente WebSocket conectado");
  if (firstClient == null) {
    firstClient = ws;
  }
  clients.push(ws);

  if (sessionZumitos == undefined && firstClient == ws) {
    sessionZumitos = bucleAsync(ws);
  } else {
    waitAsync(ws);
  }

  ws.on("message", async (message) => {
    if (message.includes("MSG>>")) {
      const msgs = message + "";
      const msg = msgs.split(">>")[3];
      const id = msgs.split(">>")[1];
      const day = new Date().toLocaleTimeString();
      const phone = msgs.split(">>")[2];
      if (clientSession != undefined) {
        await clientSession.sendText(phone, msg);
        const fs = require("fs");
        const messageHost = "host>>" + msg + ">>" + day;
        fs.appendFile(
          "./chats/" + id + ".dace",
          messageHost + "\n",
          (error) => {
            if (error) {
              console.error(
                "Ocurrió un error al escribir en el archivo:",
                error
              );
            } else {
              console.log("La nueva línea se agregó correctamente al archivo.");
            }
          }
        );
        broadcastMessage("MSGHOST:" + id + "::host>>" + msg + ">>" + day);
      }
    } else if (message.includes("MSGFILE>>")) {
      const msgs = message + "";
      const msg = msgs.split(">>")[3];
      const id = msgs.split(">>")[1];
      const day = new Date().toLocaleTimeString();
      const phone = msgs.split(">>")[2];
      const fs = require("fs");
      const messageHost = "host>>" + msg + ">>" + day;
      fs.appendFile("./chats/" + id + ".dace", messageHost + "\n", (error) => {
        if (error) {
          console.error("Ocurrió un error al escribir en el archivo:", error);
        } else {
          console.log("La nueva línea se agregó correctamente al archivo.");
        }
      });
      console.log(msg);
    }
  });

  ws.on("close", () => {
    console.log("Cliente WebSocket desconectado");
    clients.splice(clients.indexOf(ws), 1);
    if (ws === firstClient) {
      firstClient = null;
    }
  });
});

function broadcastMessage(message) {
  clients.forEach((client) => {
    client.send(message);
  });
}

async function waitAsync(ws) {
  if (sessionVerify) {
    ws.send("SESSION:SESION ACTIVA.");
    ws.send(
      "HISTORY:" + JSON.stringify(await chatController.getChatsActives())
    );
  } else {
    ws.send("SESSION:ESPERANDO UNA SESION ACTIVA.");
  }
}

async function bucleAsync(ws) {
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
            if (statusSession == "inChat") {
              sessionVerify = true;
              broadcastMessage("SESSION:SESION ACTIVA.");
              broadcastHistory();
            }
          }
        },
        logQR: false,
        disableWelcome: true,
        headless: false,
        debug: false,
        updatesLog: false,
        useChrome: true,
        logger: logger,
      })
      .then((client) => {
        if (client.connected == true) {
          start(client);
          clientSession = client;
          return client;
        }
        return false;
      })
      .catch((error) => console.log(error));
  } while (!resultado);

  return resultado;
}

async function start(client) {
  client.onMessage(async (msg) => {
    try {
      if (
        (!msg.isGroupMsg && msg.from == "573204777967@c.us") ||
        (!msg.isGroupMsg && msg.from == "573177371515@c.us")
      ) {
        const data = await chatController.getSearchActivesChat(msg.from);
        if (data != null) {
          const fs = require("fs");
          const idChat = data.chatBody.split("/")[2].replace(".dace", "");
          const day = new Date().toLocaleTimeString();
          const messageUser = "user>>" + msg.body + ">>" + day;
          fs.appendFile(data.chatBody, messageUser + "\n", (error) => {
            if (error) {
              console.error(
                "Ocurrió un error al escribir en el archivo:",
                error
              );
            } else {
              console.log("La nueva línea se agregó correctamente al archivo.");
            }
          });
          broadcastMessage("MSG:" + idChat + "::" + messageUser);
        } else {
          let CliName = null;
          const Client = await chatController.getClient(msg.from);
          if (Client != null) {
            CliName = Client.CliName;
          }

          if (
            CliName != null &&
            CliName != "Pendiente" &&
            CliName != "Registrando"
          ) {
            if (Client.CliStatus == 0) {
              client.sendText(
                msg.from,
                CliName +
                  ", es un gusto ayudarte, selecciona la opción que necesitas:\n1.Pedir mi desayuno.\n2.Conocer el menú.\n3.Terminar."
              );
              await chatController.updateClient(Client.CliId, {
                CliStatus: 1,
              });
            } else if (Client.CliStatus == 1) {
              switch (msg.body) {
                case "1":
                  client.sendText(
                    msg.from,
                    "Espera un momento a que uno de nuestros empleados tome tu pedido 👩🏻‍🍳."
                  );
                  await chatController.updateClient(Client.CliId, {
                    CliStatus: 0,
                  });
                  await chatController.createChat({
                    chatClient: Client.CliId,
                    ChatStatus: 1,
                  });
                  broadcastMessage(
                    "NOTIFY:" + CliName + ", necesita que su pedido sea tomado."
                  );
                  broadcastHistory();
                  break;

                case "2":
                  client.sendText(
                    msg.from,
                    "Observa nuestro pedido en este URL 🧑🏻‍🍳"
                  );
                  await chatController.updateClient(Client.CliId, {
                    CliStatus: 0,
                  });
                  break;

                case "3":
                  client.sendText(
                    msg.from,
                    "¡Hemos cerrado esta conversación!"
                  );
                  await chatController.updateClient(Client.CliId, {
                    CliStatus: 0,
                  });
                  break;

                default:
                  client.sendText(
                    msg.from,
                    "Opción ingresada incorrecta. Por favor ingresa un valor entre 1 - 2, digita el número en letras (uno, dos, tres) o bien, ingresa la frase que deseas ejecutar.\n\n" +
                      CliName +
                      ", es un gusto ayudarte, selecciona la opción que necesitas:\n1.Pedir mi desayuno.\n2.Conocer el menú.\n3.Terminar."
                  );
                  break;
              }
            }
          } else {
            if (CliName == null) {
              await client.sendText(
                msg.from,
                "Hola 👋🏻\n\n Soy el asistente virtual Zumitos. Qué gusto saludarte."
              );
              await client.sendText(
                msg.from,
                "Antes de continuar, es importante que nos autorices el tratamiento de tus datos personales.\n1. Acepto\n2. No acepto"
              );
              await chatController.createClient({
                CliName: "Pendiente",
                CliPhone: msg.from,
                CliImg: msg.sender.profilePicThumbObj.img,
              });
            } else if (CliName == "Pendiente") {
              switch (msg.body) {
                case "1":
                  await client.sendText(
                    msg.from,
                    "¿Podrías indicarme tu nombre completo?"
                  );
                  await chatController.updateClient(Client.CliId, {
                    CliName: "Registrando",
                  });
                  break;
                case "2":
                  await client.sendText(
                    msg.from,
                    "No podemos continuar el chat, necesitamos tu autorización para poder registrarlo en nuestra base de datos."
                  );
                  await chatController.deleteClient(Client.CliId);
                  break;
                default:
                  await client.sendText(
                    msg.from,
                    "Opción ingresada incorrecta. Por favor ingresa un valor entre 1 - 2, digita el número en letras (uno, dos, tres) o bien, ingresa la frase que deseas ejecutar.\nAntes de continuar, es importante que nos autorices el tratamiento de tus datos personales.\n1. Acepto\n2. No acepto"
                  );
                  break;
              }
            } else if (CliName == "Registrando") {
              client.sendText(
                msg.from,
                msg.body +
                  ", es un gusto ayudarte, selecciona la opción que necesitas:\n1.Pedir mi desayuno.\n2.Conocer el menú.\n3.Terminar."
              );
              await chatController.updateClient(Client.CliId, {
                CliName: msg.body,
                CliStatus: 1,
              });
            }
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  });
}

async function broadcastHistory() {
  broadcastMessage(
    "HISTORY:" + JSON.stringify(await chatController.getChatsActives())
  );
}
