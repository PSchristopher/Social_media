const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    UserName: {
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
        type: String,
        default: "active"

    },
    created: {
        type: Date,
        default: Date.now
    },
    image :{
        type:String,
        default:''
    },
    about:{
       type:String,
       default:'Tell about Your self' 
    },
    mobile:{
        type:Number,
        default:91
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]

    }
})
const user = mongoose.model('user', userSchema)
module.exports = user