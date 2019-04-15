const axios = require('axios')

let lastDate = new Date().getDate()
console.log(lastDate)

let events

const resolvers = {
     allEvents: () => {
     lastDate === thisDay() ? console.log(thisDay(), lastDate) : updateData()
     return events
    }
}

const thisDay = () => new Date().getDate()

const updateData = async () => {
  const response = await axios.get('https://api.bailataan.fi/api/products?city=Pääkaupunkiseutu')
  console.log("got response kideapp")
  let resStringify = JSON.stringify(response.data.model)
  events = JSON.parse(resStringify)
  lastDate = thisDay()
}

updateData()

module.exports = resolvers
