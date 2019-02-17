const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    passHash: String,
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
})

userSchema.statics.format = (user) => {
    return {
        id: user.id,
        username: user.username,
        name: user.name,
        courses: user.courses
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User