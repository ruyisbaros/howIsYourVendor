import React, { useState, useEffect } from 'react'
import UserCard from '../user/UserCard'
import { useSelector, useDispatch } from 'react-redux';
import { usersFetchFail, usersFetchSuccess } from '../../redux/usersSlicer';
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios';
import { createChatUser } from '../../redux/messageSlicer';

const LeftSide = () => {

    const { currentUser, token } = useSelector(store => store.currentUser)
    const { chatUsers } = useSelector(store => store.messages)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const [search, setSearch] = useState("")
    const [load, setLoad] = useState(false)

    const [searchUsers, setSearchUsers] = useState([])

    useEffect(() => {
        if (search) {
            const getUsers = async () => {
                try {
                    setLoad(true)
                    const { data } = await axios.get(`/api/v1/users/search?username=${search}`, {
                        headers: { authorization: token }
                    })
                    setSearchUsers(data)
                    setLoad(false)
                } catch (error) {
                    dispatch(usersFetchFail())
                }

            }
            getUsers();
        } else {
            setSearchUsers([])
        }

    }, [token, dispatch, search])

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
