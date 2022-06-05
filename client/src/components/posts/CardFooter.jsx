import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SendSVG from "../../images/send.svg"
//import LikeButton from '../buttons/LikeButton';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { postLikeUpdate } from '../../redux/postsSlicer';

const CardFooter = ({ post }) => {

    const { token, currentUser } = useSelector(store => store.currentUser)

    const dispatch = useDispatch()

    const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser._id))
    const [loadLiked, setLoadLiked] = useState(false)

    const likeHandler = async () => { //toggle. so like and unlike at a time ;))
        const { data } = await axios.patch(`/api/v1/posts/like_unlike/${post._id}`, null, {
            headers: { authorization: token }
        })
        setIsLiked(!isLiked)
        //console.log(data);
        dispatch(postLikeUpdate(data))
    }
    return (
        <div className="card-footer">
            <div className="card_icon_menu">
                <div >
                    <span onClick={likeHandler}>
                        {!isLiked ? <i className="fa-solid fa-thumbs-up"></i> : <i className="fa-regular fa-thumbs-up"></i>}
                    </span>
                    {/* <LikeButton isLiked={isLiked} setIsLiked={setIsLiked} /> */}
                    <Link to={`/post/${post._id}`} className="text-dark"><i class="fa-regular fa-comment-dots"></i></Link>
                    <img src={SendSVG} alt="Send" />
                </div>
                <i className="far fa-bookmark" />
            </div>
            <div className="d-flex justify-content-between">

                <h6 style={{ padding: "0 20px", cursor: "pointer" }}>{post.likes.length} likes</h6>

                <h6 style={{ padding: "0 25px", cursor: "pointer" }}>{post.comments.length} Comments</h6>
            </div>

        </div>
    )
}

export default CardFooter