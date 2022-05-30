const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        trim: true,
        required: true,

    },
    images: {
        type: Array,
        default: [],
        required: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]




}, { timestamps: true })

const Posts = mongoose.model("Posts", PostSchema)

module.exports = Posts