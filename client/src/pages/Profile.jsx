import React, { useState, useEffect } from 'react'
import Info from '../components/profile/Info'
import Posts from '../components/profile/ProfilePosts'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { profileFailure, profileStart, profileSuccess } from '../redux/profileSlicer';
import { updateCurrentSuccess } from '../redux/authSlicer';

const Profile = () => {

    const { token } = useSelector(store => store.currentUser)
    /*  const { profile } = useSelector(store => store.profile) */
    const { id } = useParams()
    const dispatch = useDispatch()
    console.log(id);


    useEffect(() => {
        const getProfile = async () => {
            try {
                dispatch(profileStart())
                const { data } = await axios.get(`/api/v1/users/user/${id}`, {
                    headers: { authorization: token }
                })
                //dispatch(updateCurrentSuccess(data))
                dispatch(profileSuccess(data))
            }
            catch (error) {
                dispatch(profileFailure())
            }
        }
        getProfile();

    }, [id, dispatch, token]);


    return (
        <div className="profile">
            <Info />
            <Posts />
        </div>
    )
}

export default Profile