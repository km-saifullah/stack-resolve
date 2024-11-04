import express from 'express'
import problemRouter from './routes/problemRoutes.js'
import userRouter from './routes/userRoutes.js'

const app = express()

// middlewares
app.use(express.json())
app.use('/public', express.static('public'))
app.use(express.urlencoded({ extended: true }))

// problem route
app.use('/api/v1/problems/', problemRouter)

// user route
app.use('/api/v1/users/', userRouter)

export default app
