const express = require("express"),
  path = require("path"),
  route = require("./routes"),
  app = express(),
  WebSocket = require("ws");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/", route.start);
app.use("/Api/Response", route.apiResponse);
app.use("/Api/Delivery", route.apiDelivery);
app.use("/Api/Chat", route.apiChat);

const server = app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000...");
});

const wss = new WebSocket.Server({ server }),
  botController = require("./controllers/BotController");

botController.main(wss);
