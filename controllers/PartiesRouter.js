const partiesRouter = require("express").Router();
const axios = require("axios");
const fs = require("fs");

const thisDayAsJSON = () =>
  new Date()
    .toJSON()
    .substr(0, 10)
    .toString();

const yesterDayAsJson = () => {
  const thisDay = new Date();
  const yesterday = new Date();
  yesterday.setDate(thisDay.getDate() - 1);
  return yesterday
    .toJSON()
    .substr(0, 10)
    .toString();
};

partiesRouter.get("/", async (req, res) => {
  try {
    if (fs.existsSync(`kideapp${thisDayAsJSON()}.json`)) {
      console.log("file exists");
      let data = fs.readFileSync(`kideapp${thisDayAsJSON()}.json`);
      let parsedData = JSON.parse(data);
      res.send(parsedData);
      return;
    }
    console.log("kideapp file does not exist");
    const response = await axios.get(
      `https://api.kide.app/api/products?city=${encodeURIComponent('Pääkaupunkiseutu')}`
    );
    console.log("got response kideapp");
    let resStringify = JSON.stringify(response.data);
    fs.writeFileSync(`kideapp${thisDayAsJSON()}.json`, resStringify);
    if (fs.existsSync(`kideapp${yesterDayAsJson()}.json`)) {
      fs.unlink(`kideapp${yesterDayAsJson()}.json`, err => {
        if (err) throw err;
        console.log("kideapp yesterday was deleted");
      });
    }
    res.send(response.data);
  } catch (exception) {
    console.log(exception);
  }
});

module.exports = partiesRouter;
