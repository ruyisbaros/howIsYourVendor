import React from 'react'
import { Link } from 'react-router-dom'

const PostThumb = ({ posts }) => {
    return (
        <div className="post-thumb">
            {
                posts.map(post => (
                    <Link key={post._id} to={`/posts/${post._id}`}>
                        <div className="post-thumb-display">
                            <img src={post.images[0].url} alt="single post" />
                            <div className="post-thumb-menu">
                                <i className="fa-regular fa-thumbs-up">{post.likes.length}</i>
                                <i className="far fa-comment">{post.comments.length}</i>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default PostThumb
