import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { postLikeUpdate } from './redux/postsSlicer';

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

    return (
        <>

        </>
    )
}

export default SocketClient
