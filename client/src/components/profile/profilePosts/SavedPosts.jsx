import React, { useEffect, useState } from 'react'
import PostThumb from './PostThumb';
import Loading from '../../../images/loading-2.gif'
import { useSelector, useDispatch } from 'react-redux'


const SavedPosts = ({ showSavedPosts }) => {


    const { savedPosts } = useSelector(store => store.currentUser)

    return (
        <div>
            {showSavedPosts && <img src={Loading} alt="Loading" className="d-block mx-auto" />}
            <PostThumb posts={savedPosts} result={savedPosts?.length} />
        </div>
    )
}

export default SavedPosts