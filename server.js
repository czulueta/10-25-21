const express = require("express")
const app = express()
require("dotenv").config()
const morgan =  require("morgan")
const mongoose = require("mongoose")
const expressJwt = require("express-jwt")

app.use(express.json())
app.use(morgan("dev"))

mongoose.connect("mongodb://localhost:27017/todo-userDB",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false 
    },
    () => ("connected to the database")
)

app.use("/auth", require("./routes/authRouter.js"))
app.use("/api", expressJwt({ secret: process.env.SECRET, algorithms: ["HS256"]}))
app.use("/todo", require("./routes/todoRouter.js"))

app.use((err, req, res, next) => {
    return res.send({ errMsg: err.message })
})

app.listen(9000, () => {
    console.log(`Successfully running on port 9000`)
})