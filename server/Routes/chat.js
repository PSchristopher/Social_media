const express = require("express")
const router = express.Router()
const ChatControl = require('../controller/chatControl')
const UserControl = require('../controller/User')

router.post("/", UserControl.verifyJWT,ChatControl.createChat)
router.get('/:userId', UserControl.verifyJWT,ChatControl.userChats)
router.get('/find/:firstId/:secondId', UserControl.verifyJWT,ChatControl.findChat)



module.exports = router;