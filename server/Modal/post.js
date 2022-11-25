const mongoose = require('mongoose')
const user = require("./user")
const newPostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: user
    },

    image: {
        type: String,
        required: true
    },
    Likes: Array,
    description: String,
    deletedStatus: {
        type: Boolean,
        default: false
    },




    Created: Date,

})
const newPost = mongoose.model('Posts', newPostSchema)
module.exports = newPost