import { Router } from 'express'
import { addProblem, getAllProblems } from '../controllers/problemController.js'
import { isUserLoggedIn } from '../controllers/authController.js'

const router = Router()

// create a problem
router.route('/').post(isUserLoggedIn, addProblem)

// get all problems
router.route('/').get(getAllProblems)

export default router
