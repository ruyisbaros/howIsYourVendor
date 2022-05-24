const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

exports.register = asyncHandler(async (req, res) => {
    const { fullName, username, password, email, gender } = req.body
    let transformedUserName = username.toLowerCase().replace(/ /g, "")

    const user_name = await User.findOne({ username: transformedUserName })
    if (user_name) {
        return res.status(500).json({ message: "This username is already in use." })
    }
    const user_email = await User.findOne({ email })
    if (user_email) {
        return res.status(500).json({ message: "This email is already in use." })
    }

    if (password.length < 4) {
        return res.status(500).json({ message: "Password must be at least 4 characters" })
    }

    const newUser = await User.create({
        fullName,
        username: transformedUserName,
        password,
        email,
        gender
    })

    const accessToken = newUser.createJwtToken()
    const refreshToken = newUser.createReFreshToken()

    //console.log(refreshToken);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/v1/auth/refresh_token",
        maxAge: 14 * 24 * 60 * 60 * 1000  //14 days

    })

    const fulledUser = await User.findById(newUser._id).select("-password")

    res.status(200).json({ accessToken, fulledUser, message: "You Registered successfully" })
})

exports.login = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email }).populate("followers followings")
    if (!user) return res.status(500).json({ message: "No user could be found!" })

    const isMatch = await user.isPasswordTrue(password)
    if (!isMatch) return res.status(500).json({ message: "Wrong credentials" })

    const accessToken = user.createJwtToken()
    const refreshToken = user.createReFreshToken()

    //console.log(refreshToken);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/v1/auth/refresh_token",
        maxAge: 14 * 24 * 60 * 60 * 1000  //14 days

    })

    const fulledUser = await User.findById(user._id).select("-password")

    res.status(200).json({ accessToken, fulledUser, message: "You logged successfully" })


})

exports.logout = asyncHandler(async (req, res) => {

    res.clearCookie("refreshToken", { path: "/api/v1/auth/refresh_token" })
    return res.status(200).json({ message: "You have been logout!" })
})

exports.generateRefreshToken = asyncHandler(async (req, res) => {
    const refresh_token = req.cookies.refreshToken
    //console.log(refresh_token);
    if (!refresh_token) {
        return res.status(500).json({ message: "You must login" })
    }
    const decoded = await jwt.verify(refresh_token, process.env.REFRESH_TOKEN_KEY)
    if (!decoded) return res.status(500).json({ message: "Please login or register" })
    const current_user = await User.findById(decoded.id).select("-password").populate("followers followings")
    //console.log(current_user);


    const accessToken = current_user.createJwtToken()
    res.status(200).json({ accessToken, current_user })
})