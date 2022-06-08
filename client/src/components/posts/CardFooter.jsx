import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
//import SendSVG from "../../images/send.svg"
//import LikeButton from '../buttons/LikeButton';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { postLikeUpdate } from '../../redux/postsSlicer';
import ShareModal from './ShareModal';
import { savePost } from '../../redux/authSlicer';

const CardFooter = ({ post }) => {

    const { token, currentUser, savedPosts, socket } = useSelector(store => store.currentUser)
    //const { socket } = useSelector(store => store.socket)


    const dispatch = useDispatch()

    const [isLiked, setIsLiked] = useState(false)
    const [isShare, setIsShare] = useState(false)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        post.likes.forEach(like => {
            if (like._id === currentUser._id) {
                setIsLiked(true)
            }
        })
    }, [post.likes, currentUser._id])

    useEffect(() => {
        currentUser.savedPosts.forEach(id => {
            if (id === post._id) {
                setSaved(true)
            }
        })
    }, [currentUser.savedPosts, savedPosts, savedPosts.length, post._id])

    const likeHandler = async () => { //toggle. so like and unlike at a time ;))
        const { data } = await axios.patch(`/api/v1/posts/like_unlike/${post._id}`, null, {
            headers: { authorization: token }
        })
        setIsLiked(!isLiked)
        //console.log(data);
        dispatch(postLikeUpdate(data))

        //------Socket-----------
        socket.emit("likePost", data)
    }
    const handleSavedPost = async () => {
        const { data } = await axios.patch(`/api/v1/posts/saved_post/${post._id}`, null, {
            headers: { authorization: token }
        })
        setSaved(!saved)
        //console.log(data);
        dispatch(savePost(data.savedPosts))
    }

    return (
        <div className="card-footer">
            <div className="card_icon_menu">
                <div >
                    <span onClick={likeHandler}>
                        {isLiked ? <i className="fa-solid fa-thumbs-up"></i> : <i className="fa-regular fa-thumbs-up"></i>}
                    </span>
                    <Link to={`/post/${post._id}`} className="text-dark"><i class="fa-regular fa-comment-dots"></i></Link>
                    <i className="fa-solid fa-share" onClick={() => setIsShare(!isShare)}></i>
                </div>

                {
                    post.owner._id !== currentUser._id &&
                    <span onClick={handleSavedPost}>
                        {saved
                            ?
                            <i style={{ cursor: "pointer" }} className="fas fa-bookmark text-info" />
                            : <i style={{ cursor: "pointer" }} className="far fa-bookmark" />}
                    </span>
                }

            </div>
            <div className="d-flex justify-content-between">

                <h6 style={{ padding: "0 20px", cursor: "pointer" }}>{post.likes.length} likes</h6>

                <h6 style={{ padding: "0 25px", cursor: "pointer" }}>{post.comments.length} Comments</h6>
            </div>

            {
                isShare && <ShareModal url={`http://localhost:3000/post/${post._id}`} setIsShare={setIsShare} />
            }

        </div>
    )
}

export default CardFooter