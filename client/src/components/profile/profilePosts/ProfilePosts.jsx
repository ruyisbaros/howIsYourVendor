import React from 'react'
import PostThumb from './PostThumb'
import LoadingImg from '../../../images/loading-2.gif'
import LoadMoreBtn from '../../LoadMoreBtn';

const Posts = ({ profilePosts, result, handlePage, loadingAlt, page }) => {

    //const { token, currentUser } = useSelector(store => store.currentUser)
    //const { page } = useSelector(store => store.posts)


    return (
        <div>
            <PostThumb posts={profilePosts} result={result} />
            {loadingAlt && <img className="d-block mx-auto mt-4" src={LoadingImg} alt="Loading" />}
            <LoadMoreBtn result={result} page={page} handleLoadMore={handlePage} loading={loadingAlt} />
        </div>
    )
}

export default Posts
