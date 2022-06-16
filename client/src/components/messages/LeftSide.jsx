import React, { useState, useEffect } from 'react'
import UserCard from '../user/UserCard'
import { useSelector, useDispatch } from 'react-redux';
import { usersFetchFail, usersFetchSuccess } from '../../redux/usersSlicer';
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios';
import { createChatUser, fetchChatWith } from '../../redux/messageSlicer';

const LeftSide = () => {

    const { currentUser, token } = useSelector(store => store.currentUser)
    const { chatUsers } = useSelector(store => store.messages)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const [search, setSearch] = useState("")


    const [searchUsers, setSearchUsers] = useState([])


    useEffect(() => {
        if (search) {
            const getUsers = async () => {
                try {

                    const { data } = await axios.get(`/api/v1/users/search?username=${search}`, {
                        headers: { authorization: token }
                    })
                    setSearchUsers(data)

                } catch (error) {
                    dispatch(usersFetchFail())
                }

            }
            getUsers();
        } else {
            setSearchUsers([])
        }

    }, [token, dispatch, search])

    useEffect(() => {
        const getConversations = async () => {

            const { data } = await axios.get("/api/v1/chats/conversations", {
                headers: { authorization: token }
            })
            //console.log(data);
            let newArr = []
            data.forEach(item => {
                item.recipients.forEach(rcp => {
                    if (rcp._id !== currentUser._id) {
                        newArr.push({ ...rcp, chatMessage: item.chatMessage, images: item.images })
                    }
                })
            })

            dispatch(fetchChatWith(newArr))
        }
        getConversations()
    }, [token, dispatch, currentUser])

    const handleAddChat = (user) => {
        //console.log(user);
        setSearch("")
        setSearchUsers([])
        user._id !== currentUser._id && dispatch(createChatUser(user))
        navigate(`/message/${user._id}`)
    }

    const isActive = (user) => {
        if (id === user._id) {
            return "active"
        }
    }

    const alertFnc = () => {

    }

    return (
        <>
            <form className="message_header" /* onClick={handleSearch} */>
                <input type="text" value={search}
                    placeholder="Search..."
                    onChange={(e) => setSearch(e.target.value)} />
                <button type="submit" style={{ display: 'none' }}>Search</button>
            </form>

            <div className="message_chat_list">

                {
                    searchUsers?.map(user => (
                        <div key={user._id} className="message_user" onClick={() => handleAddChat(user)}>
                            <UserCard
                                user={user} border="border" /* handleClose={handleClose} */ />
                        </div>
                    ))
                }
                {
                    chatUsers?.map(user => (
                        <div key={user._id} className={`message_user ${isActive(user)}`} onClick={() => handleAddChat(user)}>
                            <UserCard
                                user={user} msg={true} /* border="border" */ /* handleClose={handleClose} */ >
                                <i className="fas fa-circle active"></i>

                            </UserCard>
                        </div>
                    ))
                }

            </div>
        </>
    )
}

export default LeftSide
