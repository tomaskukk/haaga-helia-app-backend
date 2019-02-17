const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const courseRouter = require("./controllers/Coursecontroller")
const config = require("./utils/config")
const usersRouter = require('./controllers/Usercontroller')
const loginRouter = require('./controllers/Logincontroller')
const amicaRouter = require('./controllers/Amicacontroller')


mongoose.connect(config.mongoUrl)
    .then( () => {
        console.log("Connected to db ", config.mongoUrl)
    })
    .catch(err => {
        console.log(err);
    })
  

app.use(cors())
app.use(bodyParser.json())
app.use("/api/courses", courseRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/amica', amicaRouter)

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