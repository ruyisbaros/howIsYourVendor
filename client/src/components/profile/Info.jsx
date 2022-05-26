import React from 'react'
import { useSelector } from 'react-redux'
import Avatar from '../Avatar'


const Info = () => {
    const { profile } = useSelector(store => store.profile)
    const { currentUser } = useSelector(store => store.currentUser)
    return (
        <div className="info">
            <div className="info_container">
                <Avatar src={currentUser.avatar} size="supper-avatar" />
                <div className="info_content">
                    <div className="info_content_title">
                        <h2>{currentUser.username}</h2>
                        <button className="btn btn-outline-info">Edit Profile</button>
                    </div>
                    <div>
                        <span>{currentUser.followers.length} Followers</span>
                        <span>{currentUser.followings.length} Followings</span>
                    </div>
                    <h6>{currentUser.fullName}</h6>
                    <h6>{currentUser.email}</h6>
                    <p>{currentUser.address}</p>
                    <p>{currentUser.story}</p>
                </div>
            </div>
        </div>
    )
}

export default Info
