import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from "react-toastify"


const FollowBtn = () => {
    const { profile } = useSelector(store => store.profile)
    const { currentUser } = useSelector(store => store.currentUser)
    const { token } = useSelector(store => store.currentUser)

    const [edit, setEdit] = useState(false)
    const [follow, setFollow] = useState(currentUser.followings.includes(String(profile._id)))

    //Follow UnFollow functions
    const handleFollowUnFollow = async () => {
        try {
            const { data } = await axios.patch(`/api/v1/users/follow_unFollow/${profile._id}`, { id: currentUser._id })

            toast.success(data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(token);
        }
    }

    console.log(currentUser.followings.find(follow => follow.username === profile.username) && "UnFollow");

    return (
        <>

            <button className={`btn ${currentUser.followings.find(follow => follow.username === profile.username) ? "btn-outline-danger" : "btn-outline-info"}`}>
                {currentUser.followings.find(follow => follow.username === profile.username) ? "UnFollow" : "Follow"}
            </button>
        </>
    )


}


export default FollowBtn
