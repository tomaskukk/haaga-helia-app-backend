const amicaRouter = require('express').Router()
const axios = require('axios')
const fs = require('fs')
    
const getThisDay = () => new Date()

const thisDayAsJSON = () => new Date().toJSON().substr(0, 10).toString()

const tomorrowAsJSON = () => {
    const d = getThisDay()
    d.setDate(d.getDate() + 1)
    return d.toJSON().substr(0, 10).toString()
}


const yesterDayAsJson = () => {
    const thisDay = new Date()
    const yesterday = new Date()
    yesterday.setDate(thisDay.getDate() - 1)
    return yesterday.toJSON().substr(0, 10).toString()
}

amicaRouter.get('/pasila/:lang', async (req, res) => {
    try {   
        const lang = req.params.lang
        console.log(lang)
        

        if (fs.existsSync(`${lang}amicapasila${thisDayAsJSON()}.json`)) {
            console.log("file exists PASILA")
            let data = fs.readFileSync(`${lang}amicapasila${thisDayAsJSON()}.json`)
            let parsedData = JSON.parse(data)
            res.send(parsedData)
            return
        }
        console.log("amicapasila file does not exist")
        const response = await axios.get(`https://www.fazerfoodco.fi/api/restaurant/menu/week?language=${lang}&restaurantPageId=177431&weekDate=${tomorrowAsJSON()}`)
        console.log("got response pasila")
        let resStringify = JSON.stringify(response.data)
        fs.writeFileSync(`${lang}amicapasila${thisDayAsJSON()}.json`, resStringify)
        if (fs.existsSync(`${lang}amicapasila${yesterDayAsJson()}.json`)) {
        fs.unlink(`${lang}amicapasila${yesterDayAsJson()}.json`, (err) => {
            if (err) throw err;
            console.log("Pasila yesterday was deleted")
        })}
        res.send(response.data)
    } catch(exception) {
        console.log(exception)
    }
   
})

amicaRouter.get('/malmi/:lang', async (req, res) => {
    try {
        const lang = req.params.lang
        console.log(lang)
        if (fs.existsSync(`${lang}amicamalmi${thisDayAsJSON()}.json`)) {
            console.log("file exists MALMI")
            let data = fs.readFileSync(`${lang}amicamalmi${thisDayAsJSON()}.json`)
            let parsedData = JSON.parse(data)
            res.send(parsedData)
            return
        }
        console.log("amicamalmi file does not exist")
        const response = await axios.get(`https://www.amica.fi/api/restaurant/menu/week?language=${lang}&restaurantPageId=7498&weekDate=${tomorrowAsJSON()}`)
        console.log("got response malmi")
        let resStringify = JSON.stringify(response.data)
        fs.writeFileSync(`${lang}amicamalmi${thisDayAsJSON()}.json`, resStringify)
        if (fs.existsSync(`${lang}amicamalmi${yesterDayAsJson()}.json`)) {
        fs.unlink(`${lang}amicamalmi${yesterDayAsJson()}.json`, (err) => {
            if (err) throw err;
            console.log("malmi yesterday was deleted")
        })}
        res.send(response.data)
    } catch(exception) {
        console.log(exception)
    }
})
   

amicaRouter.get('/haaga/:lang', async (req, res) => {
    try {

        const lang = req.params.lang
        console.log(lang)
        if (fs.existsSync(`${lang}amicahaaga${thisDayAsJSON()}.json`)) {
            console.log("file exists HAAGA")
            let data = fs.readFileSync(`${lang}amicahaaga${thisDayAsJSON()}.json`)
            let parsedData = JSON.parse(data)
            res.send(parsedData)
            return
        }
        console.log("amicahaaga file does not exist")
        const response = await axios.get(`https://www.fazerfoodco.fi/api/restaurant/menu/week?language=${lang}&restaurantPageId=244046&weekDate=${tomorrowAsJSON()}`)
        console.log("got response haaga")
        let resStringify = JSON.stringify(response.data)
        fs.writeFileSync(`${lang}amicahaaga${thisDayAsJSON()}.json`, resStringify)
        if (fs.existsSync(`${lang}amicahaaga${yesterDayAsJson()}.json`)) {
        fs.unlink(`${lang}amicahaaga${yesterDayAsJson()}.json`, (err) => {
            if (err) throw err;
            console.log("haaga yesterday was deleted")
        })}
        res.send(response.data)
    } catch(exception) {
        console.log(exception)
    }
   
})

module.exports = amicaRouter