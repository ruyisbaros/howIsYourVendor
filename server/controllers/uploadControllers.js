const asyncHandler = require("express-async-handler")
const cloudinary = require("cloudinary")
const Posts = require("../models/postModel")
const fs = require("fs")

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err
    })
}

exports.uploadImage = asyncHandler(async (req, res) => {
    //const images = [...req.files]
    if (!req.files || Object.keys(req.files).length === 0)
        return res.status(500).json({ message: "Please attach a file" })

    const { file } = req.files
    if (file.size > 1024 * 1024) {//1024 * 1024=1mb
        removeTmp(file.tempFilePath)
        return res.status(500).json({ message: "Your file is too large (max 1mb allowed)" })
    }
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
        removeTmp(file.tempFilePath)
        return res.status(500).json({ message: "Opps! Only jpeg or png types are allowed" })
    }

    cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "final-project" }, async (err, result) => {
        if (err) throw err;
        removeTmp(file.tempFilePath)
        res.json({ public_id: result.public_id, url: result.secure_url })
    })

})

exports.deleteImage = asyncHandler(async (req, res) => {

    const { public_id } = req.body
    if (!public_id) {
        return res.status(500).json({ message: "No Id payload found!" })
    }
    cloudinary.v2.uploader.destroy(public_id, (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: "Image deleted successfully" })
    })
})

exports.deleteImagesOfPost = asyncHandler(async (req, res) => {
    const { postId } = req.params
    const targetPost = await Posts.findById(postId)

    targetPost.images.forEach(obj => (
        cloudinary.v2.uploader.destroy(obj.public_id, (err, result) => {
            if (err) throw err;

        })
    ))
    res.status(200).json({ message: "Image deleted successfully" })

})