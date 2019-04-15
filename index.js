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
const graphqlHTTP = require('express-graphql')
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
app.use('/api/ruokala', trafficRouter)
app.use('/api/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers
}))
app.use(express.static('build'))

const server = http.createServer(app);

server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
})

server.on("close", () => {
    mongoose.connection.close()
})

module.exports = {
    app,
    server
}