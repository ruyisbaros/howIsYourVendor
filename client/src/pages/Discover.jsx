import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPostDiscover, getPostPageUpdate } from '../redux/postsSlicer'
import LoadingImg from '../images/loading-2.gif'

import PostThumb from '../components/profile/profilePosts/PostThumb';
import LoadMoreBtn from '../components/LoadMoreBtn'

const Discover = () => {
    const { token } = useSelector(store => store.currentUser)
    const { discoverPosts, result, page } = useSelector(store => store.posts)
    const dispatch = useDispatch()

    const [loadingFirst, setLoadingFirst] = useState(false)
    const [loadingAlt, setLoadingAlt] = useState(false)

    useEffect(() => {
        const getDiscoverPosts = async () => {
            setLoadingFirst(true)
            const { data } = await axios.get(`/api/v1/posts/post_discover?limit=${page - 1}`, {
                headers: { authorization: token }
            })
            console.log("first limit:", data.posts);
            setLoadingFirst(false)
            dispatch(getPostDiscover({ posts: data.posts, result: data.result }))
        }
        getDiscoverPosts()
    }, [dispatch, token, page])

    const handleLoadMore = async () => {
        setLoadingAlt(true)
        /* const { data } = await axios.get(`/api/v1/posts/post_discover?limit=${page}`, {
            headers: { authorization: token }
        })
        console.log("second limit:", data.posts); */
        dispatch(getPostPageUpdate())
        setLoadingAlt(false)
    }


    if (loadingFirst) return <img className="d-block mx-auto mt-4" src={LoadingImg} alt="Loading" />

    return (
        <div>
            <h2 className="text-center my-4 text-dark">Discover the Posts you may interest in</h2>
            <PostThumb posts={discoverPosts} result={result} />
            {loadingAlt && <img className="d-block mx-auto mt-4" src={LoadingImg} alt="Loading" />}
            <LoadMoreBtn result={result} page={page} handleLoadMore={handleLoadMore} loading={loadingAlt} />
        </div>
    )
}

export default Discover