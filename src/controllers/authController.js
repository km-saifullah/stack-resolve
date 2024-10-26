import apiResponse from 'quick-response'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { tokenSecret } from '../config/index.js'

// @desc: login user
// route: POST /api/v1/users/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    if ((email == '' || !email) && (password == '' || !password)) {
      return res.status(400).json(apiResponse(400, 'enter email and password'))
    }

    const userFound = await User.findOne({ email })
    if (!userFound) {
      return res.status(404).json(apiResponse(404, 'user not found'))
    }

    // chesk password is correct or wrong
    const isPasswordCorrect = await userFound.correctPassword(password)
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json(apiResponse(400, 'incorrect email and password'))
    }

    // generate jwt token
    const token = await userFound.generateToken()

    return res.status(200).json(apiResponse(200, 'login successful', { token }))
  } catch (error) {
    return res.status(400).json({ status: 'fail', message: error.message })
  }
}

// @desc: is user looggedin to the system
const isUserLoggedIn = async (req, res, next) => {
  try {
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return next(apiResponse(401, 'please login first'))
    }

    // verify token
    const decoded = jwt.verify(token, tokenSecret)

    const currentUser = await User.findById(decoded.id)
    if (!currentUser) {
      return res.status(401, 'user does not found with this token')
    }

    req.user = currentUser
    next()
  } catch (error) {
    return res.status(400).json({ status: 'fail', message: error.message })
  }
}

export { loginUser, isUserLoggedIn }
