const Comment = require("../models/commentModel")
const Posts = require("../models/postModel")
const asyncHandler = require("express-async-handler")

exports.createComment = asyncHandler(async (req, res) => {

    const { postId, content, tag, reply } = req.body
    const _comment = await Comment.create({
        owner: req.user._id,
        postId, content, tag, reply
    })
    const newComment = await Comment.findById(_comment._id).populate("owner", "-password")
    const updatedPost = await Posts.findByIdAndUpdate(postId, { $push: { comments: newComment._id } }, { new: true })
        .populate("owner", "-password")
        .populate({
            path: "comments",
            populate: {
                path: "owner likes",
                select: "-password"
            }
        })

    res.status(200).json({ newComment, updatedPost })
})