import React from 'react'
import Avatar from '../Avatar'

const MsgDisplay = ({ user }) => {
    return (
        <>
            <div className="chat_title">
                <Avatar src={user?.avatar?.url} size="small-avatar" />
                <span>{user.username}</span>
                <div className="chat_time">
                    12 june 2022
                </div>
            </div>
            <div className="chat_text">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit esse perspiciatis ullam ea nobis nihil amet assumenda temporibus eius rem?
            </div>

        </>
    )
}

export default MsgDisplay
