import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '../Avatar'
import { Link } from "react-router-dom"
import moment from 'moment'

const CardHeader = ({ post }) => {
    const { currentUser } = useSelector(store => store.currentUser)
    return (
        <div className="card_header">
            <div className="d-flex">
                <Avatar src={post.owner.avatar.url} size="big-avatar" />
                <div className="card_name">
                    <h6 className="ml-2">
                        <Link to={`/profile/${post.owner._id}`} className="text-dark">
                            {post.owner.username.split("")[0].toUpperCase() + post.owner.username.slice(1)}
                        </Link>
                    </h6>
                    <small className="text-muted">
                        {moment(post.createdAt).fromNow()}
                    </small>
                </div>
            </div>
            <div className="nav-item dropdown">
                <span className="material-icons" id="moreLink" data-toggle="dropdown">
                    more_horiz
                </span>
                <div className="dropdown-menu">
                    {
                        currentUser._id === post.owner._id &&
                        <>
                            <div className="dropdown-item">
                                <span className="material-icons mui" >
                                    create
                                </span>
                                Edit Post
                            </div>
                            <div className="dropdown-item">
                                <span className="material-icons mui" >
                                    delete_outline
                                </span>
                                Delete Post
                            </div>
                        </>
                    }
                    <div className="dropdown-item">
                        <span className="material-icons mui" >
                            content_copy
                        </span>
                        Copy Link
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardHeader