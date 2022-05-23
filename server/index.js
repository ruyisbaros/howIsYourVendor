require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const app = express()

//Import Routes


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

app.get("/", (req, res) => {
    res.send("Hello")
})


const port = process.env.PORT || 8080

const server = app.listen(port, () => {
    console.log(`Server is running at port: ${port}...`);
})