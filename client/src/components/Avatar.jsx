import React from 'react'

const Avatar = ({ src, size }) => {
    return (

        <img src={src} alt="avatar" className={size} /* style={{ filter: mode && "invert(1)" }} */ />

    )
}

export default Avatar