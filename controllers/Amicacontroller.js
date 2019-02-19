const amicaRouter = require('express').Router()
const axios = require('axios')
    
const thisDay = new Date()
const thisDayAsJSON = thisDay.toJSON().substr(0, 10).toString()  

console.log(thisDayAsJSON)

amicaRouter.get('/pasila', async (req, res) => {
    try {
        const response = await axios.get(`https://www.fazerfoodco.fi/api/restaurant/menu/week?language=en&restaurantPageId=177431&weekDate=${thisDayAsJSON}`)
        console.log(response.data)
        res.send(response.data)
    } catch(exception) {
        console.log(exception)
    }
   
})

amicaRouter.get('/malmi', async (req, res) => {
    try {
        const response = await axios.get(`https://www.amica.fi/api/restaurant/menu/week?language=en&restaurantPageId=7498&weekDate=${thisDayAsJSON}`)
        console.log(response.data)
        res.send(response.data)
    } catch(exception) {
        console.log(exception)
    }
   
})

amicaRouter.get('/haaga', async (req, res) => {
    try {
        const response = await axios.get(`https://www.fazerfoodco.fi/api/restaurant/menu/week?language=en&restaurantPageId=244046&weekDate=${thisDayAsJSON}`)
        console.log(response.data)
        res.send(response.data)
    } catch(exception) {
        console.log(exception)
    }
   
})

module.exports = amicaRouter