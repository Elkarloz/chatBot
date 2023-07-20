const express = require("express");
const path = require("path");
const route = require("./src/routes");
const bodyParser = require("body-parser");
const session = require("express-session");
const port = 3000;
const app = express();
const http = require("http");
const socketIO = require("socket.io");
const bot = require("./src/controllers/BotController.js");

app.use((req, res, next) => {
  res.header("Cache-Control", "no-store");
  res.header("Pragma", "no-cache");
  next();
});

app.use(
  session({
    secret: "9B9PyW4kEk03A35",
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/src/views"));
app.use([
  express.static(__dirname + "/public"),
  express.json({
    limit: "10mb",
  }),
  express.urlencoded({
    extended: true,
  }),
]);

app.use(bodyParser.json());

app.use("/", route.view);
app.use("/api/admin", route.apiAdmin);
app.use("/api/responses", route.apiResponse);
app.use("/api/delivery", route.apiDelivery);

const server = http.createServer(app);
const io = socketIO(server);

bot.start(io);

server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
