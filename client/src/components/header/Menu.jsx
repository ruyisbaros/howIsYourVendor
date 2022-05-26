import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { authLogout } from '../../redux/authSlicer';
import { toast } from "react-toastify"
import Avatar from '../Avatar';

const Menu = () => {
    const { user } = useSelector(store => store.user)

    const dispatch = useDispatch()
    const { pathname } = useLocation()
    //console.log(useLocation());

    const isActive = (pn) => {
        if (pathname === pn) return "active"
    }

    const navLinks = [
        { label: "Home", icon: "home", path: "/" },
        { label: "Messages", icon: "forum", path: "/messages" },
        { label: "Discover", icon: "explore", path: "/discover" },
        { label: "Notify", icon: "favorite", path: "/notify" },
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

                <li className="nav-item dropdown">
                    <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {/*  {user.username.toUpperCase()} */}
                        <Avatar src={user.avatar} size="medium-avatar" />
                    </span>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to={`/profile/${user._id}`}>
                            Profile
                        </Link>
                        <label className="dropdown-item" htmlFor="theme" onClick={() => setMode(!mode)}> {mode ? "Light Mode" : "Dark Mode"}</label>

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