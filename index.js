const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const amicaRouter = require("./controllers/Amicacontroller");
const lukkariRouter = require("./controllers/Lukkarirouter");
const bailataanRouter = require("./controllers/Bailataancontroller");
const trafficRouter = require("./controllers/Trafficcontroller");

app.use(cors());
app.use(bodyParser.json());
app.use("/api/amica", amicaRouter);
app.use("/api/lukkari", lukkariRouter);
app.use("/api/kide", bailataanRouter);
app.use("/api/traffic", trafficRouter);
app.use(express.static("build"));
app.use(express.static("public"));

const server = http.createServer(app);

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("close", () => {
  mongoose.connection.close();
});

module.exports = {
  app,
  server
};
