import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { authFailure, authStart, authSuccess } from '../redux/authSlicer'

const Register = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { token } = useSelector(store => store.currentUser)

    const [passType, setPassType] = useState(false)
    const [confPassType, setConfPassType] = useState(false)
    const [errText, setErrText] = useState("")
    const [user, setUser] = useState({ fullName: "", username: "", email: "", password: "", cf_password: "", gender: "male" })
    const { email, password, fullName, username, cf_password, gender } = user

    useEffect(() => {
        if (token) navigate("/")
    }, [token, navigate])

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password === cf_password) {
            try {
                dispatch(authStart())
                const { data } = await axios.post("/api/v1/auth/register", { email, password, fullName, username, gender })
                //console.log(data);
                localStorage.setItem("firstLogin", true)
                toast.success(data.message)
                dispatch(authSuccess({ user: data.fulledUser, token: data.accessToken, message: data.message }))
            } catch (error) {
                toast.error(error.response.data.message)
                dispatch(authFailure(error.response.data.message))
                setErrText(error.response.data.message)
            }
        } else {
            toast.error("Passwords don't match!")

        }
    }
    console.log(errText.split(" ").includes("username"));

    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h3 className="text-capitalize text-center mb-5">Welcome to HowIsYourVendor page</h3>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" name="fullName" className="form-control"
                        id="fullName"
                        placeholder="Enter Full Name" required
                        value={fullName} onChange={handleInput} />
                </div>
                <div className="form-group">
                    <label htmlFor="username">User Name</label>
                    <input type="text" name="username" className="form-control"
                        id="username"
                        placeholder="Enter Username" required
                        value={username} onChange={handleInput}
                        style={{ backgroundColor: errText.split(" ").includes("username") && "red" }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email Address</label>
                    <input type="email" name="email" className="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp" placeholder="Enter email" required
                        value={email} onChange={handleInput}
                        style={{ backgroundColor: errText.split(" ").includes("email") && "red" }}
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <div className="pass">
                        <input type={passType ? "text" : "password"}
                            name="password" className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password" required value={password} onChange={handleInput}

                        />
                        <small style={{ color: passType ? "red" : "teal" }} onClick={() => setPassType(!passType)}>
                            {passType ? "Hide" : "Show"}
                        </small>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="cf_password">Confirm Password</label>
                    <div className="pass">
                        <input type={confPassType ? "text" : "password"}
                            name="cf_password" className="form-control"
                            id="cf_password"
                            placeholder="Confirm Password" required value={cf_password} onChange={handleInput}

                        />
                        <small style={{ color: confPassType ? "red" : "teal" }} onClick={() => setConfPassType(!confPassType)}>
                            {confPassType ? "Hide" : "Show"}
                        </small>
                    </div>
                </div>
                <div className="row justify-content-between align-items-center mx-0 mb-1">
                    <label htmlFor="male">
                        Male: <input type="radio" id="male" name="gender"
                            value="male" defaultChecked onChange={handleInput} />
                    </label>

                    <label htmlFor="female">
                        Female: <input type="radio" id="female" name="gender"
                            value="female" onChange={handleInput} />
                    </label>

                    <label htmlFor="other">
                        Other: <input type="radio" id="other" name="gender"
                            value="other" onChange={handleInput} />
                    </label>
                </div>

                <button style={{ backgroundColor: errText.split(" ").includes("email", "username", "passwords") && "red" }} type="submit" className="btn w-50" disabled={email && password && fullName && cf_password && username ? false : true}>Register</button>

                <p className="my-3">
                    Do you have already an account? <Link to="/">Login Now</Link>
                </p>
            </form>
        </div>
    )
}

export default Register
