const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")

exports.searchUsers = asyncHandler(async (req, res) => {
    const users = await User.find({ username: { $regex: req.query.username } }).limit(10)
    res.status(200).json(users)
})