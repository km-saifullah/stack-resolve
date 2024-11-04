import { Router } from 'express'
import { addProblem, getAllProblems } from '../controllers/problemController.js'
import { isUserLoggedIn } from '../controllers/authController.js'
import upload from '../middlewares/uploadImage.js'

const router = Router()

// create a problem
router
  .route('/')
  .post(isUserLoggedIn, upload.array('image', 5), addProblem)
  .get(getAllProblems)

export default router
