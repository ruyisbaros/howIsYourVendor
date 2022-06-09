const Notification = require('../models/notificationModel')
const asyncHandler = require("express-async-handler")


exports.createNewNotification = asyncHandler(async (req, res) => {

    const { id, recipients, url, text, content, image } = req.body

    const _notification = await Notification.create({
        id, recipients, url, text, content, image,
        owner: req.user._id,
    })
    const notification = await Notification.findById(_notification._id).populate("owner", "followers avatar username")

    res.status(200).json(notification)
})

exports.deleteANotification = asyncHandler(async (req, res) => {

    const { notifyId } = req.params
    const _ntfy = await Notification.findById(notifyId)

    await Notification.findByIdAndDelete(notifyId)

    res.status(200).json(_ntfy)
})

exports.getNotifications = asyncHandler(async (req, res) => {

    const notifies = await Notification.find({ $in: { recipients: req.user._id } }).sort("-createdAt")
        .populate("owner", "avatar username")

    res.status(200).json(notifies)
})