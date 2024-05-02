const express = require("express");
const mongoose = require("mongoose");
const BoardSettings = require("./models/BoardSettingsSchema");
require("dotenv").config();

const app = express();
const cardRoutes = require("./routes/cards");
const settingsRoutes = require("./routes/settings");
const laneRoutes = require("./routes/lanes");

app.use(express.json());
const connectionOptions = {
  dbName: `kanbanBoard`,
  replicaSet: "rs0",
};
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use((req, res, next) => {
  const key = req.headers["x-api-key"];
  const rightkey = process.env.API_KEY;

  console.log(key, rightkey);

  if (key === process.env.API_KEY) {
    console.log("valid");
    next();
  } else {
    res.status(401).send("Unauthorised");
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

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
