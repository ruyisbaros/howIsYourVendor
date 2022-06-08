const mongoose = require("mongoose")

const NotificationSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    owner: { type: mongoose.Types.ObjectId, ref: 'User' },
    content: String,
    text: String,
    url: String,
    image: String,
    recipients: [
        mongoose.Types.ObjectId
    ],
    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Notification = mongoose.model("Notification", NotificationSchema)

module.exports = Notification