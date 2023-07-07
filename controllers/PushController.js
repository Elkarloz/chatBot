const admin = require("../models/adminModel");
const webpush = require("../middleware/webPush");
const PushController = {};

PushController.updateToken = async (req, aux) => {
  try {
    const pushSubscripton = req.body;
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
PushController.newMessage = async (req, aux) => {
  message = req.body.message;
  const pushSubscripton = await admin.findOne({
    where: { AdmUser: aux },
    attributes: ["AdmToken"],
  });

  console.log(pushSubscripton.AdmToken);

  // Payload Notification
  const payload = JSON.stringify({
    title: "¡¡Tienes una nueva notificación!!",
    message,
  });

  const tokenJson = JSON.parse(pushSubscripton.AdmToken);
  const endpoint = tokenJson.endpoint;
  const keys = tokenJson.keys;

  const pushSubscription = {
    endpoint: endpoint,
    keys: {
      p256dh: keys.p256dh,
      auth: keys.auth,
    },
  };

  try {
    await webpush.sendNotification(pushSubscription, payload);
    return "Notificación enviada";
  } catch (error) {
    console.log(error);
  }
};

module.exports = PushController;
