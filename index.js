const express = require("express");
const server = express();

const cors = require("cors");
server.use(cors());

const morgan = require("morgan");
server.use(morgan("dev"));

server.use(express.json());

const path = require("path");
server.use(express.static(path.join(__dirname, "build")));

const dotenv = require("dotenv");
dotenv.config();

server.use("/api", require("./routes"));

server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const client = require("./db/client");

server.use((error, req, res, next) => {
  res.status(500).send(error);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}!`);

  try {
    client.connect();
    console.log("Database is connected!");
  } catch (error) {
    console.error("Database unable to load!\n", error);
  }
});
