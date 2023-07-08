const Chat = require("../models/ChatModel");
const Client = require("../models/ClientModel");
const readline = require("readline");
const fs = require("fs");

const chatController = {};

chatController.getChats = async () => {
  try {
    const chats = await Chat.findAll();
    const simplifiedChats = chats.map((Chat) => Chat.dataValues);
    return simplifiedChats;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

chatController.getSearchActivesChat = async (phone) => {
  const client = await chatController.getClient(phone);
  if (client != null) {
    const chats = await chatController.getChats();
    for (let i = 0; i < chats.length; i++) {
      if (chats[i].chatClient == client.CliId && chats[i].chatStatus == 1) {
        return chats[i];
      }
    }
  }
  return null;
};

chatController.getChatActiveId = async (id) => {
  const rutaArchivo = "./chats/" + id + ".dace";
  return new Promise((resolve, reject) => {
    const lector = readline.createInterface({
      input: fs.createReadStream(rutaArchivo),
      crlfDelay: Infinity,
    });

    let ultimaLinea = [];
    lector.on("line", (linea) => {
      ultimaLinea.push(linea);
    });

    lector.on("close", () => {
      resolve(ultimaLinea);
    });

    lector.on("error", (error) => {
      reject(error);
    });
  });
};

chatController.createChat = async (chat) => {
  try {
    await Chat.create(chat).then(async (chatRegister) => {
      const id = chatRegister.chatId;
      const fs = require("fs");
      const content = "";
      const routeFile = "./chats/" + id + ".dace";
      await chatController.updateChat(id, {
        chatBody: routeFile,
        chatStatus: 1,
      });

      fs.writeFile(routeFile, content, (error) => {
        if (error) {
          console.error("Error al crear el archivo:", error);
        }
      });
    });
    return "Chat creado";
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

chatController.getChatsActives = async () => {
  try {
    const chats = await Chat.findAll({
      where: {
        chatStatus: 1,
      },
    });
    const simplifiedChats = chats.map((Chat) => Chat.dataValues);
    let chatsActives = [];
    for (let i = 0; i < simplifiedChats.length; i++) {
      const element = simplifiedChats[i];
      const client = await Client.findOne({
        where: {
          CliId: element.chatClient,
        },
      });
      chatsActives.push({
        url: client.CliImg == null ? "images/null.jpg" : client.CliImg,
        phone: client.CliPhone,
        user: client.CliName,
        message: await chatController.getLastMessage(element.chatBody),
        time: element.chatDate,
        id: element.chatId,
      });
    }
    return chatsActives;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

chatController.getLastMessage = async (rutaArchivo) => {
  return new Promise((resolve, reject) => {
    const lector = readline.createInterface({
      input: fs.createReadStream(rutaArchivo),
      crlfDelay: Infinity,
    });

    let ultimaLinea = "";
    lector.on("line", (linea) => {
      if (!linea.includes("host>>")) {
        ultimaLinea = linea.split(">>")[1];
      }
    });

    lector.on("close", () => {
      resolve(ultimaLinea);
    });

    lector.on("error", (error) => {
      reject(error);
    });
  });
};

chatController.updateChat = async (id, chat) => {
  try {
    await Chat.update(chat, {
      where: {
        chatId: id,
      },
    });

    return "Chat actualizado";
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

chatController.updateChatACtive = async (id, chat) => {
  try {
    await Chat.update(chat, {
      where: {
        chatClient: id,
        chatStatus: 1,
      },
    });

    return "Chat actualizado";
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

chatController.createClient = async (client) => {
  try {
    await Client.create(client);
    return "Cliente creado";
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

chatController.updateClient = async (id, client) => {
  try {
    await Client.update(client, {
      where: {
        CliId: id,
      },
    });

    return "Cliente actualizado";
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

chatController.deleteChat = async (id) => {
  try {
    await Chat.destroy({
      where: {
        chatId: id,
      },
    });

    return "Chat eliminado";
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

chatController.updateClientPhone = async (phone, client) => {
  try {
    await Client.update(client, {
      where: {
        CliPhone: phone,
      },
    });

    return "Cliente actualizado";
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

chatController.getClient = async (phone) => {
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

chatController.deleteClient = async (id) => {
  try {
    await Client.destroy({
      where: {
        CliId: id,
      },
    });

    return "Cliente eliminado";
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = chatController;