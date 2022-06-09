const mongoose = require('mongoose')
const { Schema } = mongoose

const clientSchema = new Schema ({
    key: {
        type: Number
    },
    businessCode: {
        type: String
    },
    name: {
        type: String
    },
    items: {
        type: Object
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = Client = mongoose.model('clients', clientSchema)