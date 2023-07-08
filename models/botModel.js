const botController = require("../controllers/BotController");
const chatController = require("../controllers/ChatController");
const textController = require("../controllers/textController");
const PushController = require("../controllers/PushController");
async function startModel(client, msg) {
  if (!msg.isGroupMsg) {
    const data = await chatController.getSearchActivesChat(msg.from);
    if (data != null) {
      await msgActive(msg, client, data);
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
        await msgDisableOne(Client, msg, CliName, client);
      } else {
        if (CliName == null) {
          await msgNullName(client, msg);
        } else if (CliName == "Pendiente") {
          await msgPendName(client, msg, Client);
        } else if (CliName == "Registrando") {
          await msgRegisterName(client, msg, Client);
        }
      }
    }
  }
}

async function msgActive(msg, client, data) {
  const fs = require("fs");
  const idChat = data.chatBody.split("/")[2].replace(".dace", "");
  const day = new Date().toLocaleTimeString();
  let messageUser = "";
  if (msg.type == "image") {
    const base64Temp = await client.downloadMedia(msg.id);
    messageUser = "user>>" + base64Temp + ">>" + day;
  } else if (msg.type == "poll_creation") {
    messageUser = "user>>El cliente ha enviado una encuesta, este mensaje es incompatible para este chatbot.>>" + day;
  } else if (msg.type == "vcard") {
    let temp = msg.content.split("\n");
    temp = temp[2].replace('N:;', '').replace(';;;', '');
    messageUser = "user>>" + "Tarjeta de contacto del número: " + temp + ">>" + day;
  } else if (msg.type == "sticker") {
    messageUser = "user>>" + "Has recibido un sticker, este mensaje es incompatible para este chatbot." + ">>" + day;
  } else if (msg.type == "document") {
    const base64Temp = await client.downloadMedia(msg.id);
    messageUser = "user>>" + base64Temp + ">>" + day;
  } else {
    msg.body = msg.body.replace("\n", '');
    messageUser = "user>>" + msg.body + ">>" + day;
  }
  fs.appendFile(data.chatBody, messageUser + "\n", (error) => {
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
  botController.broadcastMessage("MSG:" + idChat + "::" + messageUser);
}


async function msgDisableOne(Client, msg, CliName, client) {
  if (Client.CliStatus == 0) {
    //Estado del cliente 0
    await client.sendText(
      msg.from,
      textController.getMessageClientZero(CliName)
    );
    await chatController.updateClient(Client.CliId, {
      CliStatus: 1
    });
    //Fin de la instrucion del cliente 0
  } else if (Client.CliStatus == 1) {
    //Opciones del cliente en caso de estar en el estado 1
    switch (msg.body) {
      case "1":
        await client.sendText(msg.from, textController.getMessageWait());
        await chatController.updateClient(Client.CliId, {
          CliStatus: 0,
        });
        await chatController.createChat({
          chatClient: Client.CliId,
          ChatStatus: 1,
        });
        botController.broadcastMessage(
          "NOTIFY:" + CliName + ", necesita que su pedido sea tomado."
        );
        botController.broadcastHistory();
        //aqui la notificacion
        const message = CliName + ", necesita que su pedido sea tomado.";
        PushController.newMessage(message);
        break;

      case "2":
        await client.sendText(msg.from, textController.getMessageMenu());
        await chatController.updateClient(Client.CliId, {
          CliStatus: 0
        });
        break;

      case "3":
        await client.sendText(msg.from, "¡Hemos cerrado esta conversación!");
        await chatController.updateClient(Client.CliId, {
          CliStatus: 0,
        });
        break;

      default:
        await client.sendText(
          msg.from,
          textController.getMessageErrorZeroPartOne() +
          CliName +
          textController.getMessageErrorZeroPartTwo()
        );
        break;
    }
    //Fin ociones del cliente en caso de estar en el estado 1
  }
}

async function msgNullName(client, msg) {
  await client.sendText(msg.from, textController.getMessageStart());
  await client.sendText(msg.from, textController.getMessagePolitics());
  await chatController.createClient({
    CliName: "Pendiente",
    CliPhone: msg.from,
    CliImg: msg.sender.profilePicThumbObj.img,
  });
}

async function msgPendName(client, msg, Client) {
  switch (msg.body) {
    case "1":
      await client.sendText(msg.from, textController.getMessageQuestionName());
      await chatController.updateClient(Client.CliId, {
        CliName: "Registrando",
      });
      break;
    case "2":
      await client.sendText(
        msg.from,
        textController.getMessageDeniedPermissions()
      );
      await chatController.deleteClient(Client.CliId);
      break;
    default:
      await client.sendText(msg.from, textController.getMessageErrorTwo());
      break;
  }
}

async function msgRegisterName(client, msg, Client) {
  await client.sendText(
    msg.from,
    textController.getMessageStartTwo(msg.body)
  );
  await chatController.updateClient(Client.CliId, {
    CliName: msg.body,
    CliStatus: 1,
  });
}

module.exports = startModel;