const Posts = require("../models/postModel")
const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")

exports.createPost = asyncHandler(async (req, res) => {
    const { content, images } = req.body

    const newPost = await Posts.create({
        content, images,
        owner: req.user._id,
    })
    const post = await Posts.findById(newPost._id).populate("owner", "-password")

    res.status(200).json(post)
})