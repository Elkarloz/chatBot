const express = require("express"),
  path = require("path"),
  route = require("./routes"),
  app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/", route.start);
app.use("/Deliverys", route.deliverys);
app.use("/Responses", route.responses);
app.use("/Api/Response", route.apiResponse);
app.use("/Api/Delivery", route.apiDelivery);


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
