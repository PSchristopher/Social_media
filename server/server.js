require("dotenv").config();
const express = require('express')
const server =express()
const userRouter =require('./Routes/user')
const adminRouter =require('./Routes/admin')
const chatRouter = require("./Routes/chat")
const messageRouter = require('./Routes/message')
const bodyParser =require('body-parser')
const cors = require('cors')
const {connectDb}=require('./config/connection')

server.use(express.json())
server.use(bodyParser.urlencoded({extended:true}))
server.use(cors())

/* --------------------------------- routes --------------------------------- */
server.use('/',userRouter)
server.use('/admin',adminRouter)
server.use('/chat',chatRouter)
server.use('/message',messageRouter)

/* ---------------------------- connect database ---------------------------- */

connectDb()

/* ------------------------------ port connect ------------------------------ */
const port = process.env.PORT || 4000
server.listen(port,()=>{
    console.log('Server started successfully on 4000');
})


module.exports = server;