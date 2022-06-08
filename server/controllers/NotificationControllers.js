const Notification = require('../models/notificationModel')
const asyncHandler = require("express-async-handler")


exports.createNewNotification = asyncHandler(async (req, res) => {

    const { id, recipients, url, text, content, image } = req.body

    const notification = await Notification.create({
        id, recipients, url, text, content, image,
        owner: req.user._id,
    })

    res.status(200).json(notification)
})