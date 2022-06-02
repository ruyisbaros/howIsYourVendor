import React from 'react'

const CommentMenu = ({ post, comment, user, setOnEdit, handleCommentDelete }) => {
    return (
        <div className="comment-menu">
            {
                /* (post.owner._id === user._id || comment.owner._id === user._id) && */
                <div className="nav-item dropdown">
                    <span style={{ cursor: "pointer" }} className="material-icons" id="moreLink" data-toggle="dropdown">
                        more_vert
                    </span>
                    <div className="dropdown-menu">
                        {
                            user._id === comment.owner._id ?
                                <>
                                    <div onClick={() => setOnEdit(true)} className="dropdown-item" /* onClick={handleEditPost} */>
                                        <span className="material-icons mui" >
                                            create
                                        </span>
                                        Edit
                                    </div>
                                    <div className="dropdown-item" onClick={handleCommentDelete}>
                                        <span className="material-icons mui" >
                                            delete_outline
                                        </span>
                                        Remove
                                    </div>
                                </>
                                :
                                <div className="dropdown-item">
                                    <i class="fa-regular fa-flag mui"></i>
                                    Report
                                </div>
                        }

                    </div>
                </div>
            }
            <div className="dropdown-menu">
                edit
            </div>
        </div>
    )
}

export default CommentMenu
