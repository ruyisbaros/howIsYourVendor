import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from "react-toastify"
import { updateCurrentSuccess } from '../redux/authSlicer'
import { createNewNotification } from '../redux/notifySlicer'
import { profileFollowUnFollowUpdates, profileSuccess } from '../redux/profileSlicer'


const FollowBtn = ({ user }) => {
    //const { profile } = useSelector(store => store.profile)
    const { currentUser, socket } = useSelector(store => store.currentUser)
    const { token } = useSelector(store => store.currentUser)

    const dispatch = useDispatch()

    const createNotify = async (ntfy) => {
        const { data } = await axios.post("/api/v1/notifications/new", { ...ntfy }, {
            headers: { authorization: token }
        })
        //dispatch(createNewNotification(data))

        //socket
        socket.emit("createNotifyAddFollow", { ...data })
    }

    const handleFollowUnFollow = async () => {
        try {
            const { data } = await axios.patch(`/api/v1/users/follow_unFollow/${user._id}`, null, {
                headers: { authorization: token }
            })
            dispatch(profileFollowUnFollowUpdates({ followings: data.targetUser.followings, followers: data.targetUser.followers }))
            dispatch(updateCurrentSuccess(data.currentUser))
            toast.success(data.message)
            //console.log(data.targetUser);
            const notify = {
                id: currentUser._id,
                text: `${currentUser.username}, started to follow you `,
                recipients: [data.targetUser._id],
                content: "",
                url: `/profile/${currentUser._id}`,
                image: ""
            }
            console.log(data.targetUser);
            createNotify(notify)
            //Socket
            socket.emit("followUnFollow", data.targetUser)
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(token);
        }
    }

    //console.log(currentUser.followings.find(follow => follow.username === profile.username) && "UnFollow");

    return (
        <>

            <button onClick={handleFollowUnFollow} className={`btn ${currentUser.followings.find(follow => follow.username === user.username) ? "btn-outline-danger" : "btn-outline-info"}`}>
                {currentUser.followings.find(follow => follow.username === user.username) ? "UnFollow" : "Follow"}
            </button>
        </>
    )


}


export default FollowBtn
