import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
dotenv.config();

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'

const app = express() 
app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to DB")
}).catch((err) => {
    console.log(err)
})

app.listen(3000, () => {
    console.log("Le serveur est ecouté sur le port 3000")
})

// import des routes
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)

// Creation de middleware 
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})