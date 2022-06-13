import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Avatar from '../../Avatar'
import { useSelector, useDispatch } from 'react-redux'
import { postCommentCreate, postCommentDelete, postCommentLikeUpdate, postCommentUpdate } from "../../../redux/postsSlicer"
import CommentMenu from './CommentMenu'
import axios from 'axios'
import { createComment } from '../../../redux/commentsSlicer'
import { createNewNotification } from '../../../redux/notifySlicer'
import Icons from '../Icons';

const CommentsCard = ({ post, comment, children, item, showReplies, setShowReplies }) => {
  const { currentUser, token, socket } = useSelector(store => store.currentUser)

  const [content, setContent] = useState("")
  const [isReply, setIsReply] = useState(false)
  const [readMore, setReadMore] = useState(false)
  const [isLiked, setIsLiked] = useState(comment.likes.find(lk => lk.username === currentUser.username))

  const [onEdit, setOnEdit] = useState(false)
  const [comReply, setComReply] = useState("")
  const [likeField, setLikeField] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    setContent(comment.content)
  }, [comment])
  /* useEffect(() => {
    setReply(`@${comment.owner.username}:`)
  }, [isReply, comment]) */
  //console.log(content);

  const createNotify = async (ntfy) => {
    const { data } = await axios.post("/api/v1/notifications/new", { ...ntfy }, {
      headers: { authorization: token }
    })
    //dispatch(createNewNotification(data))

    //socket
    socket.emit("createNotifyReplyComment", { ...data })
  }

  const createNotifyLike = async (ntfy) => {
    const { data } = await axios.post("/api/v1/notifications/new", { ...ntfy }, {
      headers: { authorization: token }
    })
    //dispatch(createNewNotification(data))

    console.log(data);
    //socket
    socket.emit("createNotifyLikeComment", data)
  }

  const likeCommentHandler = async () => {

    const { data } = await axios.patch(`/api/v1/comments/like/${comment._id}`, null, {
      headers: { authorization: token }
    })
    console.log(data);
    dispatch(postCommentLikeUpdate(data))
    socket.emit("likeComment", data)
    //Socket
    setIsLiked(!isLiked)

    const notify = {
      id: currentUser._id,
      text: `${currentUser.username}, liked your comment `,
      recipients: data.owner._id,
      content: data.content,
      url: `/post/${post._id}`,
      image: post.images[0].url
    }

    currentUser._id !== data.owner._id && isLiked === false && createNotifyLike(notify)

  }

  const replyHandler = async (e) => {
    e.preventDefault()
    //console.log(comment._id);
    if (isReply) {
      const replyComment = {
        content: comReply,
        likes: [],
        reply: comment._id,
        postId: post._id,
        tag: comment.owner,
        postUserId: post.owner._id
      }
      //console.log(replyComment);
      const { data } = await axios.post("/api/v1/comments/new", { ...replyComment }, {
        headers: { authorization: token }
      })
      console.log(data);
      dispatch(createComment({ newComment: data.newComment }))
      dispatch(postCommentCreate({ updatedPost: data.updatedPost }))
      setIsReply(false)

      const notify = {
        id: currentUser._id,
        text: `${currentUser.username}, replied your comment `,
        recipients: data.updatedPost.owner._id,
        content: data.newComment.content,
        url: `/post/${data.updatedPost._id}`,
        image: data.updatedPost.images[0].url
      }

      //Socket
      socket.emit("replyComment", data.updatedPost)
      currentUser._id !== comment.owner._id && createNotify(notify)
      //console.log(data);
    }


  }
  //console.log(reply);
  const handleCommentDelete = async (e) => {
    e.preventDefault()
    const { data } = await axios.patch(`/api/v1/comments/del/${comment._id}`, { postId: post._id }, {
      headers: { authorization: token }
    })
    //console.log(data);
    dispatch(postCommentDelete(data))

    //Socket
    socket.emit("deleteComment", data)
  }

  const handleCommentUpdate = async (e) => {
    e.preventDefault()
    if (comment.content !== content) {
      const { data } = await axios.patch(`/api/v1/comments/comment/${comment._id}`, { content }, {
        headers: { authorization: token }
      })
      dispatch(postCommentUpdate(data))
      //Socket
      socket.emit("updateComment", data)
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
          <div className="flex-fill replay-mother">
            {
              onEdit ? <textarea className="on_edit_text" resize="false" rows="3"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
                : <div className="comment_intent">
                  {
                    comment.tag && comment.tag._id !== comment.owner._id &&
                    <Link to={`/profile/${comment.tag._id}`} className="mr-1">
                      @{comment.tag.username}
                    </Link>
                  }
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
                  : <>
                    <small style={{ textTransform: "uppercase" }} className="font-weight-bold mx-2"
                      onClick={() => setIsReply(!isReply)}
                    >{isReply ? "cancel" : "reply"}</small>
                    {
                      item && <small style={{ textTransform: "uppercase", color: showReplies ? "red" : "blue" }} className="font-weight-bold mx-2"
                        onClick={() => setShowReplies(!showReplies)}
                      >{showReplies ? "hide" : "replies..."}</small>
                    }
                  </>
              }

            </div>
          </div>
          <CommentMenu handleCommentDelete={handleCommentDelete} post={post} comment={comment} user={currentUser} setOnEdit={setOnEdit} />

        </div>
        {children}
        {
          isReply && <div className="input_box">
            <Avatar src={currentUser.avatar.url} size="xbig-avatar" />
            <form onSubmit={replyHandler} className="card-footer comment_input">
              <Icons content={comReply} setContent={setComReply} />
              <input type="text" placeholder="Add your reply..." value={comReply}
                onChange={(e) => setComReply(e.target.value)} />

              <div className="btn_box">
                <button onClick={() => setComReply("")} className="postBtn">Cancel</button>
                <button type="submit" style={{ background: comReply ? "blue" : "#ddd", color: comReply ? "white" : "#0008" }} className="postBtn send">reply</button>
              </div>

            </form>
          </div>
        }

      </div>

    </div>
  )
}

export default CommentsCard

