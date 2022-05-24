import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

const Register = () => {

    const navigate = useNavigate()
    const { token } = useSelector(store => store.user)

    const [passType, setPassType] = useState(false)
    const [user, setUser] = useState({ email: "", password: "", })
    const { email, password } = user

    useEffect(() => {
        if (token) navigate("/")
    }, [token, navigate])

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => { }

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

                <button type="submit" className="btn btn-dark w-50" disabled={email && password ? false : true}>Register</button>

                <p className="my-3">
                    Do you have already an account? <Link to="/login">Login Now</Link>
                </p>
            </form>
        </div>
    )
}

export default Register
