
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
                socket.to(`${client?.socketId}`).emit('likePostToClient', newPost)

            })
        } else {
            return false;
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
                socket.to(`${client.socketId}`).emit('createCommentToClient', (updatedPost))

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

        socket.to(`${user.socketId}`).emit('followUnFollowToClient', newUser)
    })

    /*----------- NOTIFICATIONS---------- */

    //Create new Post Notify
    socket.on("createPostNotify", postNotify => {
        //console.log(postNotify);
        let clients = users.filter(user => postNotify.recipients.includes(user.id))
        function removeDuplicateObjectFromArray(array, key) {
            let check = new Set();
            return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
        }

        clients = removeDuplicateObjectFromArray(clients, 'id')
        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('createPostNotifyToClient', postNotify)

            })
        }
    })
    //refactor
    //Create Post Like Notify
    socket.on("createNotifyPostLike", postNotify => {
        console.log("refactor:" + postNotify);
        let user = users.filter(user => user.id === postNotify.recipients[0])
        console.log(user);
        function removeDuplicateObjectFromArray(array, key) {
            let check = new Set();
            return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
        }

        user = removeDuplicateObjectFromArray(user, 'id')
        console.log(user);
        socket.to(`${user[0].socketId}`).emit('createNotifyLikeCommentToClient', postNotify)
    })
    //refactor
    //Create comment reply Notify
    socket.on("createNotifyReplyComment", postNotify => {
        //console.log("refactor:" + postNotify);
        let user = users.filter(user => user.id === postNotify.recipients[0])
        //console.log(user);
        function removeDuplicateObjectFromArray(array, key) {
            let check = new Set();
            return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
        }

        user = removeDuplicateObjectFromArray(user, 'id')
        //console.log(user);
        socket.to(`${user[0].socketId}`).emit('createNotifyLikeCommentToClient', postNotify)
    })
    //refactor
    //Create Post comment Notify
    socket.on("createNotifyPostComment", postNotify => {
        console.log("refactor:" + postNotify);
        let user = users.filter(user => user.id === postNotify.recipients[0])
        console.log(user);
        function removeDuplicateObjectFromArray(array, key) {
            let check = new Set();
            return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
        }

        user = removeDuplicateObjectFromArray(user, 'id')
        console.log(user);
        socket.to(`${user[0].socketId}`).emit('createNotifyLikeCommentToClient', postNotify)
    })
    //refactor
    //Create comment like Notify
    socket.on("createNotifyLikeComment", postNotify => {
        //console.log("refactor:" + postNotify);
        let user = users.filter(user => user.id === postNotify.recipients[0])
        //console.log(user);
        function removeDuplicateObjectFromArray(array, key) {
            let check = new Set();
            return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
        }

        user = removeDuplicateObjectFromArray(user, 'id')
        //console.log(user);
        socket.to(`${user[0].socketId}`).emit('createNotifyLikeCommentToClient', postNotify)
    })
    //refactor
    // Follow UnFollow Notify
    socket.on("createNotifyAddFollow", (newUser) => {
        //console.log(newUser);
        const user = users.find(user => user.id === newUser.recipients[0])
        //console.log(user);
        socket.to(`${user.socketId}`).emit('createNotifyAddFollowToClient', newUser)
    })
}

module.exports = socketServer