const { Schema, model } = require('mongoose')

const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    website: {
        type: String,
        default: ""
    },
    occupation: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    photo: {
        type: String,
        default: ""
    },
}, { timestamps: true })

module.exports = model('customers', customerSchema)