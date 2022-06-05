import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PostCard from '../components/posts/PostCard'
import { singlePostFetchSuccess } from '../redux/postsSlicer'
import Loading from '../images/loading-2.gif'
import { toast } from "react-toastify"

const SingleProfilePost = () => {

    const { token } = useSelector(store => store.currentUser)
    const { singlePost } = useSelector(store => store.posts)
    const { likes, comments } = singlePost

    const { id } = useParams()
    const dispatch = useDispatch()


    useEffect(() => {
        const getSinglePost = async () => {
            try {

                const { data } = await axios.get(`/api/v1/posts/single/${id}`, {
                    headers: { authorization: token }
                })
                dispatch(singlePostFetchSuccess(data))

            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
        getSinglePost()
    }, [id, dispatch, token])

    //console.log(singlePost);

    return (
        !singlePost ?
            <img className="d-block mx-auto mt-4" src={Loading} alt="Loading" />
            :
            <div className="singlePost">
                <PostCard post={singlePost} />
            </div>
    )
}

export default SingleProfilePost
