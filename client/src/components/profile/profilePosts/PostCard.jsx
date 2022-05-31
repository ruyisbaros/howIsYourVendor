import React from 'react'
import CardHeader from '../../posts/CardHeader';
import CardBody from '../../posts/CardBody';
import CardFooter from '../../posts/CardFooter';
import Comments from './Comments';
import InputComments from './InputComments';

const PostCard = ({ post }) => {
    return (
        <div className="card my-3" >
            <CardHeader post={post} />
            <CardBody post={post} />
            <CardFooter post={post} />

            <Comments post={post} />
            <InputComments post={post} />
        </div>
    )
}

export default PostCard
