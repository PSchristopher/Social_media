const mongoose = require('mongoose')
const user = require("./user")
const post = require('./post')

const reportSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Types.ObjectId,
    },

    reportReason: {
        type: String,
        required: true
    },
    
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref:user
    },

    Created: Date,

})
const report = mongoose.model('Reports', reportSchema)
module.exports = report