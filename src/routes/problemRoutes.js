import { Router } from 'express'
import { addProblem, getAllProblems, getProblem } from '../controllers/problemController.js'
import { isUserLoggedIn } from '../controllers/authController.js'
import upload from '../middlewares/uploadImage.js'

const router = Router()

// create a problem
router
  .route('/')
  .post(isUserLoggedIn, upload.array('image', 5), addProblem)
  .get(getAllProblems)

  router.route('/:id').get(getProblem)
export default router
