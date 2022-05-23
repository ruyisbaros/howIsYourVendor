const mongoose = require("mongoose");
const crypto = require("crypto")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        required: true,
        maxLength: 30,
        minLength: 4
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        maxLength: 30,

    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        maxLength: 30,

    },
    password: {
        type: String,
        required: true,
        maxLength: 1024,
        minLength: 4
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/ruyisbaros/image/upload/v1653328705/ecommerce-talend/jimphnrukg6o9d3ln1mo.png"
    },
    role: {
        type: String,
        enum: ["admin", "co-host", "user"],
        default: "user"
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "male"
    },
    mobile: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    story: {
        type: String,
        default: "",
        maxLength: 200
    },
    website: {
        type: String,
        default: ""
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    followings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    resetPasswordToken: String,
    resetPasswordTime: Date,


}, { timestamps: true })

UserSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

UserSchema.methods.isPasswordTrue = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

//Create access token
UserSchema.methods.createJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: "1d"
    })
}

//Create refresh token
UserSchema.methods.createReFreshToken = function () {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_KEY, {
        expiresIn: "15d"
    })
}

//Forgot password
UserSchema.methods.createResetToken = function () {
    //generate crypto token
    const resetToken = crypto.randomBytes(20).toString("hex")
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    //console.log({ resetToken }, this.resetPasswordToken);
    this.resetPasswordTime = Date.now() + 15 * 60 * 1000 //15 minutes

    return resetToken
}

const User = mongoose.model("User", UserSchema);

module.exports = User;