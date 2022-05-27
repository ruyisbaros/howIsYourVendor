import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Avatar from '../Avatar'
import EditProfile from './EditProfile'


const Info = () => {
    const { profile } = useSelector(store => store.profile)
    const { currentUser } = useSelector(store => store.currentUser)

    const [edit, setEdit] = useState(false)

    return (
        currentUser._id === profile._id ?
            (<div className="info">
                <div className="info_container">
                    <Avatar src={currentUser.avatar} size="supper-avatar" />
                    <div className="info_content">
                        <div className="info_content_title">
                            <h2>{currentUser.username}</h2>
                            <button className="btn btn-outline-info" onClick={() => setEdit(true)}>Edit Profile</button>
                        </div>
                        <div className="follow_btn">
                            <span className="mr-4">{currentUser?.followers.length}{" "} Followers</span>
                            <span className="ml-4">{currentUser?.followings.length}{" "} Followings</span>
                        </div>
                        <h6>{currentUser.fullName}</h6>
                        <h6>{currentUser.email}</h6>
                        <p>{currentUser.address}</p>
                        <p>{currentUser.story}</p>
                    </div>
                    {
                        edit && <EditProfile setEdit={setEdit} />
                    }
                </div>
            </div>)
            : (
                <div className="info">
                    <div className="info_container">
                        <Avatar src={profile.avatar} size="supper-avatar" />
                        <div className="info_content">
                            <div className="info_content_title">
                                <h2>{profile.username}</h2>
                                <button className="btn btn-outline-info">Follow</button>
                            </div>
                            <div className="follow_btn">
                                <span className="mr-4">{profile.followers?.length}{" "} Followers</span>
                                <span className="ml-4">{profile.followings?.length}{" "} Followings</span>
                            </div>
                            <h6>{profile.fullName}</h6>
                            <h6>{profile.email}</h6>
                            <p>{profile.address}</p>
                            <p>{profile.story}</p>
                        </div>
                    </div>
                </div>
            )
    )
}

export default Info
