require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const app = express()

//Import Routes
const userRouter = require("./routes/userRouter")
const authRouter = require("./routes/authRouter")
const uploadRouter = require("./routes/uploadRouter")
const postRouter = require("./routes/postRouter")
const commentRouter = require("./routes/commentRouter")

//Required Middle wares
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(morgan("dev"))
app.use(fileUpload({
    useTempFiles: true
}))

mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(res => {
        console.log('Database connection established');

    })
    .catch(err => {
        console.log(err);
    })


//Route Middle Wares
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/uploads", uploadRouter)
app.use("/api/v1/posts", postRouter)
app.use("/api/v1/comments", commentRouter)

app.get("/", (req, res) => {
    res.send("Hello")
})


const port = process.env.PORT || 8080

const server = app.listen(port, () => {
    console.log(`Server is running at port: ${port}...`);
})