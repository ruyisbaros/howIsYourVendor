import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Avatar from '../../Avatar'

const CommentsCard = ({ post, comment }) => {

  const [content, setContent] = useState("")
  const [readMore, setReadMore] = useState(false)

  return (
    <div className="comment_card mt-3">
      <Link to={`/profile/${comment?.owner._id}`} className="text-dark d-flex ">
        <Avatar src={comment?.owner.avatar.url} size="small-avatar" />
      </Link>
      <div className="comment_content">
        <div className="comment_title">
          <h5 className="text-dark mx-1">{comment?.owner.fullName}</h5>
          <small className="text-muted">
            {moment(post.createdAt).fromNow()}
          </small>
        </div>
        <p className="text-dark">{comment?.content}</p>
      </div>
    </div>
  )
}

export default CommentsCard