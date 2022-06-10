import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { currentUserFollowUnFollowUpdates } from './redux/authSlicer';
import { createNewNotification } from './redux/notifySlicer';
import { postCommentCreate, postCommentDelete, postCommentLikeUpdate, postCommentUpdate, postLikeUpdate } from './redux/postsSlicer';
import { profileFollowUnFollowUpdates } from './redux/profileSlicer';

const SocketClient = () => {
    const { currentUser, socket } = useSelector(store => store.currentUser)
    //const { socket } = useSelector(store => store.socket)
    const dispatch = useDispatch()

    useEffect(() => {
        socket.emit("joinUser", currentUser._id)
    }, [socket, currentUser])

    //receive emitted LIKE POST event
    useEffect(() => {
        socket.on("likePostToClient", (newPost) => {
            //console.log(newPost);
            dispatch(postLikeUpdate(newPost))
        })

        return () => socket.off("likePostToClient")
    }, [socket, dispatch])

    //receive emitted createComment event

    useEffect(() => {
        socket.on("createCommentToClient", updatedPost => {
            console.log(updatedPost);
            dispatch(postCommentCreate({ updatedPost }))
        })
        return () => socket.off("createCommentToClient")
    }, [socket, dispatch])

    //receive emitted deleteComment event
    useEffect(() => {
        socket.on("deleteCommentToClient", updatedPost => {
            console.log(updatedPost);
            dispatch(postCommentDelete(updatedPost))
        })
        return () => socket.off("deleteCommentToClient")
    }, [socket, dispatch])

    //receive emitted likeComment event
    useEffect(() => {
        socket.on("likeCommentToClient", updatedPost => {
            console.log(updatedPost);
            dispatch(postCommentLikeUpdate(updatedPost))
        })
        return () => socket.off("likeCommentToClient")
    }, [socket, dispatch])

    //receive emitted replyComment event
    useEffect(() => {
        socket.on("replyCommentToClient", updatedPost => {
            console.log(updatedPost);
            dispatch(postCommentCreate({ updatedPost }))
        })
        return () => socket.off("replyCommentToClient")
    }, [socket, dispatch])

    //receive emitted updateComment event
    useEffect(() => {
        socket.on("updateCommentToClient", updatedPost => {
            console.log(updatedPost);
            dispatch(postCommentUpdate(updatedPost))
        })
        return () => socket.off("updateCommentToClient")
    }, [socket, dispatch])

    //receive emitted Follow UnFollow event
    useEffect(() => {
        socket.on("followUnFollowToClient", newUser => {
            //console.log(newUser);
            dispatch(currentUserFollowUnFollowUpdates({ followers: newUser.followers, followings: newUser.followings }))
        })
        return () => socket.off("followUnFollowToClient")
    }, [socket, dispatch])

    /*------------ NOTIFICATIONS-------- */

    //receive emitted new post create notification
    useEffect(() => {
        socket.on("createPostNotifyToClient", postNotify => {
            //console.log(newUser);
            dispatch(createNewNotification(postNotify))
        })
        return () => socket.off("createPostNotifyToClient")
    }, [socket, dispatch])

    //receive emitted LIKE POST notification
    useEffect(() => {
        socket.on("createNotifyPostLikeToClient", newPost => {
            //console.log(newPost);
            dispatch(createNewNotification(newPost))
        })

        return () => socket.off("createNotifyPostLikeToClient")
    }, [socket, dispatch])

    //receive emitted Comment Reply notification
    useEffect(() => {
        socket.on("createNotifyReplyCommentToClient", newPost => {
            //console.log(newPost);
            dispatch(createNewNotification(newPost))
        })

        return () => socket.off("createNotifyReplyCommentToClient")
    }, [socket, dispatch])

    //receive emitted Comment POST notification
    useEffect(() => {
        socket.on("createNotifyPostCommentToClient", newPost => {
            //console.log(newPost);
            dispatch(createNewNotification(newPost))
        })

        return () => socket.off("createNotifyPostCommentToClient")
    }, [socket, dispatch])

    //receive emitted Comment Like notification
    useEffect(() => {
        socket.on("createNotifyLikeCommentToClient", newPost => {
            //console.log(newPost);
            dispatch(createNewNotification(newPost))
        })

        return () => socket.off("createNotifyLikeCommentToClient")
    }, [socket, dispatch])

    //receive emitted Add Follow notification
    useEffect(() => {
        socket.on("createNotifyAddFollowToClient", newPost => {
            //console.log(newPost);
            dispatch(createNewNotification(newPost))
        })

        return () => socket.off("createNotifyAddFollowToClient")
    }, [socket, dispatch])



    return (
        <>

        </>
    )
}

export default SocketClient
