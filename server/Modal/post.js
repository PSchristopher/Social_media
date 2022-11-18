const mongoose = require('mongoose')
const newPostSchema = new mongoose.Schema({
    userId: String,
    image: {
        type: String,
        required: true
    },
    Created: Date,
    description: String
})
const newPost = mongoose.model('Posts', newPostSchema)
module.exports = newPost