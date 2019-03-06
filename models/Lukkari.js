
const mongoose = require('mongoose')

const lukkariSchema = new mongoose.Schema({
    html: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }   
})

lukkariSchema.statics.format = (lukkari) => {
    return {
        id: lukkari._id,
        html: lukkari.url,
        user: lukkari.user
    }
}

const Lukkari = mongoose.model('Lukkari', lukkariSchema)

module.exports = Lukkari