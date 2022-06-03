import React, { useState, useEffect } from 'react'
import Info from '../components/profile/profileInfo/Info'
import ProfilePosts from '../components/profile/profilePosts/ProfilePosts'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { profileFailure, profileStart, profileSuccess } from '../redux/profileSlicer';
import { profilePostsFetchStart, profilePostsFetchSuccess, profilePostsFetchFail } from "../redux/postsSlicer"
//import { updateCurrentSuccess } from '../redux/authSlicer';

const Profile = () => {

    const { token } = useSelector(store => store.currentUser)
    const { profilePosts, result } = useSelector(store => store.posts)
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

    useEffect(() => {
        const getProfilePosts = async () => {
            try {
                dispatch(profilePostsFetchStart())
                const { data } = await axios.get(`/api/v1/posts/user/${id}`, {
                    headers: { authorization: token }
                })
                //dispatch(updateCurrentSuccess(data))
                dispatch(profilePostsFetchSuccess({ posts: data.posts, result: data.result }))
            }
            catch (error) {
                dispatch(profilePostsFetchFail(error.response.data.message))
            }
        }
        getProfilePosts();

    }, [id, dispatch, token]);


    return (
        <div className="profile">
            <Info />
            <ProfilePosts profilePosts={profilePosts} results={result} />
        </div>
    )
}

export default Profile