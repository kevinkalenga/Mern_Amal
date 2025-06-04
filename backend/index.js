import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'

const app = express() 
app.use(express.json())

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