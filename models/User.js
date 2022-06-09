const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema ({
    user: {
        type: String
    },
    password: {
        type: String
    },
    status: {
        type: String
    },
    lastAccess: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('users', userSchema)