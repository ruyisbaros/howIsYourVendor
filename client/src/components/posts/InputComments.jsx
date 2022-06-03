import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createComment } from '../../redux/commentsSlicer';
import { postCommentCreate, postCommentUpdate } from '../../redux/postsSlicer';
import Avatar from '../Avatar';


const InputComments = ({ children, post, reply, setReply }) => {

  const { currentUser, token } = useSelector(store => store.currentUser)
  const dispatch = useDispatch()
  const [content, setContent] = useState("")


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
    setContent("")
    console.log(data);

  }

  return (
    <div className="input_box">
      <Avatar src={currentUser.avatar.url} size="xbig-avatar" />
      <form onSubmit={submitHandler} className="card-footer comment_input">
        {children}
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