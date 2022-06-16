import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
//import { useParams } from "react-router-dom"
import UserCard from '../user/UserCard';
import MsgDisplay from './MsgDisplay';
import Icons from '../posts/Icons'
import axios from 'axios';

import { createSingleChat, getBetweenChats } from '../../redux/messageSlicer';

const RightSide = ({ user }) => {

    const { currentUser, token, socket } = useSelector(store => store.currentUser)
    const { data } = useSelector(store => store.messages)
    const [chatMessage, setChatMessage] = useState("")
    const [images, setImages] = useState([])

    const dispatch = useDispatch()
    const displayRef = useRef()

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

    const chatSubmit = async (e) => {
        e.preventDefault()

        const message = {
            sender: currentUser._id,
            recipient: user._id,
            /* createdAt: new Date().toISOString(), */
            chatMessage,
            images
        }

        const { data } = await axios.post("/api/v1/chats/new", { ...message }, {
            headers: { authorization: token }
        })
        //console.log(data);
        dispatch(createSingleChat(data))
        setChatMessage("")
        setImages([])
        socket.emit("newMessage", data)

    }

    useEffect(() => {
        if (user) {
            const getMessages = async () => {
                const { data } = await axios.get(`/api/v1/chats/between/${user._id}`, {
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

    return (
        <>
            <div className="message_header">
                {user && <UserCard user={user}>
                    <i className="fas fa-trash text-danger"></i>
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
                    value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} />
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
