const mongoose = require('mongoose')
const user = require("./user")

let commentDataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref:user,
        required: true
    },
    Comment: {
        type: String,
        required: true
    },
    Likes:Array,
    created:{
        type:Date,
        default:Date.now
    }
})

let userCommentSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Types.ObjectId,
        required:true,
    },
    Comments:[commentDataSchema]
})

const Comment = mongoose.model('Comments', userCommentSchema)
module.exports = Comment
