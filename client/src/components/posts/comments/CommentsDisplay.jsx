import React from 'react'
import { useState } from 'react'
import CommentsCard from './CommentsCard'

const CommentsDisplay = ({ post, comment, commentReplies }) => {

    const [showReplies, setShowReplies] = useState(false)
    return (
        <div className="comments_display">
            <CommentsCard post={post} comment={comment} item={commentReplies.length > 0} showReplies={showReplies} setShowReplies={setShowReplies}>

                <div className="replay-message w-100">
                    {
                        commentReplies.map((item, i) => (
                            showReplies && <CommentsCard key={i} comment={item} post={post} />
                        ))
                    }
                </div>

            </CommentsCard>
        </div>
    )
}

export default CommentsDisplay
