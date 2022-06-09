const mongoose = require('mongoose')
const { Schema } = mongoose

const ticketSchema = new Schema ({
    client: {
        type: String
    },
    site: {
        type: String
    },
    product: {
        type: String
    },
    problem: {
        type: String
    },
    idResource: {
        type: String
    },
    ip: {
        type: String
    },
    type: {
        type: String
    },
    status: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = Ticket = mongoose.model('tickets', ticketSchema)