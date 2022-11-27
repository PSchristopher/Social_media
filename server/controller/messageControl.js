const MessageModel = require('../Modal/messageModel')


module.exports = {

    addMessage: async (req, res) => {
        try {
            const { chatId, senderId, text } = req.body
            const message = new MessageModel({
                chatId,
                senderId,
                text
            })
            const result = await message.save()
            if (result) {
                res.status(200).json(result)
            } else {
                res.status(200).json("something went wrong")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getMessages: async (req, res) => {
        try { 
            const { chatId } = req.params
            const result = await MessageModel.find({ chatId })
            if (result) {   
                console.log("result");
                console.log(result);
                res.status(200).json(result)
            } else {
                res.status(200).json("something went wrong")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }


}

