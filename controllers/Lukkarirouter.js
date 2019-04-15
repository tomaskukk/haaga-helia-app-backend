const lukkariRouter = require('express').Router()
const axios = require('axios')
const fs = require('fs')

lukkariRouter.get('/:tunnus', async (request, response) => {
  try {
    const tunnus = request.params.tunnus
    const haeRyhmaKalenteri = await axios.post(`https://lukkarit.haaga-helia.fi/haeRyhmaKalenteri.php?ryhmanimi=${tunnus}`)

    let sessionCookie = (haeRyhmaKalenteri.headers['set-cookie'][0]).split(';')[0]
    const config = {
      headers: { 'Cookie': sessionCookie }
  }


    console.log(sessionCookie)
    const paivitaKori = await axios.get(`https://lukkarit.haaga-helia.fi/paivitaKori.php?toiminto=addGroup&code=${tunnus.toUpperCase()}&viewReply=true`, config)
    
    const kalenteri = await axios.get(`https://lukkarit.haaga-helia.fi/kalenteri.php`, config)
      
    response.send(`${sessionCookie}\n` + kalenteri.data)

  } catch(exception) {
    console.log(exception)
  }
})


lukkariRouter.get('/:week/:cookie', async (request, response) => {
  try {
    const week = request.params.week

    const cookie = request.params.cookie

    console.log(cookie)

    const config = {
      headers: { 'Cookie': cookie }
  }
    const kalenteri = await axios.get(`https://lukkarit.haaga-helia.fi/kalenteri.php?date=${week}`, config)
      
    response.send(kalenteri.data)

  } catch(exception) {
    console.log(exception)
  }
})

module.exports = lukkariRouter