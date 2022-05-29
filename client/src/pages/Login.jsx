import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { authStart, authSuccess, authFailure } from '../redux/authSlicer';
import { toast } from "react-toastify"


const Login = () => {

    const { token } = useSelector(store => store.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [passType, setPassType] = useState(false)
    const [errText, setErrText] = useState("")
    const [user, setUser] = useState({ email: "", password: "", })

    const { email, password } = user

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (token) navigate("/")
    }, [token, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            dispatch(authStart())
            const { data } = await axios.post("/api/v1/auth/login", { email, password })
            //console.log(data);
            localStorage.setItem("firstLogin", true)
            toast.success(data.message)
            dispatch(authSuccess({ user: data.fulledUser, token: data.accessToken, message: data.message }))
            window.location.reload()
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(authFailure(error.response.data.message))
            setErrText(error.response.data.message)
        }
    }
    //console.log(user);
    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h3 className="text-capitalize text-center mb-5">Welcome to HowIsYourVendor page</h3>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" name="email" className="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp" placeholder="Enter email" required
                        value={email} onChange={handleInput}
                        style={{ backgroundColor: errText.split(" ").includes("user") && "red" }}
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <div className="pass">
                        <input type={passType ? "text" : "password"}
                            name="password" className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password" required value={password} onChange={handleInput} />
                        <small style={{ color: passType ? "red" : "teal" }} onClick={() => setPassType(!passType)}>
                            {passType ? "Hide" : "Show"}
                        </small>
                    </div>
                </div>

                <button style={{ backgroundColor: errText.split(" ").includes("user", "wrong") && "red" }} type="submit" className="btn btn-dark w-50" disabled={email && password ? false : true}>Login</button>

                <p className="my-3">
                    Don't you have an account? <Link to="/register">Register Now</Link>
                </p>
            </form>
        </div>
    )
}

export default Login
