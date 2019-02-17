const amicaRouter = require('express').Router()
const axios = require('axios')
    
const thisDay = new Date()
const thisDayAsJSON = thisDay.toJSON().substr(0, 10).toString()  

amicaRouter.get('/', async (req, res) => {
    try {
        const response = await axios.get(`https://www.fazerfoodco.fi/api/restaurant/menu/week?language=fi&restaurantPageId=177431&weekDate=${thisDayAsJSON}`)
        console.log(response.data)
        res.send(response.data)
    } catch(exception) {
        console.log(exception)
    }
   
})

module.exports = amicaRouter