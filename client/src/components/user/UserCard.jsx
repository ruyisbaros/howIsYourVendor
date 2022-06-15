import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Avatar from '../Avatar'
//import { useDispatch, useSelector } from 'react-redux';
//import axios from 'axios';
//import { profileFailure, profileStart, profileSuccess } from '../../redux/profileSlicer';

const UserCard = ({ children, user, border, handleClose, msg }) => {

    const { data } = useSelector(store => store.messages)
    const chatBox = []
    data.forEach(chat => {
        if (chat.sender._id === user._id) {
            chatBox.push(chat)
        }
    })


    console.log(chatBox);
    //console.log(chatBox[chatBox.length - 1].sender);
    return (
        <div className={`d-flex p-2 align-items-center justify-content-between w-100 ${border}`}>
            <div>
                <Link className="d-flex align-item-center" to={`/profile/${user._id}`}
                    onClick={() => {
                        handleClose()
                        /* getProfile(user._id) */
                    }}>
                    <Avatar src={user?.avatar?.url} size="big-avatar" />
                    <div className="ml-3">
                        <span className="d-block">{user?.username}</span>
                        {chatBox.length > 0
                            ? <small style={{ opacity: "0.6" }}>{chatBox[chatBox.length - 1].chatMessage}</small>
                            : <small style={{ opacity: "0.6" }}>{user?.fullName}</small>
                        }
                    </div>
                </Link>
            </div>
            {children}
        </div>
    )
}

export default UserCard
