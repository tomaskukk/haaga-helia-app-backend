const courseRouter = require("express").Router()
const Course = require("../models/Course")
const User = require('../models/User')
const jwt = require('jsonwebtoken')


courseRouter.get("/", async (request, response) => {
	const courses = await Course
	.find({})
	.populate('user', {username: 1, name: 1})

    response.json(courses.map(Course.format))
})



courseRouter.delete('/:id', async (request, response) => {
	try {
		const token = getTokenFrom(request)
		const decodedToken = jwt.verify(token, process.env.SECRET)

		if (!token || !decodedToken.id) {
			return response.status(401).json({ error: 'token missing or invalid' })
		}
		console.log(token)

		await Course.findByIdAndDelete(request.params.id)
		response.status(204).end()
	} catch(exception) {
		console.log(exception)
		response.status(400).send({ error: 'malformatted id' })
	}
})

courseRouter.put('/:id', async (request, response) => {
	const body = request.body
	console.log(body)
	console.log("PUT REQUEST STARTED")
	const course = {
		name: body.name,
		url: body.url,
		user: body.user._id
	}
	console.log(course)
	try {
		console.log("TRYING TO UPDATE COURSE")
		const savedCourse = await Course
			.findByIdAndUpdate(request.params.id, blog, { new: true })
		console.log(savedCourse)
		response.status(204).json(Course.format(savedCourse)).end()
		console.log("COURSE UPDATED SUCCESFULLY")
	} catch(exception) {
		console.log(exception)
		response.status(400).send({ error: 'malformatted if' })
		console.log("COURSE UPDATE UNSUCCESFULL")
	} 
})

const getTokenFrom = (request) => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7)
	}
	return null
}

courseRouter.post("/", async (request, response) => {
	const body = request.body
	try {	
            console.log("LUODAAN UUSI KURSSI")
			const token = getTokenFrom(request)
			const decodedToken = jwt.verify(token, process.env.SECRET)

			if (!token || !decodedToken.id) {
				return response.status(401).json({ error: 'token missing or invalid' })
			}
			
			const user = await User.findById(decodedToken.id)

			const course = new Course({
				name: body.name,
				url: body.url,
				user: user._id
			})
			if (course.name === undefined && course.url === undefined) {
				return response.status(400).json({error: 'Name or url missing'})
			}
			const savedCourse = await course.save()

			user.courses = user.courses.concat(savedCourse._id)
			await user.save()

			response.json(Course.format(course))
		
		} catch (exception) {
			
			console.log(exception)
			response.status(500).json({ error: 'Something went wrong'})
		}
})


 
module.exports = courseRouter