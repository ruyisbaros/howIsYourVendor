import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from "react-toastify"
import { updateCurrentSuccess } from '../redux/authSlicer'
import { profileFollowUnFollowUpdates, profileSuccess } from '../redux/profileSlicer'


const FollowBtn = () => {
    const { profile } = useSelector(store => store.profile)
    const { currentUser } = useSelector(store => store.currentUser)
    const { token } = useSelector(store => store.currentUser)

    const dispatch = useDispatch()

    const [edit, setEdit] = useState(false)
    const [follow, setFollow] = useState(currentUser.followings.includes(String(profile._id)))

    //Follow UnFollow functions
    const handleFollowUnFollow = async () => {
        try {
            const { data } = await axios.patch(`/api/v1/users/follow_unFollow/${profile._id}`, { id: currentUser._id })
            dispatch(profileFollowUnFollowUpdates({ followings: data.targetUser.followings, followers: data.targetUser.followers }))
            dispatch(updateCurrentSuccess(data.currentUser))
            toast.success(data.message)
            console.log(data.targetUser);
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(token);
        }
    }

    //console.log(currentUser.followings.find(follow => follow.username === profile.username) && "UnFollow");

    return (
        <>

            <button onClick={handleFollowUnFollow} className={`btn ${currentUser.followings.includes(profile._id) ? "btn-outline-danger" : "btn-outline-info"}`}>
                {currentUser.followings.includes(profile._id) ? "UnFollow" : "Follow"}
            </button>
        </>
    )


}


export default FollowBtn
