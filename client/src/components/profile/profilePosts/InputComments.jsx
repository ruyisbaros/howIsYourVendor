import React, { useState, useEffect } from 'react'

const InputComments = ({ children }) => {

  const [content, setContent] = useState("")

  return (
    <form className="card-footer comment_input">
      {children}
      <input type="text" placeholder="Add your comments..." value={content}
        onchange={(e) => setContent(e.target.value)} />

      <button type="submit" className="postBtn">Post</button>
    </form>
  )
}

export default InputComments