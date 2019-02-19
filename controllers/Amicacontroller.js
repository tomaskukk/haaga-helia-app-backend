const amicaRouter = require('express').Router()
const axios = require('axios')
const fs = require('fs')
    
const thisDay = new Date()
const thisDayAsJSON = thisDay.toJSON().substr(0, 10).toString()  

console.log(thisDayAsJSON)

amicaRouter.get('/pasila', async (req, res) => {
    try {
        if (fs.existsSync(`amicapasila${thisDayAsJSON}.json`)) {
            console.log("file exists")
            let data = fs.readFileSync(`amicapasila${thisDayAsJSON}.json`)
            let parsedData = JSON.parse(data)
            res.send(parsedData)
            return
        }
        console.log("amicapasila file does not exist")
        const response = await axios.get(`https://www.fazerfoodco.fi/api/restaurant/menu/week?language=en&restaurantPageId=177431&weekDate=${thisDayAsJSON}`)
        console.log("got response pasila")
        let resStringify = JSON.stringify(response.data)
        fs.writeFileSync(`amicapasila${thisDayAsJSON}.json`, resStringify)
        res.send(response.data)
    } catch(exception) {
        console.log(exception)
    }
   
})

amicaRouter.get('/malmi', async (req, res) => {
    try {
        if (fs.existsSync(`amicamalmi${thisDayAsJSON}.json`)) {
            console.log("file exists")
            let data = fs.readFileSync(`amicamalmi${thisDayAsJSON}.json`)
            let parsedData = JSON.parse(data)
            res.send(parsedData)
            return
        }
        console.log("amicamalmi file does not exist")
        const response = await axios.get(`https://www.amica.fi/api/restaurant/menu/week?language=en&restaurantPageId=7498&weekDate=${thisDayAsJSON}`)
        console.log("got response malmi")
        let resStringify = JSON.stringify(response.data)
        fs.writeFileSync(`amicamalmi${thisDayAsJSON}.json`, resStringify)
        res.send(response.data)
    } catch(exception) {
        console.log(exception)
    }
   
})

amicaRouter.get('/haaga', async (req, res) => {
    try {
        if (fs.existsSync(`amicahaaga${thisDayAsJSON}.json`)) {
            console.log("file exists")
            let data = fs.readFileSync(`amicahaaga${thisDayAsJSON}.json`)
            let parsedData = JSON.parse(data)
            res.send(parsedData)
            return
        }
        console.log("amicahaaga file does not exist")
        const response = await axios.get(`https://www.fazerfoodco.fi/api/restaurant/menu/week?language=en&restaurantPageId=244046&weekDate=${thisDayAsJSON}`)
        console.log("got response haaga")
        let resStringify = JSON.stringify(response.data)
        fs.writeFileSync(`amicahaaga${thisDayAsJSON}.json`, resStringify)
        res.send(response.data)
    } catch(exception) {
        console.log(exception)
    }
   
})

module.exports = amicaRouter