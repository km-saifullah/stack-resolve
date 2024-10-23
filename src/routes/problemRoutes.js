import { Router } from 'express'
import { addProblem, getAllProblems } from '../controllers/problemController.js'

const router = Router()

// create a problem
router.route('/').post(addProblem)

// get all problems
router.route('/').get(getAllProblems)

export default router
