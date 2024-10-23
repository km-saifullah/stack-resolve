import express from 'express'
import problemRouter from './routes/problemRoutes.js'

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// problem rotes
app.use('/api/v1/problems/', problemRouter)

export default app
