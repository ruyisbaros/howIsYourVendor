import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom"
import UserCard from '../user/UserCard';
import MsgDisplay from './MsgDisplay';

const RightSide = () => {

    const { currentUser } = useSelector(store => store.currentUser)
    const { chatUsers } = useSelector(store => store.messages)
    const dispatch = useDispatch()

    const [user, setUser] = useState("")
    const [chatMessage, setChatMessage] = useState("")

    const { id } = useParams()

    useEffect(() => {
        const newUser = chatUsers.find(user => user._id === id)
        if (newUser) {
            setUser(newUser)
        }
    }, [id, chatUsers])


    return (
        <>
            <div className="message_header">
                <UserCard user={user}>
                    <i className="fas fa-trash text-danger"></i>
                </UserCard>
            </div>

            <div className="chat_container">
                <div className="chat_display">
                    <div className="chat-row other_message">
                        <MsgDisplay user={user} />
                    </div>
                    <div className="chat-row your_message">
                        <MsgDisplay user={currentUser} />
                    </div>
                </div>
            </div>

            <form className="chat_input">
                <input type="text" placeholder="Your message"
                    value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} />
                <button className="material-icons" type="submit" disabled={!chatMessage}>
                    near_me
                </button>
            </form>
        </>
    )
}

export default RightSide
