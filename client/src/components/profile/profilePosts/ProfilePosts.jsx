import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import PostThumb from './PostThumb'

const Posts = ({ profilePosts, result }) => {

    //const { token, currentUser } = useSelector(store => store.currentUser)


    return (
        <div>
            <PostThumb posts={profilePosts} result={result} />
        </div>
    )
}

export default Posts
