import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { authLogout } from '../../redux/authSlicer';
import { toast } from "react-toastify"
import Avatar from '../Avatar';
import { closeNotifyStatus, fetchAllNotifications, openNotifyStatus } from '../../redux/notifySlicer'
//import { profileFailure, profileStart, profileSuccess } from '../../redux/profileSlicer'

const Menu = () => {
    const { currentUser, token } = useSelector(store => store.currentUser)
    const { notifies, statusNot } = useSelector(store => store.notifies)
    /* const { token } = useSelector(store => store.currentUser) */

    const [clicked, setClicked] = useState(false)

    const dispatch = useDispatch()
    const { pathname } = useLocation()

    const isActive = (pn) => {
        if (pathname === pn) return "active"
    }

    const navLinks = [
        { label: "Home", icon: "home", path: "/" },
        { label: "Messages", icon: "forum", path: "/messages" },
        { label: "Discover", icon: "explore", path: "/discover" },

    ]
    const [mode, setMode] = useState(false)

    const handleLogout = async () => {
        try {
            const { data } = await axios.post("/api/v1/auth/logout")
            toast.success(data.message)
            dispatch(authLogout())
            localStorage.removeItem("firstLogin")
        } catch (error) {
            toast.error("Something went wrong!")
        }


    }
    const getNotifies = async () => {
        const { data } = await axios.get("/api/v1/notifications/all", {
            headers: { authorization: token }
        })
        //console.log(data);

        dispatch(fetchAllNotifications(data))
    }

    const statusHandler = () => {
        if (statusNot) {
            dispatch(closeNotifyStatus())
            window.scrollTo({ top: 0, behavior: "smooth" })
        } else {
            dispatch(openNotifyStatus())
            getNotifies()
        }
    }

    return (
        <div className="menu" >
            <ul className="navbar-nav flex-row">
                {
                    navLinks.map((link, index) => (
                        <li key={index} className={`nav-item px-2 ${isActive(link.path)}`}>
                            <Link className="nav-link" to={link.path}>
                                <span className="material-icons">{link.icon}</span>
                            </Link>
                        </li>
                    ))
                }
                {/*  { label: "Notify", icon: "notifications", path: "/notify" }, */}
                <li /* style={{ fontSize: "25px" }} */ className="nav-item px-2 notify" onClick={() => setClicked(!clicked)}>
                    <li onClick={statusHandler} style={{ cursor: "pointer" }} className="nav-link " >
                        {clicked ?
                            <i className="fa-solid fa-bell"></i>
                            : <i className="fa-regular fa-bell"></i>}
                    </li>
                    {notifies.length > 0 && <span style={{ fontWeight: "bold" }}>{/* notifies.length > 9 ? "9+" : */ notifies.length}</span>}
                </li>

                <li className="nav-item dropdown op-high">
                    <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {/*  {user.username.toUpperCase()} */}
                        <Avatar src={currentUser?.avatar?.url} size="medium-avatar" />
                    </span>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to={`/profile/${currentUser?._id}`}
                        /* onClick={() => getProfile(currentUser?._id)} */
                        >
                            Profile
                        </Link>
                        <label className="dropdown-item" /* htmlFor="theme" onClick={() => setMode(!mode)} */> Last Activities</label>

                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to="/login" onClick={handleLogout}>
                            Logout
                        </Link>
                    </div>
                </li>

            </ul>

        </div>
    )
}

export default Menu