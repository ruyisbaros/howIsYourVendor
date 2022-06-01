const Comment = require("../models/commentModel")
const Posts = require("../models/postModel")
const asyncHandler = require("express-async-handler")

exports.createComment = asyncHandler(async (req, res) => {

    const { postId, content, tag, reply } = req.body
    const newComment = await Comment.create({
        owner: req.user._id,
        postId, content, tag, reply
    })
    const updatedPost = await Posts.findByIdAndUpdate(postId, { $push: { comments: newComment._id } }, { new: true })

    res.status(200).json({ newComment, updatedPost })
})