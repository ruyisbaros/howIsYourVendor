const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")

exports.searchUsers = asyncHandler(async (req, res) => {
    const users = await User.find({ username: { $regex: req.query.username } }).limit(10)
    res.status(200).json(users)
})

exports.getAUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id).select("-password")
    if (!user) return res.status(500).json({ message: "User could not be found" })
    res.status(200).json(user)

})

exports.updateProfile = asyncHandler(async (req, res) => {
    const { fullName, mobile, story, address, gender, avatar } = req.body

    const updatedUser = await User.findByIdAndUpdate(req.user._id, {
        fullName, mobile, story, address, gender, avatar
    }, { new: true }).select("-password")
    res.status(200).json({ updatedUser, message: "Profile has been updated successfully" })
})