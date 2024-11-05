import { Router } from 'express'
import { createComment } from '../controllers/commentController.js'
import { isUserLoggedIn } from '../controllers/authController.js'

const router = Router()

router.route('/').post(isUserLoggedIn, createComment)

export default router
