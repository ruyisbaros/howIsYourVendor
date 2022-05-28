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

/* Follow un follow */

exports.followingsOps = asyncHandler(async (req, res) => {

    const targetUser = await User.findById(req.params.id)
    const currentUser = await User.findById(req.body.id)

    if (!targetUser.followers.includes(req.body.id)) {
        await targetUser.updateOne({ $push: { followers: req.body.id } })
        await currentUser.updateOne({ $push: { followings: req.params.id } })
    } else {
        await targetUser.updateOne({ $pull: { followers: req.body.id } })
        await currentUser.updateOne({ $pull: { followings: req.params.id } })
    }
    res.status(200).json({ message: "Follow operations updated successfully" })
})