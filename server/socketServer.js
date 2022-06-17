
let users = []

const socketServer = (socket) => {

    //Connect - Disconnect
    socket.on('joinUser', user => {
        //console.log("currentUser: " + user._id);
        users.push({ id: user._id, socketId: socket.id, followers: user.followers, followings: user.followings })
        //console.log(users);
    })
    socket.on('disconnect', () => {
        /* const data = users.find(user => user.socketId !== socket.id)
        console.log("data", data);
        if (data) {
            const clients = users.filter(user =>
                data.followers.find(item => item._id === user.id))
            if (clients.length > 0) {
                clients.forEach(client =>
                    socket.to(`${client.socketId}`).emit("checkUserOffline", data.id))
            }
        } */
        users = users.filter(user => user.socketId !== socket.id)
        //console.log(users);
    })

    //Likes
    socket.on("createANewPost", newPost => {
        //console.log(newPost);
        //console.log(users);
        let IDs = [...newPost.owner.followers, newPost.owner._id]
        let clients = users.filter(user => IDs.includes(user.id))
        //console.log(clients);
        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('createANewPostToClient', newPost)

            })
        }
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
                socket.to(`${client.socketId}`).emit('likePostToClient', newPost)

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

        if (user) {
            socket.to(`${user.socketId}`).emit('followUnFollowToClient', newUser)
        }
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
        /* console.log(user);
        function removeDuplicateObjectFromArray(array, key) {
            let check = new Set();
            return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
        }

        user = removeDuplicateObjectFromArray(user, 'id')
        console.log(user); */
        if (user.length > 0) {
            socket.to(`${user[0].socketId}`).emit('createNotifyPostLikeToClient', postNotify)
        }
    })
    //refactor
    //Create comment reply Notify
    socket.on("createNotifyReplyComment", postNotify => {
        //console.log("refactor:" + postNotify);
        let user = users.filter(user => user.id === postNotify.recipients[0])
        /* //console.log(user);
        function removeDuplicateObjectFromArray(array, key) {
            let check = new Set();
            return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
        }

        user = removeDuplicateObjectFromArray(user, 'id')
        //console.log(user); */
        if (user.length > 0) {
            socket.to(`${user[0].socketId}`).emit('createNotifyReplyCommentToClient', postNotify)
        }
    })
    //refactor
    //Create Post comment Notify
    socket.on("createNotifyPostComment", postNotify => {
        console.log("refactor:" + postNotify);
        let user = users.filter(user => user.id === postNotify.recipients[0])
        /*  console.log(user);
         function removeDuplicateObjectFromArray(array, key) {
             let check = new Set();
             return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
         }
 
         user = removeDuplicateObjectFromArray(user, 'id')
         console.log(user); */
        if (user.length > 0) {
            socket.to(`${user[0].socketId}`).emit('createNotifyPostCommentToClient', postNotify)
        }
    })
    //refactor
    //Create comment like Notify
    socket.on("createNotifyLikeComment", postNotify => {
        //console.log("refactor:" + postNotify);
        let user = users.filter(user => user.id === postNotify.recipients[0])
        //console.log(user);
        /* function removeDuplicateObjectFromArray(array, key) {
            let check = new Set();
            return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
        }

        user && (user = removeDuplicateObjectFromArray(user, 'id')) */
        console.log(user);
        if (user.length > 0) {
            socket.to(`${user[0].socketId}`).emit('createNotifyLikeCommentToClient', postNotify)
        }
    })

    //refactor
    //Create viewed Profile Notify
    socket.on("createNotifyViewProfile", postNotify => {
        //console.log("refactor:" + postNotify);
        let user = users.find(user => user.id === postNotify.recipients[0])
        //console.log(user);
        /* function removeDuplicateObjectFromArray(array, key) {
            let check = new Set();
            return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
        }

        user && (user = removeDuplicateObjectFromArray(user, 'id')) */
        console.log(user);
        if (user) {
            socket.to(`${user.socketId}`).emit('createNotifyViewProfileToClient', postNotify)
        }
    })
    //refactor
    // Follow UnFollow Notify
    socket.on("createNotifyAddFollow", (newUser) => {
        //console.log(newUser);
        const user = users.find(user => user.id === newUser.recipients[0])
        console.log(user);
        if (user) {
            socket.to(`${user.socketId}`).emit('createNotifyAddFollowToClient', newUser)
        }
    })

    /* ---------CHATS------- */
    //New Message
    socket.on("newMessage", ({ data: newMessage, user: socketUser }) => {
        //console.log(newMessage);
        const user = users.find(user => user.id === newMessage.recipient)
        //console.log(user);
        if (user) {
            socket.to(`${user.socketId}`).emit('newMessageToClient', newMessage)
        }
    })
    //Delete Message
    socket.on("deleteAMessage", newMessage => {
        //console.log(newMessage);
        const user = users.find(user => user.id === newMessage.recipient._id)
        //console.log(user);
        if (user) {
            socket.to(`${user.socketId}`).emit('deleteAMessageToClient', newMessage)
        }
    })

    //Typing
    socket.on("openTyping", userId => {
        console.log(userId);
        const user = users.find(user => user.id === userId)
        //console.log(user);
        if (user) {
            socket.to(`${user.socketId}`).emit('openTypingToClient')
        }
    })
    //Stop Typing
    socket.on("closeTyping", userId => {
        console.log(userId);
        const user = users.find(user => user.id === userId)
        //console.log(user);
        if (user) {
            socket.to(`${user.socketId}`).emit('closeTypingToClient')
        }
    })
}

module.exports = socketServer