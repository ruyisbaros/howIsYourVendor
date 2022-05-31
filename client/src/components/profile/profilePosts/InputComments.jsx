import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

const InputComments = ({ children, post }) => {

  const { currentUser, token } = useSelector(store => store.currentUser)
  const dispatch = useDispatch()
  const [content, setContent] = useState("")

  const submitHandler = async (e) => {
    e.preventDefault();
    //console.log(post, content);
    const newComment = {
      content,
      likes: [],
      createdAt: new Date().toISOString()
    }


  }

  return (
    <form onSubmit={submitHandler} className="card-footer comment_input">
      {children}
      <input type="text" placeholder="Add your comments..." value={content}
        onChange={(e) => setContent(e.target.value)} />

      <div className="btn_box">
        <button onClick={() => setContent("")} className="postBtn">Cancel</button>
        <button type="submit" style={{ background: content ? "blue" : "#ddd", color: content ? "white" : "#0008" }} className="postBtn send">Post</button>
      </div>

    </form>
  )
}

export default InputComments