import React from 'react'
import CommentsCard from './CommentsCard'

const CommentsDisplay = ({ post, comment }) => {
    return (
        <div className="comments_display">
            <CommentsCard post={post} comment={comment}>

            </CommentsCard>
        </div>
    )
}

export default CommentsDisplay
