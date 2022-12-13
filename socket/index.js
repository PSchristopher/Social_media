const io = require('socket.io')(8800, {
    cors: {
        origin: "http://localhost:3000"
    }
})

let activeUsers = []

io.on("connection", (socket) => {

    // add new user

    socket.on('new-user-add', (newUserId) => {
        // if new user is not added previously
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id
            })
        }
        console.log("connected users   ", activeUsers);

        io.emit('get-users', activeUsers)
    })


    // send message

    socket.on('send-message', (data) => {
        const { receiverId } = data;
        const user = activeUsers.find((user) => user.userId === receiverId)
        console.log("Sending from socket to :", receiverId);
        console.log("Data", data);
        if (user) {
            io.to(user.socketId).emit('receive-message', data)
        }
    })

    // notifications

    socket.on('send-notification', (data) => {
        console.log(data,"notifi");
        
        const { senderId, receiverId, description } = data
        const user = activeUsers.find((user) => user.userId === receiverId)
        console.log("biritto",user);   
        if (user) {
            io.to(user.socketId).emit('get-notification', { senderId, description })
        }
    })


    socket.on('disconnect', () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
        console.log("user disconnected", activeUsers);

        io.emit('get-users', activeUsers)

    })


})