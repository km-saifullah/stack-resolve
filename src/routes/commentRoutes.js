import { Router } from 'express'
import {
  createComment,
  dislikeComment,
  getAllComments,
  likeComment,
} from '../controllers/commentController.js'
import { isUserLoggedIn } from '../controllers/authController.js'

const router = Router()

router
  .route('/')
  .post(isUserLoggedIn, createComment)
  .get(isUserLoggedIn, getAllComments)

router.route('/like').patch(isUserLoggedIn, likeComment)
router.route('/dislike').patch(isUserLoggedIn, dislikeComment)

export default router
