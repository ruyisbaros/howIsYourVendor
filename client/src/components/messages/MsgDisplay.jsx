import React from 'react'
import Avatar from '../Avatar'
//import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { deleteAMessage } from '../../redux/messageSlicer'
import axios from 'axios'


const MsgDisplay = ({ user, msg }) => {
    const { currentUser, socket, token } = useSelector(store => store.currentUser)
    const { isTyping, isRead } = useSelector(store => store.messages)
    const dispatch = useDispatch()

    const deleteMessage = async () => {
        console.log(msg);
        await axios.delete(`/api/v1/chats/delete/${msg._id}`, {
            headers: { authorization: token }
        })
        dispatch(deleteAMessage(msg._id))
        socket.emit("deleteAMessage", msg)
    }

    return (
        <>
            <div className="chat_title">
                <Avatar src={user?.avatar?.url} size="small-avatar" />
                {/* <span>{user.username}</span> */}
                {/* <div className="chat_time">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                </div> */}
            </div>
            <div className="your_content">
                {user._id === currentUser._id && <i className="fas fa-trash text-danger" onClick={deleteMessage}></i>}
                <div>
                    {msg.chatMessage && <div className="chat_text">
                        <div>
                            {msg.chatMessage}
                        </div>
                        <div className="time_box text-muted">
                            <small>{new Date(msg.createdAt).toLocaleTimeString()}</small>
                            {user === currentUser && <i style={{ color: isRead ? "teal" : "gray", marginLeft: "4px" }} className="fa-solid fa-check"></i>}
                            {user === currentUser && <i style={{ color: isRead ? "teal" : "gray", marginLeft: "-6px" }} className="fa-solid fa-check"></i>}
                        </div>
                    </div>}
                    {
                        msg.images?.map((img, index) => (
                            <div key={index} className="container_img">
                                <img src={img.url} alt="" />
                            </div>
                        ))
                    }
                </div>

            </div>

        </>
    )
}

export default MsgDisplay
