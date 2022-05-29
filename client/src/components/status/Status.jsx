import React from 'react'
//import Avatar from '../Avatar'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { profilePostCreateStart } from '../../redux/profileSlicer';

const Status = () => {
    const { currentUser } = useSelector(store => store.currentUser)

    const dispatch = useDispatch()

    return (
        <div className="status my-3 d-flex">
            <Link to={`/profile/${currentUser?._id}`}>
                <img src={currentUser?.avatar?.url} alt="" className="avatar_img" />
            </Link>
            <button onClick={() => dispatch(profilePostCreateStart())} className="statusBtn">{currentUser?.username?.toUpperCase()}, please share your vendor experiences</button>
        </div>
    )
}

export default Status