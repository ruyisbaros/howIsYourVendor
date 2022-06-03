import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { singlePostFetchFail, singlePostFetchStart, singlePostFetchSuccess } from '../redux/postsSlicer'

const SingleProfilePost = () => {

    const { token } = useSelector(store => store.currentUser)
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        const getSinglePost = async () => {
            try {
                dispatch(singlePostFetchStart())
                const { data } = await axios.get(`/api/v1/posts/single/${id}`, {
                    headers: { authorization: token }
                })
                dispatch(singlePostFetchSuccess(data))
            } catch (error) {
                dispatch(singlePostFetchFail(error.response.data.message))
            }
        }
        getSinglePost()
    }, [id, dispatch, token])

    return (
        <div>
            SingleProfilePost
        </div>
    )
}

export default SingleProfilePost
