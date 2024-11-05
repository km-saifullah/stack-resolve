import express from 'express'
import problemRouter from './routes/problemRoutes.js'
import userRouter from './routes/userRoutes.js'
import commentRouter from './routes/commentRoutes.js'

const app = express()

// middlewares
app.use(express.json())
app.use('/public', express.static('public'))
app.use(express.urlencoded({ extended: true }))

// problem routes
app.use('/api/v1/problems/', problemRouter)

// user routes
app.use('/api/v1/users/', userRouter)

// comment routes
app.use('/api/v1/comments/', commentRouter)

export default app
