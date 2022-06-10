import React from 'react'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { closeNotifyStatus, deleteAllANotifications, deleteANotification, isReadUpdate, openNotifyStatus } from '../redux/notifySlicer'
import axios from 'axios'
import { toast } from "react-toastify"

const Notifies = () => {

    const { notifies } = useSelector(store => store.notifies)
    const { token } = useSelector(store => store.currentUser)
    const dispatch = useDispatch()

    const notDeleteHandler = async (id) => {
        const { data } = await axios.patch(`/api/v1/notifications/delete/${id}`, null, {
            headers: { authorization: token }
        })
        console.log(data);
        dispatch(deleteANotification(id))

    }

    const goToNotify = () => {

        dispatch(closeNotifyStatus())
    }

    const deleteHandler = async () => {
        if (window.confirm("Are you sure you want to delete all Nots?")) {
            const { data } = await axios.delete(`/api/v1/notifications/del_all`, {
                headers: { authorization: token }
            })
            dispatch(deleteAllANotifications())
            toast.success(data.message)
        }

    }

    const isReadHandler = async (id) => {

        const { data } = await axios.patch(`/api/v1/notifications/is_read/${id}`, null, {
            headers: { authorization: token }
        })
        dispatch(isReadUpdate(data))
    }

    return (
        <div className="notifications">
            <div className="notifications_header">
                <h2>Notifications</h2>
            </div>
            <div className="notifications_container">
                <div className="del_all text-center text-danger" onClick={deleteHandler}>Delete All</div>
                {
                    notifies?.map(not => (
                        <Link className="link_class" to={`${not.url}`} key={not._id} onClick={() => isReadHandler(not._id)} >
                            <div className="notifications_cover">
                                <div className="notifications_content" onClick={goToNotify} style={{ backgroundColor: not.isRead ? "white" : "#eee" }}>
                                    {/* <span>{not.isRead ? <i className="fas fa-circle text-primary" /> : <i className="fas fa-circle text-danger" />}</span> */}
                                    <img src={not.owner.avatar.url} alt="" className="notify_avatar" />
                                    <div className="content-in">
                                        <div>
                                            <p>{not.text}</p>
                                            <span>{not.content ? ":" + " " + not.content : ""}</span>
                                        </div>
                                        <small className="text-muted">
                                            {moment(not.createdAt).fromNow()}
                                        </small>
                                    </div>
                                    {not.image && <img src={not.image} alt="" className="notify_post" />}

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