const express = require("express")
const router = express.Router()
const ChatControl = require('../controller/chatControl')

router.post("/",ChatControl.createChat)
router.get('/:userId',ChatControl.userChats)
router.get('/find/:firstId/:secondId',ChatControl.findChat)



module.exports = router;