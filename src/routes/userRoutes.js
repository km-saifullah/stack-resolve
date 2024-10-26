import { Router } from 'express'
import { createUser } from '../controllers/userController.js'
import { createUserValidation } from '../middlewares/userValidation.js'
import { loginUser } from '../controllers/authController.js'

const router = Router()

router.route('/').post(createUserValidation, createUser)
router.route('/login/').post(loginUser)

export default router
