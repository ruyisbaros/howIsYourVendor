import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createComment } from '../../redux/commentsSlicer';

import { postCommentCreate, postCommentUpdate } from '../../redux/postsSlicer';
import Avatar from '../Avatar';
import Icons from './Icons';




const InputComments = ({ children, post, reply, setReply }) => {

  const { currentUser, token, socket } = useSelector(store => store.currentUser)
  const dispatch = useDispatch()
  const [content, setContent] = useState("")
  const [showEmojies, setShowEmojies] = useState(false)

  const createNotify = async (ntfy) => {
    const { data } = await axios.post("/api/v1/notifications/new", { ...ntfy }, {
      headers: { authorization: token }
    })
    //dispatch(createNewNotification(data))

    //socket
    socket.emit("createNotifyPostComment", { ...data })
  }


  const submitHandler = async (e) => {
    e.preventDefault();
    //console.log(post, content);
    const newComment = {
      content,
      likes: [],
      /*  reply: {}, */
      postId: post._id,
      postUserId: post.owner._id
      /* createdAt: new Date().toISOString() */
    }
    const { data } = await axios.post("/api/v1/comments/new", { ...newComment }, {
      headers: { authorization: token }
    })
    console.log(data);
    dispatch(createComment({ newComment: data.newComment }))
    dispatch(postCommentCreate({ updatedPost: data.updatedPost }))

    const notify = {
      id: currentUser._id,
      text: `${currentUser.username}, commented your post `,
      recipients: data.updatedPost.owner._id,
      content: data.newComment.content,
      url: `/post/${data.updatedPost._id}`,
      image: data.updatedPost.images[0].url
    }
    currentUser.username !== data.updatedPost.owner.username && createNotify(notify)
    //Socket
    socket.emit("createComment", data.updatedPost)
    setContent("")
    //console.log(data);

  }

  const handleEmojiPicker = () => {
    setShowEmojies(!showEmojies)
  }

  const getSelectedEmoji = (e, emojiObject) => {
    let msg = content
    msg += emojiObject.emoji;
    setContent(msg);
  }




  return (
    <div className="input_box">
      <Avatar src={currentUser.avatar.url} size="xbig-avatar" />
      <form onSubmit={submitHandler} className="card-footer comment_input">
        {children}

        <Icons content={content} setContent={setContent} />
        <input type="text" placeholder="Add your comments..." value={content}
          onChange={(e) => setContent(e.target.value)} />
        <div className="btn_box">
          <button onClick={() => setContent("")} className="postBtn">Cancel</button>
          <button type="submit" style={{ background: content ? "blue" : "#ddd", color: content ? "white" : "#0008" }} className="postBtn send">Post</button>
        </div>

      </form>
    </div>
  )
}

export default InputComments