const Delivery = require("../models/DeliveryModel.js");
const regex = /^[0-9]+$/;
const deliveryController = {};

deliveryController.getDeliverys = async () => {
  try {
    const deliverys = await Delivery.findAll();

    const simplifiedDeliverys = deliverys.map(
      (delivery) => delivery.dataValues
    );

    return simplifiedDeliverys;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

deliveryController.getDelivery = async (id) => {
  try {
    const deliverys = await Delivery.findOne({
      where: {
        DelId: id,
      },
    });

    return deliverys;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

deliveryController.createDelivery = async (delivery) => {
  const { DelName, DelPhone } = delivery;
  if (!DelName || !DelPhone) {
    return "Datos incompletos";
  }

  if (!regex.test(DelPhone)) {
    return "El teléfono debe ser numérico";
  }

  try {
    await Delivery.create(delivery);

    return "Repartidor creado";
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

deliveryController.updateDelivery = async (id, delivery) => {
  const { DelName, DelPhone } = delivery;

  if (!DelName || !DelPhone) {
    return "Datos incompletos";
  }

  if (!regex.test(DelPhone)) {
    return "El teléfono debe ser solo números";
  }

  try {
    await Delivery.update(delivery, {
      where: {
        DelId: id,
      },
    });

    return "Repartidor actualizado";
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

deliveryController.deleteDelivery = async (id) => {
  try {
    await Delivery.destroy({
      where: {
        DelId: id,
      },
    });

    return "Repartidor eliminado";
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = deliveryController;
