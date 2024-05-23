const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const createDefaultCards = require("./routes/settings");
const resetDefaultLanes = require("./routes/settings");
const assignLanes = require("./routes/settings");
const mongoose = require("mongoose");
const BoardSettings = require("./models/BoardSettingsSchema");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "*", credentials: true }));

const server = http.createServer(app);
//we will allow all origins for now but in production we should change this to the actual domain of the frontend.
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "x-api-key"],
    credentials: true,
  },
});
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const cardRoutes = require("./routes/cards");
const settingsRoutes = require("./routes/settings");
const laneRoutes = require("./routes/lanes");
const port = process.env.NODE_ENV === "development" ? 4500 : 3000;
const username = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;

app.use(cors({ origin: "*", credentials: true }));

app.use(express.json());
const connectionOptions = {
  dbName: "kanbanBoard",
  replicaSet: "rs0",
};

app.use((req, res, next) => {
  const key = req.headers["x-api-key"];
  const rightKey = process.env.API_KEY;

  if (key === rightKey) {
    next();
  } else {
    res.status(401).send("Unauthorized access: No API key provided");
  }
});
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");

    resetDefaultLanes()
      .then(() => {
        createDefaultCards(() => {
          assignLanes(() => {
            console.log("reset completed");
          });
        });
      })
      .catch((error) => {
        console.error("error resetting things back: ", error);
      });
  });
});
app.use("/cards", cardRoutes);
app.use("/settings", settingsRoutes);
app.use("/lanes", laneRoutes);

mongoose
  .connect(
    "mongodb://" + username + ":" + password + "@mongo1:27017",
    connectionOptions
  )
  .then(() => console.log("Connected to DB!"))
  .catch((err) => console.error("Connection error:", err));

server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
