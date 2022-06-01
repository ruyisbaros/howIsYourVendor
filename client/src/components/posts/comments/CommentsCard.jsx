import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Avatar from '../../Avatar'
import { useSelector } from 'react-redux'
import InputComments from '../InputComments'
import CommentMenu from './CommentMenu'

const CommentsCard = ({ post, comment }) => {
  const { currentUser } = useSelector(store => store.currentUser)

  const [content, setContent] = useState("")
  const [isReply, setIsReply] = useState(false)
  const [readMore, setReadMore] = useState(false)
  const [isLiked, setIsLiked] = useState(comment.likes.includes(currentUser._id))

  const likeCommentHandler = async () => {

    setIsLiked(!isLiked)

  }

  return (
    <div className="comment_card mt-3">
      <Link to={`/profile/${comment?.owner._id}`} className="text-dark d-flex ">
        <Avatar src={comment?.owner.avatar.url} size="small-avatar" />
      </Link>
      <div className="comment_content">
        <div className="comment_title">
          <h5 className="text-dark mx-1">{comment?.owner.fullName}</h5>
          <small className="text-muted">
            {moment(comment.createdAt).fromNow()}
          </small>
        </div>
        <div className="comment_texts_box">
          <div className="flex-fill">
            <div className="comment_intent">
              <span >
                {
                  comment.content.length < 100 ? comment.content : readMore ? comment.content :
                    comment.content.slice(0, 100) + "..."
                }
              </span>
              {
                comment.content.length > 100 &&
                <span style={{ color: readMore ? "red" : "blue" }} className="readMore" onClick={() => setReadMore(!readMore)}>{readMore ? "Show Less" : "Show More"}</span>
              }
            </div>
            <div style={{ cursor: "pointer" }} className="comment_buttons mt-2">
              <span onClick={likeCommentHandler}>{isLiked ? <i className="fa-solid fa-thumbs-up"></i> : <i className="fa-regular fa-thumbs-up"></i>}</span>
              <small className=" mx-2 font-weight-bold"> {comment.likes.length}</small>
              <small style={{ textTransform: "uppercase" }} className="font-weight-bold mx-2"
                onClick={() => setIsReply(!isReply)}
              >{isReply ? "cancel" : "reply"}</small>
            </div>
          </div>
          <CommentMenu post={post} comment={comment} user={currentUser} />

        </div>
        {
          isReply && <InputComments />
        }

      </div>

    </div>
  )
}

export default CommentsCard

