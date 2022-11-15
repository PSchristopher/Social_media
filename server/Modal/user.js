const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pwd: {
        type: String,

    },
    profile: {
        type: String
    },
    status: {
        type: String,
        default: "pending"
    },
    report_status: {
        type: Boolean,
        default: false

    },
    created: {
        type: Date,
        default: Date.now
    }
})
const user = mongoose.model('user', userSchema)
module.exports = user