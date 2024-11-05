import { Router } from 'express'
import {
  createComment,
  getAllComments,
} from '../controllers/commentController.js'
import { isUserLoggedIn } from '../controllers/authController.js'

const router = Router()

router
  .route('/')
  .post(isUserLoggedIn, createComment)
  .get(isUserLoggedIn, getAllComments)

export default router
