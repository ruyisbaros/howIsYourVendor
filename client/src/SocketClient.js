import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { currentUserFollowUnFollowUpdates } from './redux/authSlicer';
import { postCommentCreate, postCommentDelete, postCommentLikeUpdate, postCommentUpdate, postLikeUpdate } from './redux/postsSlicer';
import { profileFollowUnFollowUpdates } from './redux/profileSlicer';

const SocketClient = () => {
    const { currentUser, socket } = useSelector(store => store.currentUser)
    //const { socket } = useSelector(store => store.socket)
    const dispatch = useDispatch()

    useEffect(() => {
        socket.emit("joinUser", currentUser._id)
    }, [socket, currentUser])

    //receive emitted LIKE event
    useEffect(() => {
        socket.on("likeToClient", (newPost) => {
            console.log(newPost);
            dispatch(postLikeUpdate(newPost))
        })

        return () => socket.off("likeToClient")
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



    return (
        <>

        </>
    )
}

export default SocketClient
