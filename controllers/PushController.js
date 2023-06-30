const admin = require("../models/adminModel");
const webpush = require("../middleware/webPush");
const PushController = {};
let pushSubscripton;
PushController.updateToken = async (req, aux) => {
  try {
    pushSubscripton = req.body;

    await admin.update(
      { AdmToken: JSON.stringify(pushSubscripton) },
      { where: { AdmUser: aux } }
    );

    return "Token actualizado";
  } catch (error) {
    console.log(error);
  }
};
let message = "";
PushController.newMessage = async (req) => {
  if (req.body) {
    message = req.body;
  }else{
    message = req;
  }
  // Payload Notification
  const payload = JSON.stringify({
    title: "¡¡Tienes una nueva notificación!!",
    message,
  });
  try {
    await webpush.sendNotification(pushSubscripton, payload);
    return "Notificación enviada";
  } catch (error) {
    console.log(error);
  }
};

module.exports = PushController;
