const Posts = require("../models/postModel")
const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")

exports.createPost = asyncHandler(async (req, res) => {
    const { content, images } = req.body
    if (images.length === 0) return res.status(500).json({ message: "Please add images" })
    const newPost = await Posts.create({
        content, images,
        owner: req.user._id,
    })
    const post = await Posts.findById(newPost._id).populate("owner", "-password")

    res.status(200).json(post)
})

exports.getAllPosts = asyncHandler(async (req, res) => {

    const posts = await Posts.find({ owner: [...req.user.followings, req.user._id] }).populate("owner", "-password").sort({ createdAt: -1 })

    res.status(200).json({ posts, result: posts.length })
})