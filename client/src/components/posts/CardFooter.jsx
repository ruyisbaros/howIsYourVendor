import React from 'react'
import { Link } from 'react-router-dom'
import SendSVG from "../../images/send.svg"

const CardFooter = ({ post }) => {
    return (
        <div className="card-footer">
            <div className="card_icon_menu">
                <div>
                    <i className="far fa-heart" />
                    <Link to={`/post/${post._id}`} className="text-dark"><i className="far fa-comment" /></Link>
                    <img src={SendSVG} alt="Send" />
                </div>
                <i className="far fa-bookmark" />
            </div>
            <div className="d-flex justify-content-between">

                <h6 style={{ padding: "0 28px", cursor: "pointer" }}>{post.likes.length}</h6>

                <h6 style={{ padding: "0 25px", cursor: "pointer" }}>{post.comments.length} Comments</h6>
            </div>

        </div>
    )
}

export default CardFooter