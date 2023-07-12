require("dotenv").config();
const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const route = require("./routes");
const bodyParser = require("body-parser");
const WebSocket = require("ws");
const botController = require("./controllers/BotController");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));
app.use(express.json({
  limit: "10mb"
}));
app.use(express.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use("/", route.start);
app.use("/Api/Response", route.apiResponse);
app.use("/Api/Delivery", route.apiDelivery);
app.use("/Api/Chat", route.apiChat);
app.use("/Api/Push", route.apiPush);
app.use("/Api/Admin", route.apiAdmin);

const sslOptions = {
  key: fs.readFileSync("/etc/letsencrypt/live/desarrollo.tuzumitos.com/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/desarrollo.tuzumitos.com/fullchain.pem")
};

const server = https.createServer(sslOptions);
const wss = new WebSocket.Server({
  server
});
botController.main(wss);

server.listen(4000, () => {
  console.log('Servidor HTTPS/WSS iniciado en el puerto 3000');
});


app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000 con SSL...");
});