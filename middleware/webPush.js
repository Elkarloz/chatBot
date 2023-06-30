const webpush = require("web-push");
const { PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY } = process.env;


webpush.setVapidDetails(
  "mailto:test@faztweb.com",
  "BBWhAPd2a_7CQD0--ZxdKUCtxjPrWt3UbqrSL0JO_-D6pAMgpGnWNkK0zfqci9fbg5TPWFjjU1vPMjzd5lcHA48",
  "Ecoa23xssXFFJzmsmuzS8DE6lW8yCRIdvcxCC2N2kwc"
);

module.exports = webpush;