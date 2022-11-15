const express = require("express")
const router = express.Router()
const UserControl = require('../controller/User')

router.post('/create_user',UserControl.create)
router.post('/login',UserControl.login)
router.get('/isUserAuth',UserControl.verifyJWT ,  UserControl.jwtVari)
router.post('/verifyOtp',UserControl.verifyOtp )

module.exports = router;