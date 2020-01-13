const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require("./utils/config")
const amicaRouter = require('./controllers/Amicacontroller')
const resolvers = require('./controllers/Bailataancontroller')
const lukkariRouter = require('./controllers/Lukkarirouter')
const trafficRouter = require('./controllers/Trafficcontroller')
const bailataanRouter = require('./controllers/Bailataancontroller')
const schema = require('./models/Event')

/* mongoose.connect(config.mongoUrl)
    .then( () => {
        console.log("Connected to db ", config.mongoUrl)
    })
    .catch(err => {
        console.log(err);
    }) 
   */



app.use(cors())
app.use(bodyParser.json())
/* app.use('/api/personallukkari', personalLukkariRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter) */
app.use('/api/amica', amicaRouter)
app.use('/api/lukkari', lukkariRouter)
// app.use('/api/ruokala', trafficRouter)
app.use('/api/kide', bailataanRouter)
app.use(express.static('build'))

const server = http.createServer(app);

const PORT = 3001

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

server.on("close", () => {
    mongoose.connection.close()
})

module.exports = {
    app,
    server
}