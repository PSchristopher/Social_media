const mongoose = require('mongoose')
const uri = process.env.MONGOOSE

const connectDb = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
        }, () => {
            console.log('MongoDb Connected Successfully');
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { connectDb }