const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    passHash: String,
    lukkari: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lukkari' }]
})

userSchema.statics.format = (user) => {
    return {
        id: user.id,
        username: user.username,
        name: user.name,
        lukkari: user.lukkari
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User