const express = require("express")
const router = express.Router()
const UserControl = require('../controller/User')
var upload = require('../config/multterConfig')


router.post('/create_user',UserControl.create)
router.post('/login',UserControl.login)
router.get('/isUserAuth',UserControl.verifyJWT ,  UserControl.jwtVari)
router.post('/verifyOtp',UserControl.verifyOtp )
router.post('/newPost',upload.single('image'),UserControl.uploadPost )
router.get('/getPost',UserControl.getPost)

module.exports = router;