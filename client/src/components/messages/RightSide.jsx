import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
//import { useParams } from "react-router-dom"
import UserCard from '../user/UserCard';
import MsgDisplay from './MsgDisplay';
import Icons from '../posts/Icons'
import axios from 'axios';

import { createSingleChat } from '../../redux/messageSlicer';

const RightSide = ({ user }) => {

    const { currentUser, token, socket } = useSelector(store => store.currentUser)
    const { chatUsers, data } = useSelector(store => store.messages)
    const dispatch = useDispatch()

    const [chatMessage, setChatMessage] = useState("")
    const [images, setImages] = useState([])

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

        //const { data } = await axios.post()
        dispatch(createSingleChat(message))
        setChatMessage("")
        setImages([])

    }

    return (
        <>
            <div className="message_header">
                {user && <UserCard user={user}>
                    <i className="fas fa-trash text-danger"></i>
                </UserCard>}
            </div>

            <div className="chat_container" style={{ height: images.length === 0 ? "calc(100% - 110px)" : "calc(100% - 180px)" }}>
                <div className="chat_display">
                    {
                        data?.map((msg, i) => (
                            <div key={i}>
                                {msg.sender !== currentUser._id &&
                                    <div className="chat-row other_message">
                                        <MsgDisplay user={user} msg={msg} />
                                    </div>}
                                {msg.sender === currentUser._id &&
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
