import React, { useEffect, useState } from 'react'
import PostThumb from './PostThumb';
import Loading from '../../../images/loading-2.gif'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { savePost } from '../../../redux/authSlicer';

const SavedPosts = ({ saveTab }) => {


    const { savedPosts } = useSelector(store => store.currentUser)

    return (
        <div>
            <PostThumb posts={savedPosts} result={savedPosts?.length} />
        </div>
    )
}

export default SavedPosts