import React from 'react'

const LikeButton = (isLiked) => {
    return (
        <>
            <i className="fa-regular fa-heart"></i>
            <i className="fa-solid fa-heart"></i>
            {/*  {isLiked ? <i className="fa-solid fa-heart"></i>
                : <i className="fa-regular fa-heart"></i>}
 */}
        </>
    )
}

export default LikeButton
