const Respon = require("../models/ResponseModel.js");
const MClient = require("../models/ClientModel.js");

const responseController = {};

responseController.getResponses = async () => {
  try {
    const respons = await Respon.findAll();

    const simplifiedRespons = respons.map((resp) => resp.dataValues);

    return simplifiedRespons;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

responseController.getResponseParams = async (Phone) => {
  try {
    let nombre = "",
      telefono = "",
      direccion = "";

    const client = await MClient.findOne({
      where: {
        CliPhone: Phone,
      },
    });

    if (client) {
      nombre = client.dataValues.CliName;
      telefono = client.dataValues.CliPhone;
      direccion = client.dataValues.CliAddress;
    }

    const respons = await Respon.findAll();

    const simplifiedRespons = respons.map((resp) => resp.dataValues);

    for (let i = 0; i < simplifiedRespons.length; i++) {
      let message = simplifiedRespons[i].ResResponse;
      if (message) {
        if (message.includes("{nombre}")) {
          message = message.replace("{nombre}", nombre);
        }

        if (message.includes("{direccion}")) {
          message = message.replace("{direccion}", direccion);
        }

        if (message.includes("{telefono}")) {
          message = message.replace("{telefono}", telefono);
        }

        simplifiedRespons[i].ResResponse = message;
      } else {
        return "No hay respuestas";
      }
    }

    return simplifiedRespons;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

responseController.createResponse = async (response) => {
  const { ResTitle, ResResponse } = response;

  if (!ResTitle || !ResResponse) {
    return "Datos incompletos";
  }

  try {
    await Respon.create(response);

    return "Respuesta creada";
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

responseController.updateResponse = async (id, response) => {
  const { ResTitle, ResResponse } = response;

  if (!ResTitle || !ResResponse) {
    return "Datos incompletos";
  }
  try {
    await Respon.update(response, {
      where: {
        ResId: id,
      },
    });

    return "Respuesta actualizada";
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

responseController.deleteResponse = async (id) => {
  try {
    await Respon.destroy({
      where: {
        ResId: id,
      },
    });

    return "Respuesta eliminada";
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = responseController;
