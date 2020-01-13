const lukkariRouter = require('express').Router()
const axios = require('axios')


lukkariRouter.get('/:tunnus', async (request, response) => {
    const tunnus = request.params.tunnus
    var request = require('request');

    const params = new URLSearchParams()
    params.append('hakukohde', 'ryhma')
    params.append('hakusana', tunnus.toString())
    
    const firstRequest = await axios.post('https://lukkarit.haaga-helia.fi/teeHaku.php', params)

    let sessionCookie = (firstRequest.headers['set-cookie'][0]).split(';')[0]

    const config = { headers: { 'Cookie': sessionCookie } }

    const res = firstRequest.data.toString();
    const splitResponse = res.split('toteutuksenVarausLista.php?code=')
    let codes = []
    for (let i = 1; i < splitResponse.length; i++) {
      let splitPos = splitResponse[i].indexOf("','")
      codes.push(splitResponse[i].substr(0, splitPos))
    }

    let codeParam = '';
    codes.map(c => codeParam += c + '%2C')
    codeParam = codeParam.substr(0, codeParam.length - 3)  
    await axios.get(`https://lukkarit.haaga-helia.fi/paivitaKori.php?toiminto=addMulti&code=${codeParam}&viewReply=true`, config)
    
    const kalenteri = await axios.get(`https://lukkarit.haaga-helia.fi/kalenteri.php`, config)
    response.send(`${sessionCookie}\n` + kalenteri.data)

});



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