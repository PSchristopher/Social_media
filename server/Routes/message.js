const express = require("express")
const router = express.Router()
const messageControl = require('../controller/messageControl')
const UserControl = require('../controller/User')

router.post('/', UserControl.verifyJWT,messageControl.addMessage)
router.get('/:chatId', UserControl.verifyJWT,messageControl.getMessages)


module.exports = router;