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

    const posts = await Posts.find({ owner: [...req.user.followings, req.user._id] })
        .sort({ createdAt: -1 })
        .populate("owner", "-password")
        .populate({
            path: "comments",
            populate: {
                path: "owner likes",
                select: "-password"
            }
        })

    res.status(200).json({ posts, result: posts.length })
})

exports.updateAPost = asyncHandler(async (req, res) => {
    const { content, images } = req.body
    const { postId } = req.params
    if (images.length === 0) return res.status(500).json({ message: "Please add images" })
    const post = await Posts.findById(postId)
    if (!post) return res.status(500).json({ message: "Post is not be found" })
    const updateAPost = await Posts.findByIdAndUpdate(postId, { content, images }, { new: true })

    res.status(200).json({ message: "Post has been updated successfully" })
})

exports.likeUnlike = asyncHandler(async (req, res) => {
    const { postId } = req.params
    let targetPost;
    const post = await Posts.findById(postId)
    if (!post.likes.includes(req.user._id)) {
        targetPost = await Posts.findByIdAndUpdate(postId, { $push: { likes: req.user._id } }, { new: true }).populate("likes owner")
    } else {
        targetPost = await Posts.findByIdAndUpdate(postId, { $pull: { likes: req.user._id } }, { new: true }).populate("likes owner")
    }

    res.status(200).json(targetPost)
})

exports.getAUserPosts = asyncHandler(async (req, res) => {
    const { userId } = req.params

    const posts = await Posts.find({ owner: userId }).sort("-createdAt").populate("owner", "-password")
        .populate({
            path: "comments",
            populate: {
                path: "owner likes",
                select: "-password"
            }
        })

    res.status(200).json(posts)
})