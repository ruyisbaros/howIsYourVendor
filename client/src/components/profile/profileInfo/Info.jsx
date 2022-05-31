import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Avatar from '../../Avatar'
import EditProfile from '../profileInfo/EditProfile'
import { toast } from "react-toastify"
import FollowBtn from '../../FollowBtn';
import Followers from '../../../pages/Followers';
import Followings from '../../../pages/Followings';

const Info = () => {
    const { profile } = useSelector(store => store.profile)
    const { currentUser } = useSelector(store => store.currentUser)
    //const { token } = useSelector(store => store.currentUser)

    const [edit, setEdit] = useState(false)
    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowings, setShowFollowings] = useState(false)

    return (
        <>
            {currentUser._id === profile._id ?
                (<div className="info">
                    <div className="info_container">
                        <Avatar src={currentUser?.avatar?.url} size="supper-avatar" />
                        <div className="info_content">
                            <div className="info_content_title">
                                <h2>{currentUser.username}</h2>
                                <button className="btn btn-outline-info" onClick={() => setEdit(true)}>Edit Profile</button>
                            </div>
                            <div className="follow_btn">
                                <span className="mr-4" onClick={() => setShowFollowers(true)}>{currentUser?.followers.length}{" "} Followers</span>
                                <span className="ml-4" onClick={() => setShowFollowings(true)}>{currentUser?.followings.length}{" "} Followings</span>
                            </div>
                            <h6>{currentUser.fullName} <span>{currentUser.mobile}</span> </h6>
                            <h6>{currentUser.email}</h6>
                            <p>{currentUser.address}</p>
                            <p>{currentUser.story}</p>
                        </div>
                        {
                            edit && <EditProfile setEdit={setEdit} />
                        }
                        {
                            showFollowers && <Followers followers={currentUser.followers} setShowFollowers={setShowFollowers} />
                        }
                        {
                            showFollowings && <Followings followings={currentUser.followings} setShowFollowings={setShowFollowings} />
                        }
                    </div>
                </div>)
                : (
                    <>
                        <div className="info">
                            <div className="info_container">
                                <Avatar src={profile.avatar?.url} size="supper-avatar" />
                                <div className="info_content">
                                    <div className="info_content_title">
                                        <h2>{profile.username}</h2>
                                        <FollowBtn user={profile} />
                                    </div>
                                    <div className="follow_btn">
                                        <span className="mr-4" /* onClick={() => setShowFollowers(true)} */>{profile.followers?.length}{" "} Followers</span>
                                        <span className="ml-4" /* onClick={() => setShowFollowings(true)} */>{profile.followings?.length}{" "} Followings</span>
                                    </div>
                                    <h6>{profile.fullName}</h6>
                                    <h6>{profile.email}</h6>
                                    <p>{profile.address}</p>
                                    <p>{profile.story}</p>
                                </div>
                                {/*  {
                                    showFollowers && <Followers followers={profile.followers} setShowFollowers={showFollowers} />
                                }
                                {
                                    showFollowings && <Followings followings={profile.followings} setShowFollowings={showFollowings} />
                                } */}
                            </div>
                        </div>

                    </>
                )}

        </>
    )
}

export default Info
