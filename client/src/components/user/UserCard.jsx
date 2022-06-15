import React from 'react'
import { Link } from 'react-router-dom'

import Avatar from '../Avatar'
//import { useDispatch, useSelector } from 'react-redux';
//import axios from 'axios';
//import { profileFailure, profileStart, profileSuccess } from '../../redux/profileSlicer';

const UserCard = ({ children, user, border, handleClose, msg }) => {

    /* const { token } = useSelector(store => store.currentUser)
    const dispatch = useDispatch()

    const getProfile = async (id) => {
        try {
            dispatch(profileStart())
            const { data } = await axios.get(`/api/v1/users/user/${id}`, {
                headers: { authorization: token }
            })
            dispatch(profileSuccess(data))
        }
        catch (error) {
            dispatch(profileFailure())
        }
    } */
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
                        {msg
                            ? <small style={{ opacity: "0.6" }}>{user?.text}</small>
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
