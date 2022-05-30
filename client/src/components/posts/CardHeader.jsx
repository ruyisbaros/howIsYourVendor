import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '../Avatar'

const CardHeader = ({ post }) => {
    return (
        <div className="card_header">
            <div className="d-flex">
                <Avatar src={post.owner.avatar.url} size="medium-avatar" />
            </div>
        </div>
    )
}

export default CardHeader