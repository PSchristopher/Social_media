const mongoose = require('mongoose')
const user = require("./user")


const notificationSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    Notifications: [{
        user: {
            type: String,
            ref: user
        },

        desc: {
            type: String
        },
        time: {
            type: Date
        },
        readStatus:{
            type:Boolean,
            default:false
        }
    }]



})

const notiSchema = mongoose.model("Notifications", notificationSchema)
module.exports = notiSchema 