const ChatModel = require("../Modal/chatModel")


module.exports = {
    createChat: async (req, res) => {

        // try {
        //     const newChat = new ChatModel({
        //         members: [req.body.senderId, req.body.receiverId]
        //     })
        //     const result = await newChat.save()
        //     if (result) {
        //         res.status(200).json(result)
        //     } else {
        //         res.status(500).json('something went wrong')
        //     }
        // } catch (error) {
        //     res.status(500).json(error)
        // }

    },

    userChats: async (req, res) => {

        try {
            const chat = await ChatModel.find({
                members: { $in: [req.params.userId] }
            })
            if (chat) {
                res.status(200).json(chat)
            } else {
                res.status(500).json('database Error')
            }
        } catch (error) {
            res.status(500).json(error)

        }
    },

    findChat: async (req, res) => {
        console.log("req.params");
        console.log(req.params);
        try {
            const chat = await ChatModel.findOne({
                members: { $all: [req.params.firstId, req.params.secondId] }
            })
            if (chat) {
                res.status(200).json(chat)
            } else {
              
                // res.status(200).json('something went wrong')


                const newChat = new ChatModel({
                    members: [req.params.firstId, req.params.secondId]
                })
                const result = await newChat.save()
                if (result) {
                    console.log(result);
                    res.status(200).json(result)
                } else {
                    res.status(500).json('something went wrong')
                }
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

}