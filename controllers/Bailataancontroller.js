const bailataanRouter = require('express').Router()
const axios = require('axios')
const fs = require('fs')

const thisDay = new Date()
const thisDayAsJSON = thisDay.toJSON().substr(0, 10).toString()  

const yesterDay = new Date()
yesterDay.setDate(thisDay.getDate() - 1)
const yesterDayAsJson = yesterDay.toJSON().substr(0, 10).toString()

bailataanRouter.get('/', async (req, res) => {
  try {
      if (fs.existsSync(`kideapp${thisDayAsJSON}.json`)) {
          console.log("file exists")
          let data = fs.readFileSync(`kideapp${thisDayAsJSON}.json`)
          let parsedData = JSON.parse(data)
          res.send(parsedData)
          return
      }
      console.log("kideapp file does not exist")
      const response = await axios.get('https://api.bailataan.fi/api/products?city=helsinki')
      console.log("got response kideapp")
      let resStringify = JSON.stringify(response.data)
      fs.writeFileSync(`kideapp${thisDayAsJSON}.json`, resStringify)
      fs.unlink(`kideapp${yesterDayAsJson}.json`, (err) => {
        if (err) throw err;
        console.log("kideapp yesterday was deleted")
    })
      res.send(response.data)
  } catch(exception) {
      console.log(exception)
  }
 
})

module.exports = bailataanRouter 