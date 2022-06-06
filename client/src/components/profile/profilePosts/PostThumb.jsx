import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loading from '../../../images/loading-2.gif'

const PostThumb = ({ posts }) => {
    const { profilePostFetching } = useSelector(store => store.posts)
    const { profile } = useSelector(store => store.profile)
    const { currentUser } = useSelector(store => store.currentUser)

    if (posts.length === 0) return <h2 className="text-center text-danger">{currentUser.username === profile.username ? "You have" : profile.username + " " + "has"} no post!..</h2>
    return (
        profilePostFetching ? <img className="thumb-img" src={Loading} alt="" /> :
            <div className="post-thumb">
                {
                    posts?.map(post => (
                        <Link key={post._id} to={`/post/${post?._id}`}>
                            <div className="post-thumb-display">
                                <img src={post?.images[0]?.url} alt="single post" />
                                <div className="post-thumb-menu">
                                    <i className="fa-regular fa-thumbs-up">{post?.likes.length}</i>
                                    <i class="fa-regular fa-comment-dots">{post?.comments.length}</i>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
    )
}

export default PostThumb
