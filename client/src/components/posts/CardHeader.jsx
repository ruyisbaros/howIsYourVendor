import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '../Avatar'
import { Link } from "react-router-dom"
import moment from 'moment'
import { deleteAPost, postUpdate } from '../../redux/postsSlicer';
import axios from 'axios';

const CardHeader = ({ post }) => {
    const { currentUser, token } = useSelector(store => store.currentUser)

    const dispatch = useDispatch()

    const handleEditPost = () => {
        //console.log(post);
        dispatch(postUpdate(post._id))
    }

    const handleDeletePost = async () => {


        const { data2 } = await axios.delete(`/api/v1/posts/delete/${post._id}`, {
            headers: { authorization: token }
        })
        dispatch(deleteAPost(post._id))
        console.log(data2);
    }

    //Delete from cloudinary
    const handleDeletePhotos = async () => {
        const { data } = await axios.post(`/api/v1/uploads/${post._id}/delete_all`, null, {
            headers: { authorization: token }
        })
        console.log(data);
    }

    return (
        <div className="card_header">
            <div className="d-flex">
                <Avatar src={post?.owner.avatar?.url} size="big-avatar" />
                <div className="card_name">
                    <h6 className="ml-2">
                        <Link to={`/profile/${post?.owner?._id}`} className="text-dark">
                            {post?.owner?.username.split("")[0].toUpperCase() + post.owner.username.slice(1)}
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
                            <div className="dropdown-item" onClick={handleEditPost}>
                                <span className="material-icons mui" >
                                    create
                                </span>
                                Edit Post
                            </div>
                            <div className="dropdown-item" onClick={() => {
                                handleDeletePhotos()
                                handleDeletePost()
                            }}>
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