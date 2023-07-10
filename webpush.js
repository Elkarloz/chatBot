const webpush = require("web-push");
const PUBLIC_VAPID_KEY = "BLJZy0MYo7AMs4JYuMMLgJ2oiSwTYDb-AUV8xMpriMVOzKQrGBHSp1-tnHFT0OsCaQnEL7Iw0auZn0L8Lp47Ckk";
const PRIVATE_VAPID_KEY = "lg8OKyCe0SfXLdwgDFH6qf4JsDud4OVXR5lVQX0S-UI"

webpush.setVapidDetails(
  "mailto:test@faztweb.com",
  PUBLIC_VAPID_KEY,
  PRIVATE_VAPID_KEY
);

module.exports = webpush;