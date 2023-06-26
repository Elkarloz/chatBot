const Respon = require("../models/ResponseModel.js");

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
