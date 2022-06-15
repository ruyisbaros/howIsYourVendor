import React from 'react'
import Avatar from '../Avatar'
import moment from 'moment'


const MsgDisplay = ({ user, msg }) => {
    return (
        <>
            <div className="chat_title">
                <Avatar src={user?.avatar?.url} size="small-avatar" />
                <span>{user.username}</span>
                <div className="chat_time">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                </div>
            </div>
            {msg.chatMessage && <div className="chat_text">
                {msg.chatMessage}
            </div>}
            {
                msg.images?.map((img, index) => (
                    <div key={index} className="container_img">
                        <img src={img.url} alt="" />
                    </div>
                ))
            }

        </>
    )
}

export default MsgDisplay
