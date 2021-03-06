import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom"
import UserCard from '../user/UserCard';
import MsgDisplay from './MsgDisplay';
import Icons from '../posts/Icons'
import axios from 'axios';
import { useNavigate } from "react-router-dom"

import { createSingleChat, deleteFullConversation, getBetweenChats } from '../../redux/messageSlicer';

const RightSide = () => {

    const { currentUser, token, socket } = useSelector(store => store.currentUser)
    const { data, isTyping, typingTo } = useSelector(store => store.messages)
    const [chatMessage, setChatMessage] = useState("")
    const [images, setImages] = useState([])


    const dispatch = useDispatch()
    const displayRef = useRef()
    const typeRef = useRef()
    const navigate = useNavigate()

    const { chatUsers } = useSelector(store => store.messages)

    const { id } = useParams()
    //console.log(id, typingTo);

    const [user, setUser] = useState("")

    useEffect(() => {
        const newUser = chatUsers?.find(user => user._id === id)
        if (newUser) {
            setUser(newUser)
        }
        //console.log(newUser);
    }, [id, chatUsers])

    let newImages = []
    const imageUpload = async (dt) => {
        //dispatch(PostCreateStart())
        const { data } = await axios.post("/api/v1/uploads", dt, {
            headers: { "content-type": "multipart/form-data", authorization: token }
        })
        newImages.push(data)

        setImages([...images, ...newImages])
        //dispatch(PostCreateEnd())
    }
    //console.log(images);
    const handleChatMedia = async (e) => {
        const files = [...e.target.files]

        //console.log(files);

        await files.forEach(file => {
            if (!file) return alert("Please select an image")
            if (file.size > 1024 * 1024 * 5) return alert("Your file is too large (max 5mb allowed)")
            if (file.type !== "image/jpeg" && file.type !== "video/mp4" && file.type !== "image/png") return alert("Only jpeg, jpg, mp4 or PNG images are allowed")
            let formData = new FormData();
            formData.append("file", file);
            imageUpload(formData)

        })
    }

    const deleteImage = (i) => {
        const newArr = [...images]
        newArr.splice(i, 1)
        setImages(newArr)
    }
    //let message;
    const chatSubmit = async (e) => {
        e.preventDefault()

        let message = {
            sender: currentUser._id,
            recipient: id,
            /* createdAt: new Date().toISOString(), */
            chatMessage,
            images
        }

        const { data } = await axios.post("/api/v1/chats/new", { ...message }, {
            headers: { authorization: token }
        })
        console.log(data);
        // setMsgData(data)
        dispatch(createSingleChat(data))
        setChatMessage("")
        setImages([])
        const { _id, avatar, fullName, username } = currentUser
        socket.emit("newMessage", { data, user: { _id, avatar, fullName, username } })
        socket.emit("closeTyping", user._id)

    }

    useEffect(() => {
        if (id) {
            const getMessages = async () => {
                const { data } = await axios.get(`/api/v1/chats/between/${id}`, {
                    headers: { authorization: token }
                })
                dispatch(getBetweenChats(data))
                /* if (displayRef.current) {
                    displayRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
                } */
                setTimeout(() => {
                    displayRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
                }, 50)
            }
            getMessages()
        }
    }, [user, dispatch, token])

    const deleteConversation = async () => {
        //console.log(user);
        await axios.delete(`/api/v1/chats/conversation/${user._id}`, {
            headers: { authorization: token }
        })
        dispatch(deleteFullConversation(user._id))
        navigate("/messages")
    }

    const textMessage = (e) => {

        setChatMessage(e.target.value)
        socket.emit("openTyping", { id, id2: currentUser._id })

    }
    useEffect(() => {
        setTimeout(() => {
            displayRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
        }, 50)
    }, [isTyping])

    return (
        <>
            <div className="message_header" style={{ cursor: "pointer" }}>
                {user && <UserCard user={user}>
                    <i className="fas fa-trash text-danger" onClick={deleteConversation}></i>
                </UserCard>}

            </div>

            <div className="chat_container" style={{ height: images.length === 0 ? "calc(100% - 110px)" : "calc(100% - 180px)" }}>
                <div className="chat_display" ref={displayRef}>

                    {
                        data?.map((msg, i) => (
                            <div key={i}>
                                {msg.sender._id !== currentUser._id &&
                                    <div className="chat-row other_message">
                                        <MsgDisplay user={user} msg={msg} />
                                    </div>}
                                {msg.sender._id === currentUser._id &&
                                    <div className="chat-row your_message">
                                        <MsgDisplay user={currentUser} msg={msg} />
                                    </div>}
                            </div>
                        ))
                    }

                    {isTyping && id === typingTo && <span ref={typeRef} id="isTyping">{`${user.username} is typing `} <span>...</span></span>}
                </div>
            </div>

            <div className="show_media" style={{ display: images.length === 0 ? "none" : "grid" }}>
                {
                    images?.map((img, i) => (
                        <div key={img.public_id} className="file_media">
                            <img src={img.url} alt="" />
                            <span onClick={() => deleteImage(i)}>&times;</span>
                        </div>
                    ))
                }

            </div>

            <form className="chat_input" onSubmit={chatSubmit}>

                <input type="text" placeholder="Enter your message..."
                    value={chatMessage} onChange={textMessage} />
                <Icons setContent={setChatMessage} content={chatMessage} />
                <div className="file_upload">
                    <i className="fas fa-image text-danger"></i>
                    <input type="file" name="file" id="file" multiple accept="image/*,video/*,audio/*"
                        onChange={handleChatMedia}
                    />
                </div>
                <button className="material-icons" type="submit" disabled={(chatMessage || images.length > 0) ? false : true}>
                    near_me
                </button>
            </form>
        </>
    )
}

export default RightSide
