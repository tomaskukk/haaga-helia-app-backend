const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const amicaRouter = require("./controllers/AmicaRouter");
const timetableRouter = require("./controllers/TimetableRouter");
const partiesRouter = require("./controllers/PartiesRouter");
const trafficRouter = require("./controllers/TrafficRouter");

app.use(cors());
app.use(bodyParser.json());
app.use("/api/amica", amicaRouter);
app.use("/api/lukkari", timetableRouter);
app.use("/api/kide", partiesRouter);
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
