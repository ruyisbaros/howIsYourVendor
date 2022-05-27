import React from 'react'
import { Link } from 'react-router-dom'

import Avatar from '../Avatar'

const UserCard = ({ user, border, handleClose }) => {
    return (
        <div className={`d-flex p-2 align-item-center ${border}`}>
            <div>
                <Link className="d-flex align-item-center" to={`/profile/${user._id}`} onClick={handleClose}>
                    <Avatar src={user.avatar.url} size="big-avatar" />
                    <div className="ml-3">
                        <span className="d-block">{user.username}</span>
                        <small style={{ opacity: "0.6" }}>{user.fullName}</small>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default UserCard
