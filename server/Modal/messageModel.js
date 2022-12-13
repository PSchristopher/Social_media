const mongoose = require('mongoose')
const ChatModel = require('./chatModel')


const MessageSchema = new mongoose.Schema({
    chatId: {
        type: String,
        ref:ChatModel
    },
    senderId: {
        type: String,
    },
    text:{
        type:String
    }
},
    {
        timestamps: true,
    }
)

const MessageModel = mongoose.model("message",MessageSchema)
module.exports = MessageModel     