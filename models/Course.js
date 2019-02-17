
const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    name: String,
    url: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }   
})

courseSchema.statics.format = (course) => {
    return {
        id: course._id,
        name: course.name,
        url: course.url,
        user: course.user
    }
}

const Course = mongoose.model('Course', courseSchema)

module.exports = Course