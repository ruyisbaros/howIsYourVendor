const Comment = require("../models/commentModel")
const Posts = require("../models/postModel")
const asyncHandler = require("express-async-handler")

exports.createComment = asyncHandler(async (req, res) => {

    const { postId, content, tag, reply, postUserId } = req.body

    const _comment = await Comment.create({
        owner: req.user._id,
        postId, content, tag, reply, postUserId
    })
    //console.log("tag:", tag, "reply:", reply);
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
        .sort({ createdAt: -1 })

    res.status(200).json({ newComment, updatedPost })
})

exports.updateAComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    const { content } = req.body

    const updatedComment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true }).populate("owner", "-password")

    res.status(200).json(updatedComment)
})
exports.deleteAComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    const { postId } = req.body
    const deletedComment = await Comment.findById(commentId)
    const updatedPost = await Posts.findByIdAndUpdate(postId, { $pull: { comments: deletedComment._id } }, { new: true })
        .populate("owner", "-password")
        .populate({
            path: "comments",
            populate: {
                path: "owner likes",
                select: "-password"
            }
        })
        .sort({ createdAt: -1 })
    await Comment.findByIdAndDelete(commentId)
    res.status(200).json(updatedPost)
})
exports.likeUnLikeComment = asyncHandler(async (req, res) => {

    const { commentId } = req.params
    let targetComment;
    const _comment = await Comment.findById(commentId)

    if (!_comment.likes.includes(req.user._id)) {
        targetComment = await Comment.findByIdAndUpdate(_comment._id, { $push: { likes: req.user._id } }, { new: true }).populate("owner", "-password")
    } else {
        targetComment = await Comment.findByIdAndUpdate(_comment._id, { $pull: { likes: req.user._id } }, { new: true }).populate("owner", "-password")
    }

    res.status(200).json(targetComment)

})