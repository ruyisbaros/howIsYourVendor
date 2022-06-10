import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeAlert } from '../redux/notifySlicer'

const AlertPage = ({ newPost }) => {

    const dispatch = useDispatch()

    return (
        <div className="alert-page">
            <div className="alert-cover">
                <img className="alert_img" src={newPost.owner.avatar.url} alt="" />
                <div>
                    <p className="cover-text">{newPost.text}</p>
                    <p className="cover-content">{newPost.content ? newPost.content : ""}</p>
                </div>
                <span onClick={() => dispatch(closeAlert())} className="close_cover">&times;</span>
            </div>
        </div>
    )
}

export default AlertPage
