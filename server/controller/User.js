const User = require('../Modal/user')
const ChatModel = require('../Modal/chatModel')
const userVerification = require('../Modal/userVerfication')
const newPost = require('../Modal/post')
const CommentSchema = require('../Modal/comment')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var multer = require('../config/multterConfig');
const mongoose = require('mongoose');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDERMAIL,
        pass: process.env.SENDERPASS
    }
})

const sendOtp = async (result, res) => {
    console.log("result");
    console.log(result);
    let OTP = (Math.floor(100000 + Math.random() * 900000)).toString()
    try {
        console.log("OTP");
        console.log(OTP);
        var senEMail = {
            from: process.env.SENDERMAIL,
            to: result.email,
            subject: 'Sending Email My Instagram',
            text: `Hi ${result.fullname} Your OTP pin has been generated `,
            html: `<h1>Hi ${result.fullname}</h1><p>Your OTP is ${OTP}</p>`
        }


        let hashOTP = await bcrypt.hash(OTP, 10)
        let verify = await userVerification.findOne({ userId: result._id })
        console.log("verify");
        console.log(verify);
        if (!verify) {
            console.log("new verification");
            const userverification = await new userVerification({
                userId: result._id,
                Otp: hashOTP,
                Created: Date.now(),
                Expiry: Date.now() + 100000
            })
            await userverification.save()
        } else {
            console.log("else");
            await userVerification.updateOne({ userId: result._id }, {
                $set: {
                    Otp: hashOTP
                }
            })
        }

        transporter.sendMail(senEMail, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                res.json({
                    status: "pending",
                    msg: "Verification otp mail sent",
                    mail: result.email,
                    user: result
                })
            }
        });
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    create: async (req, res) => {

        try {
            console.log("HII");
            let user = await User.findOne({ email: req.body.email })
            let userName = await User.findOne({ UserName: req.body.lname })
            console.log(user);
            if (userName.UserName == req.body.lname) {
                res.status(200).json({ message: 'User name Already Exists' })
            } else {


                if (user && user.status == "verified") {
                    res.status(200).json({ message: 'Entered Email already exists' })
                } else {
                    if (user) {
                        console.log("hii");
                        sendOtp(user, res)
                    } else {


                        let Securedpwd = await bcrypt.hash(req.body.password, 10)
                        const newUser = new User({
                            fullname: req.body.fname,
                            UserName: req.body.lname,
                            email: req.body.email,
                            password: Securedpwd,
                            pwd: req.body.password
                        })
                        newUser.save().then((result) => {
                            console.log("result");
                            console.log(result);
                            // res.status(200).json(result)
                            sendOtp(result, res)

                        }).catch(error => { console.log(error); })
                    }
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    },

    resendOTP: async (req, res) => {
        sendOtp(req.body, res).then((response) => {
            res.status(200).json(true)
        })

    },

    verifyOtp: async (req, res) => {
        console.log("dfgh");
        console.log(req.body.OTP);
        let OtpVerify = await userVerification.findOne({ userId: req.body.user })
        console.log(OtpVerify);
        let correctOtp = await bcrypt.compare(req.body.OTP, OtpVerify.Otp)
        console.log("correctOtp");
        console.log(correctOtp);
        if (correctOtp) {
            await User.updateOne({ _id: req.body.user }, { $set: { status: 'verified' } })
            res.status(200).json({ verified: true })
        } else {
            res.status(200).json({ verified: false, msg: "Incorrect OTP" })
        }
    },


    login: async (req, res) => {
        try {
            let userExist = await User.findOne({ email: req.body.email })

            if (userExist) {

                let pass = await bcrypt.compare(req.body.password, userExist.password)
                if (userExist.status != 'verified') {
                    res.status(200).json({ log: false, message: 'You havent Completed you verification' })
                } else {


                    if (pass) {
                        // const token = jwt.sign({ user: user.name, id: user._id }, "jwtSecret", { expiresIn: 300 })
                        // res.status(200).json({ msg: false, token: token, auth: true })
                        const userToken = jwt.sign({ user: userExist.fullname, id: userExist._id }, "jwtSecret", { expiresIn: 3000 })

                        res.status(200).json({ log: true, token: userToken, User: userExist, auth: true })
                    } else {
                        res.status(200).json({ log: false, message: 'Incorrect Password' })
                    }
                }
            } else {
                res.status(200).json({ log: false, message: "Entered Email does not Exist" })
            }

        } catch (error) {
            console.log(error);
        }
    },
    forgotPassword: async (req, res) => {
        console.log(req.body)
        let userExist = await User.findOne({ email: req.body.email })
        if (userExist) {
            sendOtp(userExist, res).then((response) => {

                res.status(200).json({ status: true, user: userExist })
            })
        } else {
            console.log("else");
            res.status(200).json({ status: false, msg: "Entered Email Doesnot Exist" })
        }
    },
    resetPassword: async (req, res) => {
        try {
            console.log(req.body);
            let resetPass = await User.findOne({ email: req.body.email })
            console.log(resetPass);
            let hashedPass = await bcrypt.hash(req.body.password, 10)
            let usedPass = await bcrypt.compare(req.body.password, resetPass.password)

            if (usedPass) {
                res.status(200).json({ status: false, msg: "Enter a password not used before" })
            } else {
                await User.updateOne({ email: req.body.email }, {
                    $set: {
                        password: hashedPass,
                        pwd: req.body.password
                    }
                }).then((response) => {

                    console.log("response");
                    console.log(response);
                    res.status(200).json({ status: true })
                }).catch(error => console.log(error))
            }

        } catch (error) {
            console.log(error);
            res.status(500).json("something went Wrong")
        }

    },
    verifyJWT: (req, res, next) => {
        const token = req.headers["x-access-token"];
        if (!token) {
            res.json({ message: "We need a token, please give it to us next time", auth: false });
        } else {
            jwt.verify(token, "jwtSecret", (err, decoded) => {
                if (err) {
                    console.log(err);
                    res.json({ auth: false, message: "you are failed to authenticate" });
                } else {
                    next();
                }
            });
        }
    },


    jwtVari: (req, res) => {
        res.json({ auth: true, message: "You are authenticated Congrats" });
    },



    uploadPost: async (req, res) => {
        console.log(req.file.filename);
        try {
            const postData = new newPost({
                userId: mongoose.Types.ObjectId(req.body.User),
                image: req.file.filename,
                description: req.body.Caption,
                Created: Date.now(),

            })
            let result = postData.save()
            if (result) {
                res.status(200).json({ status: true })
            } else {
                res.status(200).json({ status: false })
            }
        } catch (error) {
            console.log(error);
        }
    },

    getPost: async (req, res) => {
        try {
            let posts = await newPost.find().populate('userId').sort({ _id: -1 })

            if (posts) {
                res.status(200).json({ result: true, feed: posts })
            }
        } catch (error) {
            console.log(error);
        }
    },

    getUserPost: async (req, res) => {
        try {
            let UserPosts = await newPost.find({ userId: req.params.id })
            // console.log("UserPosts");

            // console.log(UserPosts);

            if (UserPosts) {

                res.status(200).json({ result: true, feed: UserPosts })
            }

        } catch (error) {
            console.log(error);
        }

    },

    getUserDetails: async (req, res) => {
        try {

            let getUserDetails = await User.findById(req.params.id)
            res.status(200).json(getUserDetails)
        } catch (error) {
            res.status(400)
        }
    },
    editProfile: async (req, res) => {

        try {
            console.log('try');

            let editUser = await User.findById(req.params.id)
            let allUser = await User.find({ _id: { $nin: req.params.id } })
            console.log("allUser");
            console.log(allUser);
            console.log("editUser");

            if (allUser.UserName == req.body.UserName) {
                console.log('usernameindu');
                res.status(200).json({ Update: false, msg: "User name already Exist" })
            } else {
                if (editUser) {
                    console.log("else");
                    if (req.file) {

                        var file = true
                    } else {

                        var file = false
                    }
                    let edit = await User.updateOne({ _id: req.params.id }, {
                        $set: {
                            // image: req.file.filename ? req.file.filename : editUser.image,
                            image: file ? req.file.filename : editUser.image,
                            fullname: req.body.Fullname ? req.body.Fullname : editUser.fullname,
                            UserName: req.body.UserName ? req.body.UserName : editUser.UserName,
                            about: req.body.about ? req.body.about : editUser.about,
                            mobile: req.body.phone ? req.body.phone : editUser.mobile
                        }
                    }, { upsert: true })
                    if (edit) {
                        res.status(200).json({ Update: true, msg: "Updated Successfully " })
                    } else {
                        res.status(200).json({ Update: false, msg: "Update not done" })
                    }
                } else {
                    console.log("kerilla");
                    res.status(400).json("something went wrong")
                }

            }
        } catch (error) {
            // res.status(500).json(error)
            console.log("error");
            console.log(error.message);
        }
    },

    likes: async (req, res) => {
        try {

            let data = { postid: "", userId: "" }
            data = req.body
            let post = await newPost.findById(data.postid)

            if (!post.Likes.includes(req.body.userId)) {
                await post.updateOne({ $push: { Likes: req.body.userId } })
                // console.log(post);
                res.status(200).json({ message: 'post Liked' })
            } else {
                await post.updateOne({ $pull: { Likes: req.body.userId } })
                // console.log(post);
                res.status(200).json({ message: 'post disliked!' })
            }

        } catch (error) {
            console.log(error);
        }
    },


    postComment: async (req, res) => {
        console.log('req.body');
        console.log(req.body);
        let commentData = await CommentSchema.findOne({ postId: req.body.postId })
        // console.log(commentData);
        if (commentData) {
            if (req.body.userId && req.body.postId && req.body.Comment) {
                await CommentSchema.findOneAndUpdate({ postId: req.body.postId }, {
                    $push: {
                        Comments: {
                            userId: req.body.userId,
                            Comment: req.body.Comment,
                        }
                    }
                }).then((response) => {
                    console.log('sucesss');
                    res.status(200).json(true)
                })
            } else {
                res.status(200).json(false)
            }
        } else {
            console.log("hhhhhhhhhhhhhhhh");
            const Comments = new CommentSchema({
                postId: req.body.postId,
                Comments: {
                    userId: req.body.userId,
                    Comment: req.body.Comment,

                }
            })
            Comments.save().then((response) => {
                res.status(200).json(true)
            })
        }

    },

    getComments: async (req, res) => {
        console.log(req.query.postId);

        let CommentData = await CommentSchema.findOne({ postId: req.query.postId }).populate('Comments.userId')
        // let CommentData = await CommentSchema.aggregate[{}]
        console.log("CommentData");
        console.log(CommentData);
        res.status(200).json(CommentData)
    },

    searchUsers: async (req, res) => {
        console.log(req.query.searchdata);
        var q = req.query.searchdata
        let users = await User.find({ UserName: { $regex: new RegExp(q, 'i') } })
        console.log(users);
        res.json(users)

    },

    followUser: async (req, res) => {
        console.log(req.body);
        try {
            const user = await User.findById({ _id: req.body.userId })
            const friendToFollow = await User.findById({ _id: req.body.friendsId })
            if (!user.following.includes(req.body.friendsId)) {
                await user.updateOne({ $push: { following: req.body.friendsId } })
                await friendToFollow.updateOne({ $push: { followers: req.body.userId } })
                res.status(200).json('Followed')
            } else {
                res.status(403).json('You are already following this user')
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).json(error)
        }
    },

    unFollowUser: async (req, res) => {
        try {
            console.log(req.body);
            const user = await User.findById({ _id: req.body.userId })
            const userToUnfollow = await User.findById({ _id: req.body.friendsId })
            if (user.following.includes(req.body.friendsId)) {
                await user.updateOne({ $pull: { following: req.body.friendsId } })
                await userToUnfollow.updateOne({ $pull: { followers: req.body.userId } })
                res.status(200).json('Unfollowed')
            } else {
                res.status(403).json('you already unfollowed this user')
            }
        } catch (error) {
            res.status(500).json({ message: "something went wrong" })
        }
    }

  

}