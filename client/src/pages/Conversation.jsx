import React, { useState, useEffect } from 'react'
import LeftSide from '../components/messages/LeftSide';
import RightSide from '../components/messages/RightSide';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Conversation = () => {
    const { chatUsers } = useSelector(store => store.messages)
    const dispatch = useDispatch()
    const { id } = useParams()

    const [user, setUser] = useState("")

    useEffect(() => {
        const newUser = chatUsers.find(user => user._id === id)
        if (newUser) {
            setUser(newUser)
        }
        //console.log(newUser);
    }, [id, chatUsers])
    return (
        <div className="message d-flex">
            <div className="col-md-4 border-right px-0">
                <LeftSide />
            </div>
            <div className="col-md-8 px-0">
                <RightSide user={user} />
            </div>
        </div>
    )
}

export default Conversation
