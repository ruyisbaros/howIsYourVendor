import React, { useState, useEffect } from 'react'
import Info from '../components/profile/profileInfo/Info'
import ProfilePosts from '../components/profile/profilePosts/ProfilePosts'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { profileFailure, profileStart, profileSuccess } from '../redux/profileSlicer';
import { profilePostsFetchStart, profilePostsFetchSuccess, profilePostsFetchFail, getPostPageUpdate } from "../redux/postsSlicer"
//import { updateCurrentSuccess } from '../redux/authSlicer';

const Profile = () => {

    const { token } = useSelector(store => store.currentUser)
    const { profilePosts, result, page } = useSelector(store => store.posts)
    const { id } = useParams()
    const dispatch = useDispatch()
    //console.log(id);
    const [loadingAlt, setLoadingAlt] = useState(false)

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
                const { data } = await axios.get(`/api/v1/posts/user/${id}?limit=${page - 1}`, {
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

    }, [id, dispatch, token, page]);

    const handlePage = () => {
        setLoadingAlt(true)
        /* const { data } = await axios.get(`/api/v1/posts/post_discover?limit=${page}`, {
            headers: { authorization: token }
        })
        console.log("second limit:", data.posts); */
        dispatch(getPostPageUpdate())
        setLoadingAlt(false)
    }


    return (
        <div className="profile">
            <Info />
            <ProfilePosts page={page} profilePosts={profilePosts} result={result} loadingAlt={loadingAlt} handlePage={handlePage} />
        </div>
    )
}

export default Profile