import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Avatar from '../../Avatar'
import { useSelector, useDispatch } from 'react-redux'
import { postCommentDelete, postCommentLikeUpdate, postCommentUpdate } from "../../../redux/postsSlicer"
import CommentMenu from './CommentMenu'
import axios from 'axios'

const CommentsCard = ({ post, comment }) => {
  const { currentUser, token } = useSelector(store => store.currentUser)

  const [content, setContent] = useState("")
  const [isReply, setIsReply] = useState(false)
  const [readMore, setReadMore] = useState(false)
  const [isLiked, setIsLiked] = useState(comment.likes.find(lk => lk.username === currentUser.username))

  const [onEdit, setOnEdit] = useState(false)
  const [reply, setReply] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    setContent(comment.content)
  }, [comment])
  //console.log(content);

  const likeCommentHandler = async () => {

    const { data } = await axios.patch(`/api/v1/comments/like/${comment._id}`, null, {
      headers: { authorization: token }
    })
    dispatch(postCommentLikeUpdate(data))
    setIsLiked(!isLiked)

  }

  const replyHandler = async (e) => {
    e.preventDefault()
  }

  const handleCommentDelete = async (e) => {
    e.preventDefault()
    const { data } = await axios.patch(`/api/v1/comments/del/${comment._id}`, { postId: post._id }, {
      headers: { authorization: token }
    })
    //console.log(data);
    dispatch(postCommentDelete(data))
  }

  const handleCommentUpdate = async (e) => {
    e.preventDefault()
    if (comment.content !== content) {
      const { data } = await axios.patch(`/api/v1/comments/comment/${comment._id}`, { content }, {
        headers: { authorization: token }
      })
      dispatch(postCommentUpdate(data))
      setOnEdit(false)
    } else {
      setOnEdit(false)
    }
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
            {
              onEdit ? <textarea className="on_edit_text" resize="false" rows="3"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
                : <div className="comment_intent">
                  <span >
                    {
                      content.length < 100 ? content : readMore ? content :
                        content.slice(0, 100) + "..."
                    }
                  </span>
                  {
                    content.length > 100 &&
                    <span style={{ color: readMore ? "red" : "blue" }} className="readMore" onClick={() => setReadMore(!readMore)}>{readMore ? "Show Less" : "Show More"}</span>
                  }
                </div>
            }

            <div style={{ cursor: "pointer" }} className="comment_buttons mt-2">
              <span onClick={likeCommentHandler}>{isLiked ? <i className="fa-solid fa-thumbs-up"></i> : <i className="fa-regular fa-thumbs-up"></i>}</span>
              <small className=" mx-2 font-weight-bold"> {comment.likes.length}</small>
              {
                onEdit ?
                  <>
                    <small style={{ textTransform: "uppercase" }} className="font-weight-bold mx-2"
                      onClick={handleCommentUpdate}
                    >update</small>
                    <small style={{ textTransform: "uppercase" }} className="font-weight-bold mx-2"
                      onClick={() => setOnEdit(false)}
                    >cancel</small>
                  </>
                  : <small style={{ textTransform: "uppercase" }} className="font-weight-bold mx-2"
                    onClick={() => setIsReply(!isReply)}
                  >{isReply ? "cancel" : "reply"}</small>
              }
            </div>
          </div>
          <CommentMenu handleCommentDelete={handleCommentDelete} post={post} comment={comment} user={currentUser} setOnEdit={setOnEdit} />

        </div>
        {
          isReply && <div className="input_box">
            <Avatar src={currentUser.avatar.url} size="xbig-avatar" />
            <form onSubmit={replyHandler} className="card-footer comment_input">

              <input type="text" placeholder="Add your comments..." value={reply}
                onChange={(e) => setReply(e.target.value)} />

              <div className="btn_box">
                <button onClick={() => setReply("")} className="postBtn">Cancel</button>
                <button type="submit" style={{ background: reply ? "blue" : "#ddd", color: reply ? "white" : "#0008" }} className="postBtn send">reply</button>
              </div>

            </form>
          </div>
        }

      </div>

    </div>
  )
}

export default CommentsCard

