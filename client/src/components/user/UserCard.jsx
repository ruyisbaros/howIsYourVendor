import React from 'react'

import Avatar from '../Avatar'

const UserCard = ({ user, border }) => {
    return (
        <div className={`d-flex p-2 align-item-center ${border}`}>
            <Avatar src={user.avatar} size="big-avatar" />
            <div className="ml-3">
                <span className="d-block">{user.username}</span>
                <small style={{ opacity: "0.6" }}>{user.fullName}</small>
            </div>
        </div>
    )
}

export default UserCard
