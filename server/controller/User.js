const User = require('../Modal/user')
const userVerification = require('../Modal/userVerfication')
const newPost = require('../Modal/post')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var multer = require('../config/multterConfig')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDERMAIL,
        pass: process.env.SENDERPASS
    }
})

const sendOtp = async (result, res) => {

    try {
        const OTP = await (Math.floor(100000 + Math.random() * 900000)).toString()
        console.log("OTP");
        console.log(OTP);
        var senEMail = {
            from: process.env.SENDERMAIL,
            to: result.email,
            subject: 'Sending Email My Instagram',
            text: `Hi ${result.first_name} Your OTP pin has been generated `,
            html: `<h1>Hi ${result.first_name}</h1><p>Your OTP is ${OTP}</p>`
        }


        let hashOTP = await bcrypt.hash(OTP, 10)
        let verify = await userVerification.findOne({ userId: result._id })
        if (!verify) {
            const userverification = new userVerification({
                userId: result._id,
                Otp: hashOTP,
                Created: Date.now(),
                Expiry: Date.now() + 100000
            })
            await userverification.save()
        } else {
            await userVerification.updateOne({ userId: result._id }, { otp: hashOTP })
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
            if (user) {
                res.status(200).json({ message: 'Entered Email already exists' })
            } else {
                let Securedpwd = await bcrypt.hash(req.body.password, 10)
                const newUser = new User({
                    first_name: req.body.fname,
                    last_name: req.body.lname,
                    email: req.body.email,
                    password: Securedpwd,
                    pwd: req.body.password
                })
                newUser.save().then((result) => {

                    // res.status(200).json(result)
                    sendOtp(result, res)

                }).catch(error => { console.log(error); })
            }

        } catch (error) {
            console.log(error.message);
        }
    },

    verifyOtp: async (req, res) => {
        console.log(req.body.OTP);
        let OtpVerify = await userVerification.findOne({ userId: req.body.user })

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
                        const userToken = jwt.sign({ user: userExist.fname, id: userExist._id }, "jwtSecret", { expiresIn: 3000 })

                        res.status(200).json({ log: true, token: userToken, User: userExist._id, auth: true })
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
        try {
            const postData = new newPost({
                userId: req.body.User,
                image: req.file.filename,
                Created: Date.now(),
                description: req.body.Caption
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
            let posts = await   newPost.find().sort({_id:-1})
            console.log(posts);
            if (posts) {
                res.status(200).json({result:true,feed:posts})
            }
        } catch (error) {
            console.log(error);
        }
    }

}