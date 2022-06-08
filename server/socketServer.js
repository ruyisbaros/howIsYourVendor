
let users = []
const socketServer = (socket) => {

    //Connect - Disconnect
    socket.on('joinUser', id => {
        users.push({ id, socketId: socket.id })
        //console.log(users);
    })
    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id)
        //console.log(users);
    })

    //Likes
    socket.on("likePost", newPost => {
        //console.log(newPost);
        //console.log(users);
        let IDs = [...newPost.owner.followers, newPost.owner._id]
        let clients = users.filter(user => IDs.includes(user.id))
        //console.log(clients);
        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('likeToClient', newPost)

            })
        }
    })

    //New comments
    socket.on("createComment", (updatedPost) => {
        //console.log(updatedPost);
        let IDs = [...updatedPost.owner.followers, updatedPost.owner._id]
        let clients = users.filter(user => IDs.includes(user.id))
        //console.log(clients);
        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('createCommentToClient', updatedPost)

            })
        }
    })

    //Delete Comment
    socket.on("deleteComment", (newComment) => {
        //console.log(newComment);
        let IDs = [...newComment.owner.followers, newComment.owner._id]
        let clients = users.filter(user => IDs.includes(user.id))
        //console.log(clients);
        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('deleteCommentToClient', newComment)

            })
        }
    })

    //Like Comment
    socket.on("likeComment", (newComment) => {
        //console.log(newComment);
        let IDs = [...newComment.owner.followers, newComment.owner._id]
        let clients = users.filter(user => IDs.includes(user.id))
        //console.log(clients);
        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('likeCommentToClient', newComment)

            })
        }
    })

    //reply Comment
    socket.on("replyComment", (newComment) => {
        //console.log(newComment);
        let IDs = [...newComment.owner.followers, newComment.owner._id]
        let clients = users.filter(user => IDs.includes(user.id))
        //console.log(clients);
        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('replyCommentToClient', newComment)

            })
        }
    })

    //update Comment
    socket.on("updateComment", (newComment) => {
        //console.log(newComment);
        let IDs = [...newComment.owner.followers, newComment.owner._id]
        let clients = users.filter(user => IDs.includes(user.id))
        //console.log(clients);
        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('updateCommentToClient', newComment)

            })
        }
    })

    //Follow UnFollow a user 
    socket.on("followUnFollow", (newUser) => {
        const user = users.find(user => user.id === newUser._id)
        /* console.log(newUser);
        let IDs = [...newUser.followers, ...newUser.followings, newUser._id]
        let clients = users.filter(user => IDs.includes(user.id))
        //console.log(clients);
        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('followUnFollowToClient', newUser)

            })
        } */
        socket.to(`${user.socketId}`).emit('followUnFollowToClient', user)
    })
}

module.exports = socketServer