import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { loginStart, loginSuccess, loginFailure } from '../redux/loginSlicer';


const Login = () => {

    /* const { } = useSelector(store => store.user) */
    const dispatch = useDispatch()

    const [user, setUser] = useState({ email: "", password: "", })

    const { email, password } = user

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const getPosts = async () => {

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            dispatch(loginStart())
            const { data } = await axios.post("/api/v1/auth/login", { email, password })
            //console.log(data);
            localStorage.setItem("firstLogin", true)
            dispatch(loginSuccess({ user: data.fulledUser, token: data.accessToken, message: data.message }))
        } catch (error) {
            dispatch(loginFailure(error.response.data.message))
        }
    }
    console.log(user);
    return (
        <div className="login_page">
            <form onSubmit={handleSubmit}>
                <h3 className="text-capitalize text-center mb-2">Welcome to HowIsYourVendor page</h3>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" name="email" className="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp" placeholder="Enter email" required
                        value={email} onChange={handleInput} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1"
                        placeholder="Password" required value={password} onChange={handleInput} />
                </div>

                <button type="submit" className="btn btn-dark w-50" disabled={email && password ? false : true}>Login</button>

                <p className="my-3">
                    Don't you have an account? <Link to="/register">Register Now</Link>
                </p>
            </form>
        </div>
    )
}

export default Login
