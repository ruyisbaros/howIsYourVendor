import React, { useState, useEffect } from 'react'
import Carousel from './Carousel'

const CardBody = ({ post }) => {

    const [readMore, setReadMore] = useState(false)

    return (
        <div className="card_body">
            <div className="card_body_content">
                <span>
                    {
                        post.content.length < 25 ? post.content : readMore ? post.content + " " : post.content.slice(0, 25) + "..."
                    }
                </span>
                {
                    post.content.length > 25 &&
                    <span style={{ color: readMore ? "red" : "blue" }} className="readMore" onClick={() => setReadMore(!readMore)}>{readMore ? "Show Less" : "Show More"}</span>
                }
            </div>
            {
                post.images.length > 0 &&
                <Carousel images={post.images} id={post._id} />
            }
        </div>
    )
}

export default CardBody
