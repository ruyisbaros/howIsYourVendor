const Posts = require("../models/postModel")
const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    pagination() {
        const page = this.queryString * 1 || 1
        const limit = this.queryString * 1 || 9
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)

        return this;
    }
}

exports.createPost = asyncHandler(async (req, res) => {
    const { content, images } = req.body
    if (images.length === 0) return res.status(500).json({ message: "Please add images" })
    const newPost = await Posts.create({
        content, images,
        owner: req.user._id,
    })
    const post = await Posts.findById(newPost._id).populate("owner likes", "-password")

    res.status(200).json(post)
})

exports.getAllPosts = asyncHandler(async (req, res) => {

    const features = new APIfeatures(Posts.find({ owner: [...req.user.followings, req.user._id] }), req.query).pagination()

    const posts = await
        features.query.sort({ createdAt: -1 })
            .populate("owner likes", "-password")
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
    const updateAPost = await Posts.findByIdAndUpdate(postId, { content, images }).populate("owner likes", "-password")
        .populate({
            path: "comments",
            populate: {
                path: "owner likes",
                select: "-password"
            }
        })

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

    const features = new APIfeatures(Posts.find({ owner: userId }), req.query).pagination()

    const posts = await
        features.query.sort("-createdAt").populate("owner", "-password").populate({
            path: "comments",
            populate: {
                path: "owner likes",
                select: "-password"
            }
        })

    res.status(200).json({ posts, result: posts.length })
})

exports.getSinglePost = asyncHandler(async (req, res) => {
    const { postId } = req.params

    const post = await Posts.findById(postId).populate("owner likes", "-password")
        .populate({
            path: "comments",
            populate: {
                path: "owner likes",
                select: "-password"
            }
        })

    res.status(200).json(post)
})

exports.getPostDiscover = asyncHandler(async (req, res) => {

    const features = new APIfeatures(Posts.find({ owner: { $nin: [...req.user.followings, req.user._id] } }), req.query).pagination()

    const posts = await
        features.query.sort({ createdAt: -1 })
            .populate("owner likes", "-password")
            .populate({
                path: "comments",
                populate: {
                    path: "owner likes",
                    select: "-password"
                }
            })

    res.status(200).json({ posts, result: posts.length })
})