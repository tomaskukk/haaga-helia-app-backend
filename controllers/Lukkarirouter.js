const lukkariRouter = require('express').Router()
const axios = require('axios')

lukkariRouter.get('/:tunnus', async (request, response) => {
  try {
    const tunnus = request.params.tunnus
    const haeRyhmaKalenteri = await axios.post(`https://lukkarit.haaga-helia.fi/haeRyhmaKalenteri.php?ryhmanimi=${tunnus}`)

    let sessionCookie = (haeRyhmaKalenteri.headers['set-cookie'][0]).split(';')[0]
    console.log(sessionCookie)
    console.log(typeof sessionCookie)
    const config = {
      headers: { 'Cookie': sessionCookie }
  }

    const paivitaKori = await axios.get(`https://lukkarit.haaga-helia.fi/paivitaKori.php?toiminto=addGroup&code=${tunnus.toUpperCase()}&viewReply=true`, config)
    
    const kalenteri = await axios.get(`https://lukkarit.haaga-helia.fi/kalenteri.php`, config)
      

    let kalenteriData = (kalenteri.data)
    console.log(kalenteriData)
    console.log(kalenteriData.includes('Minna'))
    response.send(kalenteri.data)

  } catch(exception) {
    console.log(exception)
  }
})

module.exports = lukkariRouter