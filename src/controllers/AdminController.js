const admin = require("../models/AdminModel.js");
const adminController = {};
const Crypto = require("../middleware/crypto");

adminController.login = async (req, res) => {
  try {
    const {
      AdmPass,
      AdmUser
    } = req;

    const usu = await admin.findOne({
      where: {
        AdmUser: AdmUser,
      },
      attributes: ["AdmPass"],
    });

    const encryptedPass = await Crypto.verify(AdmPass, usu.dataValues.AdmPass);

    if (encryptedPass) {
      return "Credenciales correctas";
    } else {
      return "Creedenciales incorrectas";
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

adminController.create = async (req, res) => {
  try {
    const {
      AdmUser,
      AdmPass
    } = req;

    const isCreated = await admin.findOne({
      where: {
        AdmUser: AdmUser,
      },
    });

    if (isCreated) {
      return "El usuario ya existe";
    }

    const encryptedPass = await Crypto.encrypt(AdmPass);
    const newAdmin = await admin.create({
      AdmUser,
      AdmPass: encryptedPass,
    });
    if (newAdmin) {
      return "Usuario creado correctamente";
    } else {
      return "Error al crear el usuario";
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = adminController;