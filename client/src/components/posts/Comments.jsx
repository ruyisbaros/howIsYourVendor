import React, { useState, useEffect } from 'react'
import CommentsDisplay from './comments/CommentsDisplay'



const Comments = ({ post }) => {

    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState([])

    const [commentReplies, setCommentReplies] = useState([])

    const [next, setNext] = useState(2)

    useEffect(() => {
        const newComment = post.comments.filter(comment => !comment.reply)
        setComments(newComment)
        setShowComments(newComment.slice(newComment.length - next))
    }, [post.comments, next])

    useEffect(() => {
        const replayComments = post.comments.filter(comment => comment.reply)
        setCommentReplies(replayComments)
    }, [post.comments])

    return (
        <div className="comments">
            {
                comments.map(comment => (
                    <CommentsDisplay key={comment._id} comment={comment} post={post}
                        commentReplies={commentReplies.filter(item => item.reply === comment._id)} />
                ))
            }
            {


                /* comments.length - next > 0 ?
                    <div className="p-2 border-top" style={{ cursor: "pointer" }} onClick={() => setNext(next + 2)}>
                        More...
                    </div>
                    :
                    <div onClick={() => setNext(2)} className="p-2 border-top" style={{ cursor: "pointer" }}>
                        Hide...
                    </div> */



            }
        </div>
    )
}

export default Comments