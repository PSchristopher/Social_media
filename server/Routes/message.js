const express = require("express")
const router = express.Router()
const messageControl = require('../controller/messageControl')

router.post('/',messageControl.addMessage)
router.get('/:chatId',messageControl.getMessages)


module.exports = router;