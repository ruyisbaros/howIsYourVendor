import React from 'react'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { closeNotifyStatus, deleteANotification, openNotifyStatus } from '../redux/notifySlicer'
import axios from 'axios'

const Notifies = () => {

    const { notifies } = useSelector(store => store.notifies)
    const { token } = useSelector(store => store.currentUser)
    const dispatch = useDispatch()

    const notDeleteHandler = async (id) => {
        const { data } = axios.delete(`/api/v1/notifications/delete/${id}`, {
            headers: { authorization: token }
        })
        dispatch(deleteANotification(id))

    }

    const goToNotify = () => {

        dispatch(closeNotifyStatus())
    }

    return (
        <div className="notifications">
            <div className="notifications_header">
                <h2>Notifications</h2>
            </div>
            <div className="notifications_container">
                <div className="del_all text-center text-danger">Delete All</div>
                {
                    notifies?.map(not => (
                        <Link className="link_class" to={`${not.url}`} key={not._id} >
                            <div className="notifications_cover">
                                <div className="notifications_content" onClick={goToNotify}>
                                    <span>{!not.isRead && <i className="fas fa-circle text-primary" />}</span>
                                    <img src={not?.owner?.avatar?.url} alt="" className="notify_avatar" />
                                    <div className="content-in">
                                        <div>
                                            <p>{not.text}</p>
                                            <span>{not.content ? ":" + " " + not.content : ""}</span>
                                        </div>
                                        <small className="text-muted">
                                            {moment(not.createdAt).fromNow()}
                                        </small>
                                    </div>
                                    <img src={not.image} alt="" className="notify_post" />

                                </div>
                                <span onClick={() => notDeleteHandler(not._id)} className="text-danger del_not">remove</span>
                            </div>


                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Notifies