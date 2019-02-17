const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('courses', { __v: 0, user: 0 })

    console.log(users.map(User.format))
    response.json(users.map(User.format))
})

usersRouter.get('/:id', async (request, response) => {
	try {
        const user = await User
        .findById(request.params.id)
        .populate('courses', { __v: 0, user: 0 })
		response.json(User.format(user))
	} catch(exception) {
		console.log(exception)
		response.status(400).send({ error: 'malformatted id' })
	}
})


usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        const existingUser = await User.find({username: body.username})
        if (existingUser.length > 0) {
            return response.status(400).json({ error: 'username must be unique' })
        }

        const saltRounds = 10
        const passHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passHash
        })

        const savedUser = await user.save()

        response.json(User.format(savedUser))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong' })
    }
})

module.exports = usersRouter