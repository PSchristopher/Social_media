const express = require("express")
const router = express.Router()
const UserControl = require('../controller/User')
var upload = require('../config/multterConfig')


router.post('/create_user', UserControl.create)
router.post('/login', UserControl.login)
router.post('/forgotPassword', UserControl.forgotPassword)
router.post('/resetPassword', UserControl.resetPassword)
router.get('/isUserAuth', UserControl.verifyJWT, UserControl.jwtVari)
router.post('/resendOTP', UserControl.resendOTP)
router.post('/verifyOtp', UserControl.verifyOtp)
router.post('/newPost', UserControl.verifyJWT, upload.single('image'), UserControl.uploadPost)
router.get('/getPost/:id', UserControl.verifyJWT, UserControl.getPost)
router.get('/getUserDtails/:id', UserControl.verifyJWT, UserControl.getUserDetails)
router.get('/getUserPost/:id', UserControl.verifyJWT, UserControl.getUserPost)
router.post('/editProfile/:id', UserControl.verifyJWT, upload.single('image'), UserControl.editProfile)
router.post('/likes', UserControl.verifyJWT, UserControl.likes)
router.post('/postComment', UserControl.verifyJWT, UserControl.postComment)
router.get('/getComments', UserControl.verifyJWT, UserControl.getComments)
router.get('/searchUsers', UserControl.verifyJWT, UserControl.searchUsers)

router.put('/followUser', UserControl.verifyJWT, UserControl.followUser)
router.put('/unfollowUser', UserControl.verifyJWT, UserControl.unFollowUser)


router.get('/following',UserControl.following)
router.get('/followers',UserControl.followers)
router.delete('/deletePost/:id',UserControl.deletePost)
router.put('/postReport',UserControl.postReport)

router.post('/onlineUsers',UserControl.onlineUsers)

router.get('/editPost',UserControl.editPost)

router.get('/getNotification/:id',UserControl.getNotification)

router.get('/getNotiCount/:id',UserControl.getNotiCount)

router.put('/readStatus',UserControl.readStatus)

router.put('/updatePost',UserControl.updatePost)


module.exports = router;