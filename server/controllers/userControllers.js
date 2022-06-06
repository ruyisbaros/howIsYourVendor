const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")

exports.searchUsers = asyncHandler(async (req, res) => {
    const users = await User.find({ username: { $regex: req.query.username } }).limit(10)
    res.status(200).json(users)
})

exports.getAUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id).populate("followers followings", "-password")
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

//With Protect middleware
exports.followingsOps = asyncHandler(async (req, res) => {

    let targetUser, currentUser;
    const t_user = await User.findById(req.params.id)
    //const currentUser = await User.findById(req.body.id)
    //console.log(req.user);
    console.log(t_user._id.toString(), req.user._id.toString());

    if (!t_user.followers.includes(req.user._id)) {
        if (t_user._id.toString() !== req.user._id.toString()) {
            targetUser = await User.findByIdAndUpdate(req.params.id, { $push: { followers: req.user._id } }, { new: true }).populate("followers followings")
            currentUser = await User.findByIdAndUpdate(req.user._id, { $push: { followings: req.params.id } }, { new: true }).populate("followers followings")
        }
    } else {
        targetUser = await User.findByIdAndUpdate(req.params.id, { $pull: { followers: req.user._id } }, { new: true }).populate("followers followings")
        currentUser = await User.findByIdAndUpdate(req.user._id, { $pull: { followings: req.params.id } }, { new: true }).populate("followers followings")
    }
    res.status(200).json({ currentUser, targetUser, message: "Follow operations updated successfully" })
})

exports.userSuggestions = asyncHandler(async (req, res) => {

    const newArr = [...req.user.followings, req.user._id]
    const num = req.query.num || 10

    const users = await User.aggregate([
        {
            $match: { _id: { $nin: newArr } }
        },
        {
            $sample: { size: num }
        },
        {
            $lookup: { from: "users", localField: "followers", foreignField: "_id", as: "followers" }
        },
        {
            $lookup: { from: "users", localField: "followings", foreignField: "_id", as: "followings" }
        }
    ]).project("-password")

    res.status(200).json({ users, result: users.length })
})