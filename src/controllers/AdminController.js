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
      attributes: ["AdmPass", "AdmRole", "AdmId"],
    });

    const encryptedPass = await Crypto.verify(AdmPass, usu.dataValues.AdmPass);
    if (encryptedPass) {
      return {
        role: usu.dataValues.AdmRole,
        admin: usu.dataValues.AdmId
      };
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
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

adminController.getAdmin = async (id) => {
  try {
    const Adm = await admin.findOne({
      where: {
        AdmId: id,
      },
      attributes: ["AdmUser", "AdmRole", "AdmId"],
    });

    return Adm;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = adminController;