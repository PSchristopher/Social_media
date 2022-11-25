const express = require("express")
const router = express.Router()
const UserControl = require('../controller/User')
var upload = require('../config/multterConfig')


router.post('/create_user',UserControl.create)
router.post('/login',UserControl.login)
router.post('/forgotPassword',UserControl.forgotPassword)
router.post('/resetPassword',UserControl.resetPassword)
router.get('/isUserAuth',UserControl.verifyJWT ,  UserControl.jwtVari)
router.post('/resendOTP',UserControl.resendOTP)
router.post('/verifyOtp',UserControl.verifyOtp )
router.post('/newPost',upload.single('image'),UserControl.uploadPost )
router.get('/getPost',UserControl.getPost)
router.get('/getUserDtails/:id',UserControl.getUserDetails)
router.get('/getUserPost/:id',UserControl.getUserPost)
router.post('/editProfile/:id',upload.single('image'),UserControl.editProfile )
router.post('/likes',UserControl.likes)
router.post('/postComment',UserControl.postComment)
router.get('/getComments',UserControl.getComments)
router.post('/searchUsers',UserControl.searchUsers)




module.exports = router;