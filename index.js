const express = require("express");
var cors = require("cors");

const mongoose = require("mongoose");
const BoardSettings = require("./models/BoardSettingsSchema");
require("dotenv").config();

const app = express();
const cardRoutes = require("./routes/cards");
const settingsRoutes = require("./routes/settings");
const laneRoutes = require("./routes/lanes");
const port = process.env.NODE_ENV === "development" ? 4500 : 3000;

const cors = require("cors");

app.use(cors());
app.use(express.json());
const connectionOptions = {
  dbName: `kanbanBoard`,
  replicaSet: "rs0",
};

app.use((req, res, next) => {
  const key = req.headers["x-api-key"];
  const rightkey = process.env.API_KEY;

  if (key == rightkey) {
    next();
  } else {
    res.status(401).send("Unauthorized access: No API key provided");
  }
});

app.use("/cards", cardRoutes);
app.use("/settings", settingsRoutes);
app.use("/lanes", laneRoutes);

mongoose
  .connect(
    "mongodb://myadmin:mypassword@195.20.255.56:27017,195.20.255.56:27018",
    connectionOptions
  )
  .then(() => console.log("Connected to DB!"))
  .catch((err) => console.error("Connection error:", err));

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
