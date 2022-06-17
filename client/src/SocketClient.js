import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { currentUserFollowUnFollowUpdates } from './redux/authSlicer';
import { checkUserOnlineOffline, closeTyping, createSingleChat, deleteAMessage, openTyping } from './redux/messageSlicer';
import { createNewNotification, openAlert } from './redux/notifySlicer';
import { postCommentCreate, postCommentDelete, postCommentLikeUpdate, postCommentUpdate, PostCreateSuccess, postLikeUpdate } from './redux/postsSlicer';


const SocketClient = () => {


    const { currentUser, socket } = useSelector(store => store.currentUser)
    const { alert } = useSelector(store => store.notifies)
    const dispatch = useDispatch()




    useEffect(() => {
        socket.emit("joinUser", currentUser)
    }, [socket, currentUser])

    //receive emitted Create new POST event
    useEffect(() => {
        socket.on("createANewPostToClient", (newPost) => {
            //console.log(newPost);
            dispatch(PostCreateSuccess(newPost))
            //alert(`${newPost.owner.username} liked your post`)
        })

        return () => socket.off("createANewPostToClient")
    })

    //receive emitted LIKE POST event
    useEffect(() => {
        socket.on("likePostToClient", (newPost) => {
            //console.log(newPost);
            dispatch(postLikeUpdate(newPost))
            //alert(`${newPost.owner.username} liked your post`)
        })

        return () => socket.off("likePostToClient")
    })

    //receive emitted createComment event

    useEffect(() => {
        socket.on("createCommentToClient", (updatedPost) => {
            console.log(updatedPost);
            dispatch(postCommentCreate({ updatedPost }))
            // alert(updatedPost.owner.username)
        })
        return () => socket.off("createCommentToClient")
    })

    //receive emitted deleteComment event
    useEffect(() => {
        socket.on("deleteCommentToClient", updatedPost => {
            console.log(updatedPost);
            dispatch(postCommentDelete(updatedPost))
        })
        return () => socket.off("deleteCommentToClient")
    })

    //receive emitted likeComment event
    useEffect(() => {
        socket.on("likeCommentToClient", updatedPost => {
            console.log(updatedPost);
            dispatch(postCommentLikeUpdate(updatedPost))
        })
        return () => socket.off("likeCommentToClient")
    })

    //receive emitted replyComment event
    useEffect(() => {
        socket.on("replyCommentToClient", updatedPost => {
            console.log(updatedPost);
            dispatch(postCommentCreate({ updatedPost }))
        })
        return () => socket.off("replyCommentToClient")
    })

    //receive emitted updateComment event
    useEffect(() => {
        socket.on("updateCommentToClient", updatedPost => {
            console.log(updatedPost);
            dispatch(postCommentUpdate(updatedPost))
        })
        return () => socket.off("updateCommentToClient")
    })

    //receive emitted Follow UnFollow event
    useEffect(() => {
        socket.on("followUnFollowToClient", newUser => {
            //console.log(newUser);
            dispatch(currentUserFollowUnFollowUpdates({ followers: newUser.followers, followings: newUser.followings }))
        })
        return () => socket.off("followUnFollowToClient")
    })

    /*------------ NOTIFICATIONS-------- */

    //receive emitted new post create notification
    useEffect(() => {
        socket.on("createPostNotifyToClient", postNotify => {
            //console.log(newUser);
            dispatch(createNewNotification(postNotify))

        })
        return () => socket.off("createPostNotifyToClient")
    })

    //receive emitted LIKE POST notification
    useEffect(() => {
        socket.on("createNotifyPostLikeToClient", newPost => {
            console.log(newPost);
            dispatch(createNewNotification(newPost))

        })

        return () => socket.off("createNotifyPostLikeToClient")
    })

    //receive emitted Comment Reply notification
    useEffect(() => {
        socket.on("createNotifyReplyCommentToClient", newPost => {
            //console.log(newPost);
            dispatch(createNewNotification(newPost))
            /* dispatch(openAlert())
            console.log(alert);
            alert && <AlertPage newPost={newPost} /> */
        })

        return () => socket.off("createNotifyReplyCommentToClient")
    })

    //receive emitted Comment POST notification
    useEffect(() => {
        socket.on("createNotifyPostCommentToClient", newPost => {
            //console.log(newPost);
            dispatch(createNewNotification(newPost))
        })

        return () => socket.off("createNotifyPostCommentToClient")
    })

    //receive emitted Comment Like notification
    useEffect(() => {
        socket.on("createNotifyLikeCommentToClient", newPost => {
            //console.log(newPost);
            dispatch(createNewNotification(newPost))
        })

        return () => socket.off("createNotifyLikeCommentToClient")
    })

    //receive emitted View Profile notification
    useEffect(() => {
        socket.on("createNotifyViewProfileToClient", newPost => {
            //console.log(newPost);
            dispatch(createNewNotification(newPost))
        })

        return () => socket.off("createNotifyViewProfileToClient")
    })

    //receive emitted Add Follow notification
    useEffect(() => {
        socket.on("createNotifyAddFollowToClient", newPost => {
            //console.log(newPost);
            dispatch(createNewNotification(newPost))
        })

        return () => socket.off("createNotifyAddFollowToClient")
    }, [socket, dispatch])

    /*------------ CHATS-------- */
    //receive emitted new message
    useEffect(() => {
        socket.on("newMessageToClient", newMessage => {
            //console.log(newMessage);
            dispatch(createSingleChat(newMessage))
        })

        return () => socket.off("newMessageToClient")
    })

    //receive emitted delete message
    useEffect(() => {
        socket.on("deleteAMessageToClient", newMessage => {
            //console.log(newMessage);
            dispatch(deleteAMessage(newMessage._id))
        })

        return () => socket.off("deleteAMessageToClient")
    })

    //receive emitted typing message
    useEffect(() => {
        socket.on("openTypingToClient", () => {
            //console.log(newMessage);
            dispatch(openTyping())
        })

        return () => socket.off("openTypingToClient")
    })

    //receive emitted stop typing message
    useEffect(() => {
        socket.on("closeTypingToClient", () => {
            //console.log(newMessage);
            dispatch(closeTyping())
        })

        return () => socket.off("closeTypingToClient")
    })



    return (
        <>

        </>
    )
}

export default SocketClient
