import React, { useState, useEffect } from 'react'
import Info from '../components/profile/profileInfo/Info'
import ProfilePosts from '../components/profile/profilePosts/ProfilePosts'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { profileFailure, profileStart, profileSuccess } from '../redux/profileSlicer';
import { profilePostsFetchStart, profilePostsFetchSuccess, profilePostsFetchFail, getPostPageUpdate } from "../redux/postsSlicer"
//import { updateCurrentSuccess } from '../redux/authSlicer';

import SavedPosts from '../components/profile/profilePosts/SavedPosts';
import { savePost } from '../redux/authSlicer';

const Profile = () => {

    const { token, currentUser, socket } = useSelector(store => store.currentUser)
    const { profile } = useSelector(store => store.profile)

    const { profilePosts, result, page } = useSelector(store => store.posts)
    const { id } = useParams()
    const dispatch = useDispatch()
    //console.log(id);
    const [loadingAlt, setLoadingAlt] = useState(false)
    const [saveTab, setSaveTab] = useState(false)
    const [showSavedPosts, setShowSavedPosts] = useState(false)

    const createNotify = async (ntfy) => {
        const { data } = await axios.post("/api/v1/notifications/new", { ...ntfy }, {
            headers: { authorization: token }
        })
        //dispatch(createNewNotification(data))

        //socket
        socket.emit("createNotifyViewProfile", { ...data })
    }



    useEffect(() => {
        const getProfile = async () => {
            try {
                dispatch(profileStart())
                const { data } = await axios.get(`/api/v1/users/user/${id}`, {
                    headers: { authorization: token }
                })
                //dispatch(updateCurrentSuccess(data))
                dispatch(profileSuccess(data))
                const notify = {
                    id: currentUser._id,
                    text: `${currentUser.username}, viewed your profile `,
                    recipients: [profile._id],
                    content: "",
                    url: `/profile/${currentUser._id}`,
                    image: currentUser.avatar.url
                }
                profile._id !== currentUser._id && createNotify(notify)

            }
            catch (error) {
                dispatch(profileFailure())
            }
        }
        getProfile();

    }, [id, dispatch, token, profile]);

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
    useEffect(() => {

        const getSavedPosts = async () => {
            setShowSavedPosts(true)
            const { data } = await axios.get(`/api/v1/posts/saved_posts`, {
                headers: { authorization: token }
            })
            //console.log(data);
            setShowSavedPosts(false)
            dispatch(savePost({ posts: data.posts, result: data.result }))
        }
        getSavedPosts()
    }, [token, dispatch, saveTab])

    return (
        <div className="profile">
            <Info />
            {
                currentUser._id === profile?._id &&
                <div className="profile-tab">
                    <button className={saveTab ? "" : "active"} onClick={() => setSaveTab(!saveTab)}>Posts</button>
                    <button className={saveTab ? "active" : ""} onClick={() => setSaveTab(!saveTab)}>Saved</button>
                </div>
            }
            <>
                {saveTab
                    ?
                    <SavedPosts showSavedPosts={showSavedPosts} />
                    : <ProfilePosts page={page} profilePosts={profilePosts} result={result} loadingAlt={loadingAlt} handlePage={handlePage} />
                }
            </>
        </div>
    )
}

export default Profile